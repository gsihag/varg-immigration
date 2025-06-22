
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { User, FileText, MessageSquare, Calendar, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/components/ui/sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const { useClient, useClientDocuments, useClientCases, useClientConsultations } = useCRM();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUser(user);
    };

    getUser();
  }, [navigate]);

  const { data: clientData } = useClient(user?.id || '');
  const { data: documents = [] } = useClientDocuments(user?.id || '');
  const { data: cases = [] } = useClientCases(user?.id || '');
  const { data: consultations = [] } = useClientConsultations(user?.id || '');

  useEffect(() => {
    if (clientData) {
      setClient(clientData);
    }
  }, [clientData]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'verified':
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'under_review':
      case 'submitted':
      case 'scheduled':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'verified':
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'under_review':
      case 'submitted':
      case 'scheduled':
        return 'text-yellow-600 bg-yellow-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!user || !client) {
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
        <div className="bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {client.full_name}!</h1>
          <p className="text-blue-100">
            Your Australian immigration journey is progressing. Here's your current status overview.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-australia-blue" />
                <div>
                  <p className="text-2xl font-bold">{documents.length}</p>
                  <p className="text-sm text-gray-600">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-8 w-8 text-australia-blue" />
                <div>
                  <p className="text-2xl font-bold">{cases.length}</p>
                  <p className="text-sm text-gray-600">Active Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-australia-blue" />
                <div>
                  <p className="text-2xl font-bold">{consultations.length}</p>
                  <p className="text-sm text-gray-600">Consultations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                {getStatusIcon(client.status)}
                <div>
                  <p className="text-sm font-medium capitalize">{client.status?.replace('_', ' ')}</p>
                  <p className="text-sm text-gray-600">Current Status</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Documents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Documents</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/documents')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-6">
                  <Upload className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-3">No documents uploaded yet</p>
                  <Button onClick={() => navigate('/dashboard/documents')}>
                    Upload Documents
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.slice(0, 3).map((doc: any) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{doc.file_name}</p>
                          <p className="text-xs text-gray-500 capitalize">{doc.document_type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Cases */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Active Cases</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/cases')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {cases.length === 0 ? (
                <div className="text-center py-6">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No active cases</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cases.slice(0, 3).map((case_: any) => (
                    <div key={case_.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">Case #{case_.case_number}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                          {case_.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{case_.case_type}</p>
                    </div>
                  ))}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center space-y-2"
                onClick={() => navigate('/dashboard/documents')}
              >
                <Upload className="h-6 w-6" />
                <span className="text-sm">Upload Documents</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center space-y-2"
                onClick={() => navigate('/dashboard/chat')}
              >
                <MessageSquare className="h-6 w-6" />
                <span className="text-sm">Chat with Ritu</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center space-y-2"
                onClick={() => navigate('/dashboard/consultations')}
              >
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Book Consultation</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center space-y-2"
                onClick={() => navigate('/dashboard/profile')}
              >
                <User className="h-6 w-6" />
                <span className="text-sm">Update Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
