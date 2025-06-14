
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, DollarSign, Briefcase, Home, Car, Heart, 
  GraduationCap, Users, Phone, CreditCard, Building,
  Plane, CheckCircle, Info
} from 'lucide-react';

const SettlementHub = () => {
  const [selectedCity, setSelectedCity] = useState('sydney');

  const cityData = {
    sydney: {
      name: 'Sydney, NSW',
      population: '5.3M',
      costOfLiving: 'High',
      averageRent: '$600-800/week',
      jobMarket: 'Excellent',
      climate: 'Temperate',
      pros: ['Major financial hub', 'Excellent job opportunities', 'Iconic landmarks', 'Great beaches'],
      cons: ['High cost of living', 'Traffic congestion', 'Competitive housing market']
    },
    melbourne: {
      name: 'Melbourne, VIC',
      population: '5.1M',
      costOfLiving: 'High',
      averageRent: '$500-700/week',
      jobMarket: 'Excellent',
      climate: 'Temperate',
      pros: ['Cultural capital', 'Great food scene', 'Excellent public transport', 'Lower rent than Sydney'],
      cons: ['Variable weather', 'High cost of living', 'Competitive job market']
    },
    brisbane: {
      name: 'Brisbane, QLD',
      population: '2.6M',
      costOfLiving: 'Moderate',
      averageRent: '$450-600/week',
      jobMarket: 'Good',
      climate: 'Subtropical',
      pros: ['Affordable living', 'Great weather', 'Growing job market', 'Relaxed lifestyle'],
      cons: ['Limited public transport', 'Hot summers', 'Smaller job market']
    },
    perth: {
      name: 'Perth, WA',
      population: '2.1M',
      costOfLiving: 'Moderate',
      averageRent: '$400-550/week',
      jobMarket: 'Good',
      climate: 'Mediterranean',
      pros: ['Mining opportunities', 'Beautiful beaches', 'Affordable housing', 'Great weather'],
      cons: ['Isolated location', 'Limited flights', 'Smaller job market']
    },
    adelaide: {
      name: 'Adelaide, SA',
      population: '1.4M',
      costOfLiving: 'Low-Moderate',
      averageRent: '$350-500/week',
      jobMarket: 'Moderate',
      climate: 'Mediterranean',
      pros: ['Most affordable capital', 'Great wine regions', 'Easy to navigate', '20-minute city'],
      cons: ['Limited job opportunities', 'Smaller city', 'Less nightlife']
    }
  };

  const essentialServices = [
    {
      category: 'Banking',
      icon: <CreditCard className="w-5 h-5" />,
      items: [
        { name: 'Commonwealth Bank', description: 'Largest bank, good for newcomers', priority: 'High' },
        { name: 'ANZ Bank', description: 'Migrant banking packages', priority: 'High' },
        { name: 'Westpac', description: 'Good online services', priority: 'Medium' },
        { name: 'NAB', description: 'Business banking specialist', priority: 'Medium' }
      ]
    },
    {
      category: 'Mobile & Internet',
      icon: <Phone className="w-5 h-5" />,
      items: [
        { name: 'Telstra', description: 'Best coverage nationwide', priority: 'High' },
        { name: 'Optus', description: 'Good value plans', priority: 'High' },
        { name: 'Vodafone', description: 'Competitive pricing', priority: 'Medium' },
        { name: 'TPG', description: 'Budget internet provider', priority: 'Low' }
      ]
    },
    {
      category: 'Healthcare',
      icon: <Heart className="w-5 h-5" />,
      items: [
        { name: 'Medicare Enrollment', description: 'Universal healthcare system', priority: 'Critical' },
        { name: 'Find a GP', description: 'General practitioner for routine care', priority: 'High' },
        { name: 'Private Health Insurance', description: 'Optional additional coverage', priority: 'Medium' },
        { name: 'Pharmacy Registration', description: 'Find local chemist/pharmacy', priority: 'Medium' }
      ]
    },
    {
      category: 'Transportation',
      icon: <Car className="w-5 h-5" />,
      items: [
        { name: 'Public Transport Card', description: 'Opal (NSW), Myki (VIC), Go Card (QLD)', priority: 'High' },
        { name: 'Driver License', description: 'Convert or obtain Australian license', priority: 'High' },
        { name: 'Car Purchase/Lease', description: 'If needed for work/lifestyle', priority: 'Medium' },
        { name: 'Car Insurance', description: 'Mandatory third party insurance', priority: 'High' }
      ]
    }
  ];

  const jobSearchStrategies = [
    {
      category: 'IT & Technology',
      strategies: [
        'LinkedIn networking and job applications',
        'SEEK and Indeed job portals',
        'Tech-specific sites like AngelList, Stack Overflow Jobs',
        'Attend tech meetups and conferences',
        'Consider contract work initially',
        'Showcase projects on GitHub'
      ],
      avgSalary: '$80,000 - $150,000',
      demand: 'Very High'
    },
    {
      category: 'Healthcare',
      strategies: [
        'Registration with AHPRA (for regulated professions)',
        'Hospital and clinic direct applications',
        'Healthcare recruitment agencies',
        'Professional associations networking',
        'Consider rural/regional opportunities for faster pathways'
      ],
      avgSalary: '$70,000 - $120,000',
      demand: 'High'
    },
    {
      category: 'Engineering',
      strategies: [
        'Engineers Australia networking events',
        'Mining and construction company websites',
        'Engineering recruitment agencies',
        'Government infrastructure projects',
        'Consider FIFO (Fly-in-fly-out) roles'
      ],
      avgSalary: '$85,000 - $140,000',
      demand: 'High'
    },
    {
      category: 'Accounting & Finance',
      strategies: [
        'Big 4 accounting firms (PwC, EY, KPMG, Deloitte)',
        'CPA Australia and CA ANZ events',
        'Financial services recruitment agencies',
        'Government finance roles',
        'Consider tax season temporary work'
      ],
      avgSalary: '$65,000 - $110,000',
      demand: 'Moderate'
    }
  ];

  const selectedCityData = cityData[selectedCity];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Settlement Preparation Hub
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="cities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cities">City Comparison</TabsTrigger>
          <TabsTrigger value="services">Essential Services</TabsTrigger>
          <TabsTrigger value="jobs">Job Search</TabsTrigger>
          <TabsTrigger value="housing">Housing Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="cities" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
            {Object.entries(cityData).map(([key, city]) => (
              <Button
                key={key}
                variant={selectedCity === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCity(key)}
                className="text-xs"
              >
                {city.name.split(',')[0]}
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {selectedCityData.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{selectedCityData.population}</div>
                  <div className="text-sm text-gray-600">Population</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{selectedCityData.costOfLiving}</div>
                  <div className="text-sm text-gray-600">Cost of Living</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{selectedCityData.jobMarket}</div>
                  <div className="text-sm text-gray-600">Job Market</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Advantages</h4>
                  <ul className="space-y-1">
                    {selectedCityData.pros.map((pro, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">Considerations</h4>
                  <ul className="space-y-1">
                    {selectedCityData.cons.map((con, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Info className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Home className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Average Rent</span>
                </div>
                <div className="text-blue-700">{selectedCityData.averageRent} for 2-bedroom apartment</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          {essentialServices.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {service.icon}
                  {service.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {service.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        item.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                        item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          {jobSearchStrategies.map((industry, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{industry.category}</span>
                  <div className="text-right text-sm">
                    <div className="font-normal text-gray-600">Avg Salary: {industry.avgSalary}</div>
                    <div className={`font-medium ${
                      industry.demand === 'Very High' ? 'text-green-600' :
                      industry.demand === 'High' ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      Demand: {industry.demand}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {industry.strategies.map((strategy, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{strategy}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="housing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Housing Search Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Popular Rental Websites</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">Domain.com.au</div>
                      <div className="text-sm text-gray-600">Most comprehensive listings</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">Realestate.com.au</div>
                      <div className="text-sm text-gray-600">Large database, map search</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">Rent.com.au</div>
                      <div className="text-sm text-gray-600">Rental-focused platform</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Rental Tips</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Prepare rental references from previous landlords</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Have bank statements and employment letter ready</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Budget for bond (4-6 weeks rent) + first month</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Consider temporary accommodation first</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Check public transport connectivity</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">Apartments</div>
                  <div className="text-sm text-gray-600">Most common in cities</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <Home className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold">Houses</div>
                  <div className="text-sm text-gray-600">More space, higher cost</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="font-semibold">Share Houses</div>
                  <div className="text-sm text-gray-600">Cost-effective option</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettlementHub;
