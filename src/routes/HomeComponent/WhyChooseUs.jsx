// ===============================================
// WhyChooseUs.jsx - Verified Google Reviews Showcase
// ===============================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import reviewsData from "../../data/reviews.json";

// Import student profile pictures
import abhirupDasImg from "../../assets/testimonials/abhirupadas.png";
import nandagopalImg from "../../assets/testimonials/nandagopal.png";
import arnabImg from "../../assets/testimonials/arnab.png";
import bhaswatiImg from "../../assets/testimonials/bhaswati.png";

const imageMap = {
  "abhirupadas.png": abhirupDasImg,
  "nandagopal.png": nandagopalImg,
  "arnab.png": arnabImg,
  "bhaswati.png": bhaswatiImg,
};

const highlights = [
  { emoji: "🙋‍♂️", title: "1-on-1 Mentorship", desc: "Personalized doubt clearing & career direction" },
  { emoji: "📅", title: "Flexible Batches", desc: "Weekday, weekend & evening slots" },
  { emoji: "💼", title: "Project-Based Learning", desc: "Real-world apps, GST filings & live code" },
  { emoji: "📚", title: "Lifetime Access", desc: "Free source code, lecture notes & repositories" },
];

const categories = ["All", "Software", "Academic", "Accounting"];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Coder+%26+AccoTax+Reviews#lrd=0x39f89b8eb3168ac5:0x7666eac9a1c26430,1,,,";

const copyEmail = async (email, e) => {
  e.stopPropagation();
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
    }
    Swal.fire({
      icon: "success",
      title: "Email Copied!",
      text: email,
      timer: 1300,
      showConfirmButton: false,
      background: "#0f172a",
      color: "#f8fafc",
      toast: true,
      position: "bottom-end",
    });
  } catch (err) {
    console.error("Copy failed", err);
  }
};

const WhyChooseUs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredReviews =
    selectedCategory === "All"
      ? reviewsData
      : reviewsData.filter((r) => r.category === selectedCategory);

  const visibleReviews =
    showAll || selectedCategory !== "All" ? filteredReviews : filteredReviews.slice(0, 6);

  return (
    <section id="why-choose-us" className="py-16 bg-slate-950 text-slate-100 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/60 px-3 py-1 rounded-full">
            Why Students Trust Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
            Key Advantages & Google Reviews
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Over 25+ years of teaching excellence in Barrackpore. Verified feedback from students and alumni
            who are now professors, software developers, and tax professionals.
          </p>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-14">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-slate-900/70 border border-slate-800/90 hover:border-purple-500/40 rounded-2xl p-4 text-center transition-all duration-300 shadow-lg shadow-black/20 group hover:scale-[1.02]"
            >
              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                {item.emoji}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Reviews Subheader & Filter Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pt-4 border-t border-slate-800/80">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Google Verified Reviews</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <i className="bi bi-google text-[10px]"></i>
                <span>4.9 / 5.0 (100+ Reviews)</span>
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Featuring profile pictures, student designations, course tags, and contact details.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence>
            {visibleReviews.map((review, idx) => {
              const photo = imageMap[review.image];
              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-slate-900/70 border border-slate-800/90 hover:border-sky-500/40 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-xl shadow-xl shadow-black/20 hover:shadow-sky-500/10 transition-all duration-300"
                >
                  <div>
                    {/* Top Row: Stars + Google Source Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-400 text-xs tracking-wider">
                          {"★".repeat(review.rating)}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">5.0</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-sky-400 border border-slate-700/80 flex items-center gap-1">
                        <i className="bi bi-google text-[9px]"></i>
                        <span>{review.tag}</span>
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-4">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Author Info & Profile Details */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center gap-3">
                      {photo ? (
                        <img
                          src={photo}
                          alt={review.name}
                          className="w-11 h-11 rounded-full object-cover border border-sky-400/60 flex-shrink-0 shadow-md"
                        />
                      ) : (
                        <div
                          className={`w-11 h-11 rounded-full bg-gradient-to-br ${
                            review.avatarColor || "from-sky-500 to-indigo-600"
                          } flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md`}
                        >
                          {review.initials || review.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                          <span>{review.name}</span>
                          <i
                            className="bi bi-patch-check-fill text-sky-400 text-[11px]"
                            title="Verified Google Reviewer"
                          ></i>
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">{review.role}</p>
                        <p className="text-[10px] text-purple-400 truncate">{review.company}</p>
                      </div>
                    </div>

                    {/* Student / Alumni Email Contact */}
                    {review.email && (
                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 bg-slate-950/60 border border-slate-800/80 rounded-lg px-2.5 py-1">
                        <a
                          href={`mailto:${review.email}`}
                          className="truncate hover:text-sky-400 transition flex items-center gap-1.5"
                          title={`Email ${review.name}`}
                        >
                          <i className="bi bi-envelope text-slate-500 text-[10px]"></i>
                          <span className="truncate">{review.email}</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => copyEmail(review.email, e)}
                          className="text-slate-500 hover:text-sky-400 ml-1.5 flex-shrink-0"
                          title="Copy Email"
                          aria-label={`Copy email for ${review.name}`}
                        >
                          <i className="bi bi-copy text-[10px]"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        {selectedCategory === "All" && (
          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>{showAll ? "Show Fewer Reviews" : "View All 10 Reviews"}</span>
              <i className={`bi bi-chevron-${showAll ? "up" : "down"}`}></i>
            </button>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-xs font-semibold transition inline-flex items-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              <i className="bi bi-google"></i>
              <span>Read 100+ Live Google Reviews (4.9 ★)</span>
              <i className="bi bi-box-arrow-up-right text-[10px]"></i>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
