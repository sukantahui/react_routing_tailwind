// ===============================================
// Services.jsx
// -----------------------------------------------
// Purpose:
//   Display all professional and technical services offered
//   by Coder & AccoTax using animated service cards.
//
// Features:
// - Responsive grid layout (Framer Motion animations)
// - Conditional Helmet for SEO (only active on /services)
// - JSON-LD structured data (Service + OfferCatalog + BreadcrumbList)
// - Accessibility enhancements
// - Reusable Tailwind-based design
// ===============================================

import React from "react";
import { motion } from "framer-motion";
import services from "../../data/services.json";

// 🔹 Animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Services = () => {
  return (
    <>
      {/* ===============================================
          SERVICES SECTION
      =============================================== */}
      <section
        id="services"
        className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
      >
        {/* Decorative Background */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-r from-sky-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-400 to-cyan-300 drop-shadow-lg"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mb-14 max-w-2xl mx-auto"
          >
            Discover our comprehensive range of{" "}
            <strong className="text-sky-400">educational</strong> and{" "}
            <strong className="text-purple-400">financial</strong> services
            tailored to empower students, entrepreneurs, and businesses.
          </motion.p>

          {/* Service Cards Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={index}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
                className="relative group bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-lg p-10 text-center transition-all duration-500 hover:shadow-sky-500/30 hover:-translate-y-2"
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Icon */}
                <div
                  className="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-sky-500/30 to-indigo-500/30 text-sky-300 shadow-inner shadow-sky-900/50 group-hover:from-sky-500/50 group-hover:to-indigo-500/50 transition-all duration-500"
                  aria-hidden="true"
                >
                  <i className={`bi ${service.icon} text-4xl`} />
                  <div className="absolute inset-0 rounded-full border border-sky-400/40 group-hover:border-sky-400/70 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-500"></div>
                </div>

                {/* Text */}
                <h2
                  className="text-xl font-semibold text-sky-300 mb-3"
                  itemProp="name"
                >
                  {service.title}
                </h2>
                <p
                  className="text-gray-400 leading-relaxed"
                  itemProp="description"
                >
                  {service.description}
                </p>

                {/* Overlay */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-t from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                ></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
