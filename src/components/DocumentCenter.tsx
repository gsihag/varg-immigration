
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Upload,
  Clock,
  MapPin,
  Award,
  Users,
  Globe,
  Building
} from 'lucide-react';

interface DocumentItem {
  id: string;
  name: string;
  required: boolean;
  category: string;
  description: string;
  tips: string[];
  countrySpecific?: boolean;
  timeframe: string;
  obtainFrom: string;
}

const DocumentCenter = () => {
  const [selectedVisa, setSelectedVisa] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [completedDocs, setCompletedDocs] = useState<string[]>([]);

  const visaTypes = [
    { value: '189', label: 'Subclass 189 - Skilled Independent' },
    { value: '190', label: 'Subclass 190 - State Nominated' },
    { value: '491', label: 'Subclass 491 - Regional Skilled' },
    { value: '482', label: 'Subclass 482 - TSS Visa' },
    { value: '186', label: 'Subclass 186 - ENS Visa' }
  ];

  const countries = [
    { value: 'india', label: 'India' },
    { value: 'china', label: 'China' },
    { value: 'philippines', label: 'Philippines' },
    { value: 'pakistan', label: 'Pakistan' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'usa', label: 'United States' },
    { value: 'nepal', label: 'Nepal' },
    { value: 'bangladesh', label: 'Bangladesh' }
  ];

  const getDocumentList = (): DocumentItem[] => {
    const baseDocuments: DocumentItem[] = [
      {
        id: 'passport',
        name: 'Valid Passport',
        required: true,
        category: 'Identity',
        description: 'Current passport with at least 6 months validity',
        tips: [
          'Ensure passport has blank pages for visa label',
          'If renewing, keep old passport for travel history'
        ],
        timeframe: '1-2 weeks',
        obtainFrom: 'Passport office in your country'
      },
      {
        id: 'skills-assessment',
        name: 'Skills Assessment',
        required: true,
        category: 'Qualifications',
        description: 'Positive skills assessment from relevant authority',
        tips: [
          'Apply early as processing can take 12-20 weeks',
          'Ensure all qualifications are assessed',
          'Check specific requirements for your occupation'
        ],
        timeframe: '12-20 weeks',
        obtainFrom: selectedOccupation === 'software-engineer' ? 'ACS (Australian Computer Society)' : 'Relevant assessing authority'
      },
      {
        id: 'english-test',
        name: 'English Language Test',
        required: true,
        category: 'Language',
        description: 'IELTS, PTE, or other accepted English test results',
        tips: [
          'Results valid for 3 years from test date',
          'All four components must meet minimum requirements',
          'Consider taking test multiple times for better scores'
        ],
        timeframe: '2-4 weeks for results',
        obtainFrom: 'IELTS/PTE/TOEFL test centers'
      },
      {
        id: 'police-clearance',
        name: 'Police Clearance Certificate',
        required: true,
        category: 'Character',
        description: 'Police clearance from all countries lived in for 12+ months',
        tips: [
          'Required from age 16 onwards',
          'Must be obtained after submitting application',
          'Valid for 12 months from issue date'
        ],
        countrySpecific: true,
        timeframe: selectedCountry === 'india' ? '2-4 weeks' : '1-8 weeks',
        obtainFrom: selectedCountry === 'india' ? 'Regional Passport Office' : 'Local police authority'
      },
      {
        id: 'medical-exam',
        name: 'Health Examination',
        required: true,
        category: 'Health',
        description: 'Medical examination by panel physician',
        tips: [
          'Book after receiving health examination letter',
          'Bring vaccination records',
          'Results uploaded directly to immigration'
        ],
        timeframe: '1-2 weeks for results',
        obtainFrom: 'Panel physicians approved by Australian government'
      }
    ];

    // Add visa-specific documents
    if (selectedVisa === '190' || selectedVisa === '491') {
      baseDocuments.push({
        id: 'state-nomination',
        name: 'State Nomination Certificate',
        required: true,
        category: 'Nomination',
        description: 'State nomination approval certificate',
        tips: [
          'Apply for state nomination before visa application',
          'Meet state-specific requirements',
          'Nomination valid for 6 months'
        ],
        timeframe: '4-12 weeks',
        obtainFrom: 'State/Territory government'
      });
    }

    if (selectedVisa === '482' || selectedVisa === '186') {
      baseDocuments.push({
        id: 'job-offer',
        name: 'Job Offer Letter',
        required: true,
        category: 'Employment',
        description: 'Formal job offer from Australian employer',
        tips: [
          'Must specify position, salary, and start date',
          'Employer must be approved sponsor',
          'Position must match nominated occupation'
        ],
        timeframe: 'Immediate',
        obtainFrom: 'Australian employer'
      });
    }

    return baseDocuments;
  };

  const getCountrySpecificGuidance = (docId: string) => {
    if (docId === 'police-clearance' && selectedCountry) {
      const guidance = {
        india: {
          process: 'Apply online through Passport Seva portal or visit Regional Passport Office',
          documents: ['Passport copy', 'Address proof', 'Identity proof'],
          fees: '₹500 (approx)',
          processing: '15-30 days',
          apostille: 'Required - apply through MEA website'
        },
        china: {
          process: 'Apply through local Public Security Bureau',
          documents: ['Passport', 'Residence permit', 'Application form'],
          fees: 'Varies by province',
          processing: '7-15 days',
          apostille: 'Required - through Chinese Foreign Ministry'
        },
        uk: {
          process: 'Apply online through ACRO Criminal Records Office',
          documents: ['Identity documents', 'Previous addresses'],
          fees: '£45',
          processing: '10 working days',
          apostille: 'Required - through FCO Legalisation Office'
        }
      };

      return guidance[selectedCountry as keyof typeof guidance];
    }
    return null;
  };

  const getCompletionPercentage = () => {
    const totalDocs = getDocumentList().filter(doc => doc.required).length;
    const completedRequired = completedDocs.filter(docId => 
      getDocumentList().find(doc => doc.id === docId)?.required
    ).length;
    return Math.round((completedRequired / totalDocs) * 100);
  };

  const toggleDocumentComplete = (docId: string) => {
    setCompletedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const documentsByCategory = getDocumentList().reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, DocumentItem[]>);

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Identity': Users,
      'Qualifications': Award,
      'Language': Globe,
      'Character': CheckCircle,
      'Health': Building,
      'Nomination': MapPin,
      'Employment': Building
    };
    return icons[category as keyof typeof icons] || FileText;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Document Preparation Center</h2>
          <p className="text-blue-100">Get your personalized document checklist and preparation guidance</p>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Tell us about your application</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Visa Type</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedVisa}
                onChange={(e) => setSelectedVisa(e.target.value)}
              >
                <option value="">Select visa type</option>
                {visaTypes.map(visa => (
                  <option key={visa.value} value={visa.value}>{visa.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country of Origin</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Occupation</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedOccupation}
                onChange={(e) => setSelectedOccupation(e.target.value)}
              >
                <option value="">Select occupation</option>
                <option value="software-engineer">Software Engineer</option>
                <option value="accountant">Accountant</option>
                <option value="nurse">Registered Nurse</option>
                <option value="teacher">Teacher</option>
                <option value="engineer">Engineer</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedVisa && (
        <>
          {/* Progress Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Document Preparation Progress</h3>
                <Badge variant={getCompletionPercentage() === 100 ? "default" : "secondary"}>
                  {getCompletionPercentage()}% Complete
                </Badge>
              </div>
              <Progress value={getCompletionPercentage()} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                {completedDocs.length} of {getDocumentList().filter(doc => doc.required).length} required documents completed
              </p>
            </CardContent>
          </Card>

          {/* Document Categories */}
          <Tabs defaultValue="checklist" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="checklist">Document Checklist</TabsTrigger>
              <TabsTrigger value="guidance">Step-by-Step Guidance</TabsTrigger>
              <TabsTrigger value="templates">Templates & Samples</TabsTrigger>
            </TabsList>

            <TabsContent value="checklist" className="space-y-4">
              {Object.entries(documentsByCategory).map(([category, docs]) => {
                const CategoryIcon = getCategoryIcon(category);
                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CategoryIcon className="w-5 h-5" />
                        {category} Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {docs.map(doc => (
                        <div key={doc.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleDocumentComplete(doc.id)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  completedDocs.includes(doc.id) 
                                    ? 'bg-green-500 border-green-500 text-white' 
                                    : 'border-gray-300 hover:border-blue-500'
                                }`}
                              >
                                {completedDocs.includes(doc.id) && <CheckCircle className="w-4 h-4" />}
                              </button>
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {doc.timeframe}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          <div className="text-sm">
                            <p className="font-medium text-gray-700">Obtain from: {doc.obtainFrom}</p>
                            {doc.tips.length > 0 && (
                              <div className="mt-2">
                                <p className="font-medium text-gray-700">Tips:</p>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                  {doc.tips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {doc.countrySpecific && selectedCountry && getCountrySpecificGuidance(doc.id) && (
                              <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3">
                                <p className="font-medium text-blue-900 mb-2">
                                  Country-specific guidance for {countries.find(c => c.value === selectedCountry)?.label}:
                                </p>
                                {(() => {
                                  const guidance = getCountrySpecificGuidance(doc.id);
                                  return guidance ? (
                                    <div className="text-sm space-y-1">
                                      <p><strong>Process:</strong> {guidance.process}</p>
                                      <p><strong>Documents needed:</strong> {guidance.documents.join(', ')}</p>
                                      <p><strong>Fees:</strong> {guidance.fees}</p>
                                      <p><strong>Processing time:</strong> {guidance.processing}</p>
                                      <p><strong>Apostille:</strong> {guidance.apostille}</p>
                                    </div>
                                  ) : null;
                                })()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="guidance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Document Collection Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <h4 className="font-medium text-yellow-800">Recommended Preparation Order</h4>
                      </div>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
                        <li>Start with Skills Assessment (longest processing time)</li>
                        <li>Take English language test</li>
                        <li>Gather educational documents and get them verified</li>
                        <li>Collect employment references and documents</li>
                        <li>Apply for police clearance (after application submission)</li>
                        <li>Complete health examinations (when requested)</li>
                      </ol>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2">Before Application</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Skills assessment</li>
                          <li>• English test</li>
                          <li>• Educational documents</li>
                          <li>• Work experience evidence</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">After Application</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Police clearance certificates</li>
                          <li>• Health examinations</li>
                          <li>• Additional documents if requested</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Document Templates & Samples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Employment Reference Letter</h4>
                      <p className="text-sm text-gray-600 mb-3">Template for employer reference letters</p>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Statutory Declaration</h4>
                      <p className="text-sm text-gray-600 mb-3">Sample statutory declaration format</p>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Sample
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">CV/Resume Template</h4>
                      <p className="text-sm text-gray-600 mb-3">Australian-style resume template</p>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Document Checklist</h4>
                      <p className="text-sm text-gray-600 mb-3">Printable checklist for your application</p>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Checklist
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Document Quality Tips</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Scan documents in high resolution (300 DPI minimum)</li>
                      <li>• Use PDF format for official documents</li>
                      <li>• Ensure all text is clearly readable</li>
                      <li>• Include certified copies where required</li>
                      <li>• Organize documents by category for easy reference</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default DocumentCenter;
