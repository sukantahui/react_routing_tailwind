import React, { useState } from 'react';
import { 
  Globe, FileText, CreditCard, ShieldCheck, Train, Truck, Vote, Building2, 
  ExternalLink, CheckCircle2, ArrowRight, HelpCircle, Search, Sparkles, 
  Smartphone, BookOpen, Layers, AlertTriangle, Play, RefreshCw 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const portalsData = [
  {
    id: 'passport',
    name: 'Passport Seva',
    url: 'passportindia.gov.in',
    ministry: 'Ministry of External Affairs (MEA)',
    icon: ShieldCheck,
    color: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    tagline: 'Passports & Consular Services for Indian Citizens',
    description: 'Provides end-to-end electronic delivery of passport services, appointment booking at Passport Seva Kendras (PSK/POPSK), document verification tracking, and police clearance certificates (PCC).',
    keyServices: [
      'Fresh / Re-issue Passport Application',
      'Tatkaal Passport Processing',
      'Appointment Slot Booking at PSK / POPSK',
      'Real-time Application Status Tracking',
      'Police Clearance Certificate (PCC)'
    ],
    citizenScenario: {
      action: 'Apply for Fresh Passport',
      steps: [
        'Register on passportindia.gov.in & create User ID',
        'Fill online Form (ARN generated)',
        'Pay fee online & schedule PSK appointment',
        'Visit PSK with original documents for biometric capture',
        'Police verification & Speed Post delivery'
      ],
      estimatedTime: '7 - 15 working days (Normal) / 1-3 days (Tatkaal)'
    }
  },
  {
    id: 'digilocker',
    name: 'DigiLocker',
    url: 'digilocker.gov.in',
    ministry: 'Ministry of Electronics & IT (MeitY) - Digital India',
    icon: FileText,
    color: 'from-emerald-600 to-teal-700',
    badgeColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
    tagline: 'Document Wallet in the Cloud (Rule 9A of IT Rules)',
    description: 'A key initiative under Digital India providing citizens with a secure cloud-based document repository. Issued digital documents are legally valid and equivalent to original paper documents under IT Act 2000.',
    keyServices: [
      'CBSE Class X & XII Digital Marksheets & Migration Certificates',
      'Aadhaar Card, Driving License, & RC Books',
      'COVID-19 Vaccination & Health Records',
      '1 GB secure free personal cloud storage for self-uploaded files',
      'Direct API verification for employers, colleges & traffic police'
    ],
    citizenScenario: {
      action: 'Fetch Class XII CBSE Marksheet',
      steps: [
        'Log in with Mobile OTP or Aadhaar',
        'Search Issuer: Central Board of Secondary Education (CBSE)',
        'Enter Roll Number, Year & School Code',
        'Directly fetch cryptographically signed PDF',
        'Share verified document link with university admissions'
      ],
      estimatedTime: 'Instant (Under 60 seconds)'
    }
  },
  {
    id: 'parivahan',
    name: 'Parivahan Sewa (Sarathi & Vahan)',
    url: 'parivahan.gov.in',
    ministry: 'Ministry of Road Transport & Highways (MoRTH)',
    icon: Truck,
    color: 'from-amber-600 to-orange-700',
    badgeColor: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
    tagline: 'Driving License (Sarathi) & Vehicle Registration (Vahan)',
    description: 'National centralized portal connecting 1400+ RTOs across all states. Powered by Sarathi (for driving licenses and learner tests) and Vahan (for vehicle registration, RC status, and road tax payment).',
    keyServices: [
      'Learner License (LL) Online Test & Application',
      'Permanent Driving License (DL) Booking & Renewal',
      'Vehicle Registration Certificate (RC) Status & Transfer',
      'Online Commercial Vehicle Permits & Road Tax Payment',
      'Challan Tracking and Online Fine Settlement'
    ],
    citizenScenario: {
      action: 'Apply for Learner License from Home',
      steps: [
        'Visit sarathi.parivahan.gov.in and select State',
        'Fill Application with Aadhaar e-KYC',
        'Take online Road Signs & Traffic Rules Tutorial',
        'Appear for online Computerized LL Exam via webcam',
        'Instantly download Learner License upon passing'
      ],
      estimatedTime: '15 minutes'
    }
  },
  {
    id: 'nvsp',
    name: 'Voters Service Portal (NVSP / ECI)',
    url: 'voters.eci.gov.in',
    ministry: 'Election Commission of India (ECI)',
    icon: Vote,
    color: 'from-purple-600 to-violet-700',
    badgeColor: 'bg-purple-900/40 text-purple-300 border-purple-700/50',
    tagline: 'Electoral Services & EPIC Voter ID Card Management',
    description: 'Central single-window platform for all election-related citizen services in India. Allows citizens to enroll as new voters, update addresses, download e-EPIC digital voter cards, and find polling stations.',
    keyServices: [
      'Form 6: New Voter Registration (Upon turning 18)',
      'Form 8: Correction of Entries & Address Shifting',
      'Download e-EPIC (Digital Voter Identity Card)',
      'Electoral Roll Search by Name or EPIC Number',
      'Know your Polling Station & Booth Level Officer (BLO)'
    ],
    citizenScenario: {
      action: 'Search Name in Electoral Roll',
      steps: [
        'Open voters.eci.gov.in and click Electoral Search',
        'Search by EPIC number or Name + State + District',
        'View Assembly Constituency, Polling Booth number & serial number',
        'Download voter slip for polling day verification'
      ],
      estimatedTime: 'Instant (Under 30 seconds)'
    }
  },
  {
    id: 'irctc',
    name: 'IRCTC Railway Ticketing',
    url: 'irctc.co.in',
    ministry: 'Ministry of Railways (Indian Railways / CRIS)',
    icon: Train,
    color: 'from-red-600 to-rose-700',
    badgeColor: 'bg-red-900/40 text-red-300 border-red-700/50',
    tagline: 'Next Generation e-Ticketing System (NGeT)',
    description: 'One of the world largest e-commerce transaction portals handling over 1.5 million ticket bookings daily. Fully digitized reservation, PNR status tracking, catering, and tourism services.',
    keyServices: [
      'Reserved Train Ticket Booking (General & Tatkaal)',
      'Live PNR Status & Seat Availability Enquiry',
      'Automated Refund Processing upon cancellation',
      'E-Catering food order delivered right to train berth',
      'Tourist Trains & Air Ticket Booking'
    ],
    citizenScenario: {
      action: 'Book Train Berth & Check PNR',
      steps: [
        'Search trains between Source and Destination',
        'Select Class (1A, 2A, 3A, SL) and Quota (GN/TQ)',
        'Add passenger details & make UPI/NetBanking payment',
        'Receive 10-digit PNR with coach & berth assignment via SMS/email'
      ],
      estimatedTime: '1 - 2 minutes'
    }
  },
  {
    id: 'property-tax',
    name: 'Municipal Property Tax Portals',
    url: 'State/City Municipal Portals (e.g. kmcgov.in, mcdonline.nic.in)',
    ministry: 'State Urban Development & Local Municipal Corporations',
    icon: Building2,
    color: 'from-cyan-600 to-blue-700',
    badgeColor: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/50',
    tagline: 'Urban Local Body (ULB) Citizen Tax & Assessment Services',
    description: 'State and city-level e-governance portals allowing property owners to compute property valuation, view outstanding dues, pay annual property taxes online, and generate digital tax receipts.',
    keyServices: [
      'Online Property Tax Assessment & Calculation',
      'Payment of Annual Municipal Taxes via Payment Gateway',
      'Download Digitally Signed Property Tax Receipts',
      'Mutation & Ownership Transfer Requests',
      'Application for Trade Licenses and Water Sewerage bills'
    ],
    citizenScenario: {
      action: 'Pay Annual Property Tax',
      steps: [
        'Enter Property Assessment Number (Assessee No. / Property ID)',
        'View computed annual valuation & rebate discounts',
        'Pay securely through online gateway',
        'Instant generation of official tax receipt with QR code'
      ],
      estimatedTime: '3 minutes'
    }
  }
];

const CivicPortalExplorer = () => {
  const [selectedPortal, setSelectedPortal] = useState(portalsData[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPortals = portalsData.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.keyServices.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Icon = selectedPortal.icon;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Globe size={20} />
          <span>Interactive Civic Portal & Workflow Explorer</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input 
            type="text"
            placeholder="Search portal by name, keyword or civic service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Portal Pills */}
        <div className="flex flex-wrap gap-2">
          {filteredPortals.map(portal => {
            const PIcon = portal.icon;
            const isSelected = selectedPortal.id === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setSelectedPortal(portal)}
                className={"px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all " + (
                  isSelected 
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105" 
                    : "bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800"
                )}
              >
                <PIcon size={14} />
                <span>{portal.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Portal Details & Workflow Simulation */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-start gap-3">
              <div className={"p-3 rounded-xl bg-gradient-to-br " + selectedPortal.color + " text-white shadow-lg"}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{selectedPortal.name}</h3>
                <span className="text-xs font-mono text-sky-400 flex items-center gap-1 mt-0.5">
                  <ExternalLink size={12} /> {selectedPortal.url}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block mb-0.5 font-mono uppercase">Governing Authority</span>
              <span className="text-xs font-semibold text-slate-200 bg-slate-900 px-3 py-1 rounded-md border border-slate-800 inline-block">
                {selectedPortal.ministry}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedPortal.description}
          </p>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-mono">
              Key Public Services Handled
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedPortal.keyServices.map((service, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Simulation */}
          <div className="bg-slate-900/90 border border-sky-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5 uppercase tracking-wide">
                <Smartphone size={14} /> Citizen Action Flow: {selectedPortal.citizenScenario.action}
              </span>
              <span className="text-[11px] text-emerald-300 font-mono bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/60">
                Avg TAT: {selectedPortal.citizenScenario.estimatedTime}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              {selectedPortal.citizenScenario.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic5() {
  const [activeTab, setActiveTab] = useState('concept');

  const tabs = [
    { id: 'concept', label: 'Civic Portals & Workflows', icon: Globe },
    { id: 'matrix', label: 'CBSE Comparison Matrix', icon: Layers },
    { id: 'pitfalls', label: 'Exam Tips & Pitfalls', icon: AlertTriangle },
    { id: 'faqs', label: 'Questions & Answers', icon: HelpCircle },
    { id: 'notes', label: 'Revision Notes', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Globe size={14} />
            <span>CBSE Class XII IT (Subject Code 802) • Unit 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Popular E-Governance Portals: Property Tax, Passport Seva, DigiLocker, Parivahan, NVSP & IRCTC
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Master the core public electronic service portals of India. Understand their nodal ministries, URLs, citizen services, and the step-by-step digital workflows replacing manual office queues.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                )}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1 */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <CivicPortalExplorer />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Remember these specific portal URLs for 1-mark CBSE questions: Passport (passportindia.gov.in), Driving License / RC (parivahan.gov.in), Voters (voters.eci.gov.in), Cloud Documents (digilocker.gov.in), and Train Tickets (irctc.co.in). Under IT Act 2000 Rule 9A, digital certificates issued via DigiLocker are treated at par with original physical certificates."
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs sm:text-sm overflow-x-auto">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> High-Yield CBSE Portals Summary Matrix
              </h3>
              <table className="w-full text-left text-xs text-slate-300 min-w-[600px]">
                <thead className="bg-slate-900 text-slate-200 uppercase font-mono tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Portal Name</th>
                    <th className="p-3">Official URL</th>
                    <th className="p-3">Governing Body</th>
                    <th className="p-3">Primary Civic Services</th>
                    <th className="p-3">Key Citizen Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">Passport Seva</td>
                    <td className="p-3 font-mono text-sky-400">passportindia.gov.in</td>
                    <td className="p-3">Ministry of External Affairs</td>
                    <td className="p-3">Passport apply, PSK slot booking, PCC</td>
                    <td className="p-3 text-emerald-400">Eliminated physical queues; transparent tracking</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">DigiLocker</td>
                    <td className="p-3 font-mono text-sky-400">digilocker.gov.in</td>
                    <td className="p-3">MeitY (Digital India)</td>
                    <td className="p-3">CBSE Marksheets, DL, Aadhaar, RC</td>
                    <td className="p-3 text-emerald-400">100% paperless; legally valid under IT Act</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">Parivahan (Sarathi/Vahan)</td>
                    <td className="p-3 font-mono text-sky-400">parivahan.gov.in</td>
                    <td className="p-3">Ministry of Road Transport (MoRTH)</td>
                    <td className="p-3">Learner / Driving License, RC, e-Challan</td>
                    <td className="p-3 text-emerald-400">Contactless online LL exam via Aadhaar e-KYC</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">Voters Portal (NVSP)</td>
                    <td className="p-3 font-mono text-sky-400">voters.eci.gov.in</td>
                    <td className="p-3">Election Commission of India</td>
                    <td className="p-3">Form 6 new voter, e-EPIC download</td>
                    <td className="p-3 text-emerald-400">Instant digital voter card & booth search</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">IRCTC</td>
                    <td className="p-3 font-mono text-sky-400">irctc.co.in</td>
                    <td className="p-3">Indian Railways / CRIS</td>
                    <td className="p-3">Train e-ticketing, PNR status, catering</td>
                    <td className="p-3 text-emerald-400">Real-time availability, instant online refunds</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">Property Tax Portals</td>
                    <td className="p-3 font-mono text-sky-400">Municipal Portals</td>
                    <td className="p-3">Local Municipal Corporations</td>
                    <td className="p-3">Property tax calculation, digital receipts</td>
                    <td className="p-3 text-emerald-400">Instant rebate calculation & digital receipts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p>• <strong>Sarathi vs Vahan:</strong> Parivahan consists of two key subsystems: <em>Sarathi</em> handles Driving Licenses (LL/DL), while <em>Vahan</em> handles Vehicle Registration (RC/Vehicle permits). Do not mix them up in 1-mark questions!</p>
                <p>• <strong>National Portal vs Specialized Portals:</strong> <em>india.gov.in</em> is the universal metadata directory, while <em>passportindia.gov.in</em> and <em>irctc.co.in</em> are specialized transactional service portals.</p>
                <p>• <strong>Legal Validity of DigiLocker:</strong> Always mention <em>Rule 9A of IT Rules 2016</em> when asked about the legal validity of DigiLocker documents.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 5 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic5_Popular_EGovernance_Portals_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
