
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { User, FileText, Calendar, Clock, ArrowRight, Upload, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard = () => {
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

  const { useClient, useDocuments, useCases } = useCRM();
  const { data: client } = useClient(user?.id || '');
  const { data: documents } = useDocuments(user?.id || '');
  const { data: cases } = useCases(user?.id || '');

  const recentDocuments = documents?.slice(0, 3) || [];
  const activeCase = cases?.[0];

  if (!client) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-australia-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {client.full_name || 'Valued Client'}!
          </h1>
          <p className="text-blue-100">
            Track your Australian immigration journey with VARG Immigration
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Case Status</p>
                  <p className="text-2xl font-bold capitalize">
                    {activeCase?.status?.replace('_', ' ') || 'No Active Case'}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-australia-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Documents</p>
                  <p className="text-2xl font-bold">{documents?.length || 0}</p>
                </div>
                <Upload className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile</p>
                  <p className="text-2xl font-bold">
                    {client.full_name && client.phone && client.country_of_origin ? '100%' : '75%'}
                  </p>
                </div>
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Step</p>
                  <p className="text-sm font-bold">
                    {!client.phone ? 'Complete Profile' : 
                     documents?.length === 0 ? 'Upload Documents' : 
                     'Review Case'}
                  </p>
                </div>
                <ArrowRight className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Case Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Case Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeCase ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{activeCase.case_number}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        {activeCase.visa_type?.replace('_', ' ')} Application
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activeCase.status === 'active' ? 'bg-green-100 text-green-800' :
                      activeCase.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activeCase.status?.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-australia-blue h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                  
                  <Link to="/dashboard/cases">
                    <Button className="w-full mt-4">View Case Details</Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No active case found</p>
                  <p className="text-sm text-gray-500">
                    Contact our team to start your immigration journey
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Recent Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentDocuments.length > 0 ? (
                <div className="space-y-3">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          doc.status === 'verified' ? 'bg-green-100' :
                          doc.status === 'under_review' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          <FileText className={`h-4 w-4 ${
                            doc.status === 'verified' ? 'text-green-600' :
                            doc.status === 'under_review' ? 'text-yellow-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.document_type}</p>
                          <p className="text-xs text-gray-500 capitalize">{doc.status?.replace('_', ' ')}</p>
                        </div>
                      </div>
                      {doc.status === 'verified' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  ))}
                  <Link to="/dashboard/documents">
                    <Button variant="outline" className="w-full mt-4">
                      View All Documents
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No documents uploaded yet</p>
                  <Link to="/dashboard/documents">
                    <Button>Upload Documents</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/dashboard/profile">
                <Button variant="outline" className="w-full h-16 flex flex-col space-y-2">
                  <User className="h-6 w-6" />
                  <span>Update Profile</span>
                </Button>
              </Link>
              
              <Link to="/dashboard/documents">
                <Button variant="outline" className="w-full h-16 flex flex-col space-y-2">
                  <Upload className="h-6 w-6" />
                  <span>Upload Documents</span>
                </Button>
              </Link>
              
              <Link to="/dashboard/consultations">
                <Button variant="outline" className="w-full h-16 flex flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Book Consultation</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
