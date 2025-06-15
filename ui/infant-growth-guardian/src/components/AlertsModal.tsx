import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle, Calendar, User } from 'lucide-react';
import React, { useState } from 'react';
import type { Alert } from './types';

interface AlertWithStatus extends Alert {
  confirmed?: boolean;
}

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sampleAlerts?: Alert[];
}

const AlertsModal = ({ isOpen, onClose, sampleAlerts = [] }: AlertsModalProps) => {
  // Add local state to manage alert status (confirmed/resolved)
  const [alerts, setAlerts] = useState<AlertWithStatus[]>(
    sampleAlerts.map(a => ({ ...a }))
  );

  // Reset alerts when modal is reopened
  React.useEffect(() => {
    if (isOpen) {
      setAlerts(sampleAlerts.map(a => ({ ...a })));
    }
  }, [isOpen, sampleAlerts]);

  const handleConfirm = (id: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert._id === id ? { ...alert, confirmed: true } : alert
      )
    );
  };

  const handleResolve = (id: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert._id === id ? { ...alert, resolved: true } : alert
      )
    );
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
        {alerts.length === 0 ? (
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
                    {alert.child?.dob && (
                      <span className="text-sm text-gray-600">
                        ({Math.floor((new Date().getTime() - new Date(alert.child.dob).getTime()) / (1000 * 60 * 60 * 24 * 30))} months)
                      </span>
                    )}
                  </div>
                  <Badge variant={getBadgeVariant(alert.level)}>
                    {getBadgeText(alert.level)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </div>
                  {alert.child?.village && <span>Village: {alert.child.village}</span>}
                  {!alert.resolved && (
                    <span className="text-red-600">• Unresolved</span>
                  )}
                  {alert.confirmed && (
                    <span className="text-green-600">• Confirmed</span>
                  )}
                  {alert.resolved && (
                    <span className="text-gray-400">• Resolved</span>
                  )}
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2">
                  {!alert.confirmed && !alert.resolved && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleConfirm(alert._id)}
                    >
                      Confirm
                    </Button>
                  )}
                  {!alert.resolved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolve(alert._id)}
                    >
                      Mark Resolved
                    </Button>
                  )}
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
