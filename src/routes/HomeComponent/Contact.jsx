import React from "react";
import { motion } from "framer-motion";
import emailImg from "../../assets/email.logo.svg";

const Contact = () => {
  const whatsappNumber = "919432456083";
  const message = encodeURIComponent("Hi, I want to know about your courses and fees.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-r from-sky-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-400 to-cyan-300 drop-shadow-lg"
        >
          Get in Touch
        </motion.h2>

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
          >
            <i className="bi bi-whatsapp text-2xl"></i>
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
            <div className="mb-4">
              <i className="bi bi-geo-alt text-4xl text-amber-400"></i>
            </div>
            <h5 className="text-xl font-semibold text-amber-400 mb-2">
              Our Institute Address
            </h5>
            <p className="text-gray-300 leading-relaxed">
              Coder & AccoTax Learning Center <br />
              Ground Floor, 25(10/A) Shibtala Road <br />
              P.O - Nona Chandan Pukur, Barrackpore <br />
              Kolkata - 700122
            </p>
          </motion.div>

          {/* Email & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center shadow-lg hover:shadow-sky-500/30 transition-all duration-500"
          >
            <div className="mb-4">
              <img src={emailImg} alt="Email Logo" className="w-12 mx-auto opacity-90" />
            </div>
            <h5 className="text-xl font-semibold text-amber-400 mb-2">Email Us</h5>
            <p>
              <a
                href="mailto:info.codenaccotax@co.in"
                className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors duration-300"
              >
                info.codenaccotax@co.in
              </a>
            </p>
            <p>
              <a
                href="mailto:codenaccotax@gmail.com"
                className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors duration-300"
              >
                codenaccotax@gmail.com
              </a>
            </p>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-lg font-semibold text-amber-400 mb-3">
                Follow Us
              </h5>
              <div className="flex flex-wrap justify-center gap-5 text-lg">
                <a
                  href="https://www.facebook.com/profile.php?id=61561702110617"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1877F2] hover:underline flex items-center gap-1"
                >
                  <i className="bi bi-facebook"></i>
                  Facebook
                </a>
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    <i className="bi bi-instagram"></i>
                  </span>
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@CodernAccotax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF0000] hover:underline flex items-center gap-1"
                >
                  <i className="bi bi-youtube"></i>
                  YouTube
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline flex items-center gap-1"
                >
                  <i className="bi bi-whatsapp"></i>
                  WhatsApp
                </a>
              </div>
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
            <h5 className="text-xl font-semibold text-amber-400 mb-4">
              Find Us on Map
            </h5>
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
  );
};

export default Contact;
