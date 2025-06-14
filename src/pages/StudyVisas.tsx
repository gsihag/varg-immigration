
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users2, Award } from 'lucide-react';

const StudyVisas = () => {
  const studyVisaTypes = [
    {
      icon: <GraduationCap className="w-8 h-8 text-indigo-600" />,
      title: "Student Visa (500)",
      description: "For international students studying full-time courses in Australia",
      features: ["Work 48 hours per fortnight", "Health cover included", "Family can accompany"]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      title: "Training Visa (407)",
      description: "For workplace-based training to enhance skills in your field",
      features: ["Up to 2 years duration", "Structured training program", "Professional development"]
    },
    {
      icon: <Users2 className="w-8 h-8 text-orange-600" />,
      title: "Guardian Visa (590)",
      description: "For parents/guardians of international students under 18",
      features: ["Care for student welfare", "No work rights", "Study limited hours"]
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Graduate Visa (485)",
      description: "For recent graduates to gain work experience after studies",
      features: ["Post-study work rights", "18 months to 4 years", "Pathway to PR"]
    }
  ];

  const educationLevels = [
    { level: "English Language", duration: "3-52 weeks", description: "ELICOS courses" },
    { level: "Vocational Education", duration: "6 months - 2 years", description: "TAFE, Diploma, Certificate" },
    { level: "Higher Education", duration: "3-4 years", description: "Bachelor's Degree" },
    { level: "Postgraduate", duration: "1-3 years", description: "Masters, PhD" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study Visas for Australia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your future with world-class education in Australia. From English courses 
            to PhD programs, we'll help you navigate the student visa process.
          </p>
        </div>

        {/* Visa Types Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {studyVisaTypes.map((visa, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  {visa.icon}
                  <CardTitle className="text-xl">{visa.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  {visa.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {visa.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Education Levels */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Study Options in Australia</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationLevels.map((edu, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{edu.level}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-2">{edu.duration}</p>
                <p className="text-xs text-gray-600">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Student Visa Requirements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">English Proficiency</h3>
              <p className="text-sm opacity-90">IELTS, TOEFL, PTE Academic scores required</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Financial Capacity</h3>
              <p className="text-sm opacity-90">Proof of funds for tuition and living costs</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Health Insurance</h3>
              <p className="text-sm opacity-90">Overseas Student Health Cover (OSHC)</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Study in Australia?
          </h2>
          <p className="text-gray-600 mb-6">
            Let our education consultants help you choose the right course and institution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Find Courses
            </Button>
            <Button size="lg" variant="outline">
              Free Consultation
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudyVisas;
