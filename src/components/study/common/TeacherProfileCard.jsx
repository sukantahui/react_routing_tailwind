/* eslint-disable react-refresh/only-export-components */
"use client";
import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Linkedin,
  Twitter,
  Globe,
  Github,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";

// Base year for calculating dynamic teaching experience
const TEACHING_BASE_YEAR = 1998;
export const getTeachingExpYears = () => new Date().getFullYear() - TEACHING_BASE_YEAR;

// Helper to format teacher bio dynamically based on base year 1998
export const formatTeacherBio = (bio) => {
  if (!bio) return "";
  const expYears = getTeachingExpYears();
  return bio.replace(/\b(\d{2}\+?)\s*years\b/gi, `${expYears}+ years`);
};

// Default instructor data fallback if not provided via props
export const defaultTeacher = {
  name: "Mr. CNAT",
  designation: "Senior Technology Educator & Corporate Financial Modeling Trainer",
  organization: "Lead Educator, CNAT Academy",
  location: "Barrackpore, West Bengal, India",
  photo: "/teachers/sukantahui.jpg",
  bio: `Over ${getTeachingExpYears()}+ years of practical training expertise in Enterprise Software Development, Financial Accounting, Advanced Excel Analytics, Database Systems, and Automated Business Systems.`,
  social: {
    linkedin: "https://www.linkedin.com/in/sukantahui/",
    twitter: "https://twitter.com/sukantahui",
    website: "https://www.codernaccotax.co.in",
    github: "https://github.com/sukantahui",
    email: "contact@codernaccotax.co.in",
    phone: "+917003756860",
    whatsapp: "+917003756860"
  }
};

/**
 * TeacherProfileCard
 * Modular instructor profile card with stats, bio, and direct query/social channels.
 */
export default function TeacherProfileCard({
  teacher = defaultTeacher,
  className = ""
}) {
  const currentTeacher = {
    ...defaultTeacher,
    ...teacher,
    social: {
      ...defaultTeacher.social,
      ...(teacher?.social || {})
    }
  };

  const expYears = getTeachingExpYears();

  return (
    <section
      className={`mt-14 mb-10 max-w-4xl mx-auto rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-sm relative ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-6">
        {/* Teacher Avatar */}
        <div className="shrink-0 relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-slate-800/80 p-0.5 bg-slate-950 shadow-md">
            <img
              src={currentTeacher.photo || "/teachers/sukantahui.jpg"}
              alt={currentTeacher.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
              }}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
              <CheckCircle2 size={11} />
              <span>Verified Lead</span>
            </span>
          </div>
        </div>

        {/* Teacher Info */}
        <div className="flex-1 text-center md:text-left min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-1.5">
                <span>{currentTeacher.name}</span>
                <ShieldCheck size={16} className="text-sky-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentTeacher.designation}
              </p>
            </div>

            <span className="text-[11px] text-slate-400 font-medium px-2.5 py-0.5 rounded-lg bg-slate-950/60 border border-slate-800/60 self-center sm:self-auto shrink-0">
              {currentTeacher.organization} · {currentTeacher.location}
            </span>
          </div>

          {/* 4 Trust Highlights (Integrated Inline Row) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
            <div className="py-1.5 px-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-center">
              <div className="text-xs font-bold text-sky-400">
                {expYears}+ Years
              </div>
              <div className="text-[10px] text-slate-400">
                Teaching Experience
              </div>
            </div>
            <div className="py-1.5 px-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-center">
              <div className="text-xs font-bold text-emerald-400">6,000+</div>
              <div className="text-[10px] text-slate-400">
                Alumni &amp; Learners
              </div>
            </div>
            <div className="py-1.5 px-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-center">
              <div className="text-xs font-bold text-indigo-300">100%</div>
              <div className="text-[10px] text-slate-400">
                Hands-on Practice
              </div>
            </div>
            <div className="py-1.5 px-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-center">
              <div className="text-xs font-bold text-amber-400">Direct</div>
              <div className="text-[10px] text-slate-400">Doubt Support</div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            {formatTeacherBio(currentTeacher.bio)}
          </p>

          {/* Direct Action Hub & Social Channels */}
          {currentTeacher.social && (
            <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-center md:justify-between gap-2.5">
              {/* Primary Direct Query Action */}
              <div className="flex items-center gap-2">
                {currentTeacher.social.whatsapp && (
                  <a
                    href={`https://wa.me/${currentTeacher.social.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold transition"
                  >
                    <MessageSquare size={13} className="text-white" />
                    <span>WhatsApp Query</span>
                  </a>
                )}

                {currentTeacher.social.email && (
                  <a
                    href={`mailto:${currentTeacher.social.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300 text-xs font-medium hover:text-white transition"
                  >
                    <Mail size={13} className="text-slate-400" />
                    <span>Email</span>
                  </a>
                )}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-1">
                {currentTeacher.social.linkedin && (
                  <a
                    href={currentTeacher.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={14} />
                  </a>
                )}

                {currentTeacher.social.github && (
                  <a
                    href={currentTeacher.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
                    title="GitHub Repository"
                  >
                    <Github size={14} />
                  </a>
                )}

                {currentTeacher.social.website && (
                  <a
                    href={currentTeacher.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
                    title="Official Website"
                  >
                    <Globe size={14} />
                  </a>
                )}

                {currentTeacher.social.twitter && (
                  <a
                    href={currentTeacher.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
                    title="Twitter / X"
                  >
                    <Twitter size={14} />
                  </a>
                )}

                {currentTeacher.social.phone && (
                  <a
                    href={`tel:${currentTeacher.social.phone}`}
                    className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
                    title="Direct Phone"
                  >
                    <Phone size={14} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
