// ===============================================
// Contact.jsx - Organized & Modern Contact Section
// ===============================================

import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { visitorService } from "../../services/visitorService";

const WHATSAPP_NUMBER = "919432456083";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Coder & AccoTax! I'd like to inquire about course syllabus, admissions, and batch timings."
)}`;

const MAP_EXTERNAL_LINK =
  "https://www.google.com/maps/search/?api=1&query=Coder+%26+AccoTax,+25(10/A)+Shibtala+Road,+Nona+Chandan+Pukur,+Barrackpore,+Kolkata+700122";

// Standard, high-compatibility Google Maps embed query
const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=Coder%20%26%20AccoTax,%2025(10/A)%20Shibtala%20Road,%20Nona%20Chandan%20Pukur,%20Barrackpore,%20Kolkata%20700122&t=&z=16&ie=UTF8&iwloc=&output=embed";

const PHONE_NUMBERS = [
  { number: "9432456083", label: "+91 94324 56083", tag: "Primary / WhatsApp" },
  { number: "7003756860", label: "+91 70037 56860", tag: "Admissions Helpline" },
  { number: "8240406079", label: "+91 82404 06079", tag: "Academic Inquiry" },
  { number: "9831265392", label: "+91 98312 65392", tag: "Accounts & GST" },
];

const EMAILS = [
  { email: "info.codenaccotax@co.in", label: "info.codenaccotax@co.in" },
  { email: "codenaccotax@gmail.com", label: "codenaccotax@gmail.com" },
];

/**
 * Capture browser and device metadata to accompany the visitor inquiry
 */
const getClientMeta = () => {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  let browser = "Web Browser";

  if (userAgent.includes("Firefox/")) browser = "Firefox";
  else if (userAgent.includes("Edg/")) browser = "Microsoft Edge";
  else if (userAgent.includes("Chrome/")) browser = "Google Chrome";
  else if (userAgent.includes("Safari/")) browser = "Apple Safari";
  else if (userAgent.includes("Opera") || userAgent.includes("OPR/")) browser = "Opera";
  else if (userAgent) browser = userAgent.slice(0, 100);

  let device_type = "Desktop";
  if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      device_type = "Tablet";
    } else {
      device_type = "Mobile";
    }
  }

  return {
    browser,
    device_type,
    page_url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer || window.location.origin : "",
  };
};

const copyToClipboard = async (text, successMessage) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: successMessage,
      timer: 1500,
      showConfirmButton: false,
      background: "#0f172a",
      color: "#f8fafc",
      toast: true,
      position: "bottom-end",
    });
  } catch (e) {
    console.error("Clipboard copy error:", e);
  }
};

const InquiryForm = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    extra_field: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};

    // Name (Required, max 255)
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    } else if (formData.name.trim().length > 255) {
      newErrors.name = "Name must not exceed 255 characters.";
    }

    // Email (Nullable in Laravel, format checked if provided)
    if (formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      } else if (formData.email.trim().length > 255) {
        newErrors.email = "Email must not exceed 255 characters.";
      }
    }

    // Phone (Nullable in Laravel, regex /^[0-9+\-\s]+$/, max 15)
    if (formData.phone.trim()) {
      const phoneRegex = /^[0-9+\-\s]+$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Phone can only contain numbers, +, -, and spaces.";
      } else if (formData.phone.trim().replace(/\D/g, "").length < 7) {
        newErrors.phone = "Please enter a valid phone number (at least 7 digits).";
      } else if (formData.phone.trim().length > 15) {
        newErrors.phone = "Phone number cannot exceed 15 characters.";
      }
    }

    // Recommended at least one contact channel
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.contactMethod = "Please enter at least a phone number or an email so we can reach you.";
    }

    // Interest (Required, max 255)
    if (!formData.interest.trim()) {
      newErrors.interest = "Please select a course or area of interest.";
    } else if (formData.interest.trim().length > 255) {
      newErrors.interest = "Interest selection is too long.";
    }

    // Message (Nullable in Laravel, max 2000)
    if (formData.message && formData.message.length > 2000) {
      newErrors.message = "Message cannot exceed 2000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.contactMethod) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        if (name === "email" || name === "phone") {
          delete next.contactMethod;
        }
        return next;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Bot honeypot check
      if (formData.extra_field) {
        Swal.fire({
          title: "Inquiry Sent!",
          text: "Thank you for contacting us.",
          icon: "success",
          background: "#0f172a",
          color: "#f8fafc",
        });
        return;
      }

      if (!validate()) return;

      setLoading(true);
      try {
        const meta = getClientMeta();
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          interest: formData.interest.trim(),
          message: formData.message.trim() || null,
          browser: meta.browser,
          device_type: meta.device_type,
          page_url: meta.page_url,
          referrer: meta.referrer,
        };

        const res = await visitorService.saveInquiry(payload);

        if (res?.status || res?.success || res) {
          Swal.fire({
            title: "Inquiry Sent Successfully!",
            text: "Thank you for reaching out! Our academic coordinator will contact you shortly.",
            icon: "success",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#0284c7",
            confirmButtonText: "Done",
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
        }
      } catch (err) {
        console.error("Submission error:", err);
        let errorMsg = "Unable to send inquiry. Please try again or reach out on WhatsApp.";

        // Parse Laravel validation error bag
        if (err?.errors && typeof err.errors === "object") {
          const serverErrors = {};
          Object.entries(err.errors).forEach(([field, messages]) => {
            serverErrors[field] = Array.isArray(messages) ? messages[0] : messages;
          });
          setErrors((prev) => ({ ...prev, ...serverErrors }));
          errorMsg = Object.values(serverErrors)[0] || errorMsg;
        } else if (err?.message) {
          errorMsg = err.message;
        }

        Swal.fire({
          title: "Submission Issue",
          text: errorMsg,
          icon: "error",
          background: "#0f172a",
          color: "#f8fafc",
          confirmButtonColor: "#e11d48",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, validate]
  );

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
              ⚡ Quick Response
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Send an Inquiry
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Submit your query below and our team will get back to you within 24 hours.
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-sky-400 text-lg flex-shrink-0">
          <i className="bi bi-chat-square-dots"></i>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="inquiry-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <i className="bi bi-person absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
            <input
              id="inquiry-name"
              type="text"
              name="name"
              maxLength={255}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/70 border text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all ${
                errors.name
                  ? "border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-500"
                  : "border-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <i className="bi bi-exclamation-circle text-[11px]"></i>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email & Phone side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <i className="bi bi-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
              <input
                id="inquiry-email"
                type="email"
                name="email"
                maxLength={255}
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/70 border text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all ${
                  errors.email
                    ? "border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-500"
                    : "border-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                <i className="bi bi-exclamation-circle text-[11px]"></i>
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone / WhatsApp <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <i className="bi bi-telephone absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
              <input
                id="inquiry-phone"
                type="tel"
                name="phone"
                maxLength={15}
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/70 border text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all ${
                  errors.phone
                    ? "border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-500"
                    : "border-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                <i className="bi bi-exclamation-circle text-[11px]"></i>
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Contact Method Guidance Alert */}
        {errors.contactMethod && (
          <div className="text-amber-400 bg-amber-950/40 border border-amber-800/60 rounded-xl p-2.5 text-xs flex items-center gap-2">
            <i className="bi bi-info-circle text-amber-400 text-sm flex-shrink-0"></i>
            <span>{errors.contactMethod}</span>
          </div>
        )}

        {/* Course / Interest Dropdown */}
        <div>
          <label htmlFor="inquiry-interest" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Course of Interest <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <i className="bi bi-mortarboard absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
            <select
              id="inquiry-interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className={`w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950/70 border text-slate-100 text-xs sm:text-sm outline-none transition-all appearance-none cursor-pointer ${
                errors.interest
                  ? "border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-500"
                  : "border-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              }`}
            >
              <option value="" className="bg-slate-900 text-slate-400">
                -- Choose a Course / Domain * --
              </option>
              <optgroup label="💻 Software & Web Development" className="bg-slate-900 text-sky-400 font-bold">
                <option value="Full Stack Web Development (MERN / React)" className="bg-slate-900 text-slate-200">
                  Full Stack Web Development (MERN / React)
                </option>
                <option value="Python Programming & AI / Machine Learning" className="bg-slate-900 text-slate-200">
                  Python Programming & AI / Data Science
                </option>
                <option value="C & C++ Programming / Data Structures & Algorithms" className="bg-slate-900 text-slate-200">
                  C / C++ Programming & DSA
                </option>
                <option value="Frontend Web Design (HTML, CSS, JS, Tailwind)" className="bg-slate-900 text-slate-200">
                  Frontend Web Design (HTML, CSS, JS, Tailwind)
                </option>
              </optgroup>
              <optgroup label="📊 Accounting & Taxation" className="bg-slate-900 text-emerald-400 font-bold">
                <option value="Tally Prime with GST & e-Filing" className="bg-slate-900 text-slate-200">
                  Tally Prime with GST & e-Filing
                </option>
                <option value="Professional Accounting & Taxation (Income Tax, TDS)" className="bg-slate-900 text-slate-200">
                  Professional Accounting & Taxation (Income Tax, TDS)
                </option>
                <option value="Advanced Excel & Office Financial Analytics" className="bg-slate-900 text-slate-200">
                  Advanced Excel & Office Financial Analytics
                </option>
              </optgroup>
              <optgroup label="🎓 School & College Academic Coaching" className="bg-slate-900 text-purple-400 font-bold">
                <option value="ICSE / ISC Java & Computer Applications" className="bg-slate-900 text-slate-200">
                  ICSE / ISC Java & Computer Applications
                </option>
                <option value="CBSE / State Board Computer Science (Class 9 - 12)" className="bg-slate-900 text-slate-200">
                  CBSE / State Board Computer Science (Class 9 - 12)
                </option>
                <option value="BCA / B.Tech / MCA Academic Coaching & Projects" className="bg-slate-900 text-slate-200">
                  BCA / B.Tech / MCA Academic Coaching & Projects
                </option>
              </optgroup>
              <optgroup label="🌐 Database & Other Courses" className="bg-slate-900 text-amber-400 font-bold">
                <option value="SQL, MySQL & Database Administration" className="bg-slate-900 text-slate-200">
                  SQL, MySQL & Database Administration
                </option>
                <option value="Other Certification / General Inquiry" className="bg-slate-900 text-slate-200">
                  Other Certification / General Inquiry
                </option>
              </optgroup>
            </select>
            <i className="bi bi-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          </div>
          {errors.interest && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <i className="bi bi-exclamation-circle text-[11px]"></i>
              {errors.interest}
            </p>
          )}
        </div>

        {/* Message / Query Textarea with Character Counter */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="inquiry-message" className="block text-xs font-semibold text-slate-300">
              Message / Specific Questions <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                formData.message.length > 1900 ? "text-amber-400" : "text-slate-500"
              }`}
            >
              {formData.message.length} / 2000
            </span>
          </div>
          <div className="relative">
            <i className="bi bi-card-text absolute left-3.5 top-3 text-slate-400 text-sm pointer-events-none"></i>
            <textarea
              id="inquiry-message"
              name="message"
              rows={3}
              maxLength={2000}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your learning goals, current background, preferred batch timing, or any questions..."
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/70 border text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all resize-y min-h-[90px] max-h-[220px] ${
                errors.message
                  ? "border-rose-500 ring-2 ring-rose-500/20 focus:border-rose-500"
                  : "border-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              }`}
            />
          </div>
          {errors.message && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <i className="bi bi-exclamation-circle text-[11px]"></i>
              {errors.message}
            </p>
          )}
        </div>

        {/* Hidden Honeypot Field */}
        <input
          type="text"
          name="extra_field"
          value={formData.extra_field}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
          style={{ display: "none" }}
          aria-hidden="true"
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-xl flex items-center justify-center gap-2 transition-all duration-300 ${
            loading
              ? "bg-sky-800/60 cursor-not-allowed opacity-75"
              : "bg-gradient-to-r from-sky-500 via-indigo-600 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 shadow-sky-500/25 hover:shadow-sky-500/40 cursor-pointer"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Submitting Inquiry...</span>
            </>
          ) : (
            <>
              <i className="bi bi-send-fill text-sm"></i>
              <span>Submit Course Inquiry</span>
            </>
          )}
        </motion.button>

        <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5 pt-1">
          <i className="bi bi-shield-check text-emerald-400"></i>
          <span>We respect your privacy. No spam or unsolicited calls.</span>
        </p>
      </form>
    </div>
  );
});

InquiryForm.displayName = "InquiryForm";

const Contact = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/contact";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: "https://codernaccotax.co.in/contact",
    name: "Contact Coder & AccoTax",
    description:
      "Contact Coder & AccoTax for coding, software development, accounting, Tally Prime, and taxation courses in Barrackpore, Kolkata.",
    mainEntity: {
      "@type": "Organization",
      name: "Coder & AccoTax",
      url: "https://codernaccotax.co.in",
      logo: "https://codernaccotax.co.in/cnat.ico",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9432456083",
          contactType: "Customer Service",
          areaServed: "IN",
          availableLanguage: ["English", "Bengali", "Hindi"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ground Floor, 25(10/A) Shibtala Road, P.O - Nona Chandan Pukur",
        addressLocality: "Barrackpore, Kolkata",
        postalCode: "700122",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      {isStandalone && (
        <Helmet>
          <title>Contact Coder & AccoTax | Barrackpore, Kolkata</title>
          <meta
            name="description"
            content="Get in touch with Coder & AccoTax for programming, web development, Tally Prime, and accounting admissions. Call, WhatsApp, or visit us in Barrackpore."
          />
          <meta
            name="keywords"
            content="Coder & AccoTax contact, coding institute barrackpore, tally training barrackpore, web development kolkata contact"
          />
          <link rel="canonical" href="https://codernaccotax.co.in/contact" />
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
      )}

      <section id="contact" className="relative py-16 bg-slate-950 text-slate-100 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
              Get in Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
              Contact & Center Location
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Have questions regarding syllabus, batch schedules, fees, or certifications? Chat with
              us on WhatsApp, call our helplines, or submit an inquiry.
            </p>
          </div>

          {/* Balanced 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left Column: Direct Channels & Location */}
            <div className="space-y-4">
              {/* WhatsApp Direct Chat Banner */}
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/50 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-950/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl shadow-md shadow-emerald-500/30 flex-shrink-0">
                    <i className="bi bi-whatsapp"></i>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Instant WhatsApp Chat
                    </h4>
                    <p className="text-xs text-slate-300 font-mono">+91 94324 56083</p>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      Fastest response for admissions & fees
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:translate-x-1 transition-transform flex-shrink-0">
                  <i className="bi bi-arrow-right text-sm"></i>
                </div>
              </motion.a>

              {/* Direct Phone Lines Card */}
              <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm">
                      <i className="bi bi-telephone-fill"></i>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Phone Helplines
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">
                    Mon - Sat: 10 AM – 7 PM
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PHONE_NUMBERS.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs hover:border-slate-700 transition"
                    >
                      <div className="min-w-0 pr-2">
                        <a
                          href={`tel:${p.number}`}
                          className="font-semibold text-slate-200 hover:text-sky-400 font-mono transition block truncate"
                        >
                          {p.label}
                        </a>
                        <span className="block text-[10px] text-slate-500 truncate">{p.tag}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <a
                          href={`tel:${p.number}`}
                          className="p-1.5 px-2 rounded-lg bg-slate-800/80 text-sky-400 hover:bg-sky-500 hover:text-white transition text-xs"
                          title={`Call ${p.label}`}
                          aria-label={`Call ${p.label}`}
                        >
                          <i className="bi bi-telephone-outbound"></i>
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(p.number, "Phone number copied!")}
                          className="p-1.5 px-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition text-xs"
                          title="Copy phone"
                          aria-label={`Copy phone ${p.label}`}
                        >
                          <i className="bi bi-copy"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Email rows */}
                <div className="mt-3 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                    <i className="bi bi-envelope text-indigo-400"></i>
                    <span>Email Support</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {EMAILS.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 px-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs"
                      >
                        <a
                          href={`mailto:${item.email}`}
                          className="text-slate-300 hover:text-indigo-400 transition truncate text-[11px]"
                        >
                          {item.label}
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.email, "Email copied!")}
                          className="p-1 px-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition text-xs flex-shrink-0 ml-1"
                          title="Copy email"
                          aria-label={`Copy email ${item.email}`}
                        >
                          <i className="bi bi-copy text-[10px]"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Address & Google Maps Embed */}
              <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        Institute Address
                      </h4>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                        25(10/A) Shibtala Road, Nona Chandan Pukur,
                        <br />
                        Barrackpore, Kolkata – 700122 (Near Station)
                      </p>
                    </div>
                  </div>

                  <a
                    href={MAP_EXTERNAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 flex-shrink-0 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-lg transition"
                  >
                    <span>Google Maps</span>
                    <i className="bi bi-box-arrow-up-right text-[10px]"></i>
                  </a>
                </div>

                {/* Map iframe container with direct fallback bar */}
                <div className="mt-3 rounded-xl overflow-hidden border border-slate-800/90 bg-slate-950 relative min-h-[190px]">
                  <iframe
                    title="Coder & AccoTax Institute Location on Google Maps"
                    src={MAP_EMBED_SRC}
                    width="100%"
                    height="190"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="w-full">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Contact);