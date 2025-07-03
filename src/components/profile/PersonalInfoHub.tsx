import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar, 
  Upload,
  Camera,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useState } from 'react';

interface PersonalInfoHubProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  client: any;
}

const countries = [
  'India', 'Philippines', 'Nepal', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'China', 'Vietnam',
  'Thailand', 'Malaysia', 'Indonesia', 'South Korea', 'Japan', 'United Kingdom', 'United States',
  'Canada', 'Germany', 'France', 'Brazil', 'Colombia', 'Other'
];

const visaTypes = [
  'Student Visa', 'Work Visa', 'Permanent Residence', 'Visitor Visa', 'Partner Visa'
];

export const PersonalInfoHub = ({ formData, onInputChange, onSubmit, loading, client }: PersonalInfoHubProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleSubmitWrapper = (e: React.FormEvent) => {
    onSubmit(e);
    setIsEditing(false);
  };

  const profileCompletion = () => {
    const fields = ['full_name', 'email', 'phone', 'country_of_origin', 'visa_type_interested'];
    const completed = fields.filter(field => formData[field]).length;
    return Math.round((completed / fields.length) * 100);
  };

  const completion = profileCompletion();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-trust-blue" />
            <span>Personal Information</span>
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Badge 
              className={`${
                completion === 100 ? 'bg-success-green/10 text-success-green border-success-green/20' :
                completion >= 70 ? 'bg-action-orange/10 text-action-orange border-action-orange/20' :
                'bg-destructive/10 text-destructive border-destructive/20'
              }`}
            >
              {completion}% Complete
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-trust-blue border-trust-blue/20 hover:bg-trust-blue/5"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitWrapper} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-gradient-to-r from-trust-blue/5 to-confidence-purple/5 rounded-xl">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profileImage || ''} />
                <AvatarFallback className="bg-trust-blue text-white text-xl">
                  {formData.full_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'U'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  type="button"
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-trust-blue hover:bg-trust-blue/90 p-0"
                  onClick={() => console.log('Upload photo')}
                >
                  <Camera className="h-3 w-3" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">
                {formData.full_name || 'Complete your profile'}
              </h3>
              <p className="text-muted-foreground">
                {client?.assigned_agent ? `Consultant: ${client.assigned_agent}` : 'No consultant assigned'}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-24 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      completion === 100 ? 'bg-success-green' :
                      completion >= 70 ? 'bg-action-orange' :
                      'bg-destructive'
                    }`}
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{completion}%</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => onInputChange('full_name', e.target.value)}
                  className="pl-10"
                  required
                  disabled={!isEditing}
                  placeholder="Enter your full legal name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  className="pl-10 bg-muted/30"
                  required
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">Email cannot be changed. Contact support if needed.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => onInputChange('phone', e.target.value)}
                  className="pl-10"
                  placeholder="+61 xxx xxx xxx"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country of Origin *</Label>
              <Select
                value={formData.country_of_origin}
                onValueChange={(value) => onInputChange('country_of_origin', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
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

            <div className="space-y-2">
              <Label htmlFor="visa_type">Visa Type of Interest *</Label>
              <Select
                value={formData.visa_type_interested}
                onValueChange={(value) => onInputChange('visa_type_interested', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
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

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth || ''}
                  onChange={(e) => onInputChange('date_of_birth', e.target.value)}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_address">Current Address</Label>
              <Textarea
                id="current_address"
                value={formData.current_address || ''}
                onChange={(e) => onInputChange('current_address', e.target.value)}
                className="resize-none"
                rows={3}
                disabled={!isEditing}
                placeholder="Enter your current residential address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="passport_number">Passport Number</Label>
                <Input
                  id="passport_number"
                  type="text"
                  value={formData.passport_number || ''}
                  onChange={(e) => onInputChange('passport_number', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter passport number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passport_expiry">Passport Expiry Date</Label>
                <Input
                  id="passport_expiry"
                  type="date"
                  value={formData.passport_expiry || ''}
                  onChange={(e) => onInputChange('passport_expiry', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-trust-blue hover:bg-trust-blue/90"
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};