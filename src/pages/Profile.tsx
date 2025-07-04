
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { toast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { PersonalInfoHub } from '@/components/profile/PersonalInfoHub';
import { VisaEligibilityDashboard } from '@/components/profile/VisaEligibilityDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Calculator, 
  Users, 
  Bell, 
  FileText, 
  Award, 
  Heart, 
  Shield,
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    country_of_origin: '',
    visa_type_interested: '',
    date_of_birth: '',
    current_address: '',
    passport_number: '',
    passport_expiry: '',
    age: '',
    education_level: '',
    work_experience: '',
    english_test_score: ''
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

  const { data: client, isLoading: clientLoading } = useClient(user?.id || '', {
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (client) {
      setFormData({
        full_name: client.full_name || '',
        email: client.email || '',
        phone: client.phone || '',
        country_of_origin: client.country_of_origin || '',
        visa_type_interested: client.visa_type_interested || '',
        date_of_birth: '',
        current_address: '',
        passport_number: '',
        passport_expiry: '',
        age: '',
        education_level: '',
        work_experience: '',
        english_test_score: ''
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
        updates: {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          country_of_origin: formData.country_of_origin,
          visa_type_interested: formData.visa_type_interested as any
        }
      });
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading only when user is not yet loaded
  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trust-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information, track your eligibility, and configure preferences
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Badge className="bg-success-green/10 text-success-green border-success-green/20">
              <CheckCircle className="h-3 w-3 mr-1" />
              Profile Active
            </Badge>
            <Badge className="bg-trust-blue/10 text-trust-blue border-trust-blue/20">
              Member since {client?.created_at ? new Date(client.created_at).toLocaleDateString() : 'Recently'}
            </Badge>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="personal" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Eligibility</span>
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Family</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Health</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <PersonalInfoHub 
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              loading={loading}
              client={client}
            />
          </TabsContent>

          {/* Visa Eligibility Tab */}
          <TabsContent value="eligibility">
            <VisaEligibilityDashboard 
              formData={formData}
              onInputChange={handleInputChange}
            />
          </TabsContent>

          {/* Family Members Tab */}
          <TabsContent value="family">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-energy-pink" />
                  <span>Family Member Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Family Members</h3>
                  <p className="text-muted-foreground mb-6">
                    Add and manage family members who will be included in your visa application
                  </p>
                  <Button className="bg-energy-pink hover:bg-energy-pink/90">
                    Add Family Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Checklist Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-action-orange" />
                  <span>Document Checklist</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Document Requirements</h3>
                  <p className="text-muted-foreground mb-6">
                    Personalized document checklist based on your visa type and circumstances
                  </p>
                  <Button className="bg-action-orange hover:bg-action-orange/90">
                    Generate Checklist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health & Character Tab */}
          <TabsContent value="health">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-calm-teal" />
                  <span>Health & Character Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Heart className="h-8 w-8 text-calm-teal" />
                      <div>
                        <h3 className="font-semibold">Health Examination</h3>
                        <p className="text-sm text-muted-foreground">Medical check status</p>
                      </div>
                    </div>
                    <Badge className="bg-action-orange/10 text-action-orange border-action-orange/20">
                      <Clock className="h-3 w-3 mr-1" />
                      Not Started
                    </Badge>
                  </div>
                  
                  <div className="p-6 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="h-8 w-8 text-confidence-purple" />
                      <div>
                        <h3 className="font-semibold">Character Assessment</h3>
                        <p className="text-sm text-muted-foreground">Police clearance status</p>
                      </div>
                    </div>
                    <Badge className="bg-action-orange/10 text-action-orange border-action-orange/20">
                      <Clock className="h-3 w-3 mr-1" />
                      Not Started
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-confidence-purple" />
                  <span>Contact Preferences & Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email notifications</span>
                        <Badge className="bg-success-green/10 text-success-green border-success-green/20">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS notifications</span>
                        <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Disabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Ritu Chat assistance</span>
                         <Badge className="bg-success-green/10 text-success-green border-success-green/20">
                           {client?.ritu_chat_enabled ? 'Enabled' : 'Disabled'}
                         </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
