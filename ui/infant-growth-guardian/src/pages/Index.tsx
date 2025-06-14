
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Activity, AlertTriangle, Plus, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const Index = () => {
  const [dashboardData, setDashboardData] = useState({
    totalChildren: 0,
    activeAlerts: 0,
    recentGrowthRecords: 0,
    pendingRecommendations: 0
  });

  useEffect(() => {
    // Simulate loading dashboard data
    // In real implementation, this would fetch from your API
    setDashboardData({
      totalChildren: 23,
      activeAlerts: 4,
      recentGrowthRecords: 12,
      pendingRecommendations: 7
    });
  }, []);

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} clicked`,
      description: "This will navigate to the respective page when implemented",
    });
  };

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
            <Button 
              onClick={() => handleQuickAction('Add Child')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Child
            </Button>
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
              <div className="text-2xl font-bold text-blue-600">{dashboardData.totalChildren}</div>
              <p className="text-xs text-muted-foreground">Under monitoring</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{dashboardData.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Records</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardData.recentGrowthRecords}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
              <Activity className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dashboardData.pendingRecommendations}</div>
              <p className="text-xs text-muted-foreground">Pending confirmation</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
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
                onClick={() => handleQuickAction('Register Child')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Register New Child
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('Record Growth')}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Record Growth Measurement
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('View Alerts')}
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
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Ravi Kumar</p>
                    <p className="text-xs text-gray-600">Age: 18 months</p>
                  </div>
                  <Badge variant="destructive">SAM</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Priya Sharma</p>
                    <p className="text-xs text-gray-600">Age: 24 months</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-500 text-white">MAM</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Amit Singh</p>
                    <p className="text-xs text-gray-600">Age: 12 months</p>
                  </div>
                  <Badge variant="destructive">SAM</Badge>
                </div>
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
    </div>
  );
};

export default Index;
