
import React, { useState, useContext, createContext, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown } from 'lucide-react';

// Define TypeScript interfaces
interface Language {
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  languages: Record<string, Language>;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages: Record<string, Language> = {
    en: { name: 'English', flag: '🇺🇸' },
    hi: { name: 'हिंदी', flag: '🇮🇳' },
    zh: { name: '中文', flag: '🇨🇳' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
    ur: { name: 'اردو', flag: '🇵🇰' }
  };

  const translations: Record<string, Record<string, string>> = {
    en: {
      chatWithRitu: 'Chat with Ritu',
      visaAssessment: 'Visa Assessment',
      documents: 'Documents',
      pointsCalculator: 'Points Calculator',
      timeline: 'Timeline',
      settlement: 'Settlement',
      greeting: 'Hello! I\'m Ritu, your AI immigration assistant. How can I help you with your Australian migration journey today?',
      askQuestion: 'Ask a question...',
      send: 'Send',
      loading: 'Loading...',
      error: 'Error occurred',
      welcome: 'Welcome to VARG Immigration'
    },
    hi: {
      chatWithRitu: 'रितु से बात करें',
      visaAssessment: 'वीज़ा मूल्यांकन',
      documents: 'दस्तावेज़',
      pointsCalculator: 'अंक कैलकुलेटर',
      timeline: 'समयसीमा',
      settlement: 'बसावट',
      greeting: 'नमस्ते! मैं रितु हूं, आपकी AI इमिग्रेशन सहायक। आज मैं आपकी ऑस्ट्रेलियाई प्रवासन यात्रा में कैसे मदद कर सकती हूं?',
      askQuestion: 'एक प्रश्न पूछें...',
      send: 'भेजें',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि हुई',
      welcome: 'VARG इमिग्रेशन में आपका स्वागत है'
    },
    zh: {
      chatWithRitu: '与Ritu聊天',
      visaAssessment: '签证评估',
      documents: '文件',
      pointsCalculator: '积分计算器',
      timeline: '时间线',
      settlement: '定居',
      greeting: '您好！我是Ritu，您的AI移民助手。今天我如何帮助您的澳大利亚移民之旅？',
      askQuestion: '提问...',
      send: '发送',
      loading: '加载中...',
      error: '发生错误',
      welcome: '欢迎来到VARG移民'
    },
    ar: {
      chatWithRitu: 'تحدث مع ريتو',
      visaAssessment: 'تقييم التأشيرة',
      documents: 'الوثائق',
      pointsCalculator: 'حاسبة النقاط',
      timeline: 'الجدول الزمني',
      settlement: 'الاستقرار',
      greeting: 'مرحباً! أنا ريتو، مساعدك الذكي للهجرة. كيف يمكنني مساعدتك في رحلة الهجرة إلى أستراليا اليوم؟',
      askQuestion: 'اسأل سؤالاً...',
      send: 'إرسال',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      welcome: 'مرحباً بك في VARG للهجرة'
    },
    es: {
      chatWithRitu: 'Chatear con Ritu',
      visaAssessment: 'Evaluación de Visa',
      documents: 'Documentos',
      pointsCalculator: 'Calculadora de Puntos',
      timeline: 'Cronograma',
      settlement: 'Asentamiento',
      greeting: '¡Hola! Soy Ritu, tu asistente de inmigración AI. ¿Cómo puedo ayudarte con tu viaje de migración a Australia hoy?',
      askQuestion: 'Haz una pregunta...',
      send: 'Enviar',
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      welcome: 'Bienvenido a VARG Inmigración'
    },
    fr: {
      chatWithRitu: 'Chatter avec Ritu',
      visaAssessment: 'Évaluation de Visa',
      documents: 'Documents',
      pointsCalculator: 'Calculateur de Points',
      timeline: 'Chronologie',
      settlement: 'Installation',
      greeting: 'Bonjour! Je suis Ritu, votre assistant d\'immigration IA. Comment puis-je vous aider avec votre voyage de migration vers l\'Australie aujourd\'hui?',
      askQuestion: 'Posez une question...',
      send: 'Envoyer',
      loading: 'Chargement...',
      error: 'Erreur survenue',
      welcome: 'Bienvenue chez VARG Immigration'
    },
    vi: {
      chatWithRitu: 'Trò chuyện với Ritu',
      visaAssessment: 'Đánh giá Visa',
      documents: 'Tài liệu',
      pointsCalculator: 'Máy tính Điểm',
      timeline: 'Lịch trình',
      settlement: 'Định cư',
      greeting: 'Xin chào! Tôi là Ritu, trợ lý nhập cư AI của bạn. Hôm nay tôi có thể giúp gì cho hành trình di cư đến Úc của bạn?',
      askQuestion: 'Đặt câu hỏi...',
      send: 'Gửi',
      loading: 'Đang tải...',
      error: 'Đã xảy ra lỗi',
      welcome: 'Chào mừng đến với VARG Immigration'
    },
    ur: {
      chatWithRitu: 'ریتو سے بات کریں',
      visaAssessment: 'ویزا تشخیص',
      documents: 'دستاویزات',
      pointsCalculator: 'پوائنٹس کیلکولیٹر',
      timeline: 'ٹائم لائن',
      settlement: 'آباد کاری',
      greeting: 'السلام علیکم! میں ریتو ہوں، آپ کی AI امیگریشن اسسٹنٹ۔ آج میں آپ کے آسٹریلیا کے منتقلی کے سفر میں کیسے مدد کر سکتی ہوں؟',
      askQuestion: 'سوال پوچھیں...',
      send: 'بھیجیں',
      loading: 'لوڈ ہو رہا ہے...',
      error: 'خرابی ہوئی',
      welcome: 'VARG امیگریشن میں خوش آمدید'
    }
  };

  const t = (key: string): string => translations[currentLanguage]?.[key] || translations.en[key] || key;

  const contextValue: LanguageContextType = {
    currentLanguage,
    setCurrentLanguage,
    languages,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setCurrentLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        <span>{languages[currentLanguage].flag}</span>
        <span className="hidden sm:inline">{languages[currentLanguage].name}</span>
        <ChevronDown className="w-3 h-3" />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border rounded-lg shadow-lg z-50 min-w-[200px]">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => {
                setCurrentLanguage(code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 ${
                currentLanguage === code ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
