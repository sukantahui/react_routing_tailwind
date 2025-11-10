// ===============================================
// Services.jsx
// -----------------------------------------------
// Purpose:
//   Display all professional and technical services offered
//   by Coder & AccoTax using animated service cards.
//
// Features:
// - Responsive grid layout (Framer Motion animations)
// - SEO optimization with Helmet & JSON-LD structured data
// - Accessibility improvements (semantic headings, aria labels)
// - Reusable design system (Tailwind classes)
//
// -----------------------------------------------
// SEO Implementation:
// - <Helmet> for meta tags (title, description, canonical, OG)
// - Twitter card metadata for social sharing
// - JSON-LD schema describing service offerings
// - Descriptive headings for screen readers
// ===============================================

import React from "react";
import { Helmet } from "react-helmet"; // ✅ For SEO and metadata
import { motion } from "framer-motion";
import services from "../../data/services.json";

// 🔹 Animation variant for "fade-up" effect
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Services = () => {
  // -----------------------------------------------
  // 🧾 JSON-LD Schema for Google Rich Results
  // Describes the list of services offered by Coder & AccoTax
  // -----------------------------------------------
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Educational & Financial Services",
    "provider": {
      "@type": "Organization",
      "name": "Coder & AccoTax",
      "url": "https://codernaccotax.co.in",
      "logo": "https://codernaccotax.co.in/cnat.ico",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61561702110617",
        "https://instagram.com/codernaccotax",
        "https://www.youtube.com/@CodernAccotax"
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coder & AccoTax Services Catalog",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      }))
    }
  };

  return (
    <>
      {/* ==============================
          🧠 SEO & Metadata
      ============================== */}
      <Helmet>
        <title>Services | Coder & AccoTax</title>
        <meta
          name="description"
          content="Explore Coder & AccoTax's full range of technology and financial services — including web development, software training, accounting, and business compliance."
        />
        <meta
          name="keywords"
          content="services coder accotax, coding services, accounting solutions, taxation help, web development training, business consultancy"
        />
        <meta name="author" content="Coder & AccoTax" />

        {/* Canonical Link */}
        <link rel="canonical" href="https://codernaccotax.co.in/services" />

        {/* Open Graph Tags for social platforms */}
        <meta property="og:title" content="Our Services | Coder & AccoTax" />
        <meta
          property="og:description"
          content="From full-stack development to tax consultancy — discover how Coder & AccoTax helps individuals and businesses grow."
        />
        <meta
          property="og:image"
          content="https://codernaccotax.co.in/og-services.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://codernaccotax.co.in/services" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services | Coder & AccoTax" />
        <meta
          name="twitter:description"
          content="Explore expert-led coding, finance, and compliance services by Coder & AccoTax."
        />
        <meta
          name="twitter:image"
          content="https://codernaccotax.co.in/og-services.png"
        />
        <meta
          name="twitter:image:alt"
          content="Coder & AccoTax Services - Web Development, Accounting, Taxation"
        />

        {/* JSON-LD Schema (Rich Results) */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* ===============================================
          SERVICES SECTION
      =============================================== */}
      <section
        id="services"
        className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
      >
        {/* Decorative Background Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-r from-sky-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* =====================
              SECTION HEADING
          ====================== */}
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

          {/* =====================
              SERVICE GRID
          ====================== */}
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
                {/* Service Icon */}
                <div
                  className="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-sky-500/30 to-indigo-500/30 text-sky-300 shadow-inner shadow-sky-900/50 group-hover:from-sky-500/50 group-hover:to-indigo-500/50 transition-all duration-500"
                  aria-hidden="true"
                >
                  <i className={`bi ${service.icon} text-4xl`} />
                  <div className="absolute inset-0 rounded-full border border-sky-400/40 group-hover:border-sky-400/70 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-500"></div>
                </div>

                {/* Service Text */}
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

                {/* Decorative Overlay */}
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
