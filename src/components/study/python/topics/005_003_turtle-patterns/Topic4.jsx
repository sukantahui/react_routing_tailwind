import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";

// Import Python Files
import starSchlafliCode from "./topic4_files/star_polygon_schlafli.py?raw";
import starMandalaCode from "./topic4_files/multi_pointed_mandala_stars.py?raw";
import islamicOctagramCode from "./topic4_files/islamic_octagram_rosette.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes starPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;

const Topic4 = () => {
  const [selectedStar, setSelectedStar] = useState("5_2"); // 5_2, 7_2, 7_3, 8_3, 8_2

  const starDefinitions = {
    "5_2": { name: "Pentagram {5/2}", p: 5, q: 2, turn: 144, tip: 36, color: "#fbbf24", desc: "Classic 5-pointed star with golden ratio intersections." },
    "7_2": { name: "Heptagram {7/2}", p: 7, q: 2, turn: 102.86, tip: 77.14, color: "#38bdf8", desc: "Wide 7-pointed star with obtuse vertex tips." },
    "7_3": { name: "Acute Heptagram {7/3}", p: 7, q: 3, turn: 154.29, tip: 25.71, color: "#34d399", desc: "Sharp needle-pointed 7-pointed star." },
    "8_3": { name: "Octagram {8/3}", p: 8, q: 3, turn: 135, tip: 45, color: "#f43f5e", desc: "8-pointed regular star with 135° turns." },
    "8_2": { name: "Islamic Octagram {8/2}", p: 8, q: 2, turn: 90, tip: 90, color: "#a78bfa", desc: "Compound star formed by two 45°-rotated squares (Rub el Hizb)." }
  };

  const current = starDefinitions[selectedStar] || starDefinitions["5_2"];

  const prototypes = [
    {
      name: "Star Turn: (q * 360) / p",
      returnType: "float / deg",
      purpose: "Steering turn angle for regular star polygon with p vertices and stride q.",
      usage: "turn = (q * 360.0) / p"
    },
    {
      name: "Schläfli Symbol: {p/q}",
      returnType: "Fraction Notation",
      purpose: "Classifies star topology where gcd(p, q) == 1 for unicursal continuous stars.",
      usage: "p = vertices, q = density"
    },
    {
      name: "Compound Stars: gcd(p,q) &gt; 1",
      returnType: "Overlapping Polygons",
      purpose: "Decomposes into gcd(p, q) overlapping regular polygons (e.g. 2 squares for {8/2}).",
      usage: "draw_rotated_squares(offset=45)"
    },
    {
      name: "Radial Star Mandala: 360 / N",
      returnType: "Rotational Rosette",
      purpose: "Rotates star motifs across N radial spokes to construct kaleidoscopic mandalas.",
      usage: "for _ in range(12): draw_star(); t.left(30)"
    }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================================
            HERO SECTION
        ========================================================================= */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_003 · Turtle Patterns & Geometric Mathematics · Topic 4
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-rose-300 to-indigo-400 bg-clip-text text-transparent">
            Angle Mathematics in Star Polygons & Mandalas
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master the Schläfli symbol <code className="text-amber-300 font-mono">{"{p/q}"}</code>. Derive the <code className="text-emerald-300 font-mono">144°</code> pentagram turn rule, construct Islamic 8-pointed octagrams, and engineer rotational sacred geometry mandalas.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⭐ Schläfli {"{p/q}"} Theorem
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📐 θ = (q × 360°) / p
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🕌 Islamic Octagrams & Mandalas
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE STAR POLYGON STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>⭐</span> Interactive Star Polygon & Schläfli Studio
              </h3>
              <p className="text-xs text-slate-400">
                Select a star polygon to inspect its vertex topology, stride density, and steering turn angle.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {Object.entries(starDefinitions).map(([key, star]) => (
                <button
                  key={key}
                  onClick={() => setSelectedStar(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedStar === key
                      ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                &gt;
                  {star.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* SVG Star Polygon Representation */}
            <div className="flex justify-center">
              <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                <circle cx="150" cy="120" r="85" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

                {selectedStar === "8_2" ? (
                  // Islamic Compound Octagram (Two Rotated Squares)
                  <g>
                    <rect x="90" y="60" width="120" height="120" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                    <rect
                      x="90"
                      y="60"
                      width="120"
                      height="120"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2.5"
                      transform="rotate(45 150 120)"
                    />
                  </g>
                ) : (
                  // Unicursal Star Polygon
                  (() => {
                    const r = 85;
                    const p = current.p;
                    const q = current.q;
                    const pts = [];
                    for (let i = 0; i < p; i++) {
                      const angle = (i * 2 * Math.PI) / p - Math.PI / 2;
                      pts.push({ x: 150 + r * Math.cos(angle), y: 120 + r * Math.sin(angle) });
                    }

                    // Build star path stepping by stride q
                    const pathCoords = [];
                    let idx = 0;
                    pathCoords.push(`${pts[0].x},${pts[0].y}`);
                    for (let i = 0; i < p; i++) {
                      idx = (idx + q) % p;
                      pathCoords.push(`${pts[idx].x},${pts[idx].y}`);
                    }

                    return (
                      <polyline
                        points={pathCoords.join(" ")}
                        fill={`${current.color}22`}
                        stroke={current.color}
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    );
                  })()
                )}

                {/* Center dot */}
                <circle cx="150" cy="120" r="4" fill="#ffffff" />
                <text x="150" y="140" fill="#94a3b8" fontSize="10" textAnchor="middle">Center (0,0)</text>
              </svg>
            </div>

            {/* Mathematics Breakdown Card */}
            <div className="space-y-3 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-amber-400 flex items-center justify-between">
                <span>{current.name}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                  p={current.p}, q={current.q}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed text-[11px]">{current.desc}</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Exterior Turn Angle</div>
                  <div className="text-lg font-mono font-bold text-sky-400">{current.turn.toFixed(1)}°</div>
                  <div className="text-[10px] text-slate-500">(q × 360°) / p</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Point Tip Angle</div>
                  <div className="text-lg font-mono font-bold text-emerald-400">{current.tip.toFixed(1)}°</div>
                  <div className="text-[10px] text-slate-500">180° - Turn Angle</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Star Polygon Mathematical Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Star Topology</th>
                  <th className="py-3 px-4">Schläfli {"{p/q}"}</th>
                  <th className="py-3 px-4">Turn Formula</th>
                  <th className="py-3 px-4">Python Expression</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-amber-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-sky-300 text-xs">{proto.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            PYTHON CODE IMPLEMENTATION FILES
        ========================================================================= */}
        <div className="space-y-6 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>💻</span> Professional Python Star Polygon Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: star_polygon_schlafli.py */}
            <PythonFileLoader
              fileModule={starSchlafliCode}
              title="star_polygon_schlafli.py"
              highlightLines={[19, 20, 21, 29, 30]}
            />

            {/* File 2: multi_pointed_mandala_stars.py */}
            <PythonFileLoader
              fileModule={starMandalaCode}
              title="multi_pointed_mandala_stars.py"
              highlightLines={[19, 23, 24, 28]}
            />

            {/* File 3: islamic_octagram_rosette.py */}
            <PythonFileLoader
              fileModule={islamicOctagramCode}
              title="islamic_octagram_rosette.py"
              highlightLines={[18, 22, 27, 29]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-amber-400 text-lg flex items-center gap-2">
              <span>🕌</span> Barrackpore Heritage Expo: Rub el Hizb Islamic Star
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita and Mahima recreate traditional Mughal architectural tessellations by constructing the 8-pointed Rub el Hizb octagram. By overlaying two filled squares rotated by 45 degrees, they demonstrate how compound star mathematics (<code className="text-amber-300 font-mono">{"{8/2}"}</code>) forms the foundation of historical tile geometry.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>⭐</span> Jadavpur Mathematics Festival: 12-Spoke Star Mandala
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu programs a 12-spoke rotational mandala where each spoke draws a 5-pointed star (<code className="text-sky-300 font-mono">144°</code> turns) and rotates <code className="text-emerald-300 font-mono">30°</code>. The overlapping golden ratio diagonals produce an intricate sacred geometry mandala for the university tech festival.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Star Polygon Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Using 72° Instead of 144° for a Star</strong>
              <p className="text-slate-400">
                Turning 72° draws a regular pentagon, NOT a star! A 5-pointed star requires skipping a vertex, turning <code className="text-emerald-300 font-mono">2 × 72° = 144°</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Non-Coprime Stride Deadlock</strong>
              <p className="text-slate-400">
                Trying to draw {"{6/2}"} as a single continuous line loops over 3 vertices endlessly. When <code className="text-amber-300 font-mono">{"gcd(p, q) &gt; 1"}</code>, multiple distinct polygons must be drawn.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Even-Odd Center Fill Hollowing</strong>
              <p className="text-slate-400">
                Using <code className="text-rose-300">begin_fill()</code> on self-intersecting stars under even-odd parity leaves the central pentagon empty. Use convex facet fills for solid coloring.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Hardcoded Star Angles</strong>
              <p className="text-slate-400">
                Hardcoding 144° prevents generating 7-pointed or 8-pointed stars. Always use the universal equation <code className="text-emerald-300 font-mono">(q * 360) / p</code>!
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT CHECKLIST
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold text-emerald-400 mb-3">📝 Student Mastery Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
            {[
              "I know the universal star polygon turn formula: theta = (q * 360) / p",
              "I understand why a 5-pointed star {5/2} requires a 144° turn angle",
              "I know why p and q must be coprime (gcd=1) for single-path stars",
              "I can construct the Islamic 8-pointed Rub el Hizb using two 45°-rotated squares",
              "I know how to build multi-spoke star mandalas using radial pivots (360 / spokes)",
              "I understand the difference between wide stars ({7/2}) and acute stars ({7/3})"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/60 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            HINTS & EXPERT MINDSET
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> Why the diagonals of a regular 5-pointed star divide each other in the Golden Ratio (<code className="text-amber-300 font-mono">phi ≈ 1.618</code>)!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How increasing the stride <code className="text-sky-300 font-mono">q</code> from 2 to 3 in a 7-pointed star makes the points dramatically sharper and more needle-like!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Overlay 3 equilateral triangles rotated by 40° to construct an Islamic 9-pointed star ({'{9/3}'})!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Star polygons bridge pure number theory (modular arithmetic, coprimality, and Euclidean GCD) with classical geometry and artistic ornamental design. In computational graphics, understanding <strong>non-convex winding topologies</strong> is critical for polygon rasterization, vector font glyph rendering (TrueType/OpenType), and CAD triangulation algorithms.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Star Polygons & Mandala Geometry FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Star Polygons Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic4_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we teach star polygons at Coder & AccoTax in Barrackpore and Kolkata, the leap from regular polygons (360/N) to star polygons ((q*360)/N) is a thrilling revelation for students. When they discover that simply multiplying by density 'q' transforms a Pentagon into a glowing Star, and that two 45-degree squares create sacred Islamic architecture, programming transforms into an exhilarating creative superpower!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic4;
