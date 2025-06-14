
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RituChat from '@/components/RituChat';
import VisaAssessment from '@/components/VisaAssessment';
import DocumentCenter from '@/components/DocumentCenter';
import EnhancedPointsCalculator from '@/components/EnhancedPointsCalculator';
import TimelineTracker from '@/components/TimelineTracker';
import SettlementHub from '@/components/SettlementHub';
import Disclaimer from '@/components/Disclaimer';
import { LanguageProvider, useLanguage } from '@/components/LanguageSelector';
import LanguageSelector from '@/components/LanguageSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Calculator, FileText, BookOpen, Users, Shield, Clock, CheckCircle, Target, Calendar, Home } from 'lucide-react';

const RituMeetingContent = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Meet <span className="text-australia-blue">Ritu</span> - Your AI Immigration Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Get instant, personalized guidance for your Australian migration journey. 
            Ritu combines advanced AI with expert knowledge to help you succeed.
          </p>
          <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5" />
            <span>Free to use • No registration required • Instant results</span>
          </div>
        </div>
        
        <Disclaimer className="mb-8" />
        
        {/* Main Interface */}
        <Tabs defaultValue="chat" className="mb-12">
          <TabsList className="grid w-full grid-cols-6 max-w-4xl mx-auto mb-8">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t('chatWithRitu')}</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">{t('visaAssessment')}</span>
              <span className="sm:hidden">Visa</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{t('documents')}</span>
              <span className="sm:hidden">Docs</span>
            </TabsTrigger>
            <TabsTrigger value="points" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">{t('pointsCalculator')}</span>
              <span className="sm:hidden">Points</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{t('timeline')}</span>
              <span className="sm:hidden">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="settlement" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{t('settlement')}</span>
              <span className="sm:hidden">Settle</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat">
            <RituChat />
          </TabsContent>
          
          <TabsContent value="assessment">
            <VisaAssessment />
          </TabsContent>
          
          <TabsContent value="documents">
            <DocumentCenter />
          </TabsContent>
          
          <TabsContent value="points">
            <EnhancedPointsCalculator />
          </TabsContent>

          <TabsContent value="timeline">
            <TimelineTracker />
          </TabsContent>

          <TabsContent value="settlement">
            <SettlementHub />
          </TabsContent>
        </Tabs>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-australia-blue" />
              </div>
              <CardTitle className="text-lg">Instant Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Get immediate answers to your immigration questions with AI-powered responses based on latest policies.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-australia-blue" />
              </div>
              <CardTitle className="text-lg">Points Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Calculate your exact immigration points score and see which visa pathways you're eligible for.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-australia-blue" />
              </div>
              <CardTitle className="text-lg">Document Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Get personalized document checklists and preparation guidance for your specific visa type.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-australia-blue" />
              </div>
              <CardTitle className="text-lg">Up-to-Date Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Access the latest processing times, policy changes, and immigration updates in real-time.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Trust Indicators */}
        <Card className="bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why Choose VARG Immigration with Ritu?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-white/90" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Accuracy</h3>
                <p className="text-white/90">
                  Advanced AI trained on Australian immigration law ensures accurate, up-to-date guidance
                </p>
              </div>
              
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-white/90" />
                <h3 className="text-xl font-semibold mb-2">Expert Human Backup</h3>
                <p className="text-white/90">
                  Registered migration agents ready to handle complex cases when needed
                </p>
              </div>
              
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-white/90" />
                <h3 className="text-xl font-semibold mb-2">Comprehensive Knowledge</h3>
                <p className="text-white/90">
                  Complete database of visa types, requirements, and success strategies
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

const RituMeeting = () => {
  return (
    <LanguageProvider>
      <RituMeetingContent />
    </LanguageProvider>
  );
};

export default RituMeeting;
