// ===============================================
// Contact.jsx
// -----------------------------------------------
// Contact section for Coder & AccoTax website.
// - Provides WhatsApp CTA, email addresses, social links,
//   address block, and an embedded Google Map.
// - SEO & Social meta tags included via react-helmet.
// - JSON-LD structured data included for better search engine
//   understanding (ContactPage + Organization + ContactPoint).
// - Accessibility considerations: descriptive alt text, iframe title,
//   aria-friendly link text, lazy-loading for heavy resources.
// -----------------------------------------------

import React from "react";
import { Helmet } from "react-helmet"; // SEO meta tag management
import { motion } from "framer-motion";
import emailImg from "../../assets/email.logo.svg";

const Contact = () => {
  // -------------------------
  // Configuration / Constants
  // -------------------------
  const whatsappNumber = "919432456083";
  const message = encodeURIComponent("Hi, I want to know about your courses and fees.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Canonical & OG image (ensure this file exists in /public/)
  const pageUrl = "https://codernaccotax.co.in/contact";
  const ogImage = "https://codernaccotax.co.in/og-contact.png"; // <-- place your og-contact.png in /public/

  // JSON-LD structured data for SEO (Organization + ContactPage + ContactPoint)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": pageUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Coder & AccoTax",
      "url": "https://codernaccotax.co.in",
      "logo": "https://codernaccotax.co.in/cnat.ico",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61561702110617",
        "https://instagram.com/codernaccotax",
        "https://www.youtube.com/@CodernAccotax"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9432456083",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ground Floor, 25(10/A) Shibtala Road, P.O - Nona Chandan Pukur, Barrackpore",
        "addressLocality": "Kolkata",
        "postalCode": "700122",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      {/* =========================
          SEO / Social Meta (Helmet)
          - Title, description, keywords
          - Canonical link
          - Open Graph (og:) + image dimensions
          - Twitter card
          - JSON-LD structured data
      ========================== */}
      <Helmet>
        {/* Primary meta */}
        <title>Contact | Coder & AccoTax</title>
        <meta
          name="description"
          content="Contact Coder & AccoTax for course enquiries, fees, admissions, and support. Message us on WhatsApp, email, or visit our Kolkata institute."
        />
        <meta
          name="keywords"
          content="contact coder accotax, coder accotax phone, coder accotax email, coding institute contact, accounting training contact"
        />
        <meta name="author" content="Coder & AccoTax" />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Contact | Coder & AccoTax" />
        <meta
          property="og:description"
          content="Get in touch with Coder & AccoTax — message us on WhatsApp, email, or visit our training center in Kolkata."
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact | Coder & AccoTax" />
        <meta
          name="twitter:description"
          content="Contact Coder & AccoTax for course details, admissions and support."
        />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Contact Coder & AccoTax - Get in touch" />

        {/* Structured data (JSON-LD) */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section
        id="contact"
        className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
      >
        {/* Decorative soft background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-r from-sky-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30" aria-hidden="true"></div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-400 to-cyan-300 drop-shadow-lg"
          >
            Get in Touch
          </motion.h1>

          {/* Intro paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Have questions about our courses, programs, or admissions? We’re here to help!
            Reach out through WhatsApp, email, or visit our institute.
          </motion.p>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
              aria-label="Message Coder and AccoTax on WhatsApp"
            >
              <i className="bi bi-whatsapp text-2xl" aria-hidden="true"></i>
              Message Us on WhatsApp
            </a>
          </motion.div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center shadow-lg hover:shadow-sky-500/30 transition-all duration-500"
            >
              <div className="mb-4" aria-hidden="true">
                <i className="bi bi-geo-alt text-4xl text-amber-400"></i>
              </div>
              <h2 className="text-xl font-semibold text-amber-400 mb-2">Our Institute Address</h2>
              <address className="not-italic text-gray-300 leading-relaxed">
                Coder & AccoTax Learning Center <br />
                Ground Floor, 25(10/A) Shibtala Road <br />
                P.O - Nona Chandan Pukur, Barrackpore <br />
                Kolkata - 700122
              </address>
            </motion.div>

            {/* Email & Social Links Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center shadow-lg hover:shadow-sky-500/30 transition-all duration-500"
            >
              {/* Decorative email image */}
              <div className="mb-4">
                <img src={emailImg} alt="Email icon" className="w-12 mx-auto opacity-90" />
              </div>

              <h2 className="text-xl font-semibold text-amber-400 mb-2">Email Us</h2>

              {/* Mailto links — accessible, descriptive text */}
              <p>
                <a
                  href="mailto:info.codenaccotax@co.in"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors duration-300"
                >
                  info.codenaccotax@co.in
                </a>
              </p>
              <p className="mt-1">
                <a
                  href="mailto:codenaccotax@gmail.com"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors duration-300"
                >
                  codenaccotax@gmail.com
                </a>
              </p>

              {/* Social Media Links */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Follow Us</h3>
                <div className="flex flex-wrap justify-center gap-5 text-lg">
                  <a
                    href="https://www.facebook.com/profile.php?id=61561702110617"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1877F2] hover:underline flex items-center gap-1"
                    aria-label="Open Facebook page in new tab"
                  >
                    <i className="bi bi-facebook" aria-hidden="true"></i>
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://instagram.com/codernaccotax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                    aria-label="Open Instagram profile in new tab"
                  >
                    <span className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                      <i className="bi bi-instagram" aria-hidden="true"></i>
                    </span>
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://www.youtube.com/@CodernAccotax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF0000] hover:underline flex items-center gap-1"
                    aria-label="Open YouTube channel in new tab"
                  >
                    <i className="bi bi-youtube" aria-hidden="true"></i>
                    <span>YouTube</span>
                  </a>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline flex items-center gap-1"
                    aria-label="Open WhatsApp chat in new tab"
                  >
                    <i className="bi bi-whatsapp" aria-hidden="true"></i>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 text-center shadow-lg hover:shadow-sky-500/30 transition-all duration-500"
            >
              <h2 className="text-xl font-semibold text-amber-400 mb-4">Find Us on Map</h2>

              {/* Embedded Google Map — lazy loaded to save resources */}
              <iframe
                title="Coder & AccoTax Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d283.52283098422913!2d88.37444724388779!3d22.76869060091701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89b8eb3168ac5%3A0x7666eac9a1c26430!2sCoder%20%26%20AccoTax!5e1!3m2!1sen!2sin!4v1751969297792!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
