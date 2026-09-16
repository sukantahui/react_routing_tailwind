// ===============================================
// FeesPayment.jsx - Dedicated Instant Fees Payment Section
// -----------------------------------------------
// Features:
// - Direct UPI Payment for Coder & AccoTax
// - Official UPI ID: 9432456083@upi
// - Live Dynamic QR Code with Amount & Student Details
// - Quick Amount Presets (₹500, ₹1000, ₹1500, ₹2000, ₹2500, ₹3000, ₹5000)
// - One-Click Copy UPI ID with feedback
// - Mobile Direct Pay (upi://pay intent deep-link)
// - Downloadable High-Resolution QR Code
// - 3-Step Payment Guide & Direct WhatsApp Confirmation
// ===============================================

import React, { useState, useMemo, useRef } from "react";
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";
import {
  QrCode,
  CreditCard,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Smartphone,
  Building2,
  FileCheck2,
} from "lucide-react";
import cnatLogo from "../../assets/cnat.png";

const UPI_ID = "9432456083@upi";
const MERCHANT_NAME = "Coder & AccoTax";
const WHATSAPP_NUMBER = "919432456083";

const PRESET_AMOUNTS = [
  { label: "₹500", value: 500 },
  { label: "₹1,000", value: 1000 },
  { label: "₹1,500", value: 1500 },
  { label: "₹2,000", value: 2000 },
  { label: "₹2,500", value: 2500 },
  { label: "₹3,000", value: 3000 },
  { label: "₹5,000", value: 5000 },
];

const SUPPORTED_APPS = [
  { name: "Google Pay", color: "from-blue-500/20 to-sky-500/20 text-sky-400 border-sky-500/30" },
  { name: "PhonePe", color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30" },
  { name: "Paytm", color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30" },
  { name: "BHIM UPI", color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30" },
  { name: "Amazon Pay", color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30" },
  { name: "Cred", color: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30" },
];

export default function FeesPayment() {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Compute clean UPI Payment Payload
  const upiPayload = useMemo(() => {
    // NPCI UPI standard requires literal '@' in pa (never percent-encoded as %40)
    const cleanPa = "9432456083@upi";
    
    // Official bank-registered merchant name for VPA 9432456083@upi is 'Coder & AccoTax'
    const cleanPn = MERCHANT_NAME;

    let uri = `upi://pay?pa=${cleanPa}&pn=${encodeURIComponent(cleanPn)}&cu=INR`;

    const numericAmount = parseFloat(selectedAmount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      uri += `&am=${numericAmount.toFixed(2)}`;
    }

    // Build clean remark / transaction note only when student name or course is provided
    const notes = [];
    if (studentName.trim()) notes.push(studentName.trim());
    if (courseName.trim()) notes.push(courseName.trim());
    
    if (notes.length > 0) {
      const sanitizedNote = notes.join(" ").replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
      if (sanitizedNote) {
        uri += `&tn=${encodeURIComponent(sanitizedNote.slice(0, 50))}`;
      }
    }

    return uri;
  }, [selectedAmount, studentName, courseName]);

  // Copy UPI ID to Clipboard
  const handleCopyUpi = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(UPI_ID);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = UPI_ID;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy UPI ID:", err);
    }
  };

  // Download high-resolution PNG of QR Code
  const handleDownloadQR = async () => {
    try {
      setIsDownloading(true);
      const dataUrl = await QRCodeLib.toDataURL(upiPayload, {
        width: 800,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#090d16",
          light: "#ffffff",
        },
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = `CoderAccoTax-Fees-QR-${selectedAmount || "Custom"}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("QR Download Error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Build prefilled WhatsApp confirmation link
  const whatsappUrl = useMemo(() => {
    let msg = `Hi Coder & AccoTax, I have completed my fee payment via UPI.\n\n`;
    msg += `• Payee UPI: ${UPI_ID}\n`;
    if (studentName.trim()) msg += `• Student Name: ${studentName.trim()}\n`;
    if (courseName.trim()) msg += `• Course / Batch: ${courseName.trim()}\n`;
    if (selectedAmount && !isNaN(parseFloat(selectedAmount))) {
      msg += `• Amount Paid: ₹${parseFloat(selectedAmount).toLocaleString("en-IN")}\n`;
    }
    msg += `\nPlease find my attached payment screenshot / UTR for fee receipt generation.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [selectedAmount, studentName, courseName]);

  return (
    <section
      id="fees"
      className="relative py-16 sm:py-24 bg-[#030712] text-slate-100 border-b border-slate-800/80 overflow-hidden"
    >
      {/* Background ambient glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Instant &amp; 0% Fee UPI Payment</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Pay Course Fees Online
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-slate-400 mt-3 leading-relaxed">
            Scan using Google Pay, PhonePe, Paytm, or any banking UPI application to pay your admission or
            monthly course fee securely with instant digital confirmation.
          </p>
        </div>

        {/* Main Grid: Left (Interactive QR & Controls) | Right (Instructions & Verification) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE QR & PAYMENT CARD (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
            
            {/* Merchant Badge Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 border border-sky-500/30 flex items-center justify-center p-1.5 shadow-inner">
                  <img src={cnatLogo} alt="Coder & AccoTax" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-white">{MERCHANT_NAME}</h3>
                    <ShieldCheck size={16} className="text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">Verified Institute Account</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Zero Convenience Fee</span>
              </div>
            </div>

            {/* Quick Amount Selector */}
            <div className="mt-6">
              <label className="block text-xs font-semibold text-slate-300 mb-2.5">
                Select Amount (₹) or Enter Custom Tuition Fee:
              </label>

              {/* Amount Preset Chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_AMOUNTS.map((amt) => {
                  const isActive = selectedAmount === String(amt.value);
                  return (
                    <button
                      key={amt.value}
                      type="button"
                      onClick={() => setSelectedAmount(isActive ? "" : String(amt.value))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105 border border-emerald-400"
                          : "bg-slate-800/90 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60"
                      }`}
                    >
                      {amt.label}
                    </button>
                  );
                })}
              </div>

              {/* Amount & Student Name Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="e.g. 1500 (Optional)"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                      min="1"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Leave empty to type in app</span>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Student Name (e.g. Rahul Sen)"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Included in payment remark</span>
                </div>
              </div>

              <div className="mt-2.5">
                <input
                  type="text"
                  placeholder="Course / Batch / Remarks (e.g. Python Batch 3, ICSE Java, Tally GST)"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            {/* QR Code Canvas & Deep-link Box */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-6">
              
              {/* White High-Contrast QR Code Card */}
              <div className="relative p-4 rounded-2xl bg-white shadow-2xl flex-shrink-0 flex flex-col items-center group">
                <div className="w-[190px] h-[190px] sm:w-[210px] sm:h-[210px] flex items-center justify-center relative">
                  <QRCode
                    value={upiPayload}
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 256 256`}
                    level="H"
                    fgColor="#090d16"
                    bgColor="#ffffff"
                  />

                  {/* Centered Institute Logo Watermark */}
                  <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white p-1 shadow-md flex items-center justify-center border border-slate-200 pointer-events-none">
                    <img src={cnatLogo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <span className="text-[11px] font-bold text-slate-800 tracking-wider flex items-center justify-center gap-1">
                    <QrCode size={13} className="text-emerald-600" />
                    Scan to Pay
                  </span>
                  {selectedAmount && !isNaN(parseFloat(selectedAmount)) && (
                    <span className="text-xs font-black text-emerald-700 block">
                      ₹{parseFloat(selectedAmount).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              {/* QR Details & Action Buttons */}
              <div className="flex-1 w-full space-y-4">
                
                {/* Official UPI ID Box with 1-Click Copy */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Official UPI ID / VPA
                  </span>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition">
                    <div className="flex items-center gap-2 min-w-0">
                      <CreditCard size={18} className="text-sky-400 flex-shrink-0" />
                      <span className="font-mono text-xs sm:text-sm font-bold text-white truncate">
                        {UPI_ID}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className={`ml-2 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copied
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check size={14} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Mobile Direct Pay Button (Active on Phones) */}
                <div>
                  <a
                    href={upiPayload}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200"
                  >
                    <Smartphone size={16} />
                    <span>
                      {selectedAmount && !isNaN(parseFloat(selectedAmount)) && parseFloat(selectedAmount) > 0
                        ? `Pay ₹${parseFloat(selectedAmount).toLocaleString("en-IN")} via UPI App`
                        : "Pay via UPI App (Enter Amount in App)"}
                    </span>
                    <ExternalLink size={14} />
                  </a>
                  {selectedAmount && !isNaN(parseFloat(selectedAmount)) && parseFloat(selectedAmount) > 0 ? (
                    <p className="text-[10px] text-emerald-400 text-center mt-1.5 flex items-center justify-center gap-1">
                      <Check size={12} />
                      <span>₹{parseFloat(selectedAmount).toLocaleString("en-IN")} will open pre-filled in your UPI app</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-amber-400/90 text-center mt-1.5 flex items-center justify-center gap-1">
                      <span>💡</span>
                      <span>Select an amount chip above to pre-fill, or enter custom fee in your app.</span>
                    </p>
                  )}
                </div>

                {/* Download QR Button */}
                <button
                  type="button"
                  onClick={handleDownloadQR}
                  disabled={isDownloading}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Download size={14} />
                  <span>{isDownloading ? "Generating Image..." : "Download Payment QR Code"}</span>
                </button>
              </div>
            </div>

            {/* Supported Apps Badges */}
            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Supported UPI &amp; Banking Apps:
              </span>
              <div className="flex flex-wrap gap-2 select-none">
                {SUPPORTED_APPS.map((app) => (
                  <span
                    key={app.name}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-gradient-to-r ${app.color} border select-none cursor-default`}
                  >
                    {app.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3-STEP INSTRUCTIONS & WHATSAPP CONFIRMATION (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 3 Simple Steps Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold">
                  <Sparkles size={16} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">3 Simple Steps to Pay</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Scan QR or Pay to UPI ID</h4>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      Open Google Pay, PhonePe, Paytm, or BHIM. Scan the QR code or enter UPI ID{" "}
                      <strong className="text-slate-200 font-mono">9432456083@upi</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Enter Amount &amp; Student Name</h4>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      Enter the tuition fee amount and add the <strong>Student Name &amp; Course</strong> in the
                      remark / note box for effortless identification.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Share Screenshot on WhatsApp</h4>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      Send the payment confirmation screenshot or UTR number to WhatsApp (+91 94324 56083) to
                      receive your official stamped receipt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Card */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <i className="bi bi-whatsapp text-lg"></i>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Instant Fee Receipt</h4>
                  <p className="text-[11px] text-emerald-400 font-medium">WhatsApp Helpline: +91 94324 56083</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Already made the payment? Click below to send your details and transaction screenshot directly to
                our admissions desk for immediate acknowledgment and fee receipt.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all duration-200"
              >
                <i className="bi bi-whatsapp text-base"></i>
                <span>Send Screenshot on WhatsApp</span>
              </a>
            </div>

            {/* Trust & Institute Guarantees Card */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>100% Secure &amp; NPCI Unified Payments Interface Standard</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>ISO 9001:2015 Certified Educational Institute</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Official Digital Stamped Fee Receipt issued for all payments</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
