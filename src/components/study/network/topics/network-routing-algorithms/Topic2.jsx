import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Distance Vector Routing
 * 
 * Component Purpose:
 *   Explain the Distance Vector routing algorithm used in network layer routing.
 *   Focuses on Bellman-Ford equation, periodic updates, count-to-infinity problem,
 *   and practical mitigations like split horizon with poison reverse.
 * 
 * Props: None
 * Returns: JSX.Element
 * 
 * When & Why:
 *   Used in networking courses to teach how routers in a decentralized manner
 *   compute shortest paths using local information exchanged with neighbors.
 */

const Topic2 = () => {
  // Track if animation should respect reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Animate counters optional? Not required but for visual interest.
  // Focus on explanation

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      {/* Header Section */}
      <header
        className={clsx(
          "mb-12 text-center",
          !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
        )}
        style={{ animationFillMode: "forwards" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3">
          Distance Vector Routing
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Distributed, iterative algorithm where routers share their routing
          tables (vectors) with neighbors to discover the best paths.
        </p>
      </header>

      {/* Main content grid: left side main text, right side visual? Actually follow vertical stacking */}
      <div className="space-y-10">
        {/* 1. Concept + Theory detailed */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4 dark:text-indigo-300 text-indigo-700">
            📡 Core Concept & Theory
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Distance Vector (DV) routing is a distributed asynchronous algorithm
              used in networks like <strong className="font-mono">RIP (Routing Information Protocol)</strong>.
              Each router maintains a <strong>distance vector</strong> containing the
              estimated cost (distance) to every known destination. Routers periodically
              send their entire vector to directly connected neighbors.
            </p>
            <p>
              The core update rule is the <strong className="text-indigo-600 dark:text-indigo-400">Bellman-Ford equation</strong>:
            </p>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-center font-mono text-lg">
              d<sub>x</sub>(y) = min<sub>v</sub> {`{`} c(x,v) + d<sub>v</sub>(y) {`}`}
            </div>
            <p>
              Where d<sub>x</sub>(y) is the cost from router x to destination y, c(x,v) is
              cost to neighbor v, and d<sub>v</sub>(y) is neighbor's cost to y.
            </p>
            <p>
              <strong>Real-world example:</strong> In a college campus network (Barrackpore Engineering College),
              router R1 (hostel wing) shares its table with R2 (academic block). When R1
              learns from R2 that reaching Jadavpur University's server costs 5 hops instead of 7,
              it updates its own vector.
            </p>
          </div>
        </section>

        {/* 2. SVG Illustration: Step-by-step distance vector exchange */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4 dark:text-indigo-300 text-indigo-700">
            🧭 Algorithm Walkthrough (SVG)
          </h2>
          <div className="flex justify-center overflow-x-auto">
            <SVGRoutingIllustration prefersReducedMotion={prefersReducedMotion} />
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
            Routers A, B, C, D with initial vectors. Observe how distance to D evolves after exchange.
          </p>
        </section>

        {/* 3. Real-world Usage & Professional Tips */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4 dark:text-indigo-300 text-indigo-700">
            💼 Real-world Usage & Pro Tips
          </h2>
          <div className="space-y-3">
            <p>
              <strong>Used in:</strong> RIP (max 15 hops), IGRP (Cisco's interior gateway),
              early ARPANET, and small-to-medium autonomous systems.
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
              <p className="font-semibold">✨ Professional tips:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Always enable <strong>split horizon</strong> to avoid telling a neighbor about routes learned from that same neighbor.</li>
                <li>Use <strong>poison reverse</strong> for problematic loops — advertise infinity (16 in RIP) back.</li>
                <li>Tune update timers (30s RIP) and hold-down timers to reduce flapping.</li>
              </ul>
            </div>
            <p>
              <strong>Story:</strong> Mahima, a network engineer at Ichapur Data Center,
              fixed a persistent packet loop by enabling poison reverse on a misconfigured
              edge router — lowering convergence time from 3 minutes to under 10 seconds.
            </p>
          </div>
        </section>

        {/* 4. Common Mistakes & Pitfalls */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4 dark:text-red-300 text-red-700">
            ⚠️ Common Beginner Mistakes
          </h2>
          <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
            <li><strong>Counting to Infinity:</strong> Not implementing route poisoning → loop persists for minutes.</li>
            <li><strong>Misinterpreting "distance":</strong> Using hop count without considering link bandwidth (RIP's flaw).</li>
            <li><strong>Forgetting split horizon:</strong> Router A tells B: "I can reach C via you" causing transient loops.</li>
            <li><strong>Periodic vs triggered updates:</strong> Relying only on timers instead of sending immediate updates after link change.</li>
          </ul>
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="font-mono text-sm">🧠 Misconception: "Distance vector always converges quickly". Actually, count-to-infinity makes convergence slow without good mechanisms like hold-down timers.</p>
          </div>
        </section>

        {/* 5. Best Practices & Mini Checklist */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4 dark:text-green-300 text-green-700">
            ✅ Best Practices & Checklist
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold">Coding / Config Standards:</p>
              <ul className="list-check space-y-1 mt-2 list-disc pl-5">
                <li>Use authentication when deploying DV protocols (RIP v2)</li>
                <li>Set maximum hop count (e.g., 15) to bound infinity</li>
                <li>Implement triggered updates on topology change</li>
                <li>Monitor via `show ip rip database` (Cisco)</li>
              </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-bold">📋 Student Mini Checklist:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>✓ Understand Bellman-Ford equation</li>
                <li>✓ Differentiate periodic vs triggered updates</li>
                <li>✓ Explain why count-to-infinity happens</li>
                <li>✓ Describe poison reverse effect</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Hint Section: Subtle guidance */}
        <div
          className={clsx(
            "bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl p-5",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">💡 Hints for deeper thinking</h3>
          <ul className="mt-2 space-y-1 italic text-gray-700 dark:text-gray-300">
            <li>🔍 <strong>Think about:</strong> Why does increasing the 'infinity' value delay convergence?</li>
            <li>👀 <strong>Observe carefully:</strong> How does a router differentiate a freshly learned route from a stale one after a neighbor reboot?</li>
            <li>⚙️ <strong>Try changing this:</strong> In a simulation, reduce the update interval from 30s to 5s — what trade-offs emerge?</li>
          </ul>
        </div>

        {/* 7. FAQ Component */}
        <FAQTemplate title="Distance Vector Routing: Frequently Asked Questions" questions={questions} />

        {/* 8. Teacher's Note */}
        <Teacher
          note={
            "When teaching Distance Vector, emphasize the iterative \"good news travels fast, bad news travels slow\" property. Use visuals of the count-to-infinity scenario (three routers in a line). Let students implement a mini DV simulation in Python to see how poison reverse cures simple loops. Remind them: RIP's 15-hop limit is a direct result of the infinity definition."
          }
        />
      </div>

      {/* Global keyframes for fade+slide-up, styled component scoped */}
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.6s_ease-out_forwards\\] {
            animation: none !important;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

/* SVG Illustration Component: Distance Vector update process with routers A,B,C,D */
const SVGRoutingIllustration = ({ prefersReducedMotion }) => {
  const [step, setStep] = useState(0);
  const [hoverRouter, setHoverRouter] = useState(null);
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const routers = [
    { id: "A", x: 80, y: 100, label: "Router\nA (Kolkata)", vector: step >= 1 ? "D→A: via B (3)" : "d(D)=∞" },
    { id: "B", x: 280, y: 50, label: "Router\nB (Barrackpore)", vector: step >= 2 ? "D→B: 2" : "d(D)=∞" },
    { id: "C", x: 280, y: 180, label: "Router\nC (Ichapur)", vector: step >= 3 ? "D→C: 1" : "d(D)=1" },
    { id: "D", x: 480, y: 110, label: "Router\nD (Jadavpur)", vector: "d(D)=0" },
  ];

  // Links: A-B, A-C, B-D, C-D
  const links = [
    { from: "A", to: "B", cost: 1 },
    { from: "A", to: "C", cost: 5 },
    { from: "B", to: "D", cost: 2 },
    { from: "C", to: "D", cost: 1 },
  ];

  const getCoordinates = (id) => routers.find((r) => r.id === id) || { x: 0, y: 0 };

  return (
    <div className="flex flex-col items-center">
      <svg width="560" height="270" viewBox="0 0 560 270" className="bg-gray-50 dark:bg-gray-700/20 rounded-xl shadow-inner p-1">
        {/* Draw links */}
        {links.map((link) => {
          const fromCoord = getCoordinates(link.from);
          const toCoord = getCoordinates(link.to);
          return (
            <g key={`link-${link.from}-${link.to}`} className="transition-all duration-300">
              <line
                x1={fromCoord.x} y1={fromCoord.y}
                x2={toCoord.x} y2={toCoord.y}
                stroke="#6c757d" strokeWidth="2" strokeDasharray="5 3"
              />
              <text x={(fromCoord.x + toCoord.x) / 2} y={(fromCoord.y + toCoord.y) / 2 - 5} fill="#e67e22" fontSize="12" fontWeight="bold">
                {link.cost}
              </text>
              {/* Animate arrow if needed */}
              {!prefersReducedMotion && (
                <>
                  <line x1={fromCoord.x} y1={fromCoord.y} x2={toCoord.x} y2={toCoord.y} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 6">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.8s" repeatCount="indefinite" />
                  </line>
                </>
              )}
            </g>
          );
        })}
        {/* Draw routers */}
        {routers.map((router) => (
          <g
            key={router.id}
            onMouseEnter={() => setHoverRouter(router.id)}
            onMouseLeave={() => setHoverRouter(null)}
            className="transition-transform duration-200"
            style={{ cursor: "pointer", transform: hoverRouter === router.id ? "scale(1.05)" : "scale(1)" }}
          >
            <circle cx={router.x} cy={router.y} r="22" fill={router.id === "D" ? "#10b981" : "#3b82f6"} stroke="#fff" strokeWidth="3" />
            <text x={router.x} y={router.y + 4} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{router.id}</text>
            <text x={router.x} y={router.y - 28} textAnchor="middle" fill="currentColor" fontSize="10" className="fill-gray-700 dark:fill-gray-200">
              {router.label.split("\n").map((t, i) => (
                <tspan x={router.x} dy={i === 0 ? 0 : 12} key={i}>{t}</tspan>
              ))}
            </text>
            <text x={router.x + 30} y={router.y - 12} fontSize="9" fill="#475569" className="dark:fill-gray-300">
              {router.vector}
            </text>
            {hoverRouter === router.id && (
              <circle cx={router.x} cy={router.y} r="28" fill="none" stroke="#fbbf24" strokeWidth="2" r="28">
                <animate attributeName="r" values="22;30;22" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}
        <text x="280" y="250" textAnchor="middle" fontSize="12" fill="#94a3b8">
          Step: {step} — Distance vectors sharing: C announces 1 to D; B updates; A learns route via B.
        </text>
      </svg>
      <div className="flex gap-2 mt-3">
        <button onClick={() => setStep((s) => (s + 3) % 4)} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 rounded-full text-sm hover:scale-105 transition">◀ Prev</button>
        <button onClick={() => setStep((s) => (s + 1) % 4)} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 rounded-full text-sm hover:scale-105 transition">Next ▶</button>
      </div>
    </div>
  );
};

export default Topic2;