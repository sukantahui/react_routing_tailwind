import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";

// -----------------------------------------------
// 🎯 Animated Counter
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
      }, 16);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-sky-400">
      {count}
      {suffix}
    </span>
  );
};

// -----------------------------------------------
// 🌐 About Component
// -----------------------------------------------
const About = () => {
  const certificateLink = "/docs/iso-certificate.pdf";

  const scrollToCourses = () => {
    const section = document.getElementById("courses");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ SEO Schema
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Coder & AccoTax",
    url: "https://codernaccotax.co.in",
    logo: "https://codernaccotax.co.in/cnat.ico",
    foundingDate: "1998",
    description:
      "Coder & AccoTax is an ISO 9001:2015 certified professional training institute in India offering hands-on courses in full stack web development, Python, accounting, taxation, and data analysis.",
    sameAs: [
      "https://www.facebook.com/",
      "https://www.linkedin.com/",
      "https://www.instagram.com/",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
  };

  return (
    <>
      <Helmet>
        <title>About Coder & AccoTax | ISO Certified Coding & Accounting Institute</title>
        <meta
          name="description"
          content="Coder & AccoTax is an ISO 9001:2015 certified training institute offering courses in web development, Python, accounting, taxation, and data analysis — with 27+ years of excellence in professional education."
        />
        <meta
          name="keywords"
          content="Coder & AccoTax, about coder accotax, ISO 9001 training institute, coding institute India, accounting courses, taxation classes, data analysis training, full stack web development, professional education"
        />
        <meta name="author" content="Coder & AccoTax" />
        <link rel="canonical" href="https://codernaccotax.co.in/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Coder & AccoTax | ISO Certified Institute" />
        <meta
          property="og:description"
          content="Learn about Coder & AccoTax, an ISO-certified institute offering world-class education in coding, accounting, taxation, and data analysis."
        />
        <meta property="og:image" content="https://codernaccotax.co.in/og-about.png" />
        <meta property="og:url" content="https://codernaccotax.co.in/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Coder & AccoTax - 27+ Years of Excellence"
        />
        <meta
          name="twitter:description"
          content="Explore the story, mission, and excellence behind Coder & AccoTax — India’s trusted name in professional education and compliance training."
        />
        <meta name="twitter:image" content="https://codernaccotax.co.in/og-about.png" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
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
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.12),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(56,189,248,0.12),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center md:text-left">
          {/* 🏫 Section Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 text-center mb-4"
          >
            About Us
          </motion.h1>

          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 border border-gray-700 max-w-[150px] mx-auto"
          />

          {/* 🧾 About Content */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 md:p-10"
          >
            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              <strong className="text-amber-400">Coder & AccoTax</strong> is a
              premier ISO 9001:2015 certified institute providing professional
              training in <strong>Full Stack Web Development</strong>,
              <strong> Python Programming</strong>, <strong>Accounting</strong>,
              <strong> Taxation</strong>, and <strong>Data Analysis</strong>. 
              Established in 1998, we’ve been a trusted name in skill-based learning
              and career-oriented education.
            </p>

            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              Over the last <strong className="text-amber-400">27 years</strong>, 
              we have trained more than <strong className="text-amber-400">5000 students</strong> 
              and professionals across India and abroad. Our mission is to bridge
              the gap between academic knowledge and real-world skills through
              practical, mentor-led learning programs.
            </p>

            <p className="text-justify mb-5 leading-relaxed text-gray-300">
              Every program at Coder & AccoTax is designed with a focus on
              <strong className="text-amber-400"> hands-on projects</strong>,
              <strong className="text-amber-400"> industry mentorship</strong>, 
              and <strong className="text-amber-400">continuous feedback</strong>.
              Our faculty includes certified trainers, developers, and finance 
              experts who bring real-world insights into the classroom.
            </p>

            <p className="text-justify leading-relaxed text-gray-300">
              We take pride in being more than just an institute — we are a 
              <strong className="text-amber-400"> community of learners</strong>, 
              <strong className="text-amber-400"> educators</strong>, and 
              <strong className="text-amber-400"> achievers</strong> united by 
              the goal of building future-ready professionals equipped to 
              thrive in a digital and data-driven world.
            </p>
          </motion.article>

          {/* 🌟 Achievements Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            aria-label="Institute Achievements and Statistics"
            className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6 text-center"
          >
            {[
              { icon: "🎓", label: "Years of Excellence", value: 27 },
              { icon: "👩‍🎓", label: "Students Trained", value: 5000 },
              { icon: "🌐", label: "Corporate Projects", value: 200 },
              { icon: "🏆", label: "Awards & Certifications", value: 15 },
              { icon: "🏅", label: "ISO 9001:2015 Certified", isISO: true },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 hover:border-sky-600 transition-all duration-500"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                {stat.isISO ? (
                  <span className="text-lg font-semibold text-sky-400">
                    ISO 9001:2015
                  </span>
                ) : (
                  <Counter target={stat.value} />
                )}
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
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
          </motion.section>

          {/* 🚀 Call To Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <p className="text-gray-400 italic mb-3">
              Ready to begin your journey toward a brighter career?
            </p>
            <button
              onClick={scrollToCourses}
              className="px-6 py-2 bg-gradient-to-r from-sky-600 to-purple-600 text-white font-medium rounded-full hover:opacity-90 transition-all duration-300"
            >
              🚀 Join Us Now
            </button>
          </motion.div>

          {/* ✍️ Inspirational Quote */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-gray-400 italic"
          >
            “Education is not just learning — it’s transformation. At Coder & AccoTax, 
            we help you code your success and calculate your growth.”
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default About;
