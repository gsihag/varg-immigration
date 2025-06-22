
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import { toast } from '@/components/ui/sonner';
import { Calendar, Clock, Video, Plus, User, CheckCircle, XCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const consultationTypes = [
  { value: 'initial', label: 'Initial Consultation' },
  { value: 'follow_up', label: 'Follow-up Meeting' },
  { value: 'document_review', label: 'Document Review' },
  { value: 'application_review', label: 'Application Review' }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

const Consultations = () => {
  const [user, setUser] = useState<any>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [notes, setNotes] = useState('');

  const { useClientConsultations, useScheduleConsultation } = useCRM();
  const scheduleConsultationMutation = useScheduleConsultation();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const { data: consultations = [], isLoading } = useClientConsultations(user?.id || '');

  const handleBookConsultation = async () => {
    if (!selectedDate || !selectedTime || !consultationType || !user?.id) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const scheduledDate = new Date(`${selectedDate}T${selectedTime}:00`);
      
      await scheduleConsultationMutation.mutateAsync({
        client_id: user.id,
        consultant_name: 'TBD', // Will be assigned later
        scheduled_date: scheduledDate.toISOString(),
        duration_minutes: 60,
        notes: notes || null
      });

      toast.success('Consultation booked successfully!');
      setBookingDialogOpen(false);
      setSelectedDate('');
      setSelectedTime('');
      setConsultationType('');
      setNotes('');
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error('Failed to book consultation');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

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
            <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
            <p className="text-gray-600">Book and manage your immigration consultations</p>
          </div>

          <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-australia-blue hover:bg-australia-darkBlue">
                <Plus className="h-4 w-4 mr-2" />
                Book Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Book a Consultation</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Consultation Type *</Label>
                  <Select value={consultationType} onValueChange={setConsultationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={minDate}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Time *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea
                    placeholder="Any specific topics you'd like to discuss?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setBookingDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBookConsultation}
                    disabled={scheduleConsultationMutation.isPending}
                    className="flex-1 bg-australia-blue hover:bg-australia-darkBlue"
                  >
                    {scheduleConsultationMutation.isPending ? 'Booking...' : 'Book Consultation'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Upcoming Consultations */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            {consultations.filter(c => new Date(c.scheduled_date) > new Date() && c.status === 'scheduled').length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming consultations</p>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations
                  .filter(c => new Date(c.scheduled_date) > new Date() && c.status === 'scheduled')
                  .map((consultation: any) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-australia-blue/10 p-3 rounded-lg">
                          <Calendar className="h-6 w-6 text-australia-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium">Consultation</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{new Date(consultation.scheduled_date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{new Date(consultation.scheduled_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span>•</span>
                            <span>{consultation.duration_minutes} minutes</span>
                          </div>
                          {consultation.consultant_name !== 'TBD' && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                              <User className="h-3 w-3" />
                              <span>{consultation.consultant_name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                        {consultation.meeting_link && (
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4 mr-1" />
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Past Consultations */}
        <Card>
          <CardHeader>
            <CardTitle>Past Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            {consultations.filter(c => new Date(c.scheduled_date) <= new Date() || c.status !== 'scheduled').length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No past consultations</p>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations
                  .filter(c => new Date(c.scheduled_date) <= new Date() || c.status !== 'scheduled')
                  .map((consultation: any) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-200 p-3 rounded-lg">
                          {getStatusIcon(consultation.status)}
                        </div>
                        <div>
                          <h4 className="font-medium">Consultation</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{new Date(consultation.scheduled_date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{new Date(consultation.scheduled_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span>•</span>
                            <span>{consultation.duration_minutes} minutes</span>
                          </div>
                          {consultation.consultant_name !== 'TBD' && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                              <User className="h-3 w-3" />
                              <span>{consultation.consultant_name}</span>
                            </div>
                          )}
                          {consultation.notes && (
                            <p className="text-sm text-gray-600 mt-2">{consultation.notes}</p>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(consultation.status)}>
                        {consultation.status}
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Consultations;
