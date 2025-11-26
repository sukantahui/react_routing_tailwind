// ===============================================
// Contact.jsx
// -----------------------------------------------
// Contact section for Coder & AccoTax website.
// - Provides WhatsApp CTA, email, social links, map, and inquiry form
// - Conditional SEO Helmet: applies only on standalone /contact route
// - JSON-LD structured data for ContactPage + Organization
// - Accessible, mobile-friendly, performance-optimized
// -----------------------------------------------

import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import emailImg from "../../assets/email.logo.svg";
import { visitorService } from "../../services/visitorService";

const Contact = () => {
  // -------------------------
  // Configuration / Constants
  // -------------------------
  const location = useLocation();
  const isStandalone = location.pathname === "/contact";

  const whatsappNumber = "919432456083";
  const message = encodeURIComponent(
    "Hi, I want to know about your courses and fees."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  const pageUrl = "https://codernaccotax.co.in/contact";
  const ogImage = "https://codernaccotax.co.in/og-contact.png";



  // ===========================
  // Visitor Form State & Logic
  // ===========================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    extra_field: "", // Honeypot field
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setFormData({ name: "", email: "", interest: "", message: "" });
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
  };

  return (
    <>

      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section id="contact" className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden">
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

            {/* Email & Social */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center shadow-lg hover:shadow-sky-500/30 transition-all duration-500"
            >
              <img
                src={emailImg}
                alt="Email icon"
                className="w-12 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-amber-400 mb-2">
                Email Us
              </h2>
              <p>
                <a
                  href="mailto:info.codenaccotax@co.in"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
                >
                  info.codenaccotax@co.in
                </a>
              </p>
              <p className="mt-1">
                <a
                  href="mailto:codenaccotax@gmail.com"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
                >
                  codenaccotax@gmail.com
                </a>
              </p>
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

          {/* Visitor Inquiry Form */}
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border border-gray-700 rounded-xl px-3 pt-5 pb-2 text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="Your name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sky-400 peer-focus:text-sm"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border border-gray-700 rounded-xl px-3 pt-5 pb-2 text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="you@example.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sky-400 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border border-gray-700 rounded-xl px-3 pt-5 pb-2 text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="999999999999"
                  />
                  <label
                    htmlFor="phon"
                    className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sky-400 peer-focus:text-sm"
                  >
                    Phone
                  </label>
                </div>

                <div className="relative">
                  <select
                    name="interest"
                    id="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none bg-gray-900 text-gray-100 border border-gray-700 rounded-xl px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all cursor-pointer"
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
                </div>

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

                {/* Hidden honeypot field */}
                <input
                  type="text"
                  name="extra_field"
                  value={formData.extra_field || ""}
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
        </div>
      </section>
    </>
  );
};

export default Contact;
