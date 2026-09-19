import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { certificateService } from "../../services/certificateService";
import CertificateCanvas from "../../common/CertificateCanvas";
import {
  CheckCircle,
  User,
  FileText,
  Printer,
  BookOpen,
  ChevronDown,
  ChevronRight,
  X,
  Search,
  ShieldCheck,
  Award,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Clock,
  Calendar,
  Layers,
  GraduationCap,
  Download
} from "lucide-react";

// -------------------------------------------------------------------
// Environment setup
// -------------------------------------------------------------------
const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

// -------------------------------------------------------------------
// Gold Seal drawing (ISO 9001)
// -------------------------------------------------------------------
const drawGoldSeal = (ctx, x, y, radius) => {
  if (!ctx) return;
  const gradient = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
  gradient.addColorStop(0, "#fff6cc");
  gradient.addColorStop(0.3, "#f5d97b");
  gradient.addColorStop(0.6, "#d4a73a");
  gradient.addColorStop(1, "#9c6d0c");
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#c9a959";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.75, 0, Math.PI * 2);
  ctx.strokeStyle = "#fff2b0";
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = "#5a3c00";
  ctx.textAlign = "center";
  ctx.font = `bold ${radius * 0.45}px Georgia`;
  ctx.fillText("ISO", x, y - radius * 0.1);
  ctx.font = `bold ${radius * 0.35}px Georgia`;
  ctx.fillText("9001", x, y + radius * 0.35);
};

// -------------------------------------------------------------------
// Main Component
// -------------------------------------------------------------------
export default function Certificate() {
  const { certificateId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Active searched certificate code (from URL param or query param)
  const queryCode = searchParams.get("code") || searchParams.get("id") || "";
  const initialCode = certificateId || queryCode || "";

  const [searchCode, setSearchCode] = useState(initialCode);
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(Boolean(initialCode));

  const [expandedTopics, setExpandedTopics] = useState({});
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isOriginalCertModalOpen, setIsOriginalCertModalOpen] = useState(false);

  const certRef = useRef(null);
  const sealCanvasRef = useRef(null);
  const originalCertCanvasRef = useRef(null);

  // Original certificate assets
  const [bgImage, setBgImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [instructorSignImage, setInstructorSignImage] = useState(null);
  const [directorSignImage, setDirectorSignImage] = useState(null);

  useEffect(() => {
    const bg = new Image();
    bg.onload = () => setBgImage(bg);
    bg.src = "/assets/certificate-bg.png";

    const logo = new Image();
    logo.onload = () => setLogoImage(logo);
    logo.src = "/assets/cnat.png";

    const s1 = new Image();
    s1.onload = () => setInstructorSignImage(s1);
    s1.src = "/assets/instructor-sign.png";

    const s2 = new Image();
    s2.onload = () => setDirectorSignImage(s2);
    s2.src = "/assets/director-sign.png";
  }, []);

  // ---------- Fetch certificate data by code ----------
  const handleFetchCertificate = async (codeToFetch) => {
    const cleanCode = (codeToFetch || "").trim();
    if (!cleanCode) {
      setError("Please enter a valid certificate number.");
      setCertificate(null);
      setSearched(true);
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const res = await certificateService.getByCode(cleanCode);
      const data = res?.data || res;
      if (data && (data.certificateNumber || data.certificate_number || data.student)) {
        setCertificate(data);
        setError(null);
      } else {
        setCertificate(null);
        setError(`No verified certificate found for "${cleanCode}". Please verify the code.`);
      }
    } catch (err) {
      console.error("Certificate lookup error:", err);
      setCertificate(null);
      setError(
        err?.response?.data?.message ||
        `Certificate "${cleanCode}" was not found in the official registry. Please check the code.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when certificateId from route changes
  useEffect(() => {
    const code = certificateId || queryCode;
    if (code) {
      setSearchCode(code);
      handleFetchCertificate(code);
    } else {
      setCertificate(null);
      setError(null);
      setSearched(false);
    }
  }, [certificateId, queryCode]);

  // ---------- Draw gold seal on canvas ----------
  useEffect(() => {
    if (!certificate) return;
    const canvas = sealCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const radius = 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGoldSeal(ctx, radius, radius, radius);
  }, [certificate]);

  // ---------- Close modal on ESC ----------
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsPhotoModalOpen(false);
    };
    if (isPhotoModalOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isPhotoModalOpen]);

  // ---------- Form submit / search handler ----------
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const clean = searchCode.trim();
    if (!clean) return;
    navigate(`/certificates/${encodeURIComponent(clean)}`);
  };

  // Quick fill sample
  const handleQuickSample = (sampleCode) => {
    setSearchCode(sampleCode);
    navigate(`/certificates/${encodeURIComponent(sampleCode)}`);
  };

  // Copy shareable verification link
  const handleCopyLink = () => {
    const activeNumber = certificate?.certificateNumber || certificate?.certificate_number || searchCode;
    const url = `${window.location.origin}/certificates/${activeNumber}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Print
  const handlePrint = () => window.print();

  const toggleTopic = (id) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllTopics = (expandAll) => {
    const details = certificate?.course?.courseDetails || certificate?.course?.details || [];
    if (!details.length) return;
    const newState = {};
    details.forEach((topic) => {
      newState[topic.id] = expandAll;
    });
    setExpandedTopics(newState);
  };

  // ---------- Helper: get photo URL ----------
  const getPhotoUrl = () => {
    const photo = certificate?.student?.photo;
    if (!photo) return null;
    if (photo.startsWith("http")) return photo;
    return `${API_BASE}/storage/${photo}`;
  };

  // Extract certificate fields safely (camelCase with fallbacks)
  const certNo = certificate?.certificateNumber || certificate?.certificate_number || "";
  const certIssueDate = certificate?.issueDate || certificate?.issue_date || "—";
  const studentObj = certificate?.student || {};
  const courseObj = certificate?.course || {};
  const admissionObj = certificate?.admission || {};
  const resultsList = Array.isArray(certificate?.results) ? certificate.results : [];
  const courseDetailsList = courseObj.courseDetails || courseObj.details || [];

  // Total course hours
  const totalTheory = courseDetailsList.reduce(
    (sum, t) => sum + parseFloat(t.theoryDuration || t.theory_duration || 0),
    0
  );
  const totalPractical = courseDetailsList.reduce(
    (sum, t) => sum + parseFloat(t.practicalDuration || t.practical_duration || 0),
    0
  );
  const totalHours = (totalTheory || 0) + (totalPractical || 0);

  // Find best attempt
  const bestAttempt = resultsList.length
    ? resultsList.reduce((best, current) => {
        const cTh = parseFloat(current.theoryMarks || current.theory_marks || 0);
        const cPr = parseFloat(current.practicalMarks || current.practical_marks || 0);
        const bTh = parseFloat(best.theoryMarks || best.theory_marks || 0);
        const bPr = parseFloat(best.practicalMarks || best.practical_marks || 0);
        const cTot = cTh + cPr;
        const bTot = bTh + bPr;
        const cAttempt = current.attemptNo || current.attempt_no || 1;
        const bAttempt = best.attemptNo || best.attempt_no || 1;
        if (cTot > bTot) return current;
        if (cTot === bTot && cAttempt > bAttempt) return current;
        return best;
      })
    : null;

  const photoUrl = getPhotoUrl();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-sky-500/30 selection:text-sky-300">
      
      {/* ── PRINT MEDIA STYLES: Strict Isolation so ONLY the certificate card prints ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* 1. Hide entire application body by default */
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
          }

          body * {
            visibility: hidden !important;
          }

          /* 2. Make ONLY the certificate document visible */
          #certificate-printable-document,
          #certificate-printable-document * {
            visibility: visible !important;
          }

          /* 3. Position the certificate cleanly at the very top-left of the printed paper */
          #certificate-printable-document {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 3px solid #b45309 !important;
            border-radius: 12px !important;
            background: #ffffff !important;
            color: #0f172a !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* 4. Hide all navigation, fixed headers, search bars, and interactive buttons */
          header, nav, .fixed, .print\\:hidden, form, button, [role="navigation"] {
            display: none !important;
            visibility: hidden !important;
          }

          main {
            padding: 0 !important;
            margin: 0 !important;
          }

          @page {
            size: A4 portrait;
            margin: 8mm;
          }
        }
      `}} />
      
      {/* ── TOP PUBLIC VERIFICATION SEARCH BAR (Always Available, No Auth Required) ── */}
      <div className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30 print:hidden shadow-lg shadow-black/40">
        <div className="max-w-5xl mx-auto px-4 py-3.5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Title & Brand Badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 flex-shrink-0">
                <ShieldCheck className="w-5 h-5 font-bold" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Certificate &amp; Result Verification</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                    Public Portal
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Authenticate student credentials &amp; curriculum directly from Coder &amp; AccoTax registry
                </p>
              </div>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter Certificate No. (e.g. CNAT-20260626130254)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 font-mono transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !searchCode.trim()}
                className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5 cursor-pointer flex-shrink-0"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify</span>
                  </>
                )}
              </button>

              <Link
                to="/admin/certificates"
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition flex items-center gap-1.5 flex-shrink-0"
                title="Open Master Certificates Register"
              >
                <Award className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </form>

          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── STATE 1: LOADING SPINNER ── */}
        {loading && (
          <div className="py-24 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-pulse" />
              <div className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Verifying Authenticity with Registry...</h3>
              <p className="text-xs text-slate-400">Validating certificate number, student records &amp; ISO 9001 credentials</p>
            </div>
          </div>
        )}

        {/* ── STATE 2: ERROR / NOT FOUND ── */}
        {!loading && error && (
          <div className="max-w-xl mx-auto py-12">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-rose-500/30 shadow-2xl text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400 text-2xl shadow-inner">
                <AlertCircle className="w-8 h-8 text-rose-400" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-white">Certificate Verification Failed</h2>
                <p className="text-sm text-rose-300 font-mono bg-rose-950/40 py-1.5 px-3 rounded-lg border border-rose-900/60 inline-block">
                  {error}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 text-left space-y-2">
                <p className="font-semibold text-slate-300">💡 Verification Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Ensure the certificate code starts with <code className="text-amber-400 font-mono">CNAT-</code> (e.g. <code className="text-amber-400 font-mono">CNAT-20260626130254</code>).</li>
                  <li>Check for any accidental spaces or misspelled digits.</li>
                  <li>Scan the QR code directly from the physical certificate paper.</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickSample("CNAT-20260626130254")}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  Try Sample: CNAT-20260626130254
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STATE 3: INITIAL LANDING (No certificate searched yet) ── */}
        {!loading && !searched && (
          <div className="py-12 max-w-3xl mx-auto space-y-8 text-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Online Authenticity Verification</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Verify Student Credentials &amp; Results
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Any employer, institution, or student can verify completion certificates, marks, and syllabuses issued by Coder &amp; AccoTax without needing to log in.
              </p>
            </div>

            {/* Big Search Box */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter Certificate Number (e.g. CNAT-20260626130254)"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-transparent text-white placeholder-slate-500 focus:outline-none font-mono"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={!searchCode.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Verify Now</span>
                </button>
              </div>

              {/* Sample Tag Chips */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400 flex-wrap">
                <span>Quick Test:</span>
                <button
                  type="button"
                  onClick={() => handleQuickSample("CNAT-20260626130254")}
                  className="font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700/80 transition cursor-pointer"
                >
                  CNAT-20260626130254
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSample("CNAT-20250715125440")}
                  className="font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700/80 transition cursor-pointer"
                >
                  CNAT-20250715125440
                </button>
              </div>
            </form>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">ISO 9001 Certified</h3>
                <p className="text-xs text-slate-400">Accredited institution validation with digital gold seal and verified serials.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">Full Curriculum Hours</h3>
                <p className="text-xs text-slate-400">Complete breakdown of theory &amp; practical laboratory hours completed.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">Official Marks &amp; Grade</h3>
                <p className="text-xs text-slate-400">Direct examination results, passing status, and certified performance marks.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── STATE 4: AUTHENTIC CERTIFICATE DISPLAY ── */}
        {!loading && certificate && (
          <div className="space-y-6">

            {/* 1. Verification Status Hero Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl print:hidden">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">Official Certificate Verified</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 uppercase tracking-wider">
                      Authentic
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Registered in Coder &amp; AccoTax Database • Serial: <span className="font-mono font-bold text-amber-300">{certNo}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-stretch sm:self-auto flex-wrap">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Share Link</span>
                    </>
                  )}
                </button>

                {/* Print Verification & Result (Existing) */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Print official verification statement with syllabus and marks"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Print Verification &amp; Result</span>
                </button>

                {/* Print Original Diploma Certificate */}
                <button
                  type="button"
                  onClick={() => setIsOriginalCertModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Print Official Original Diploma Certificate"
                >
                  <Award className="w-4 h-4" />
                  <span>Print Original Certificate</span>
                </button>
              </div>
            </div>

            {/* 2. Authentic Certificate Document */}
            <div
              ref={certRef}
              id="certificate-printable-document"
              className="relative max-w-4xl mx-auto bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300 print:border-2 print:shadow-none print:m-0 print:max-w-full"
            >
              {/* Decorative inner border */}
              <div className="absolute inset-2 border-2 border-amber-200/60 pointer-events-none rounded-2xl" />

              {/* Watermark background */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 L61.8 35.8 L90.2 38.2 L70.2 57.6 L77.6 85.2 L50 72.4 L22.4 85.2 L29.8 57.6 L9.8 38.2 L38.2 35.8 Z' fill='%23b8860b' /%3E%3C/svg%3E")`,
                  backgroundSize: "120px 120px",
                  backgroundRepeat: "repeat",
                }}
              />

              {/* ── HEADER ── */}
              <div className="relative bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 px-6 py-6 text-center border-b-4 border-amber-900 text-white">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex justify-center items-center gap-3 flex-wrap">
                    <img
                      src="/assets/cnat.png"
                      alt="CNAT Logo"
                      className="h-12 sm:h-14 w-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-widest uppercase">
                      Coder &amp; AccoTax
                    </h2>
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/30">
                      ISO 9001:2015
                    </span>
                  </div>
                  <p className="text-amber-100 text-xs sm:text-sm tracking-wider mt-1.5 font-medium">
                    An ISO 9001:2015 Certified Educational Institution • Barrackpore, Kolkata
                  </p>
                </div>

                <canvas
                  ref={sealCanvasRef}
                  width="200"
                  height="200"
                  className="absolute top-2 right-4 z-20 w-20 h-20 sm:w-28 sm:h-28"
                />
              </div>

              {/* ── BODY ── */}
              <div className="relative p-6 sm:p-10 md:p-12 pt-8 space-y-8">
                
                {/* Certificate Title */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-900 tracking-wide">
                    Certificate of Completion
                  </h2>
                  <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                  <p className="text-slate-500 text-xs sm:text-sm italic pt-1">
                    This is to certify that
                  </p>
                </div>

                {/* Student Full Name */}
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 border-b-2 border-dotted border-amber-400 inline-block px-8 pb-2">
                    {studentObj.studentName || studentObj.student_name || "Enrolled Student"}
                  </p>
                </div>

                {/* Course Completion statement */}
                <div className="text-center text-slate-700 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                  has successfully completed the authorized training curriculum and satisfied all evaluation requirements in
                  <span className="font-extrabold text-amber-900 block sm:inline mt-1 sm:mt-0 text-lg sm:text-xl font-serif">
                    {" "}{courseObj.courseName || courseObj.course_name || "Academic Program"}
                  </span>
                  {bestAttempt && (
                    <span className="inline-block ml-1">
                      with grade <span className="font-bold text-amber-800 font-mono bg-amber-100 px-2 py-0.5 rounded">{bestAttempt.grade}</span>
                    </span>
                  )}
                  .
                </div>

                {/* Course Overview Card */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 sm:p-6 rounded-2xl border border-amber-200/80 shadow-sm space-y-3">
                  <h3 className="text-sm font-serif font-bold text-amber-900 flex items-center gap-2 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>Academic &amp; Program Summary</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-amber-100 space-y-0.5">
                      <span className="text-slate-500">Course Code</span>
                      <p className="font-bold text-slate-900 font-mono text-sm">{courseObj.courseCode || courseObj.course_code || "—"}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-amber-100 space-y-0.5">
                      <span className="text-slate-500">Total Hours</span>
                      <p className="font-bold text-amber-800 text-sm">{totalHours.toFixed(1)} hrs</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-amber-100 space-y-0.5">
                      <span className="text-slate-500">Admission No.</span>
                      <p className="font-bold text-slate-900 font-mono text-sm">{admissionObj.admissionNumber || admissionObj.admission_number || "—"}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-amber-100 space-y-0.5">
                      <span className="text-slate-500">Certificate No.</span>
                      <p className="font-bold text-amber-900 font-mono text-xs truncate" title={certNo}>{certNo}</p>
                    </div>
                  </div>
                </div>

                {/* Course Curriculum Topics Table */}
                {courseDetailsList.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-serif font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                        <FileText className="w-4 h-4 text-amber-700" />
                        <span>Curriculum &amp; Practical Modules</span>
                      </h3>
                      <div className="flex gap-3 text-xs print:hidden">
                        <button
                          type="button"
                          onClick={() => toggleAllTopics(true)}
                          className="text-amber-700 hover:text-amber-900 font-medium hover:underline cursor-pointer"
                        >
                          Expand all
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={() => toggleAllTopics(false)}
                          className="text-amber-700 hover:text-amber-900 font-medium hover:underline cursor-pointer"
                        >
                          Collapse all
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="min-w-full divide-y divide-slate-200 text-xs">
                        <thead className="bg-amber-50/90 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="px-3 py-2.5 text-center">#</th>
                            <th className="px-3 py-2.5 text-left">Module Topic</th>
                            <th className="px-3 py-2.5 text-center">Theory</th>
                            <th className="px-3 py-2.5 text-center">Practical</th>
                            <th className="px-3 py-2.5 text-center">Total</th>
                            <th className="px-3 py-2.5 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {courseDetailsList.map((topic, idx) => {
                            const theory = parseFloat(topic.theoryDuration || topic.theory_duration || 0);
                            const practical = parseFloat(topic.practicalDuration || topic.practical_duration || 0);
                            const total = theory + practical;
                            const isExpanded = expandedTopics[topic.id] || false;
                            return (
                              <tr key={topic.id || idx} className="hover:bg-amber-50/30 transition">
                                <td className="px-3 py-2.5 text-center text-slate-400 font-mono">{idx + 1}</td>
                                <td className="px-3 py-2.5 font-bold text-slate-800">{topic.topicTitle || topic.topic_title}</td>
                                <td className="px-3 py-2.5 text-center text-slate-600 font-mono">{theory.toFixed(1)}h</td>
                                <td className="px-3 py-2.5 text-center text-slate-600 font-mono">{practical.toFixed(1)}h</td>
                                <td className="px-3 py-2.5 text-center font-bold text-amber-800 font-mono">{total.toFixed(1)}h</td>
                                <td className="px-3 py-2.5 text-slate-600 max-w-xs">
                                  <div className="flex items-start gap-1">
                                    <span className={isExpanded ? "" : "line-clamp-2"}>
                                      {topic.topicDescription || topic.topic_description || "—"}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => toggleTopic(topic.id)}
                                      className="text-amber-700 hover:text-amber-900 mt-0.5 print:hidden cursor-pointer"
                                    >
                                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="bg-amber-50/80 font-bold text-slate-800">
                          <tr>
                            <td colSpan="2" className="px-3 py-2.5 text-right uppercase tracking-wider text-[10px]">Total Hours</td>
                            <td className="px-3 py-2.5 text-center font-mono">{totalTheory.toFixed(1)}h</td>
                            <td className="px-3 py-2.5 text-center font-mono">{totalPractical.toFixed(1)}h</td>
                            <td className="px-3 py-2.5 text-center font-mono text-amber-800">{totalHours.toFixed(1)}h</td>
                            <td className="px-3 py-2.5"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* Student Details & Photo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-amber-700" /> Student Profile
                    </span>
                    <p><span className="font-semibold text-slate-600">Reg No:</span> <span className="font-mono">{studentObj.registrationNumber || studentObj.reg_no || "—"}</span></p>
                    <p><span className="font-semibold text-slate-600">Father:</span> {studentObj.fatherName || studentObj.father_name || "N/A"}</p>
                    <p><span className="font-semibold text-slate-600">Mother:</span> {studentObj.motherName || studentObj.mother_name || "N/A"}</p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Dates &amp; Timeline</span>
                    <p><span className="font-semibold text-slate-600">Admission Date:</span> {admissionObj.admissionDate || admissionObj.admission_date || "—"}</p>
                    <p><span className="font-semibold text-slate-600">Completion Date:</span> {admissionObj.completionDate || admissionObj.completion_date || "Completed"}</p>
                    <p><span className="font-semibold text-slate-600">Issue Date:</span> {certIssueDate}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={studentObj.studentName}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-300 shadow-md cursor-pointer hover:opacity-90 transition"
                        onClick={() => setIsPhotoModalOpen(true)}
                        onError={(e) => {
                          e.target.style.display = "none";
                          const p = e.target.parentElement;
                          const fallback = p.querySelector(".photo-fallback");
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="photo-fallback w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-100 flex items-center justify-center border-4 border-amber-300"
                      style={{ display: photoUrl ? "none" : "flex" }}
                    >
                      <User className="w-10 h-10 text-amber-700" />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">Student Photo</span>
                  </div>
                </div>

                {/* Performance Evaluation / Results Table */}
                {resultsList.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-serif font-bold text-slate-900 text-center uppercase tracking-wider">
                      Certified Examination Evaluation
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="min-w-full divide-y divide-slate-200 text-xs">
                        <thead className="bg-amber-50/90 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="px-3 py-2.5 text-center">Attempt</th>
                            <th className="px-3 py-2.5 text-center">Theory Marks</th>
                            <th className="px-3 py-2.5 text-center">Practical Marks</th>
                            <th className="px-3 py-2.5 text-center">Grade</th>
                            <th className="px-3 py-2.5 text-center">Result Date</th>
                            <th className="px-3 py-2.5 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {resultsList.map((r, idx) => {
                            const isBest = bestAttempt && (r.attemptNo || r.attempt_no) === (bestAttempt.attemptNo || bestAttempt.attempt_no);
                            const th = r.theoryMarks ?? r.theory_marks ?? 0;
                            const pr = r.practicalMarks ?? r.practical_marks ?? 0;
                            const totTh = r.totalTheoryMarks ?? r.total_theory_marks ?? 50;
                            const totPr = r.totalPracticalMarks ?? r.total_practical_marks ?? 50;
                            const pass = r.isPassed ?? r.is_passed ?? true;
                            return (
                              <tr key={idx} className={`hover:bg-amber-50/30 transition ${isBest ? "bg-amber-50/50" : ""}`}>
                                <td className="px-3 py-2 text-center font-bold text-slate-700">
                                  #{r.attemptNo || r.attempt_no || idx + 1}
                                  {isBest && <span className="ml-1 text-amber-500">⭐</span>}
                                </td>
                                <td className="px-3 py-2 text-center font-mono">{th} / {totTh}</td>
                                <td className="px-3 py-2 text-center font-mono">{pr} / {totPr}</td>
                                <td className="px-3 py-2 text-center font-bold text-amber-900 font-mono">{r.grade || "A"}</td>
                                <td className="px-3 py-2 text-center text-slate-500">{r.resultDate || r.result_date || "—"}</td>
                                <td className="px-3 py-2 text-center">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    pass ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                                  }`}>
                                    {pass ? "✅ Passed" : "❌ Failed"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-dashed border-amber-200">
                  <div className="text-center space-y-1">
                    <img
                      src="/assets/director-sign.png"
                      alt="Director Signature"
                      className="h-8 mx-auto object-contain"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <p className="text-xs font-bold text-slate-800">Director</p>
                    <p className="text-[10px] text-slate-400">Coder &amp; AccoTax</p>
                  </div>
                  <div className="text-center space-y-1">
                    <img
                      src="/assets/instructor-sign.png"
                      alt="Instructor Signature"
                      className="h-8 mx-auto object-contain"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <p className="text-xs font-bold text-slate-800">Academic Instructor</p>
                    <p className="text-[10px] text-slate-400">Department of Computer Science</p>
                  </div>
                </div>

                {/* Footer Security Verification Notice */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">{certNo}</span>
                    <span>• Verified Digitally</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Authentic Certificate of Coder &amp; AccoTax</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* ── PHOTO EXPANSION MODAL ── */}
      {isPhotoModalOpen && photoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-4 shadow-2xl space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">{studentObj.studentName} — Student Photo</h4>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={photoUrl}
              alt={studentObj.studentName}
              className="w-full h-auto max-h-[70vh] object-contain rounded-2xl mx-auto border border-slate-800"
            />
          </div>
        </div>
      )}

      {/* ── ORIGINAL CERTIFICATE PRINT / EXPORT MODAL ── */}
      {isOriginalCertModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150 print:hidden overflow-y-auto"
          onClick={() => setIsOriginalCertModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Original Student Certificate</h3>
                  <p className="text-[11px] text-slate-400">Formal ISO 9001:2015 Diploma Document</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOriginalCertModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Canvas Preview Container */}
            <div className="bg-black/60 rounded-2xl p-2 border border-slate-800 flex justify-center max-h-[60vh] overflow-y-auto">
              <CertificateCanvas
                ref={originalCertCanvasRef}
                name={studentObj.studentName || studentObj.student_name || "Student Name"}
                course={courseObj.courseName || courseObj.course_name || "Certificate Course"}
                date={certIssueDate}
                duration={courseObj.duration || `${totalHours.toFixed(0)} Hours`}
                instructor="Sukanta Hui"
                director="Tanusree Hui"
                certNumber={certNo}
                bgImage={bgImage}
                logoImage={logoImage}
                instructorSignImage={instructorSignImage}
                directorSignImage={directorSignImage}
              />
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => originalCertCanvasRef.current?.downloadPdf()}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                  title="Download A4 PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => originalCertCanvasRef.current?.downloadJpg()}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                  title="Download High-Res JPG"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => originalCertCanvasRef.current?.print()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Original Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}