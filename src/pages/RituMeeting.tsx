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
import { useLanguage } from '@/components/LanguageSelector';
import LanguageSelector from '@/components/LanguageSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Calculator, FileText, BookOpen, Users, Shield, Clock, CheckCircle, Target, Calendar, Home } from 'lucide-react';

const RituMeeting = () => {
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
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet <span className="text-blue-600">Ritu</span> - Your AI Immigration Assistant
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
            Get instant, personalized guidance for your Australian migration journey. 
            Ritu combines advanced AI with expert knowledge to help you succeed.
          </p>
          <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5" />
            <span>Free to use • No registration required • Instant results</span>
          </div>
        </div>
        
        <Disclaimer className="mb-8" />
        
        {/* Main Interface with Enhanced Navigation */}
        <Tabs defaultValue="chat" className="mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 overflow-hidden">
            <TabsList className="w-full bg-gray-50 p-0 h-auto grid grid-cols-6 gap-0 rounded-none border-b border-gray-200">
              <TabsTrigger 
                value="chat" 
                className="group relative flex flex-col items-center justify-center px-4 py-8 h-24 min-h-[96px] rounded-none border-0 bg-transparent hover:bg-blue-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 ease-in-out text-gray-600 data-[state=inactive]:hover:text-blue-700 font-medium"
              >
                <div className="relative">
                  <MessageCircle className="w-12 h-12 mb-3 group-data-[state=active]:animate-pulse group-data-[state=active]:drop-shadow-lg group-data-[state=active]:filter group-data-[state=active]:brightness-110 hover:scale-110 transition-all duration-300 group-data-[state=active]:text-white group-hover:text-blue-600" />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-sm leading-tight text-center font-semibold">
                  <span className="hidden sm:inline">{t('chatWithRitu')}</span>
                  <span className="sm:hidden">Chat</span>
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="assessment" 
                className="group relative flex flex-col items-center justify-center px-4 py-8 h-24 min-h-[96px] rounded-none border-0 bg-transparent hover:bg-green-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-600 data-[state=active]:to-green-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 ease-in-out text-gray-600 data-[state=inactive]:hover:text-green-700 font-medium"
              >
                <div className="relative">
                  <Calculator className="w-12 h-12 mb-3 group-data-[state=active]:scale-110 group-data-[state=active]:drop-shadow-lg group-data-[state=active]:filter group-data-[state=active]:brightness-110 hover:rotate-12 transition-all duration-300 group-data-[state=active]:text-white group-hover:text-green-600" />
                  <div className="absolute inset-0 bg-green-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-sm leading-tight text-center font-semibold">
                  <span className="hidden sm:inline">{t('visaAssessment')}</span>
                  <span className="sm:hidden">Visa</span>
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="group relative flex flex-col items-center justify-center px-4 py-8 h-24 min-h-[96px] rounded-none border-0 bg-transparent hover:bg-purple-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 ease-in-out text-gray-600 data-[state=inactive]:hover:text-purple-700 font-medium"
              >
                <div className="relative">
                  <FileText className="w-12 h-12 mb-3 group-data-[state=active]:rotate-6 group-data-[state=active]:drop-shadow-lg group-data-[state=active]:filter group-data-[state=active]:brightness-110 hover:scale-110 transition-all duration-300 group-data-[state=active]:text-white group-hover:text-purple-600" />
                  <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-sm leading-tight text-center font-semibold">
                  <span className="hidden sm:inline">{t('documents')}</span>
                  <span className="sm:hidden">Docs</span>
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="points" 
                className="group relative flex flex-col items-center justify-center px-4 py-8 h-24 min-h-[96px] rounded-none border-0 bg-transparent hover:bg-orange-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-600 data-[state=active]:to-orange-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 ease-in-out text-gray-600 data-[state=inactive]:hover:text-orange-700 font-medium"
              >
                <div className="relative">
                  <Target className="w-12 h-12 mb-3 group-data-[state=active]:animate-pulse group-data-[state=active]:drop-shadow-lg group-data-[state=active]:filter group-data-[state=active]:brightness-110 hover:scale-125 transition-all duration-300 group-data-[state=active]:text-white group-hover:text-orange-600" />
                  <div className="absolute inset-0 bg-orange-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-sm leading-tight text-center font-semibold">
                  <span className="hidden sm:inline">{t('pointsCalculator')}</span>
                  <span className="sm:hidden">Points</span>
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="group relative flex flex-col items-center justify-center px-4 py-8 h-24 min-h-[96px] rounded-none border-0 bg-transparent hover:bg-indigo-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 ease-in-out text-gray-600 data-[state=inactive]:hover:text-indigo-700 font-medium"
              >
                <div className="relative">
                  <Calendar className="w-12 h-12 mb-3 group-data-[state=active]:scale-110 group-data-[state=active]:drop-shadow-lg group-data-[state=active]:filter group-data-[state=active]:brightness-110 hover:rotate-12 transition-all duration-300 group-data-[state=active]:text-white group-hover:text-indigo-600" />
                  <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-sm leading-tight text-center font-semibold">
                  <span className="hidden sm:inline">{t('timeline')}</span>
                  <span className="sm:hidden">Timeline</span>
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="settlement" 
                className="group relative flex flex-col items-center justify-center px-4 py-8 h-24 min-h-[96px] rounded-none border-0 bg-transparent hover:bg-teal-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-teal-600 data-[state=active]:to-teal-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 ease-in-out text-gray-600 data-[state=inactive]:hover:text-teal-700 font-medium"
              >
                <div className="relative">
                  <Home className="w-12 h-12 mb-3 group-data-[state=active]:animate-bounce group-data-[state=active]:drop-shadow-lg group-data-[state=active]:filter group-data-[state=active]:brightness-110 hover:scale-110 transition-all duration-300 group-data-[state=active]:text-white group-hover:text-teal-600" />
                  <div className="absolute inset-0 bg-teal-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-sm leading-tight text-center font-semibold">
                  <span className="hidden sm:inline">{t('settlement')}</span>
                  <span className="sm:hidden">Settle</span>
                </span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="transition-all duration-300 ease-in-out">
            <TabsContent value="chat" className="mt-0 animate-in fade-in-50 duration-300">
              <RituChat />
            </TabsContent>
            
            <TabsContent value="assessment" className="mt-0 animate-in fade-in-50 duration-300">
              <VisaAssessment />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0 animate-in fade-in-50 duration-300">
              <DocumentCenter />
            </TabsContent>
            
            <TabsContent value="points" className="mt-0 animate-in fade-in-50 duration-300">
              <EnhancedPointsCalculator />
            </TabsContent>

            <TabsContent value="timeline" className="mt-0 animate-in fade-in-50 duration-300">
              <TimelineTracker />
            </TabsContent>

            <TabsContent value="settlement" className="mt-0 animate-in fade-in-50 duration-300">
              <SettlementHub />
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">Instant Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Get immediate answers to your immigration questions with AI-powered responses based on latest policies.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">Points Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Calculate your exact immigration points score and see which visa pathways you're eligible for.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">Document Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Get personalized document checklists and preparation guidance for your specific visa type.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">Up-to-Date Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Access the latest processing times, policy changes, and immigration updates in real-time.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Trust Indicators */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
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

export default RituMeeting;
