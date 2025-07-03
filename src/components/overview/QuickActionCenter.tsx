import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  User, 
  BookOpen,
  Plus,
  FileUp,
  VideoIcon
} from 'lucide-react';

export const QuickActionCenter = () => {
  const quickActions = [
    {
      title: "Upload Documents",
      description: "Drag & drop or browse files",
      icon: Upload,
      href: "/dashboard/documents",
      color: "bg-gradient-to-br from-success-green/10 to-success-green/5",
      iconColor: "text-success-green",
      borderColor: "border-success-green/20"
    },
    {
      title: "Schedule Consultation",
      description: "Book with expert consultant",
      icon: Calendar,
      href: "/dashboard/consultations",
      color: "bg-gradient-to-br from-confidence-purple/10 to-confidence-purple/5",
      iconColor: "text-confidence-purple",
      borderColor: "border-confidence-purple/20"
    },
    {
      title: "Message Consultant",
      description: "Get instant support",
      icon: MessageSquare,
      href: "#",
      color: "bg-gradient-to-br from-trust-blue/10 to-trust-blue/5",
      iconColor: "text-trust-blue",
      borderColor: "border-trust-blue/20"
    },
    {
      title: "Make Payment",
      description: "Secure online payments",
      icon: CreditCard,
      href: "#",
      color: "bg-gradient-to-br from-energy-pink/10 to-energy-pink/5",
      iconColor: "text-energy-pink",
      borderColor: "border-energy-pink/20"
    },
    {
      title: "Update Profile",
      description: "Keep information current",
      icon: User,
      href: "/dashboard/profile",
      color: "bg-gradient-to-br from-action-orange/10 to-action-orange/5",
      iconColor: "text-action-orange",
      borderColor: "border-action-orange/20"
    },
    {
      title: "Resources Library",
      description: "Guides and templates",
      icon: BookOpen,
      href: "#",
      color: "bg-gradient-to-br from-calm-teal/10 to-calm-teal/5",
      iconColor: "text-calm-teal",
      borderColor: "border-calm-teal/20"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-trust-blue" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const content = (
              <div className={`p-4 rounded-xl border-2 ${action.borderColor} ${action.color} hover:scale-105 transition-all duration-300 cursor-pointer group h-full`}>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/80 rounded-lg">
                    <Icon className={`h-5 w-5 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            );

            return action.href.startsWith('/') ? (
              <Link key={index} to={action.href}>
                {content}
              </Link>
            ) : (
              <div key={index} onClick={() => console.log(`${action.title} clicked`)}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Featured Action - Document Upload Zone */}
        <div className="mt-6 p-6 border-2 border-dashed border-success-green/30 rounded-xl bg-gradient-to-br from-success-green/5 to-success-green/10 hover:border-success-green/50 transition-all duration-300">
          <div className="text-center">
            <FileUp className="h-12 w-12 text-success-green mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Quick Document Upload</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag files here or click to browse
            </p>
            <Button className="bg-success-green hover:bg-success-green/90 text-white">
              Choose Files
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};