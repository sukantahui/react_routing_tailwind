import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  FileCode,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Layers,
  Clock,
  FolderGit2,
  Zap,
  Users,
  Database,
  Eye,
  Trash2,
  Sliders,
  Check,
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  GitMerge,
  Network,
  ShieldAlert,
  Flame,
  KeyRound,
  Shield,
  MessageSquare
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic 12: Classroom Drama: Sachin and Susmita editing the same AuthController.js file simultaneously, triggering and resolving complex merge conflicts
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic12() {
  const [resolvedState, setResolvedState] = useState(false);

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 12;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* ─── Top Sticky Mini Bar ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-400 truncate">
          <Link
            to={`/${folder}`}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate">
            {currentModule?.title || "Merging Strategies"}
          </span>
          <span>/</span>
          <span className="text-amber-400 font-mono">Topic-12</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={prevTopicUrl}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 transition"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* ─── Section 1: Header & Badges ─────────────────────────────────── */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              Live Case Study
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Interactive Drama • 45 Mins
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              JWT + MFA Synthesis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Classroom Drama: The AuthController.js Collision
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            A real-world multi-developer case study at Coder &amp; AccoTax, Barrackpore: Sachin implements stateless JWT authentication while Susmita builds MFA SMS OTP verification on the same file. How Sukanta Sir guides them to synthesize competing code into enterprise architecture.
          </p>
        </div>

        {/* ─── Section 2: ELI10 Dialogue ──────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border border-rose-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-rose-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                The Barrackpore Lab Incident: When Two Features Collide
              </h2>
              <p className="text-xs text-rose-300">
                A live classroom roleplay featuring Sachin, Susmita, and Sukanta Sir
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sachin
              </div>
              <p>
                <strong className="text-amber-300">Sachin:</strong> "Sir, I just merged my JWT stateless authentication feature into <code className="text-slate-200">main</code>. It works great! But now Susmita is screaming at me because her branch won't merge!"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Susmita
              </div>
              <p>
                <strong className="text-indigo-300">Susmita:</strong> "Of course I'm screaming! I spent 3 hours writing 6-digit SMS OTP Multi-Factor Authentication in <code className="text-slate-200">AuthController.js</code>! When I ran <code className="text-rose-400 font-mono">git merge feature/mfa-otp</code>, Git printed conflict markers on every line of my login handler!"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Calm down both of you! Let's examine this like software engineers. Sachin: our client needs stateless JWT tokens for fast mobile app access. Susmita: our client also legally requires 2-factor OTP verification for tax security compliance. If Sachin clicks 'Accept Current', he deletes OTP. If Susmita clicks 'Accept Incoming', she deletes JWT. What is the true engineering solution?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Both
              </div>
              <p>
                <strong className="text-amber-300">Sachin &amp; Susmita:</strong> "...We combine them! First we verify Susmita's OTP code, and upon successful validation, we issue Sachin's signed JWT token!"
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Interactive Conflict vs Synthesized Code Visualizer ─ */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Live Code Synthesis: From Conflict Markers to Unified Engine
              </h2>
              <p className="text-xs text-slate-400">
                Toggle to inspect how Sukanta Sir guided the team to synthesize both feature branches
              </p>
            </div>

            <button
              onClick={() => setResolvedState(!resolvedState)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                resolvedState
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                  : "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
              }`}
            >
              {resolvedState ? <Check className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5" />}
              {resolvedState ? "Resolved: Unified Code" : "Raw Conflict View"}
            </button>
          </div>

          {/* Code Window */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs sm:text-sm">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>src/controllers/AuthController.js</span>
              <span className={resolvedState ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {resolvedState ? "✓ Unified MFA-JWT Architecture" : "⚠ 3-Way Collision"}
              </span>
            </div>

            <div className="p-4 space-y-2">
              {!resolvedState ? (
                // Raw Conflict State
                <div className="space-y-1">
                  <p className="text-slate-400">function loginUser(req, res) &#123;</p>
                  
                  <div className="bg-sky-950/40 border-l-4 border-sky-400 p-2.5 rounded my-1">
                    <p className="text-sky-400 font-bold">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Sachin: JWT Stateless)</p>
                    <p className="text-sky-200">const &#123; username, password &#125; = req.body;</p>
                    <p className="text-sky-200">const token = "jwt_token_header_payload_1hr";</p>
                    <p className="text-sky-200">return res.json(&#123; status: "success", authType: "jwt", token, feeBalance: 1200 &#125;);</p>
                  </div>

                  <div className="py-1 text-slate-500 font-bold text-center border-y border-dashed border-slate-700 bg-slate-900/60">
                    =======
                  </div>

                  <div className="bg-amber-950/40 border-l-4 border-amber-400 p-2.5 rounded my-1">
                    <p className="text-amber-400 font-bold">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/mfa-otp (Susmita: OTP Security)</p>
                    <p className="text-amber-200">const &#123; username, password, otp &#125; = req.body;</p>
                    <p className="text-amber-200">if (otp !== "123456") return res.status(403).json(&#123; error: "Invalid OTP" &#125;);</p>
                    <p className="text-amber-200">return res.json(&#123; status: "success", authType: "mfa-otp", isMfaVerified: true &#125;);</p>
                  </div>

                  <p className="text-slate-400">&#125;</p>
                </div>
              ) : (
                // Resolved Unified State
                <div className="space-y-1 text-emerald-300">
                  <p className="text-slate-400">// Cleanly Unified: MFA Verified Stateless JWT Engine</p>
                  <p className="text-slate-200">function loginUser(req, res) &#123;</p>
                  <p className="pl-4 text-slate-300">const &#123; username, password, otp &#125; = req.body;</p>
                  <p className="pl-4 text-slate-300">if (username !== "admin" || password !== "secret") &#123;</p>
                  <p className="pl-8 text-rose-300">return res.status(401).json(&#123; error: "Invalid credentials" &#125;);</p>
                  <p className="pl-4 text-slate-300">&#125;</p>
                  <p className="pl-4 text-amber-300 font-semibold">// Step 1: Susmita's MFA OTP Validation</p>
                  <p className="pl-4 text-slate-300">if (otp !== "123456") &#123;</p>
                  <p className="pl-8 text-rose-300">return res.status(403).json(&#123; error: "Invalid MFA OTP code" &#125;);</p>
                  <p className="pl-4 text-slate-300">&#125;</p>
                  <p className="pl-4 text-sky-300 font-semibold">// Step 2: Sachin's Stateless JWT Token Generation</p>
                  <p className="pl-4 text-emerald-300">const token = "jwt_token_mfa_verified_1hr";</p>
                  <p className="pl-4 text-emerald-300">return res.json(&#123;</p>
                  <p className="pl-8 text-emerald-200">status: "success",</p>
                  <p className="pl-8 text-emerald-200">authType: "mfa-jwt-stateless",</p>
                  <p className="pl-8 text-emerald-200">isMfaVerified: true,</p>
                  <p className="pl-8 text-emerald-200">token,</p>
                  <p className="pl-8 text-emerald-200">consultationFeeBalance: 1200</p>
                  <p className="pl-4 text-emerald-300">&#125;);</p>
                  <p className="text-slate-200">&#125;</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Section 4: Deep Technical Analysis: The 7-Step Case Study Protocol ─ */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              The 7-Step Case Study Protocol
            </h2>
            <p className="text-sm text-slate-400">
              The exact engineering steps used at Barrackpore to resolve the collision
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-emerald-400 font-bold">STEP 1</div>
              <h3 className="text-xs font-semibold text-white">git status</h3>
              <p className="text-xs text-slate-400">Locate unmerged files without panicking.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-sky-400 font-bold">STEP 2</div>
              <h3 className="text-xs font-semibold text-white">Peer Discussion</h3>
              <p className="text-xs text-slate-400">Align on the joint business workflow.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-amber-400 font-bold">STEP 3</div>
              <h3 className="text-xs font-semibold text-white">Code Synthesis</h3>
              <p className="text-xs text-slate-400">Weave both requirements into clean logic.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-indigo-400 font-bold">STEP 4</div>
              <h3 className="text-xs font-semibold text-white">Test &amp; Commit</h3>
              <p className="text-xs text-slate-400">Run unit tests, stage, and seal merge commit.</p>
            </div>
          </div>
        </div>

        {/* ─── Section 5: Classroom Discussion ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users className="w-5 h-5 text-indigo-400" />
            Classroom Discussion at Barrackpore Lab
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-amber-400">Swadeep:</strong> "Sir, what could we have done architecturally to avoid Sachin and Susmita editing the same 30 lines in the first place?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "Excellent question, Swadeep! In professional software engineering, we apply Modular Architecture. Sachin could have built <code className="text-slate-200">jwtService.js</code>, Susmita could have built <code className="text-slate-200">otpService.js</code>, and <code className="text-slate-200">AuthController.js</code> would simply be a tiny 5-line orchestrator. Modular design is the ultimate conflict prevention strategy!"
            </p>
          </div>
        </div>

        {/* ─── Section 6: Key Takeaways ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Core Takeaways
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Never pick 'Current' or 'Incoming' blindly when both branches contain vital features.</li>
              <li>Synthesize competing changes into higher-quality unified workflows.</li>
              <li>Always execute unit tests before completing the merge commit.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Barrackpore Golden Motto
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold italic">
              "Great developers don't choose 'mine vs yours'—they craft 'ours'!"
            </p>
          </div>
        </div>

        {/* ─── Section 7: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Classroom Drama (AuthController Conflict Case Study)"
          content={noteText}
        />

        {/* ─── Section 8: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Real-World Conflict Case Studies"
          questions={questions}
        />

        {/* ─── Section 9: Teacher Bio ─────────────────────────────────────── */}
        <Teacher />

        {/* ─── Section 10: Bottom Navigation Bar ──────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={prevTopicUrl}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Merge Strategies &amp; Algorithms (ORT vs Recursive)
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Hands-on Terminal Lab: 3-Way Conflict Simulation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
