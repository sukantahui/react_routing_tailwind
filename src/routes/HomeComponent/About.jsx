// ===============================================
// About.jsx
// -----------------------------------------------
// Purpose: Display details about Coder & AccoTax institute,
// including mission, achievements, certification, and a CTA
// to join courses.
//
// Features:
// - Animated stats counter (achievements)
// - ISO certificate download
// - Call-to-action button
// - SEO & Accessibility optimizations
// -----------------------------------------------
// SEO Enhancements:
// - Helmet meta tags (title, description, keywords)
// - Canonical link
// - Open Graph & Twitter card metadata
// - JSON-LD schema for Google rich results
// - Semantic headings & accessible labels
// ===============================================

import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // ✅ SEO meta tag management
import { motion, useInView } from "framer-motion";

// -----------------------------------------------
// 🎯 Counter Component (Animated number increment)
// -----------------------------------------------
const Counter = ({ target, suffix = "+", duration = 2 }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const step = target / (duration * 60);
      const counter = setInterval(() => {
        start += step;
        if (start >= target) {
          start = target;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 16); // roughly 60 frames/sec
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-sky-300">
      {count}
      {suffix}
    </span>
  );
};

// -----------------------------------------------
// 🌐 About Component
// -----------------------------------------------
const About = () => {
  const certificateLink = "/docs/iso-certificate.pdf"; // ✅ Public path for certificate download
  const scrollToCourses = () => {
    const section = document.getElementById("courses");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // -----------------------------------------------
  // 🧾 JSON-LD Structured Data
  // Helps Google identify your organization and page info
  // -----------------------------------------------
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Coder & AccoTax",
    description:
      "Coder & AccoTax is a premier training institute providing professional courses in coding, accounting, and taxation. ISO 9001:2015 certified, with over 27 years of excellence.",
    url: "https://codernaccotax.co.in/about",
    publisher: {
      "@type": "Organization",
      name: "Coder & AccoTax",
      url: "https://codernaccotax.co.in",
      logo: "https://codernaccotax.co.in/cnat.ico",
    },
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "Coder & AccoTax",
      foundingDate: "1998",
      sameAs: [
        "https://www.facebook.com/",
        "https://www.linkedin.com/",
        "https://www.instagram.com/",
      ],
    },
  };

  // -----------------------------------------------
  // 🧠 Render
  // -----------------------------------------------
  return (
    <>
      {/* 🧠 SEO Helmet Section */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Us | Coder & AccoTax</title>
        <meta
          name="description"
          content="Learn more about Coder & AccoTax — a leading training institute with 27 years of excellence in coding, accounting, and data analysis. ISO 9001:2015 certified."
        />
        <meta
          name="keywords"
          content="about coder accotax, coding institute, iso certified training, accounting classes, programming institute"
        />
        <meta name="author" content="Coder & AccoTax" />

        {/* Canonical Link */}
        <link rel="canonical" href="https://codernaccotax.co.in/about" />

        {/* Open Graph Tags (for Facebook, LinkedIn) */}
        <meta property="og:title" content="About Us | Coder & AccoTax" />
        <meta
          property="og:description"
          content="Discover Coder & AccoTax's mission, excellence, and ISO-certified achievements in coding and accounting education."
        />
        <meta
          property="og:image"
          content="https://codernaccotax.co.in/og-about.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://codernaccotax.co.in/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Us | Coder & AccoTax - 27 Years of Excellence"
        />
        <meta
          name="twitter:description"
          content="Coder & AccoTax is an ISO-certified institute offering training in coding, accounting, and data analysis."
        />
        <meta
          name="twitter:image"
          content="https://codernaccotax.co.in/og-about.png"
        />
        <meta
          name="twitter:image:alt"
          content="Coder & AccoTax - ISO Certified Institute"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* ============================================
          ABOUT SECTION
      ============================================ */}
      <section
        id="about"
        className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
      >
        {/* ✨ Animated Background */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(37,99,235,0.15),transparent_60%)]"
        ></motion.div>

        <div className="relative max-w-5xl mx-auto px-6 text-center md:text-left">
          {/* 🏫 Section Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-center mb-4 drop-shadow-lg"
          >
            About Us
          </motion.h1>

          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-8 border border-gray-700 max-w-[150px] mx-auto"
          />

          {/* 🧾 About Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-gray-900/60 border border-gray-700/50 backdrop-blur-xl shadow-lg shadow-purple-500/10 rounded-3xl p-8 md:p-10 hover:shadow-pink-500/30 transition-all duration-700"
          >
            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              <strong className="text-amber-400">Coder & AccoTax</strong> is a
              leading training institute offering courses in programming,
              accounting, taxation, and data analysis. With expert instructors
              and hands-on learning, we equip students to excel in their
              professional journeys.
            </p>

            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              We have been delivering quality education for over{" "}
              <strong className="text-amber-400">27 years</strong> and are{" "}
              <strong className="text-amber-400">ISO 9001:2015 Certified</strong>,
              maintaining high standards in teaching and infrastructure.
            </p>

            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              Our dedicated faculty consists of{" "}
              <strong className="text-amber-400">
                qualified and experienced educators
              </strong>{" "}
              who specialize across academic and professional domains.
            </p>

            <p className="text-justify leading-relaxed text-gray-300">
              Our alumni are now{" "}
              <strong className="text-amber-400">working globally</strong>,
              representing our commitment to excellence and student success.
            </p>
          </motion.div>

          {/* 🌟 Achievements Counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6 text-center"
          >
            {[
              { icon: "🎓", label: "Years of Excellence", value: 27 },
              { icon: "👩‍🎓", label: "Students Trained", value: 5000 },
              { icon: "🌐", label: "Corporate Projects", value: 200 },
              { icon: "🏆", label: "Certifications & Awards", value: 15 },
              { icon: "🏅", label: "ISO 9001:2015 Certified", isISO: true },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6 shadow-md hover:shadow-sky-500/20 transition-all duration-500"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                {stat.isISO ? (
                  <span className="text-lg font-semibold text-sky-300">
                    ISO 9001:2015
                  </span>
                ) : (
                  <Counter target={stat.value} />
                )}
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>

                {/* Download ISO Certificate */}
                {stat.isISO && (
                  <a
                    href={certificateLink}
                    download
                    className="mt-3 inline-block text-xs text-white bg-sky-700 hover:bg-sky-600 px-3 py-1 rounded-full transition-all duration-300"
                  >
                    ⬇ Download Certificate
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* 🚀 Call To Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center gap-4 text-center"
          >
            <p className="text-gray-400 italic">
              Ready to start your learning journey with us?
            </p>
            <button
              onClick={scrollToCourses}
              className="px-6 py-2 bg-gradient-to-r from-sky-600 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-sky-400/40 transition-all duration-500"
            >
              🚀 Join Us Now
            </button>
          </motion.div>

          {/* ✍️ Closing Quote */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-gray-400 italic"
          >
            “Building Future-Ready Professionals with Code, Knowledge & Confidence.”
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default About;
