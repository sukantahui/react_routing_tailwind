import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic37_files/topic37_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic37_files/topic37_note.txt?raw";

/**
 * Topic37: Social and practical applications of Linear Programming
 *
 * @component
 * @returns {JSX.Element} The rendered Topic37 component
 *
 * @purpose Provides a comprehensive overview of the diverse applications
 * of Linear Programming across industries, government, and social sectors,
 * demonstrating the versatility and practical value of LP.
 *
 * @when_used After mastering LP fundamentals and worked examples (Topics 0-36),
 * this topic showcases the breadth of LP applications in the real world.
 */
const Topic37 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 37
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Applications of LP
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Social and Practical Applications of Linear Programming
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          From manufacturing to healthcare, from agriculture to social policy —
          exploring the diverse world of LP applications.
        </p>
      </header>

      {/* ===== SECTION 1: INTRODUCTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            The Power of Linear Programming
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            Linear Programming is not just a mathematical tool—it is a
            <strong> powerful decision-making framework</strong> used across
            industries, governments, and social sectors. From optimizing
            factory production to allocating healthcare resources, LP helps
            make the world more efficient.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold">
              💡 Remember: LP is everywhere — you just need to know where to look.
              The same mathematical tools that optimize factory production can
              also help hospitals, schools, and governments make better decisions.
            </p>
          </div>
        </div>

        {/* SVG: Applications overview */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50/40 to-purple-50/40 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl p-4 md:p-6 border border-indigo-100 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
          <svg
            viewBox="0 0 650 250"
            className="w-full h-auto"
            aria-label="LP applications overview"
            role="img"
          >
            <text x="325" y="25" fontSize="16" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Where is LP Used?
            </text>

            {/* Business */}
            <rect x="20" y="50" width="140" height="60" rx="10" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
            <text x="90" y="75" fontSize="14" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Business</text>
            <text x="90" y="95" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Manufacturing</text>

            {/* Finance */}
            <rect x="180" y="50" width="140" height="60" rx="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
            <text x="250" y="75" fontSize="14" fill="#22c55e" textAnchor="middle" fontWeight="bold">Finance</text>
            <text x="250" y="95" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Investment</text>

            {/* Healthcare */}
            <rect x="340" y="50" width="140" height="60" rx="10" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" />
            <text x="410" y="75" fontSize="14" fill="#a855f7" textAnchor="middle" fontWeight="bold">Healthcare</text>
            <text x="410" y="95" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Hospitals</text>

            {/* Government */}
            <rect x="500" y="50" width="140" height="60" rx="10" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
            <text x="570" y="75" fontSize="14" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Government</text>
            <text x="570" y="95" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Public Policy</text>

            {/* Agriculture */}
            <rect x="100" y="140" width="140" height="60" rx="10" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
            <text x="170" y="165" fontSize="14" fill="#ef4444" textAnchor="middle" fontWeight="bold">Agriculture</text>
            <text x="170" y="185" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Farming</text>

            {/* Environment */}
            <rect x="260" y="140" width="140" height="60" rx="10" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />
            <text x="330" y="165" fontSize="14" fill="#10b981" textAnchor="middle" fontWeight="bold">Environment</text>
            <text x="330" y="185" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Sustainability</text>

            {/* Transportation */}
            <rect x="420" y="140" width="140" height="60" rx="10" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="2" />
            <text x="490" y="165" fontSize="14" fill="#8b5cf6" textAnchor="middle" fontWeight="bold">Transport</text>
            <text x="490" y="185" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Logistics</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            LP is used across virtually every sector of society.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: BUSINESS APPLICATIONS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏢</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Business and Industrial Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🏭 Manufacturing",
              applications: "Production planning, product mix optimization, capacity planning, inventory management",
              example: "Deciding how many units of each product to produce with limited resources.",
            },
            {
              domain: "📦 Logistics & Supply Chain",
              applications: "Transportation, route optimization, warehouse location, fleet management",
              example: "Finding the cheapest way to ship goods from factories to warehouses.",
            },
            {
              domain: "💰 Finance & Investment",
              applications: "Portfolio optimization, asset allocation, risk management, budgeting",
              example: "Choosing investments to maximize return while minimizing risk.",
            },
            {
              domain: "📢 Marketing",
              applications: "Advertising budget allocation, media mix optimization, pricing strategies",
              example: "Spending a marketing budget across channels to maximize reach.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.domain}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">Applications:</span> {item.applications}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="font-medium">Example:</span> {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: SOCIAL APPLICATIONS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏥</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Social and Public Sector Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🏥 Healthcare",
              applications: "Hospital staffing, resource allocation, patient scheduling, medical supply distribution",
              example: "Scheduling nurses to shifts to meet patient care requirements.",
            },
            {
              domain: "📚 Education",
              applications: "School budgeting, teacher assignment, course scheduling, resource allocation",
              example: "Allocating teachers to classes based on subject expertise.",
            },
            {
              domain: "🏛️ Government",
              applications: "Public resource allocation, infrastructure planning, social program optimization",
              example: "Distributing budget across public services to maximize citizen satisfaction.",
            },
            {
              domain: "🤝 Non-Profit",
              applications: "Donation allocation, volunteer scheduling, program planning, fund distribution",
              example: "Allocating donations to programs with the greatest social impact.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                <span className="font-medium">Applications:</span> {item.applications}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                <span className="font-medium">Example:</span> {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: AGRICULTURAL APPLICATIONS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌾</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Agricultural Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🌱 Crop Selection",
              description: "Choosing which crops to plant based on profit and resource availability.",
              example: "Deciding between wheat, rice, and sugarcane with limited land and water.",
            },
            {
              domain: "💧 Water Management",
              description: "Allocating water resources among different crops and fields.",
              example: "Distributing irrigation water to maximize crop yield.",
            },
            {
              domain: "🧪 Fertilizer Optimization",
              description: "Determining the optimal amount and type of fertilizer for each crop.",
              example: "Minimizing fertilizer cost while meeting crop nutrient needs.",
            },
            {
              domain: "📅 Harvest Planning",
              description: "Scheduling harvest operations to minimize losses and maximize efficiency.",
              example: "Planning harvest timing and labor allocation.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-green-800 dark:text-green-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.description}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                <span className="font-medium">Example:</span> {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: TRANSPORTATION APPLICATIONS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🚚</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Transportation Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🛣️ Route Planning",
              description: "Finding the most efficient routes for vehicles.",
              example: "Optimizing delivery routes to minimize distance and fuel costs.",
            },
            {
              domain: "✈️ Fleet Scheduling",
              description: "Assigning vehicles to routes and schedules.",
              example: "Scheduling aircraft to flights to maximize utilization.",
            },
            {
              domain: "🚌 Public Transit",
              description: "Planning bus and train schedules to meet demand.",
              example: "Optimizing bus frequencies and routes for city transport.",
            },
            {
              domain: "🚦 Traffic Flow",
              description: "Optimizing traffic signals and flow patterns.",
              example: "Adjusting traffic light timing to minimize congestion.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.description}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                <span className="font-medium">Example:</span> {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 6: REAL-WORLD CASE STUDIES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Case Studies
          </h2>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h3 className="font-semibold text-gray-900 dark:text-white">✈️ Airlines: Crew Scheduling</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Airlines use LP to assign crews to flights while minimizing costs
              and meeting regulatory requirements. This saves millions annually
              by optimizing crew utilization.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="font-medium">Key LP Features:</span> Assignment
              constraints, minimum rest periods, cost minimization.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h3 className="font-semibold text-gray-900 dark:text-white">🏥 Healthcare: Nurse Scheduling</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Hospitals use LP to schedule nurses to shifts, balancing patient
              care requirements with staff preferences and minimizing overtime
              costs. This improves patient outcomes and staff satisfaction.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="font-medium">Key LP Features:</span> Staffing
              requirements, shift preferences, cost minimization.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h3 className="font-semibold text-gray-900 dark:text-white">🌾 Agriculture: Crop Rotation</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Farmers use LP to plan crop rotations that maximize profit while
              maintaining soil health and meeting sustainability goals. This
              leads to higher yields and lower environmental impact.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="font-medium">Key LP Features:</span> Land
              allocation, crop rotation constraints, profit maximization.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: KEY INSIGHTS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💡</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Key Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "🔧",
              title: "Universal Tool",
              desc: "LP is applicable to almost any industry or sector.",
            },
            {
              icon: "📊",
              title: "Same Math, Different Problems",
              desc: "The same LP techniques solve diverse problems.",
            },
            {
              icon: "🧠",
              title: "Understanding is Key",
              desc: "Knowing the problem is more important than knowing the math.",
            },
            {
              icon: "🎯",
              title: "Data-Driven Decisions",
              desc: "LP enables objective, evidence-based decision-making.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 8: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Start simple",
              desc: "Begin with a basic model, then add complexity as needed.",
            },
            {
              title: "Collaborate with experts",
              desc: "Domain experts help identify all relevant constraints.",
            },
            {
              title: "Use sensitivity analysis",
              desc: "Test how changes affect the solution for robustness.",
            },
            {
              title: "Document assumptions",
              desc: "Clear documentation helps others understand the model.",
            },
            {
              title: "Use real data",
              desc: "Real data makes the solution practical and actionable.",
            },
            {
              title: "Consider all stakeholders",
              desc: "Include constraints from all affected parties.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 9: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Common Pitfalls
          </h2>
        </div>
        <div className="bg-red-50/40 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/30 p-5">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            {[
              {
                mistake: "Thinking LP is only for business",
                fix: "LP applies to social, environmental, and public sector problems too.",
              },
              {
                mistake: "Overlooking social applications",
                fix: "Healthcare, education, and government are major LP users.",
              },
              {
                mistake: "Not considering all constraints",
                fix: "Real-world problems have many constraints.",
              },
              {
                mistake: "Forgetting real-world limitations",
                fix: "Include practical constraints like budgets and regulations.",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-500 dark:text-red-400 text-lg flex-shrink-0 mt-0.5">✗</span>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{item.mistake}</span>
                  <br />
                  <span className="text-gray-600 dark:text-gray-400 text-xs">✓ {item.fix}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 10: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Understand the problem domain thoroughly.",
            "Identify all stakeholders and their needs.",
            "Consider all relevant constraints.",
            "Validate the model with domain experts.",
            "Use real data when possible.",
            "Start simple, then add complexity.",
            "Use sensitivity analysis for robustness.",
            "Document assumptions and limitations.",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-green-500 dark:text-green-400 text-lg flex-shrink-0">✓</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 11: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> What LP applications do you
                see in your daily life? Can you identify optimization problems
                around you?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Think of a local business
                or organization. How could they use LP to improve their operations?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Abhronila is the mayor
                of a small city. She has a budget to allocate across police, fire,
                parks, and libraries. How would she use LP to maximize citizen
                satisfaction?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 12: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Mini Checklist
          </h2>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            After this topic, you should be able to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {[
              "✅ Identify LP applications across multiple sectors",
              "✅ Explain how LP is used in business and industry",
              "✅ Describe social applications of LP",
              "✅ Recognize agricultural and environmental applications",
              "✅ Understand transportation and logistics applications",
              "✅ Identify real-world case studies of LP",
              "✅ Apply LP thinking to new problems",
              "✅ See LP as a versatile decision-making tool",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 13: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <FAQTemplate
          title="Applications of LP FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <PlainTextPrint
          content={noteText}
          title="Applications of LP - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic37_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1250">
        <Teacher
          note={
            "This topic is the culmination of everything we've learned. I tell my students: 'You now have a tool that can help solve problems in almost any field.' The beauty of LP is its versatility—the same mathematical framework that optimizes a factory production line can also help a hospital schedule nurses or a government allocate resources. Debangshu from Kolkata once told me he started seeing LP applications everywhere after completing this course—from planning his daily schedule to optimizing his family's business. Remember: the key to successful LP application is understanding the problem deeply. The math is the easy part; the real skill is identifying the right variables, objective, and constraints. As you go forward, keep your eyes open for optimization problems in your work and community. With the skills you've learned, you can make a real difference."
          }
        />
      </div>
    </div>
  );
};

export default Topic37;