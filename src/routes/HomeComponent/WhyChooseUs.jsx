// ===============================================
// WhyChooseUs.jsx - Minimal Text Highlights
// ===============================================

import React from "react";
import nandagopalImg from "../../assets/testimonials/nandagopal.png";
import abhirupDasImg from "../../assets/testimonials/abhirupadas.png";

const highlights = [
  { emoji: "🙋‍♂️", title: "1-on-1 Mentorship", desc: "Direct personal guidance & doubt clearing" },
  { emoji: "📅", title: "Flexible Batches", desc: "Weekday & weekend slots" },
  { emoji: "💼", title: "Project Based", desc: "Real-world apps & interview prep" },
  { emoji: "📚", title: "Lifetime Access", desc: "Free notes, repos & class materials" },
];

const featuredReviews = [
  {
    name: "Abhirupa Das",
    role: "Software Engineer",
    image: abhirupDasImg,
    quote: "Strongest foundation of my IT career laid under Sukanta Sir.",
  },
  {
    name: "N. G. Sutradhar",
    role: "Assistant Professor",
    image: nandagopalImg,
    quote: "Concepts that once felt tough became intuitive and clear.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Why Choose Us</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Key Highlights & Reviews</h2>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {highlights.map((item, idx) => (
            <div key={idx} className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1.5">{item.emoji}</div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">{item.title}</h3>
              <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 2 Quick Reviews */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featuredReviews.map((t, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
              <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-sky-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white truncate">{t.name}</span>
                  <span className="text-[10px] text-sky-400">({t.role})</span>
                </div>
                <p className="text-[11px] text-slate-300 italic truncate">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <a
            href="https://www.google.com/search?q=Coder+%26+AccoTax+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
          >
            <span>⭐ Read 100+ Google Reviews</span>
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
