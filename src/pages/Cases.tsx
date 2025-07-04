
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { FileText, Calendar, User, Clock, CheckCircle, AlertCircle, Search, Filter, ArrowRight, Building, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const Cases = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
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
        return <CheckCircle className="h-5 w-5 text-success-green" />;
      case 'submitted':
      case 'awaiting_response':
        return <Clock className="h-5 w-5 text-action-orange" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'application_preparation':
        return <Building className="h-5 w-5 text-confidence-purple" />;
      case 'documents_collection':
        return <FileText className="h-5 w-5 text-trust-blue" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success-green/10 text-success-green border-success-green/20';
      case 'submitted':
      case 'awaiting_response':
        return 'bg-action-orange/10 text-action-orange border-action-orange/20';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'initiated':
        return 'bg-trust-blue/10 text-trust-blue border-trust-blue/20';
      case 'application_preparation':
        return 'bg-confidence-purple/10 text-confidence-purple border-confidence-purple/20';
      case 'documents_collection':
        return 'bg-energy-pink/10 text-energy-pink border-energy-pink/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high':
        return 'bg-action-orange/10 text-action-orange border-action-orange/20';
      case 'medium':
        return 'bg-action-warm/10 text-action-warm border-action-warm/20';
      case 'low':
        return 'bg-success-green/10 text-success-green border-success-green/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Filter cases based on search and filters
  const filteredCases = cases.filter((case_: any) => {
    const matchesSearch = case_.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.case_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (case_.assigned_consultant && case_.assigned_consultant.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Cases</h1>
            <p className="text-muted-foreground">Track the progress of your immigration cases</p>
          </div>
          
          {cases.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="initiated">Initiated</SelectItem>
                  <SelectItem value="documents_collection">Documents Collection</SelectItem>
                  <SelectItem value="application_preparation">Application Prep</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="awaiting_response">Awaiting Response</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Case Statistics */}
        {cases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { status: 'initiated', label: 'Initiated', color: 'trust-blue' },
              { status: 'submitted', label: 'Submitted', color: 'action-orange' },
              { status: 'approved', label: 'Approved', color: 'success-green' },
              { status: 'rejected', label: 'Rejected', color: 'destructive' }
            ].map(item => {
              const count = cases.filter((case_: any) => case_.status === item.status).length;
              return (
                <Card key={item.status} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                        <p className="text-2xl font-bold text-foreground">{count}</p>
                      </div>
                      <div className={`p-2 rounded-lg bg-${item.color}/10`}>
                        {getStatusIcon(item.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {cases.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="bg-gradient-to-br from-trust-blue/5 to-confidence-purple/5 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-12 w-12 text-trust-blue" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No cases yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your immigration cases will appear here once they are created by our team. We'll notify you when your case is initiated.
              </p>
            </CardContent>
          </Card>
        ) : filteredCases.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <div className="bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No cases found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCases.map((case_: any) => (
              <Card key={case_.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-trust-blue">
                <CardHeader className="bg-gradient-to-r from-background to-muted/20 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-trust-blue/10 to-confidence-purple/10 p-2 rounded-lg">
                        {getStatusIcon(case_.status)}
                      </div>
                      <div>
                        <span className="text-xl font-bold text-foreground">Case #{case_.case_number}</span>
                        <p className="text-sm font-medium text-trust-blue mt-1">{case_.case_type}</p>
                      </div>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getPriorityColor(case_.priority)} font-medium px-3 py-1`}>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {case_.priority} priority
                      </Badge>
                      <Badge className={`${getStatusColor(case_.status)} font-medium px-3 py-1`}>
                        {case_.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-trust-blue" />
                        Created Date
                      </h4>
                      <p className="text-muted-foreground">{new Date(case_.created_date).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4 text-action-orange" />
                        Target Submission
                      </h4>
                      <p className="text-muted-foreground">
                        {case_.target_submission_date 
                          ? new Date(case_.target_submission_date).toLocaleDateString()
                          : 'TBD'
                        }
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <User className="h-4 w-4 text-confidence-purple" />
                        Consultant
                      </h4>
                      <p className={case_.assigned_consultant ? "text-muted-foreground" : "text-muted-foreground italic"}>
                        {case_.assigned_consultant || 'Not assigned'}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4 text-energy-pink" />
                        Progress
                      </h4>
                      <div className="flex items-center space-x-2">
                        {case_.status === 'approved' && (
                          <span className="text-success-green font-medium">100%</span>
                        )}
                        {case_.status === 'submitted' && (
                          <span className="text-action-orange font-medium">80%</span>
                        )}
                        {case_.status === 'application_preparation' && (
                          <span className="text-confidence-purple font-medium">60%</span>
                        )}
                        {case_.status === 'documents_collection' && (
                          <span className="text-trust-blue font-medium">40%</span>
                        )}
                        {case_.status === 'initiated' && (
                          <span className="text-muted-foreground font-medium">20%</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {case_.notes && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg border border-border">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-trust-blue" />
                        Case Notes
                      </h4>
                      <p className="text-muted-foreground text-sm">{case_.notes}</p>
                    </div>
                  )}

                  {/* Enhanced Case Timeline */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-trust-blue" />
                      Case Timeline
                    </h4>
                    <div className="relative">
                      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-trust-blue to-confidence-purple"></div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <div className="w-6 h-6 bg-trust-blue rounded-full border-4 border-background shadow-md flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="font-medium text-foreground">Case Initiated</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(case_.created_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        {case_.actual_submission_date && (
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <div className="w-6 h-6 bg-success-green rounded-full border-4 border-background shadow-md flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium text-foreground">Application Submitted</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(case_.actual_submission_date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {case_.decision_date && (
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <div className={`w-6 h-6 rounded-full border-4 border-background shadow-md flex items-center justify-center ${
                                case_.status === 'approved' ? 'bg-success-green' : 'bg-destructive'
                              }`}>
                                {case_.status === 'approved' ? (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                ) : (
                                  <AlertCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">Decision Received</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(case_.decision_date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
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
