
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { 
  User, 
  FileText, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  MapPin,
  Star,
  Bell,
  Shield,
  Award,
  Compass,
  Heart,
  Target,
  ChevronRight,
  Globe,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

const Overview = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const { useClient, useClientDocuments, useClientCases } = useCRM();
  
  // Only fetch data if user exists - this prevents unnecessary API calls
  const { data: client, isLoading: clientLoading } = useClient(user?.id || '');
  const { data: documents, isLoading: documentsLoading } = useClientDocuments(user?.id || '');  
  const { data: cases, isLoading: casesLoading } = useClientCases(user?.id || '');

  // Show loading state while any critical data is loading
  const isLoading = clientLoading || documentsLoading || casesLoading;

  const recentDocuments = documents?.slice(0, 3) || [];
  const activeCase = cases?.[0];

  // Calculate journey progress
  const getJourneyProgress = () => {
    if (!activeCase) return { progress: 0, stage: 'Getting Started' };
    
    const statusProgress = {
      'initiated': { progress: 15, stage: 'Initial Assessment' },
      'documents_collection': { progress: 35, stage: 'Document Collection' },
      'application_preparation': { progress: 65, stage: 'Application Preparation' },
      'submitted': { progress: 80, stage: 'Application Submitted' },
      'awaiting_response': { progress: 90, stage: 'Awaiting Decision' },
      'approved': { progress: 100, stage: 'Approved! 🎉' },
      'rejected': { progress: 100, stage: 'Under Review' },
      'closed': { progress: 100, stage: 'Case Closed' }
    };
    
    return statusProgress[activeCase.status as keyof typeof statusProgress] || { progress: 0, stage: 'Unknown' };
  };

  const journeyProgress = getJourneyProgress();

  // Profile completion score
  const getProfileCompletion = () => {
    if (!client) return 0;
    const fields = ['full_name', 'email', 'phone', 'country_of_origin'];
    const completed = fields.filter(field => client[field]).length;
    return Math.round((completed / fields.length) * 100);
  };

  const profileCompletion = getProfileCompletion();

  // Show loading state while user authentication or critical data is loading
  if (!user || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading your overview...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Hero Welcome Section - Australian Inspired */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-100/30 to-transparent rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  G'day, {client?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || 'Mate'}! 🇦🇺
                </h1>
                <p className="text-gray-600">Your Australian immigration journey is progressing beautifully</p>
              </div>
            </div>
            
            {/* Journey Progress Bar */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Journey Progress</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {journeyProgress.stage}
                </Badge>
              </div>
              <Progress value={journeyProgress.progress} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">{journeyProgress.progress}% complete</p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Case Status */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Case Status</p>
                  <p className="text-xl font-bold text-gray-900 capitalize">
                    {activeCase?.status?.replace('_', ' ') || 'Ready to Begin'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activeCase?.case_number || 'No active case'}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Documents</p>
                  <p className="text-xl font-bold text-gray-900">{documents?.length || 0}</p>
                  <p className="text-xs text-emerald-600 mt-1">
                    {documents?.filter(d => d.status === 'verified').length || 0} verified
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Strength */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Profile Strength</p>
                  <p className="text-xl font-bold text-gray-900">{profileCompletion}%</p>
                  <p className="text-xs text-amber-600 mt-1">
                    {profileCompletion === 100 ? 'Complete!' : 'Needs attention'}
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Action */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Priority Action</p>
                  <p className="text-sm font-bold text-gray-900">
                    {profileCompletion < 100 ? 'Complete Profile' : 
                     documents?.length === 0 ? 'Upload Documents' : 
                     'Review Application'}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">Take action today</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Journey Tracker */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Australian Immigration Journey Timeline */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Your Australian Immigration Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {activeCase ? (
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{activeCase.case_number}</h3>
                          <p className="text-gray-600 capitalize">
                            {activeCase.case_type?.replace('_', ' ')} Application
                          </p>
                        </div>
                        <Badge 
                          variant={activeCase.status === 'approved' ? 'default' : 'secondary'}
                          className={
                            activeCase.status === 'approved' ? 'bg-emerald-500 hover:bg-emerald-600' :
                            activeCase.status === 'submitted' || activeCase.status === 'awaiting_response' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
                            activeCase.status === 'initiated' || activeCase.status === 'documents_collection' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                            'bg-gray-500 hover:bg-gray-600 text-white'
                          }
                        >
                          {activeCase.status?.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      {/* Journey Steps */}
                      <div className="space-y-4 mt-6">
                        {[
                          { step: 'Initial Assessment', status: 'completed', icon: CheckCircle },
                          { step: 'Document Collection', status: journeyProgress.progress >= 35 ? 'completed' : 'current', icon: Upload },
                          { step: 'Application Preparation', status: journeyProgress.progress >= 65 ? 'completed' : 'pending', icon: FileText },
                          { step: 'Submission', status: journeyProgress.progress >= 80 ? 'completed' : 'pending', icon: Target },
                          { step: 'Assessment & Decision', status: journeyProgress.progress >= 90 ? 'completed' : 'pending', icon: Award },
                          { step: 'Welcome to Australia!', status: journeyProgress.progress === 100 ? 'completed' : 'pending', icon: Heart }
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <div key={index} className="flex items-center space-x-4">
                              <div className={`p-2 rounded-full ${
                                item.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                                item.status === 'current' ? 'bg-blue-100 text-blue-600' :
                                'bg-gray-100 text-gray-400'
                              }`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className={`font-medium ${
                                  item.status === 'completed' ? 'text-emerald-700' :
                                  item.status === 'current' ? 'text-blue-700' :
                                  'text-gray-500'
                                }`}>
                                  {item.step}
                                </p>
                              </div>
                              {item.status === 'completed' && (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t">
                        <Link to="/dashboard/cases">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                            View Full Case Details
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Start Your Journey?</h3>
                    <p className="text-gray-600 mb-6">
                      Let's begin your Australian immigration journey together
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                      Start Your Application
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.length > 0 ? (
                    recentDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`p-2 rounded-full ${
                          doc.status === 'verified' ? 'bg-emerald-100 text-emerald-600' :
                          doc.status === 'under_review' ? 'bg-amber-100 text-amber-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{doc.document_type}</p>
                          <p className="text-xs text-gray-500 capitalize">
                            {doc.status?.replace('_', ' ')} • {new Date(doc.upload_date || '').toLocaleDateString()}
                          </p>
                        </div>
                        {doc.status === 'verified' && (
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Insights */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/dashboard/profile">
                    <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-blue-50 border-blue-200">
                      <User className="h-5 w-5 mr-3 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Update Profile</div>
                        <div className="text-xs text-gray-500">Complete your information</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/dashboard/documents">
                    <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-emerald-50 border-emerald-200">
                      <Upload className="h-5 w-5 mr-3 text-emerald-600" />
                      <div className="text-left">
                        <div className="font-medium">Manage Documents</div>
                        <div className="text-xs text-gray-500">Upload & track documents</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/dashboard/consultations">
                    <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-purple-50 border-purple-200">
                      <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                      <div className="text-left">
                        <div className="font-medium">Book Consultation</div>
                        <div className="text-xs text-gray-500">Schedule expert guidance</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Australian Immigration Insights */}
            <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-800">🇦🇺 Immigration Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800">Processing Times</p>
                      <p className="text-xs text-emerald-600">Current average: 8-12 months</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Policy Updates</p>
                      <p className="text-xs text-blue-600">New skilled occupation list released</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Reminder</p>
                      <p className="text-xs text-amber-600">Health check expires in 3 months</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <Heart className="h-8 w-8 mx-auto mb-3 text-white" />
                  <h3 className="font-semibold mb-2">Need Support?</h3>
                  <p className="text-sm text-blue-100 mb-4">
                    Our expert team is here to guide you every step of the way
                  </p>
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                    Contact Your Consultant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
