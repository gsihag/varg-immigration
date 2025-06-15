
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RituChat from '@/components/RituChat';
import RituCapabilities from '@/components/RituCapabilities';
import { useLanguage } from '@/components/LanguageSelector';

const RituMeeting = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-australia-blue to-australia-darkBlue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold">R</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              {t('meetRitu')}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Australia's most intelligent AI immigration assistant. Get personalized advice, calculate your points, and navigate your Australian immigration journey with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">✨ Powered by Advanced AI</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🇦🇺 Australian Immigration Expert</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🌍 English & Hindi Support</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">⚡ Instant Responses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RituCapabilities />
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-16 bg-slate-50 ritu-chat-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start Your Conversation with Ritu
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ask any question about Australian immigration. Ritu is ready to help you with personalized advice based on your unique situation.
              </p>
            </div>
            <RituChat />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RituMeeting;
