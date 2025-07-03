import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  MessageSquare,
  Upload,
  Bell,
  Award
} from 'lucide-react';

interface ActivityFeedProps {
  recentDocuments: any[];
}

export const ActivityFeed = ({ recentDocuments }: ActivityFeedProps) => {
  // Mock activity data - replace with real data
  const activities = [
    {
      id: 1,
      type: 'document_approved',
      title: 'Passport document approved',
      description: 'Your passport has been verified and approved by our team',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-success-green',
      bgColor: 'bg-success-green/10'
    },
    {
      id: 2,
      type: 'case_update',
      title: 'Case status updated',
      description: 'Your application moved to Document Collection stage',
      timestamp: '1 day ago',
      icon: Award,
      iconColor: 'text-trust-blue',
      bgColor: 'bg-trust-blue/10'
    },
    {
      id: 3,
      type: 'consultation_scheduled',
      title: 'Consultation scheduled',
      description: 'Video call with Sarah Thompson on March 10, 2025',
      timestamp: '2 days ago',
      icon: Calendar,
      iconColor: 'text-confidence-purple',
      bgColor: 'bg-confidence-purple/10'
    },
    {
      id: 4,
      type: 'document_request',
      title: 'Additional documents requested',
      description: 'Please upload your IELTS certificate',
      timestamp: '3 days ago',
      icon: Upload,
      iconColor: 'text-action-orange',
      bgColor: 'bg-action-orange/10'
    },
    {
      id: 5,
      type: 'message',
      title: 'New message from consultant',
      description: 'Important updates regarding your application timeline',
      timestamp: '4 days ago',
      icon: MessageSquare,
      iconColor: 'text-energy-pink',
      bgColor: 'bg-energy-pink/10'
    },
    {
      id: 6,
      type: 'system_notification',
      title: 'Policy update notification',
      description: 'New skilled occupation list has been released',
      timestamp: '1 week ago',
      icon: Bell,
      iconColor: 'text-calm-teal',
      bgColor: 'bg-calm-teal/10'
    }
  ];

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'document_approved':
        return <Badge className="bg-success-green/10 text-success-green border-success-green/20">Approved</Badge>;
      case 'case_update':
        return <Badge className="bg-trust-blue/10 text-trust-blue border-trust-blue/20">Updated</Badge>;
      case 'consultation_scheduled':
        return <Badge className="bg-confidence-purple/10 text-confidence-purple border-confidence-purple/20">Scheduled</Badge>;
      case 'document_request':
        return <Badge className="bg-action-orange/10 text-action-orange border-action-orange/20">Action Required</Badge>;
      case 'message':
        return <Badge className="bg-energy-pink/10 text-energy-pink border-energy-pink/20">New Message</Badge>;
      default:
        return <Badge variant="secondary">Update</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-trust-blue" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-full ${activity.bgColor}`}>
                  <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {activity.title}
                    </h4>
                    {getStatusBadge(activity.type)}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};