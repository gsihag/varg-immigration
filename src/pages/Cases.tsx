
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { FileText, Calendar, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const Cases = () => {
  const [user, setUser] = useState<any>(null);
  const { useClientCases } = useCRM();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const { data: cases = [], isLoading } = useClientCases(user?.id || '');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'submitted':
      case 'awaiting_response':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
      case 'awaiting_response':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'initiated':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Cases</h1>
          <p className="text-gray-600">Track the progress of your immigration cases</p>
        </div>

        {cases.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cases yet</h3>
              <p className="text-gray-500">
                Your immigration cases will appear here once they are created by our team.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {cases.map((case_: any) => (
              <Card key={case_.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      {getStatusIcon(case_.status)}
                      <span>Case #{case_.case_number}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(case_.priority)}>
                        {case_.priority} priority
                      </Badge>
                      <Badge className={getStatusColor(case_.status)}>
                        {case_.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Case Type</h4>
                      <p className="text-gray-600">{case_.case_type}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Created Date</h4>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(case_.created_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Target Submission</h4>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {case_.target_submission_date 
                            ? new Date(case_.target_submission_date).toLocaleDateString()
                            : 'TBD'
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Consultant</h4>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{case_.assigned_consultant || 'Not assigned'}</span>
                      </div>
                    </div>
                  </div>

                  {case_.notes && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Case Notes</h4>
                      <p className="text-gray-600 text-sm">{case_.notes}</p>
                    </div>
                  )}

                  {/* Case Timeline */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Case Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-australia-blue rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Case Initiated</p>
                          <p className="text-xs text-gray-500">
                            {new Date(case_.created_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      {case_.actual_submission_date && (
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Application Submitted</p>
                            <p className="text-xs text-gray-500">
                              {new Date(case_.actual_submission_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {case_.decision_date && (
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            case_.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium">Decision Received</p>
                            <p className="text-xs text-gray-500">
                              {new Date(case_.decision_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Cases;
