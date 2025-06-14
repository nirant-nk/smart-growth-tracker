
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, User } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertsModal = ({ isOpen, onClose }: AlertsModalProps) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAlerts();
    }
  }, [isOpen]);

  const fetchAlerts = async () => {
    if (!apiClient.token) {
      console.error('No authentication token available');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.getAllAlerts();
      setAlerts(response.alerts || []);
      console.log('Fetched alerts:', response.alerts?.length || 0);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setAlerts([]);
      toast({
        title: "Error fetching alerts",
        description: "Could not load alerts data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBadgeVariant = (level: string) => {
    switch (level) {
      case 'sam':
        return 'destructive';
      case 'mam':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getBadgeText = (level: string) => {
    switch (level) {
      case 'sam':
        return 'SAM';
      case 'mam':
        return 'MAM';
      default:
        return 'Normal';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Active Alerts ({alerts.length})
          </DialogTitle>
          <DialogDescription>
            Children requiring immediate attention and intervention.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading alerts...</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No active alerts at the moment</p>
            <p className="text-sm text-gray-400 mt-2">All children are within normal growth parameters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.level === 'sam' 
                    ? 'border-l-red-500 bg-red-50' 
                    : 'border-l-yellow-500 bg-yellow-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="font-semibold">{alert.child?.name || 'Unknown Child'}</span>
                    {alert.child?.ageInMonths && (
                      <span className="text-sm text-gray-600">({alert.child.ageInMonths} months)</span>
                    )}
                  </div>
                  <Badge variant={getBadgeVariant(alert.level)}>
                    {getBadgeText(alert.level)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </div>
                  {alert.child?.village && <span>Village: {alert.child.village}</span>}
                  {!alert.resolved && <span className="text-red-600">• Unresolved</span>}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertsModal;
