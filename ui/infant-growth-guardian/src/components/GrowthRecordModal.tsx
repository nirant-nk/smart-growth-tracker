import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import type { Child } from './types';

interface GrowthRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordAdded: () => void;
  sampleChildren?: Child[];
}

const GrowthRecordModal = ({ isOpen, onClose, onRecordAdded, sampleChildren = [] }: GrowthRecordModalProps) => {
  const [formData, setFormData] = useState({
    childId: '',
    date: '',
    height: '',
    weight: '',
    hasEdema: false
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        childId: '',
        date: new Date().toISOString().split('T')[0],
        height: '',
        weight: '',
        hasEdema: false
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.childId) return;
    onRecordAdded();
    onClose();
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
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a child" />
              </SelectTrigger>
              <SelectContent>
                {sampleChildren.length === 0 ? (
                  <SelectItem value="no-children" disabled>
                    No children available - Please add a child first
                  </SelectItem>
                ) : (
                  sampleChildren.map((child) => (
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
            <Button type="submit" disabled={!formData.childId || sampleChildren.length === 0} className="flex-1">
              Record Measurement
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GrowthRecordModal;
