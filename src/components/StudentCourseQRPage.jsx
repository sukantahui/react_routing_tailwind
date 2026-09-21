// ============================================================================
// StudentCourseQRPage.jsx - Dedicated Student Course QR Generator Page
// ============================================================================

import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Sparkles, BookOpen, QrCode } from "lucide-react";
import StudentCourseQRModal from "./StudentCourseQRModal";

export default function StudentCourseQRPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const courseParam = searchParams.get("course") || null;
  const studentParam = searchParams.get("student") || "";
  const phoneParam = searchParams.get("phone") || "";

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Breadcrumb & Return button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer text-xs font-semibold"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Coder &amp; AccoTax</span>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Student Course QR Studio</span>
          </div>
        </div>

        {/* Embedded Full Generator View */}
        <StudentCourseQRModal
          isOpen={true}
          onClose={null}
          initialCourse={courseParam}
          initialStudentName={studentParam}
          initialStudentPhone={phoneParam}
        />
      </div>
    </div>
  );
}
