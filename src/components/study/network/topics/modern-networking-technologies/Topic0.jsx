// Topic0.jsx
// Prototype: function Topic0(): JSX.Element
// Return type: JSX.Element
// Purpose: Provides a comprehensive, interactive lesson on Cloud Networking Basics (VPC, subnets, routing, security groups, NAT).
// When & why used: Foundational component for cloud networking module. Explains how virtual networks work in AWS/Azure/GCP.
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic0_files/topic0_questions';

// Inline keyframes (zero config, motion-safe)
const keyframes = `
  @keyframes fadeSlideUp {
    0% {
      opacity: 0;
      transform: translateY(24px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes flowLine {
    0% { stroke-dashoffset: 24; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes gentlePacket {
    0% { opacity: 0.2; transform: translateX(0); }
    50% { opacity: 1; transform: translateX(10px); }
    100% { opacity: 0.2; transform: translateX(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-fadeSlideUp, .animate-flowLine, .animate-gentlePacket {
      animation: none !important;
      opacity: 1;
      transform: none;
    }
  }
`;

const Topic0 = () => {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <section className="space-y-4 text-center animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Cloud Networking Basics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Virtual Private Clouds, Subnets, Routing, and Security — the foundation of any cloud infrastructure.
          </p>
          <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full"></div>
        </section>

        {/* Core concept */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-100" style={{animationDelay: '100ms'}}>
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-sky-300">
              <span>☁️</span> What is Cloud Networking?
            </h2>
            <p className="mt-3 leading-relaxed text-gray-200">
              In traditional data centers, you buy physical routers, switches, and firewalls. In the cloud, everything is <strong className="text-sky-300">virtualized</strong> and <strong className="text-sky-300">software-defined</strong>.  
              A <strong className="text-green-300">Virtual Private Cloud (VPC)</strong> is your isolated slice of the cloud provider’s network. Inside a VPC you define:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-200">
              <li><strong>Subnets</strong> – IP address ranges (e.g., 10.0.1.0/24) – can be <em>public</em> (accessible from internet) or <em>private</em>.</li>
              <li><strong>Route tables</strong> – rules that direct traffic between subnets and to the internet.</li>
              <li><strong>Internet Gateway (IGW)</strong> – door to the public internet.</li>
              <li><strong>NAT Gateway</strong> – allows private instances to reach the internet (e.g., download patches) while blocking inbound connections.</li>
              <li><strong>Security Groups & NACLs</strong> – virtual firewalls at instance and subnet level.</li>
            </ul>
            <p className="mt-3 text-gray-300 italic rounded-md bg-gray-800/40 p-3">
              🏫 <strong>Analogy:</strong> Think of a school campus (VPC). Different buildings (subnets) – library (private), main office (public). Security guards (security groups) at each door. A receptionist (NAT) lets students call outside but hides their direct numbers.
            </p>
          </div>
        </section>

        {/* SVG: VPC, subnets, IGW, NAT, routing */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-200" style={{animationDelay: '200ms'}}>
          <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700 transition-all duration-300 hover:border-indigo-500/40">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">🏗️ Cloud Network Architecture (VPC)</h2>
            <div className="flex justify-center">
              <svg viewBox="0 0 900 500" className="w-full max-w-4xl h-auto bg-gray-900 rounded-xl p-2 shadow-inner">
                {/* VPC boundary */}
                <rect x="50" y="60" width="800" height="380" rx="20" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="10 6">
                  <animate attributeName="stroke-dashoffset" from="16" to="0" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="450" y="40" textAnchor="middle" fill="#7dd3fc" fontSize="18" fontWeight="bold">Virtual Private Cloud (VPC) 10.0.0.0/16</text>

                {/* Public Subnet */}
                <rect x="100" y="100" width="300" height="140" rx="12" fill="#1e293b" stroke="#facc15" strokeWidth="2" />
                <text x="250" y="130" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">Public Subnet (10.0.1.0/24)</text>
                <text x="250" y="155" textAnchor="middle" fill="#94a3b8" fontSize="11">Web Servers, Load Balancers</text>
                <circle cx="160" cy="190" r="18" fill="#3b82f6" />
                <text x="160" y="195" textAnchor="middle" fill="white" fontSize="10">VM</text>
                <circle cx="260" cy="190" r="18" fill="#3b82f6" />
                <text x="260" y="195" textAnchor="middle" fill="white" fontSize="10">VM</text>

                {/* Private Subnet */}
                <rect x="500" y="100" width="300" height="140" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="650" y="130" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontWeight="bold">Private Subnet (10.0.2.0/24)</text>
                <text x="650" y="155" textAnchor="middle" fill="#94a3b8" fontSize="11">Databases, Internal Apps</text>
                <circle cx="590" cy="190" r="18" fill="#8b5cf6" />
                <text x="590" y="195" textAnchor="middle" fill="white" fontSize="10">DB</text>
                <circle cx="710" cy="190" r="18" fill="#8b5cf6" />
                <text x="710" y="195" textAnchor="middle" fill="white" fontSize="10">DB</text>

                {/* Route table arrows */}
                <path d="M250 240 L250 300 L650 300 L650 240" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
                </path>
                <text x="450" y="290" textAnchor="middle" fill="#d8b4fe" fontSize="11">Route Table (Routes between subnets)</text>

                {/* Internet Gateway */}
                <rect x="350" y="340" width="200" height="50" rx="8" fill="#111827" stroke="#f97316" strokeWidth="2" />
                <text x="450" y="370" textAnchor="middle" fill="#fdba74" fontSize="12" fontWeight="bold">Internet Gateway (IGW)</text>

                {/* Public subnet to IGW */}
                <line x1="250" y1="240" x2="350" y2="365" stroke="#facc15" strokeWidth="2">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.8s" repeatCount="indefinite" />
                </line>
                <text x="270" y="300" fill="#facc15" fontSize="10">0.0.0.0/0 → IGW</text>

                {/* NAT Gateway */}
                <rect x="530" y="340" width="180" height="50" rx="8" fill="#111827" stroke="#a855f7" strokeWidth="2" />
                <text x="620" y="370" textAnchor="middle" fill="#e9d5ff" fontSize="12">NAT Gateway</text>
                
                {/* Private subnet to NAT */}
                <line x1="650" y1="240" x2="620" y2="340" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite" />
                </line>
                <text x="660" y="290" fill="#6ee7b7" fontSize="10">Private → NAT → Internet</text>

                {/* Animated packet from public to internet */}
                <circle cx="280" cy="365" r="6" fill="#facc15">
                  <animate attributeName="cx" values="280;350;400;450" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.5;1;0" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="430" y="425" textAnchor="middle" fill="#94a3b8" fontSize="10">Outbound traffic flow</text>
              </svg>
            </div>
            <p className="text-center text-gray-400 text-sm mt-3">🔁 <strong>Interactive SVG:</strong> Dashed VPC border animates, route arrows move, a packet travels from public subnet through IGW to internet.</p>
          </div>
        </section>

        {/* Real-world + Benefits */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-300" style={{animationDelay: '300ms'}}>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-emerald-600/40 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-emerald-300">🌍 Where is this used?</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>E‑commerce websites</strong> (Amazon, Flipkart) – Public subnets for web, private for databases.</li>
              <li><strong>Kolkata’s smart city project</strong> – VPCs for different departments (traffic, utilities).</li>
              <li><strong>Barrackpore school portal</strong> – Hosted in AWS VPC with NAT for secure updates.</li>
              <li><strong>Multi‑tier applications</strong> (web, app, db) – each tier in separate subnet.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-sky-600/40 hover:border-sky-400 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-sky-300">✅ Key Benefits</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Isolation</strong> – Your VPC is logically isolated from other customers.</li>
              <li><strong>Scalability</strong> – Add subnets without buying hardware.</li>
              <li><strong>Security</strong> – Security groups, NACLs, and private subnets.</li>
              <li><strong>Hybrid connectivity</strong> – VPN or Direct Connect to on‑prem networks.</li>
              <li><strong>Cost efficient</strong> – Pay only for what you use (NAT gateway hours, data transfer).</li>
            </ul>
          </div>
        </section>

        {/* Pro Tips & Common Mistakes */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-400" style={{animationDelay: '400ms'}}>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-yellow-600/40 hover:border-yellow-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-300">💡 Pro Tips & Tricks</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Use multiple AZs</strong> – Create subnets in different availability zones for high availability.</li>
              <li><strong>Reserve IP space</strong> – Plan VPC CIDR carefully to avoid overlaps with on‑prem networks.</li>
              <li><strong>VPC Flow Logs</strong> – Debug connectivity issues by analyzing rejected traffic.</li>
              <li><strong>NAT Gateway vs Instance</strong> – Managed NAT Gateway is simpler but costlier; NAT instance gives more control.</li>
              <li><strong>Tag everything</strong> – Name your subnets, route tables, and gateways.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-red-600/40 hover:border-red-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-red-300">⚠️ Common Mistakes (Beginners)</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Too small CIDR</strong> – Using /24 for VPC leaves no room for expansion.</li>
              <li><strong>Public subnets for databases</strong> – huge security risk.</li>
              <li><strong>Forgetting route table association</strong> – Subnet won’t have internet access.</li>
              <li><strong>Leaving IGW unattached</strong> – No internet even with public IPs.</li>
              <li><strong>Overly permissive security groups</strong> – 0.0.0.0/0 to all ports invites attacks.</li>
              <li><strong>Not checking NACL ephemeral ports</strong> – Return traffic blocked (ephemeral port range).</li>
            </ul>
          </div>
        </section>

        {/* Best Practices + Mini Checklist */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-500" style={{animationDelay: '500ms'}}>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-blue-600/30">
            <h3 className="text-xl font-semibold text-blue-200">✅ Best Practices</h3>
            <ul className="mt-2 space-y-1.5 text-gray-200 list-decimal pl-5">
              <li>Use at least a /16 VPC CIDR (e.g., 10.0.0.0/16).</li>
              <li>Separate environments (dev, staging, prod) into different VPCs.</li>
              <li>Enable VPC Flow Logs and send to CloudWatch / S3.</li>
              <li>Implement least privilege security groups – deny by default.</li>
              <li>Automate VPC creation with Infrastructure as Code (Terraform, CloudFormation).</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-green-600/30">
            <h3 className="text-xl font-semibold text-green-200">📋 Mini Checklist</h3>
            <ul className="mt-2 space-y-1.5 text-gray-200 list-check">
              <li>✔️ Can define VPC, subnet, IGW, route table, NAT.</li>
              <li>✔️ Understand difference between public & private subnet.</li>
              <li>✔️ Know how security groups work (stateful).</li>
              <li>✔️ Able to explain a three‑tier architecture using VPC.</li>
              <li>✔️ Avoid common CIDR overlap and route table pitfalls.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <div className="bg-gray-800/60 border-l-4 border-sky-400 p-5 rounded-r-xl animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-600" style={{animationDelay: '600ms'}}>
          <p className="text-sky-200 italic">💭 <strong>Think about:</strong> “If a web server in a public subnet needs to call an API that is hosted on a private database server, what route table entries and security group rules are necessary?”</p>
          <p className="text-gray-300 text-sm mt-2">Observe carefully: The web server needs a route to the private subnet (target: local) and a security group allowing MySQL or HTTP from the web server’s SG.</p>
        </div>

        {/* FAQs - 30 questions */}
        <FAQTemplate
          title="Cloud Networking Basics – FAQ"
          questions={questions}
        />

        {/* Teacher's Note */}
        <Teacher note={
          "Cloud networking is the most critical skill for any cloud practitioner. Emphasize that a VPC is not a physical device; it’s a logical construct. Use the school campus analogy repeatedly. Have students draw their own VPC diagrams on paper before touching the cloud console. Common lab mistake: they forget to add IGW + route table, leading to 'no internet' – that’s a perfect debugging opportunity."
        } />

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          © Cloud Networking Basics — Foundation for AWS, Azure, GCP | Production‑ready learning
        </div>
      </div>
    </main>
  );
};

export default Topic0;