// ===============================================
// Contact.jsx (Optimized)
// - SEO with Helmet (standalone only)
// - Performance-optimized (memo, useCallback, lazy map)
// - Accessible form with validation + copy-to-clipboard
// ===============================================

import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // npm i react-helmet-async
import { visitorService } from "../../services/visitorService";

// -------------------------------
// Constants (kept outside to avoid recreating)
// -------------------------------
const WHATSAPP_NUMBER = "919432456083";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I want to know about your courses and fees."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const PHONE_NUMBERS = [
  { number: "7003756860", label: "+91 70037 56860" },
  { number: "8240406079", label: "+91 82404 06079" },
  { number: "9432456083", label: "+91 94324 56083" },
  { number: "9831265392", label: "+91 98312 65392" },
];

const PAGE_URL = "https://codernaccotax.co.in/contact";
const OG_IMAGE = "https://codernaccotax.co.in/og-contact.png";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.284625481227!2d88.3720516!3d22.7686906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89b8eb3168ac5%3A0x7666eac9a1c26430!2sCoder%20%26%20AccoTax!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

// -------------------------------
// Helper: copy to clipboard
// -------------------------------
const copyToClipboard = async (text, successMessage) => {
  try {
    await navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: successMessage,
      timer: 1500,
      showConfirmButton: false,
      background: "#111827",
      color: "#f9fafb",
    });
  } catch (err) {
    // fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: successMessage,
      timer: 1500,
      showConfirmButton: false,
      background: "#111827",
      color: "#f9fafb",
    });
  }
};

// -------------------------------
// InquiryForm Subcomponent (memoized)
// -------------------------------
const InquiryForm = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    extra_field: "", // Honeypot
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Simple validation
  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.interest) newErrors.interest = "Please select an interest";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await visitorService.saveInquiry(formData);
      if (res?.status) {
        Swal.fire({
          title: "Thank You!",
          text: "We’ve received your details. Our team will contact you soon.",
          icon: "success",
          background: "#111827",
          color: "#f9fafb",
          confirmButtonColor: "#2563eb",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "",
          message: "",
          extra_field: "",
        });
        setErrors({});
      } else {
        throw new Error("Failed to submit. Please try again.");
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || "Unable to send your inquiry.",
        icon: "error",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  }, [formData, validate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      viewport={{ once: true }}
      className="mt-20 relative max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-xl shadow-sky-800/20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-800/10 via-gray-900/40 to-purple-900/10 pointer-events-none" />
      <div className="relative p-10">
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-400 to-cyan-300 mb-2">
          Share Your Interest
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Tell us a bit about yourself — our team will connect with you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`peer w-full bg-transparent border rounded-xl px-3 pt-5 pb-2 text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-700 focus:ring-sky-500 focus:border-sky-500"
              }`}
              placeholder="Your name"
            />
            <label
              htmlFor="name"
              className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sky-400 peer-focus:text-sm"
            >
              Full Name
            </label>
            {errors.name && (
              <p id="name-error" className="text-red-400 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`peer w-full bg-transparent border rounded-xl px-3 pt-5 pb-2 text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-700 focus:ring-sky-500 focus:border-sky-500"
              }`}
              placeholder="you@example.com"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sky-400 peer-focus:text-sm"
            >
              Email Address
            </label>
            {errors.email && (
              <p id="email-error" className="text-red-400 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`peer w-full bg-transparent border rounded-xl px-3 pt-5 pb-2 text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-700 focus:ring-sky-500 focus:border-sky-500"
              }`}
              placeholder="9999999999"
            />
            <label
              htmlFor="phone"
              className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sky-400 peer-focus:text-sm"
            >
              Phone
            </label>
            {errors.phone && (
              <p id="phone-error" className="text-red-400 text-xs mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Interest */}
          <div className="relative">
            <select
              name="interest"
              id="interest"
              value={formData.interest}
              onChange={handleChange}
              required
              aria-invalid={!!errors.interest}
              aria-describedby={errors.interest ? "interest-error" : undefined}
              className={`w-full appearance-none bg-gray-900 text-gray-100 border rounded-xl px-3 pt-5 pb-2 focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                errors.interest
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-700 focus:ring-sky-500 focus:border-sky-500"
              }`}
              style={{ colorScheme: "dark" }}
            >
              <option value="">Select a course of interest</option>
              <option value="Web Development">Web Development</option>
              <option value="Python Programming">Python Programming</option>
              <option value="C / C++ Programming">C / C++ Programming</option>
              <option value="DSA / Algorithm">DSA / Algorithm</option>
              <option value="Accounting & Taxation">Accounting & Taxation</option>
              <option value="Other">Other</option>
            </select>
            <i className="bi bi-chevron-down absolute right-4 top-5 text-gray-400 pointer-events-none" />
            {errors.interest && (
              <p id="interest-error" className="text-red-400 text-xs mt-1">
                {errors.interest}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your query..."
              className="peer w-full bg-transparent border border-gray-700 rounded-xl px-3 pt-5 pb-2 text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sky-400 peer-focus:text-sm"
            >
              Message (Optional)
            </label>
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="extra_field"
            value={formData.extra_field}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex="-1"
            autoComplete="off"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 mt-4 rounded-xl font-semibold tracking-wide text-white shadow-lg transition-all duration-300 ${
              loading
                ? "bg-sky-700/50 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-sky-700/30"
            }`}
          >
            {loading ? "Submitting..." : "🚀 Send Message"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
});

InquiryForm.displayName = "InquiryForm";

// -------------------------------
// Main Contact Component
// -------------------------------
const Contact = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/contact";

  return (
    <>
      {/* SEO Helmet (only on standalone route) */}
      {isStandalone && (
        <Helmet>
          <title>Contact Coder & AccoTax | Get in Touch</title>
          <meta
            name="description"
            content="Reach out to Coder & AccoTax for inquiries about coding courses, accounting programs, and admissions. Visit our institute in Barrackpore, Kolkata."
          />
          <link rel="canonical" href={PAGE_URL} />
          <meta property="og:title" content="Contact Coder & AccoTax" />
          <meta
            property="og:description"
            content="Have questions? Contact us via phone, email, WhatsApp, or visit our institute."
          />
          <meta property="og:url" content={PAGE_URL} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Coder & AccoTax Contact",
              url: PAGE_URL,
              description:
                "Contact page for Coder & AccoTax learning center.",
              mainEntity: {
                "@type": "Organization",
                name: "Coder & AccoTax",
                url: "https://codernaccotax.co.in",
                logo: "https://codernaccotax.co.in/logo.png",
                sameAs: [
                  "https://www.facebook.com/codernaccotax",
                  "https://www.instagram.com/codernaccotax",
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "Ground Floor, 25(10/A) Shibtala Road, P.O - Nona Chandan Pukur, Barrackpore",
                  addressLocality: "Kolkata",
                  addressRegion: "WB",
                  postalCode: "700122",
                  addressCountry: "IN",
                },
                contactPoint: PHONE_NUMBERS.map((item) => ({
                  "@type": "ContactPoint",
                  telephone: `+91-${item.number}`,
                  contactType: "customer service",
                })),
              },
            })}
          </script>
        </Helmet>
      )}

      <section
        id="contact"
        className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
      >
        {/* Decorative background */}
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
            className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-400 to-cyan-300 drop-shadow-lg"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Have questions about our courses, programs, or admissions? We’re
            here to help! Reach out through WhatsApp, email, or visit our
            institute.
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
              href={WHATSAPP_LINK}
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
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center shadow-lg hover:shadow-sky-500/30 transition-all duration-500"
            >
              <i className="bi bi-geo-alt text-4xl text-amber-400 mb-4"></i>
              <h2 className="text-xl font-semibold text-amber-400 mb-2">
                Our Institute Address
              </h2>
              <address className="not-italic text-gray-300 leading-relaxed">
                Coder & AccoTax Learning Center <br />
                Ground Floor, 25(10/A) Shibtala Road <br />
                P.O - Nona Chandan Pukur, Barrackpore <br />
                Kolkata - 700122
              </address>
            </motion.div>

            {/* Email & Phone */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center shadow-lg hover:shadow-sky-500/30 transition-all duration-500"
            >
              <i className="bi bi-envelope text-4xl text-amber-400 mb-4"></i>
              <h2 className="text-xl font-semibold text-amber-400 mb-2">
                Email Us
              </h2>
              <div className="space-y-2">
                <p>
                  <a
                    href="mailto:info.codenaccotax@co.in"
                    className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1"
                  >
                    info.codenaccotax@co.in
                  </a>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "info.codenaccotax@co.in",
                        "Email copied!"
                      )
                    }
                    className="ml-2 text-gray-400 hover:text-sky-400 transition-colors"
                    aria-label="Copy email"
                  >
                    <i className="bi bi-files"></i>
                  </button>
                </p>
                <p>
                  <a
                    href="mailto:codenaccotax@gmail.com"
                    className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1"
                  >
                    codenaccotax@gmail.com
                  </a>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "codenaccotax@gmail.com",
                        "Email copied!"
                      )
                    }
                    className="ml-2 text-gray-400 hover:text-sky-400 transition-colors"
                    aria-label="Copy email"
                  >
                    <i className="bi bi-files"></i>
                  </button>
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center justify-center gap-2">
                  <i className="bi bi-telephone text-2xl"></i> Call Us
                </h3>
                <div className="space-y-2">
                  {PHONE_NUMBERS.map((item, idx) => (
                    <p key={idx} className="flex items-center justify-center gap-2">
                      <a
                        href={`tel:${item.number}`}
                        className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors text-base"
                      >
                        {item.label}
                      </a>
                      <button
                        onClick={() =>
                          copyToClipboard(item.number, "Phone number copied!")
                        }
                        className="text-gray-400 hover:text-sky-400 transition-colors"
                        aria-label={`Copy phone number ${item.label}`}
                      >
                        <i className="bi bi-files"></i>
                      </button>
                    </p>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Mon-Sat, 10am – 7pm
                </p>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 text-center shadow-lg hover:shadow-sky-500/30 transition-all duration-500"
            >
              <h2 className="text-xl font-semibold text-amber-400 mb-4">
                Find Us on Map
              </h2>
              <iframe
                title="Coder & AccoTax Location"
                src={MAP_EMBED_SRC}
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

          {/* Inquiry Form */}
          <InquiryForm />
        </div>
      </section>
    </>
  );
};

export default memo(Contact);