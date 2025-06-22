
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Calendar, MessageSquare } from 'lucide-react';
import { useCRM } from '@/hooks/useCRM';

const AdminDashboard: React.FC = () => {
  const { useClients } = useCRM();
  const { data: clients, isLoading, error } = useClients();

  if (isLoading) return <div className="p-4">Loading clients...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading clients</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'documents_pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-orange-100 text-orange-800';
      case 'consultation_scheduled': return 'bg-purple-100 text-purple-800';
      case 'application_in_progress': return 'bg-indigo-100 text-indigo-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: clients?.length || 0,
    new: clients?.filter(c => c.status === 'new').length || 0,
    inProgress: clients?.filter(c => ['documents_pending', 'under_review', 'application_in_progress'].includes(c.status || '')).length || 0,
    approved: clients?.filter(c => c.status === 'approved').length || 0,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Varg Immigration CRM</h1>
        <Button>Add New Client</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-900">Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Email</th>
                  <th className="text-left p-4 font-medium text-gray-900">Country</th>
                  <th className="text-left p-4 font-medium text-gray-900">Visa Type</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Agent</th>
                  <th className="text-left p-4 font-medium text-gray-900">Registered</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{client.full_name}</td>
                    <td className="p-4 text-gray-600">{client.email}</td>
                    <td className="p-4 text-gray-600">{client.country_of_origin || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{client.visa_type_interested || 'N/A'}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(client.status || 'new')}>
                        {client.status?.replace('_', ' ') || 'new'}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-600">{client.assigned_agent || 'Unassigned'}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(client.registration_date || '').toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
