
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { apiClient } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface GrowthRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordAdded: () => void;
}

const GrowthRecordModal = ({ isOpen, onClose, onRecordAdded }: GrowthRecordModalProps) => {
  const [formData, setFormData] = useState({
    childId: '',
    date: '',
    height: '',
    weight: '',
    hasEdema: false
  });
  const [children, setChildren] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChildren, setIsLoadingChildren] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        childId: '',
        date: new Date().toISOString().split('T')[0],
        height: '',
        weight: '',
        hasEdema: false
      });
      fetchChildren();
    }
  }, [isOpen]);

  const fetchChildren = async () => {
    if (!apiClient.token) {
      console.error('No authentication token available');
      return;
    }

    setIsLoadingChildren(true);
    try {
      const response = await apiClient.getAllChildren();
      setChildren(response.children || []);
      console.log('Fetched children:', response.children?.length || 0);
    } catch (error) {
      console.error('Error fetching children:', error);
      setChildren([]);
      toast({
        title: "Error loading children",
        description: "Could not load children list",
        variant: "destructive",
      });
    } finally {
      setIsLoadingChildren(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.childId) {
      toast({
        title: "Please select a child",
        description: "You must select a child to record measurements for",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.addGrowthRecord(formData.childId, {
        date: formData.date,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        hasEdema: formData.hasEdema
      });
      
      toast({
        title: "Growth record added successfully",
        description: "New measurements have been recorded",
      });

      // Show alerts if any were generated
      if (response.alerts && response.alerts.length > 0) {
        const alertMessages = response.alerts.map((alert: any) => alert.message).join(', ');
        toast({
          title: "Alert Generated",
          description: alertMessages,
          variant: "destructive",
        });
      }
      
      onRecordAdded();
      onClose();
    } catch (error) {
      console.error('Error adding growth record:', error);
      toast({
        title: "Failed to add record",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const now = new Date();
    const ageMs = now.getTime() - birthDate.getTime();
    const ageMonths = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 30));
    return ageMonths;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record Growth Measurement</DialogTitle>
          <DialogDescription>
            Add new height and weight measurements for a child.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="child-select">Select Child</Label>
            <Select 
              value={formData.childId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, childId: value }))}
              disabled={isLoadingChildren}
            >
              <SelectTrigger>
                <SelectValue placeholder={isLoadingChildren ? "Loading children..." : "Choose a child"} />
              </SelectTrigger>
              <SelectContent>
                {children.length === 0 ? (
                  <SelectItem value="no-children" disabled>
                    {isLoadingChildren ? "Loading..." : "No children available - Please add a child first"}
                  </SelectItem>
                ) : (
                  children.map((child) => (
                    <SelectItem key={child._id} value={child._id}>
                      {child.name} ({calculateAge(child.dob)} months)
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="measurement-date">Date</Label>
            <Input
              id="measurement-date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                placeholder="e.g., 75.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="e.g., 10.2"
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasEdema"
              checked={formData.hasEdema}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasEdema: !!checked }))}
            />
            <Label htmlFor="hasEdema" className="text-sm">
              Child has edema (swelling)
            </Label>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.childId || children.length === 0} className="flex-1">
              {isLoading ? 'Recording...' : 'Record Measurement'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GrowthRecordModal;
