// ===============================================
// Contact.jsx - Minimal Text Contact Section
// ===============================================

import React, { useState, useCallback, memo } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { visitorService } from "../../services/visitorService";

const WHATSAPP_NUMBER = "919432456083";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Coder & AccoTax! I'd like to inquire about courses."
)}`;

const PHONE_NUMBERS = [
  { number: "7003756860", label: "+91 70037 56860" },
  { number: "8240406079", label: "+91 82404 06079" },
  { number: "9432456083", label: "+91 94324 56083" },
  { number: "9831265392", label: "+91 98312 65392" },
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.284625481227!2d88.3720516!3d22.7686906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89b8eb3168ac5%3A0x7666eac9a1c26430!2sCoder%20%26%20AccoTax!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

const copyToClipboard = async (text, successMessage) => {
  try {
    await navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: successMessage,
      timer: 1500,
      showConfirmButton: false,
      background: "#0f172a",
      color: "#f8fafc",
    });
  } catch {
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
      background: "#0f172a",
      color: "#f8fafc",
    });
  }
};

const InquiryForm = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    extra_field: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "10 digits";
    }
    if (!formData.interest) newErrors.interest = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      setLoading(true);
      try {
        const res = await visitorService.saveInquiry(formData);
        if (res?.status) {
          Swal.fire({
            title: "Inquiry Sent!",
            text: "We will contact you shortly.",
            icon: "success",
            background: "#0f172a",
            color: "#f8fafc",
            confirmButtonColor: "#0284c7",
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
        Swal.fire({
          title: "Error",
          text: err.message || "Failed to send inquiry.",
          icon: "error",
          background: "#0f172a",
          color: "#f8fafc",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, validate]
  );

  return (
    <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-white mb-3">Quick Inquiry</h3>

      <form onSubmit={handleSubmit} className="space-y-2.5" noValidate>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:border-sky-500 outline-none"
          />
          {errors.name && <p className="text-rose-400 text-[10px] mt-0.5">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:border-sky-500 outline-none"
            />
            {errors.email && <p className="text-rose-400 text-[10px] mt-0.5">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (10 digits) *"
              className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:border-sky-500 outline-none"
            />
            {errors.phone && <p className="text-rose-400 text-[10px] mt-0.5">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:border-sky-500 outline-none"
          >
            <option value="">Course of Interest *</option>
            <option value="Full Stack Web Development">Full Stack Web Development</option>
            <option value="Python Programming & AI">Python Programming & AI</option>
            <option value="Tally Prime, GST & Taxation">Tally Prime, GST & Taxation</option>
            <option value="ICSE / ISC Computer Science">ICSE / ISC Java & CS</option>
            <option value="C & C++ Programming / DSA">C / C++ & DSA</option>
            <option value="Other Certification">Other</option>
          </select>
          {errors.interest && <p className="text-rose-400 text-[10px] mt-0.5">{errors.interest}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-semibold text-xs text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 transition"
        >
          {loading ? "Sending..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
});

InquiryForm.displayName = "InquiryForm";

const Contact = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/contact";

  return (
    <>
      {isStandalone && (
        <Helmet>
          <title>Contact Coder & AccoTax | Barrackpore</title>
        </Helmet>
      )}

      <section id="contact" className="py-12 bg-slate-950 text-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Connect</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Contact & Location</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Left: WhatsApp + Phones + Address */}
            <div className="space-y-3">
              {/* WhatsApp Button */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 hover:border-emerald-400 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-base">
                    <i className="bi bi-whatsapp"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Direct WhatsApp Chat</h4>
                    <p className="text-[11px] text-slate-300">+91 94324 56083</p>
                  </div>
                </div>
                <i className="bi bi-arrow-right text-emerald-400 text-xs"></i>
              </a>

              {/* Phone Grid */}
              <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-3.5">
                <div className="text-xs font-bold text-slate-300 mb-2">Phone Lines (10 AM - 7 PM)</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {PHONE_NUMBERS.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-1.5 px-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]"
                    >
                      <a href={`tel:${p.number}`} className="text-slate-300 hover:text-sky-400 transition truncate">
                        {p.label}
                      </a>
                      <button
                        onClick={() => copyToClipboard(p.number, "Phone copied!")}
                        className="text-slate-500 hover:text-sky-400 ml-1"
                        title="Copy"
                      >
                        <i className="bi bi-copy text-[10px]"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-3 text-xs text-slate-300">
                <strong className="text-white block mb-0.5">Location:</strong>
                25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata - 700122
              </div>
            </div>

            {/* Right: Quick Form */}
            <div>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Contact);