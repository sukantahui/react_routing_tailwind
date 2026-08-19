// ===============================================
// Services.jsx - Modern Dark Glassmorphism Services
// -----------------------------------------------
// Features:
// - Frosted glass cards with ambient glowing pods
// - Service specific color themes & tags
// - Quick WhatsApp inquiry trigger per service
// ===============================================

import React from "react";
import { motion } from "framer-motion";
import services from "../../data/services.json";

const serviceMeta = [
  {
    tag: "Custom Code & Apps",
    color: "from-sky-500 to-blue-600",
    glow: "group-hover:border-sky-500/50 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
  },
  {
    tag: "UI/UX & Web Platforms",
    color: "from-purple-500 to-indigo-600",
    glow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
  },
  {
    tag: "Workstations & Support",
    color: "from-amber-500 to-orange-600",
    glow: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  {
    tag: "ITR & Financial Advisory",
    color: "from-emerald-500 to-teal-600",
    glow: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  },
  {
    tag: "Registration & Returns",
    color: "from-rose-500 to-pink-600",
    glow: "group-hover:border-rose-500/50 group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
  },
];

const Services = () => {
  const whatsappNumber = "919432456083";

  return (
    <section
      id="services"
      className="relative py-24 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/60"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-sky-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <i className="bi bi-tools"></i>
            <span>Professional Solutions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Corporate & Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-400 to-cyan-300">
              Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-slate-400 text-base sm:text-lg"
          >
            Comprehensive technology, software architecture, and financial compliance services tailored for businesses and individuals.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const meta = serviceMeta[index % serviceMeta.length];
            const inquiryMessage = encodeURIComponent(
              `Hi Coder & AccoTax! I would like to inquire about your "${service.title}" service.`
            );

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-7 transition-all duration-300 ${meta.glow} flex flex-col justify-between`}
                itemScope
                itemType="https://schema.org/Service"
              >
                <div>
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white text-2xl shadow-lg shadow-black/30 group-hover:scale-110 transition-transform duration-300`}
                      aria-hidden="true"
                    >
                      <i className={`bi ${service.icon}`} />
                    </div>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      {meta.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors" itemProp="name">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed" itemProp="description">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${inquiryMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                  >
                    <i className="bi bi-whatsapp"></i>
                    <span>Inquire for Business</span>
                  </a>
                  <i className="bi bi-arrow-right text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all"></i>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
