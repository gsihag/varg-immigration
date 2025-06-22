
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { toast } from '@/components/ui/sonner';
import { User, Mail, Phone, Globe, Save } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const countries = [
  'India', 'Philippines', 'Nepal', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'China', 'Vietnam',
  'Thailand', 'Malaysia', 'Indonesia', 'South Korea', 'Japan', 'United Kingdom', 'United States',
  'Canada', 'Germany', 'France', 'Brazil', 'Colombia', 'Other'
];

const visaTypes = [
  'Student Visa', 'Work Visa', 'Permanent Residence', 'Visitor Visa', 'Partner Visa'
];

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    country_of_origin: '',
    visa_type_interested: ''
  });

  const { useClient, useUpdateClient } = useCRM();
  const updateClientMutation = useUpdateClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const { data: client } = useClient(user?.id || '');

  useEffect(() => {
    if (client) {
      setFormData({
        full_name: client.full_name || '',
        email: client.email || '',
        phone: client.phone || '',
        country_of_origin: client.country_of_origin || '',
        visa_type_interested: client.visa_type_interested || ''
      });
    }
  }, [client]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    
    try {
      await updateClientMutation.mutateAsync({
        clientId: user.id,
        updates: formData
      });
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                      disabled // Email cannot be changed
                    />
                  </div>
                  <p className="text-xs text-gray-500">Email cannot be changed. Contact support if needed.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                      placeholder="+61 xxx xxx xxx"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country of Origin</Label>
                  <Select
                    value={formData.country_of_origin}
                    onValueChange={(value) => handleInputChange('country_of_origin', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visa_type">Visa Type of Interest</Label>
                <Select
                  value={formData.visa_type_interested}
                  onValueChange={(value) => handleInputChange('visa_type_interested', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map((visa) => (
                      <SelectItem key={visa} value={visa}>
                        {visa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-australia-blue hover:bg-australia-darkBlue"
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Account Status</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {client.status?.replace('_', ' ') || 'Active'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-sm font-medium">
                    {new Date(client.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Assigned Agent</p>
                  <p className="text-sm text-gray-600">
                    {client.assigned_agent || 'Not assigned yet'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Ritu Chat</p>
                  <p className="text-sm font-medium">
                    {client.ritu_chat_enabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
