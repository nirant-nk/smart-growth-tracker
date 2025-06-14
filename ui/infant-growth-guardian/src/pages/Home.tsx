
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, TrendingUp, Users } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'login' | 'register') => void;
}

const Home = ({ onNavigate }: HomeProps) => {
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
            <div className="space-x-3">
              <Button 
                variant="outline"
                onClick={() => onNavigate('register')}
              >
                Register
              </Button>
              <Button onClick={() => onNavigate('login')}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Early Detection Saves Lives
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Empower community health workers with digital tools to detect infant malnutrition early, 
            track growth patterns, and provide timely interventions for better child health outcomes.
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
            onClick={() => onNavigate('login')}
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Child Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track growth patterns and maintain comprehensive child health records
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Growth Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automated WHO Z-score calculations and growth trend analysis
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Real-time Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Instant notifications for SAM/MAM detection and intervention needs
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Care Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Evidence-based guidance for health workers and caregivers
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">149.2M</div>
              <p className="text-gray-600">Children under 5 are stunted globally</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">45%</div>
              <p className="text-gray-600">Of deaths linked to malnutrition</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Early</div>
              <p className="text-gray-600">Detection prevents lifelong damage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
