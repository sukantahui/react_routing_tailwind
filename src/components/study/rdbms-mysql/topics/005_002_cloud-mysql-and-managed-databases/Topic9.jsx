import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Cost Optimization Strategies for Cloud Databases (Reserved Instances, Storage Autoscaling)
 * Module: 005_002_cloud-mysql-and-managed-databases
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Cost Optimization Strategies for Cloud Databases (Reserved Instances, Storage Autoscaling).
 */
const Topic9 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Cloud Architecture",
      title: "1. Architectural Principles of Cost Optimization Strategies for Cloud Databases (Reserved Instances, Storage Autoscaling)",
      badge: "Cloud Architecture",
      badgeColor: "emerald",
      sqlSnippet: `-- ☁️ CLOUD DATABASE INFRASTRUCTURE PATTERN (TOPIC 9):
-- High Availability, Automated Failover & Security Configuration:
-- Multi-AZ Standby: Synchronous block-level replication to secondary zone
-- Read Replicas: Asynchronous binlog replication for read-heavy offloading
-- Storage Engine: InnoDB with Cloud-optimized volume striping (gp3 / io2)`,
      explanation: "Comprehensive architectural framework for Cost Optimization Strategies for Cloud Databases (Reserved Instances, Storage Autoscaling), detailing enterprise deployment models, cloud automation, and high availability.",
      keyTakeaways: ["Eliminate single points of failure using multi-AZ deployments.","Scale read traffic horizontally using managed read replicas.","Keep database instances entirely within private VPC subnets with zero public ingress."]
    },
    concept2: {
      conceptName: "2. Cloud Operations",
      title: "2. CLI / Terraform Provisioning & Runbook",
      badge: "Infrastructure as Code",
      badgeColor: "cyan",
      sqlSnippet: `# 🚀 TERRAFORM / CLI DEPLOYMENT SNIPPET:
resource "aws_db_instance" "prod_mysql" {
  identifier           = "capstone-mysql-prod"
  allocated_storage    = 100
  max_allocated_storage= 500 # 📈 Storage Autoscaling up to 500GB!
  engine               = "mysql"
  engine_version       = "8.0.35"
  instance_class       = "db.m6g.xlarge"
  multi_az             = true  # 🛡️ Synchronous Multi-AZ HA
  storage_type         = "gp3"
  publicly_accessible  = false # 🔒 Private VPC only
  deletion_protection  = true
}`,
      explanation: "Automates cloud infrastructure provisioning using declarative Infrastructure as Code (IaC) with production-grade reliability parameters.",
      keyTakeaways: ["Use Infrastructure as Code (Terraform/CloudFormation) for repeatable cloud database setups.","Enable storage autoscaling to prevent unexpected disk capacity crashes.","Enforce deletion protection on all production database resources."]
    },
    concept3: {
      conceptName: "3. Scaling & Caching",
      title: "3. High-Throughput Scaling & Optimization",
      badge: "Scaling Strategies",
      badgeColor: "purple",
      sqlSnippet: `-- ⚡ READ/WRITE SPLITTING & REDIS CACHING TOPOLOGY:
-- 1. Primary DB Instance (Read/Write): Handles all INSERT, UPDATE, DELETE, and transactions.
-- 2. Read Replicas (Read-Only): Handles heavy SELECT reporting queries and analytics.
-- 3. In-Memory Redis Cache: Caches hot product catalogs and customer sessions (Sub-1ms reads!).`,
      explanation: "Integrates cloud read replicas with reverse proxies (ProxySQL/MySQL Router) and in-memory caches to handle massive traffic surges.",
      keyTakeaways: ["Route write traffic to the primary and analytical queries to read replicas.","Cache static and slowly-changing data in Redis with explicit TTLs.","Monitor replication lag (Seconds_Behind_Master) to prevent stale reads."]
    },
    concept4: {
      conceptName: "4. Cost Optimization",
      title: "4. Cloud Economics & Cost Reduction",
      badge: "Cost Management",
      badgeColor: "rose",
      sqlSnippet: `-- 💰 CLOUD COST OPTIMIZATION CHECKLIST:
-- 1. Purchase 1-year or 3-year Reserved Instances (RI) for 40-60% savings.
-- 2. Migrate from gp2 to gp3 storage volumes (20% lower cost + 3000 free IOPS).
-- 3. Automatically stop staging and development database instances on weekends.
-- 4. Clean up orphaned manual snapshots older than 90 days.`,
      explanation: "Applies FinOps principles to reduce cloud database expenditure by up to 60% without compromising performance or reliability.",
      keyTakeaways: ["Reserved Instances deliver predictable, long-term operational cost reductions.","gp3 storage provides independent IOPS and throughput tuning at lower cost.","Automate dev/staging environment shutdown schedules during non-business hours."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 005.2: Cloud MySQL
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 9 of 10
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Cost Optimization Strategies for Cloud Databases (Reserved Instances, Storage Autoscaling)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Managing cloud database economics: 1-year/3-year Reserved Instances (RI) vs Savings Plans, gp3 baseline IOPS tuning, storage autoscaling, and idle dev instance shutdown.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Architectural Pillars ───────────────────────── */}
        <section id="pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Four Architectural Pillars
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core foundations of managed cloud database architecture, resilience, and economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">High Availability</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Multi-AZ synchronous replication guaranteeing 99.99% uptime and sub-60s failover.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">VPC Security</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Private subnets, security group ingress, and IAM database authentication.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Elastic Scaling</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Storage autoscaling, compute resizing, and horizontal read replica pools.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">FinOps Rigor</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Reserved Instances and gp3 storage optimization slashing cloud expenditure.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Concept Workbench ───────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Cloud Engineering Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore cloud infrastructure templates, multi-AZ deployment scripts, and scaling topologies.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(conceptsData).map((key) => {
              const concept = conceptsData[key];
              const isSelected = selectedConceptKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedConceptKey(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {concept.conceptName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Cloud Strategy
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentConcept.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentConcept.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentConcept.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentConcept.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentConcept.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentConcept.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentConcept.explanation}
            </p>

            {/* Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Cloud Template &amp; Implementation Runbook:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentConcept.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Key Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentConcept.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Practical cloud database deployments in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata & Susmita – Multi-AZ Resilience in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Barrackpore Cloud
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, Mamata and Susmita deployed their retail platform on AWS RDS with Multi-AZ enabled across ap-south-1a and ap-south-1b. During a sudden availability zone power outage, RDS automatically failed over to the standby instance in 35 seconds, preserving ₹2.5 Crores in active festive shopping transactions with zero data loss.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Abhronila – Serverless PlanetScale in Kolkata Startup
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Kolkata FinTech
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Debangshu and Abhronila adopted PlanetScale's Vitess architecture for their fintech platform. Using database schema branching, they tested complex index migrations in isolated branch environments before applying non-blocking schema updates to production with zero table lock downtime.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Essential cloud guardrails, security configurations, and FinOps guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Assigning Public IP to Cloud Databases
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Provisioning a cloud database instance with Publicly Accessible = True exposes Port 3306 to brute-force internet port scanning attacks.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always host databases in private VPC subnets accessible only through application servers.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Neglecting Multi-AZ in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running single-AZ databases in production causes extended downtime whenever underlying cloud hardware undergoes maintenance.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always enable Multi-AZ for production workloads to guarantee automated failover.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Private VPC Endpoints
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Route database traffic through AWS PrivateLink or GCP Private Services Access without traversing the public internet.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes network security, minimizes latency, and prevents data egress charges.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Leverage Infrastructure as Code
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Manage all cloud database resources, parameter groups, and security groups in Terraform or Pulumi.
              </p>
              <div className="text-xs text-slate-400">
                Ensures reproducible environments and eliminates configuration drift.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 9: Cost Optimization Strategies for Cloud Databases (Reserved Instances, Storage Autoscaling)"
            content={noteText}
          />

          <Teacher
            note="Cloud database engineering is an indispensable skill for modern software architects! When deploying MySQL in AWS, GCP, or Azure, focus on security (Private VPCs), resilience (Multi-AZ failover), scalability (Read Replicas & Redis Caching), and cloud economics (Reserved Instances). Build architectures that are resilient, scalable, and cost-effective!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of cloud database architectures, multi-AZ failovers, and cost optimization.
            </p>
          </div>

          <FAQTemplate
            title="Cost Optimization Strategies for Cloud Databases (Reserved Instances, Storage Autoscaling) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
