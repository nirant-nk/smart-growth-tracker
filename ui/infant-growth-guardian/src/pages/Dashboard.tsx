import AddChildModal from '@/components/AddChildModal';
import GrowthRecordModal from '@/components/GrowthRecordModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, LogOut, Plus, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import AlertsModal from '../components/AlertsModal';
import type { Alert, Child } from '../components/types';

const SAMPLE_CHILDREN: Child[] = [
  { _id: '1', name: 'Aarav Singh', dob: '2021-03-10', gender: 'male', village: 'Rampur' },
  { _id: '2', name: 'Priya Patel', dob: '2022-07-15', gender: 'female', village: 'Lakshmipur' },
  { _id: '3', name: 'Vihaan Kumar', dob: '2020-11-25', gender: 'male', village: 'Sundarpur' },
];

const SAMPLE_ALERTS: Alert[] = [
  {
    _id: 'a1',
    child: SAMPLE_CHILDREN[0],
    level: 'sam',
    message: 'Severe weight loss detected',
    createdAt: '2025-06-10T10:00:00Z',
    resolved: false,
  },
  {
    _id: 'a2',
    child: SAMPLE_CHILDREN[1],
    level: 'mam',
    message: 'Moderate acute malnutrition observed',
    createdAt: '2025-06-12T09:30:00Z',
    resolved: false,
  },
];

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [isGrowthRecordOpen, setIsGrowthRecordOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [dashboardStats] = useState({
    totalChildren: SAMPLE_CHILDREN.length,
    activeAlerts: SAMPLE_ALERTS.length,
    recentRecords: 4,
    pendingRecommendations: 2,
  });
  const [recentAlerts] = useState<Alert[]>(SAMPLE_ALERTS.slice(0, 3));
  const [isLoading] = useState(false);

  const handleLogout = () => {
    onLogout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Infant Growth Guardian</h1>
              <p className="text-gray-600 mt-1">Infant Malnutrition Detection & Monitoring</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsAddChildOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Child
              </Button>
              <Button 
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Children</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dashboardStats.totalChildren}</div>
              <p className="text-xs text-muted-foreground">Under monitoring</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{dashboardStats.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Records</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardStats.recentRecords}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
              <Activity className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dashboardStats.pendingRecommendations}</div>
              <p className="text-xs text-muted-foreground">Pending confirmation</p>
            </CardContent>
          </Card>
        </div>
        {/* Quick Actions and Recent Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for community health workers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsAddChildOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Register New Child
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsGrowthRecordOpen(true)}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Record Growth Measurement
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsAlertsOpen(true)}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                View Active Alerts
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Children requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No active alerts at the moment
                  </p>
                ) : (
                  recentAlerts.map((alert) => (
                    <div key={alert._id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{alert.child?.name || 'Unknown Child'}</p>
                        <p className="text-xs text-gray-600">{alert.message}</p>
                      </div>
                      <Badge variant={alert.level === 'sam' ? 'destructive' : 'secondary'}>
                        {alert.level === 'sam' ? 'SAM' : 'MAM'}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Growth Monitoring Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Monitoring Overview</CardTitle>
            <CardDescription>System designed for early detection of infant malnutrition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Normal</div>
                <p className="text-sm text-gray-600">Children with healthy growth patterns</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 mb-2">MAM</div>
                <p className="text-sm text-gray-600">Moderate Acute Malnutrition</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">SAM</div>
                <p className="text-sm text-gray-600">Severe Acute Malnutrition</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Modals */}
      <AddChildModal 
        isOpen={isAddChildOpen} 
        onClose={() => setIsAddChildOpen(false)}
        onChildAdded={() => {}}
        sampleChildren={SAMPLE_CHILDREN}
      />
      <GrowthRecordModal 
        isOpen={isGrowthRecordOpen} 
        onClose={() => setIsGrowthRecordOpen(false)}
        onRecordAdded={() => {}}
        sampleChildren={SAMPLE_CHILDREN}
      />
      <AlertsModal 
        isOpen={isAlertsOpen} 
        onClose={() => setIsAlertsOpen(false)}
        sampleAlerts={SAMPLE_ALERTS}
      />
    </div>
  );
};

export default Dashboard;
