import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { certificateService } from "../../services/certificateService";
import {
  CheckCircleIcon,
  UserIcon,
  DocumentTextIcon,
  PrinterIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const drawGoldSeal = (ctx, x, y, radius) => {
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

const Certificate = () => {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState({});
  const certRef = useRef(null);
  const sealCanvasRef = useRef(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        const data = await certificateService.getByCode(certificateId);
        setCertificate(data.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificate. Please check the certificate ID.");
      } finally {
        setLoading(false);
      }
    };
    if (certificateId) fetchCertificate();
  }, [certificateId]);

  useEffect(() => {
    const canvas = sealCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const radius = 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGoldSeal(ctx, radius, radius, radius);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const toggleTopic = (id) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllTopics = (expandAll) => {
    if (!certificate?.course?.courseDetails) return;
    const newState = {};
    certificate.course.courseDetails.forEach((topic) => {
      newState[topic.id] = expandAll;
    });
    setExpandedTopics(newState);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800">Verification Failed</h2>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!certificate) return null;

  const {
    certificateNumber,
    issueDate,
    isValid,
    student,
    course,
    admission,
    result,
  } = certificate;

  const totalTheory = course.courseDetails?.reduce(
    (sum, t) => sum + parseFloat(t.theoryDuration || 0),
    0
  );
  const totalPractical = course.courseDetails?.reduce(
    (sum, t) => sum + parseFloat(t.practicalDuration || 0),
    0
  );
  const totalHours = (totalTheory || 0) + (totalPractical || 0);

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center print:py-0 print:bg-white">
      <div
        ref={certRef}
        className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-300 print:border-2 print:shadow-none"
      >
        <div className="absolute inset-2 border-2 border-amber-200/50 pointer-events-none rounded-xl"></div>

        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 L61.8 35.8 L90.2 38.2 L70.2 57.6 L77.6 85.2 L50 72.4 L22.4 85.2 L29.8 57.6 L9.8 38.2 L38.2 35.8 Z' fill='%23b8860b' /%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
            backgroundRepeat: "repeat",
          }}
        ></div>

        {/* HEADER – with ISO logo */}
        <div className="relative bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 px-6 py-6 text-center border-b-4 border-amber-800">
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-3">
              <img
                src="/assets/cnat.png"
                alt="CNAT Logo"
                className="h-14 w-auto object-contain"
              />
              <h2 className="text-2xl font-serif font-bold text-white tracking-widest">
                Coder & AccoTax
              </h2>
              {/* ISO logo badge */}
              <img
                src="/assets/iso-logo.png"
                alt="ISO Certified"
                className="h-10 w-auto object-contain ml-1"
              />
            </div>
            <p className="text-amber-100 text-sm tracking-wider mt-1">
              An ISO Certified Institution
            </p>
          </div>
          <canvas
            ref={sealCanvasRef}
            width="200"
            height="200"
            className="absolute top-2 right-4 z-20 w-24 h-24 md:w-32 md:h-32"
          />
        </div>

        {/* BODY – unchanged */}
        <div className="relative p-8 md:p-12 pt-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-800 tracking-wide">
              Certificate of Completion
            </h1>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-500 text-sm mt-2 italic">This is to certify that</p>
          </div>

          <div className="text-center mb-6">
            <p className="text-3xl md:text-4xl font-serif font-bold text-gray-800 border-b-2 border-dotted border-amber-300 inline-block px-8 pb-2">
              {student.studentName}
            </p>
            {student.nickName && (
              <p className="text-sm text-gray-500 mt-1">( {student.nickName} )</p>
            )}
          </div>

          <div className="text-center text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            has successfully completed the course requirements and demonstrated proficiency in
            <span className="font-semibold text-amber-800"> {course.courseName} </span>
            with a grade of <span className="font-bold text-amber-700">{result.grade}</span>.
          </div>

          <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200/70 shadow-sm">
            <h3 className="text-lg font-serif font-semibold text-amber-800 flex items-center gap-2 mb-4">
              <BookOpenIcon className="h-6 w-6" />
              Course Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm"><span className="font-medium text-gray-700">Course Name:</span> {course.courseName}</p>
                <p className="text-sm"><span className="font-medium text-gray-700">Course Code:</span> {course.courseCode}</p>
                <p className="text-sm"><span className="font-medium text-gray-700">Admission No:</span> {admission.admissionNumber}</p>
              </div>
              <div>
                <p className="text-sm"><span className="font-medium text-gray-700">Admission Date:</span> {admission.admissionDate}</p>
                <p className="text-sm"><span className="font-medium text-gray-700">Completion Date:</span> {admission.completionDate}</p>
                <p className="text-sm"><span className="font-medium text-gray-700">Total Hours:</span> {totalHours.toFixed(1)} hrs</p>
              </div>
              <div>
                <p className="text-sm"><span className="font-medium text-gray-700">Status:</span>
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    admission.courseStatus === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {admission.courseStatus}
                  </span>
                </p>
                <p className="text-sm"><span className="font-medium text-gray-700">Issued:</span> {issueDate}</p>
              </div>
              <div>
                <p className="text-sm"><span className="font-medium text-gray-700">Certificate No:</span>
                  <span className="font-mono text-xs bg-amber-100 px-2 py-0.5 rounded ml-1">{certificateNumber}</span>
                </p>
              </div>
            </div>
          </div>

          {course.courseDetails && course.courseDetails.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-serif font-semibold text-gray-800 flex items-center gap-2">
                  <DocumentTextIcon className="h-6 w-6 text-amber-600" />
                  Course Curriculum
                </h3>
                <div className="flex gap-2 print:hidden">
                  <button
                    onClick={() => toggleAllTopics(true)}
                    className="text-xs text-amber-600 hover:text-amber-800 underline"
                  >
                    Expand all
                  </button>
                  <button
                    onClick={() => toggleAllTopics(false)}
                    className="text-xs text-amber-600 hover:text-amber-800 underline"
                  >
                    Collapse all
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-amber-50/80">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Theory</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Practical</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {course.courseDetails.map((topic, idx) => {
                      const theory = parseFloat(topic.theoryDuration) || 0;
                      const practical = parseFloat(topic.practicalDuration) || 0;
                      const total = theory + practical;
                      const isExpanded = expandedTopics[topic.id] || false;
                      return (
                        <tr key={topic.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-center text-gray-500">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-800">{topic.topicTitle}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{theory.toFixed(1)}h</td>
                          <td className="px-4 py-3 text-center text-gray-600">{practical.toFixed(1)}h</td>
                          <td className="px-4 py-3 text-center font-semibold text-amber-700">{total.toFixed(1)}h</td>
                          <td className="px-4 py-3 text-gray-600 max-w-xs">
                            <div className="flex items-start gap-1">
                              <span className={`text-sm ${isExpanded ? '' : 'line-clamp-2'}`}>
                                {topic.topicDescription}
                              </span>
                              <button
                                onClick={() => toggleTopic(topic.id)}
                                className="text-amber-600 hover:text-amber-800 flex-shrink-0 mt-0.5 print:hidden"
                              >
                                {isExpanded ? (
                                  <ChevronDownIcon className="h-4 w-4" />
                                ) : (
                                  <ChevronRightIcon className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-amber-50/50">
                    <tr>
                      <td colSpan="2" className="px-4 py-3 font-semibold text-gray-700">Total</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-700">{totalTheory?.toFixed(1)}h</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-700">{totalPractical?.toFixed(1)}h</td>
                      <td className="px-4 py-3 text-center font-bold text-amber-800">{totalHours.toFixed(1)}h</td>
                      <td className="px-4 py-3"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200/50 mb-8">
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-1">
                <UserIcon className="h-4 w-4" /> Student Details
              </h4>
              <p className="text-sm"><span className="font-medium">Registration:</span> {student.registrationNumber}</p>
              {student.aadharNumber && (
                <p className="text-sm"><span className="font-medium">Aadhar:</span> {student.aadharNumber}</p>
              )}
              <p className="text-sm"><span className="font-medium">Father:</span> {student.fatherName || "N/A"}</p>
              <p className="text-sm"><span className="font-medium">Mother:</span> {student.motherName || "N/A"}</p>
              <p className="text-sm"><span className="font-medium">DOB:</span> {student.dateOfBirth}</p>
              <p className="text-sm"><span className="font-medium">Gender:</span> {student.gender}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Contact</h4>
              <p className="text-sm"><span className="font-medium">Email:</span> {student.email}</p>
              <p className="text-sm"><span className="font-medium">Phone 1:</span> {student.phone1}</p>
              {student.phone2 && <p className="text-sm"><span className="font-medium">Phone 2:</span> {student.phone2}</p>}
              <p className="text-sm"><span className="font-medium">WhatsApp:</span> {student.whatsapp || student.phone1}</p>
              {student.guardianName && (
                <p className="text-sm"><span className="font-medium">Guardian:</span> {student.guardianName} ({student.guardianRelation})</p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-serif font-semibold text-gray-800 mb-3 text-center">Performance Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-indigo-50 p-3 rounded-lg text-center border border-indigo-100">
                <p className="text-xs text-gray-500 uppercase">Theory</p>
                <p className="text-xl font-bold text-indigo-700">{result.theoryMarks} / {result.totalTheoryMarks}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-100">
                <p className="text-xs text-gray-500 uppercase">Practical</p>
                <p className="text-xl font-bold text-purple-700">{result.practicalMarks} / {result.totalPracticalMarks}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                <p className="text-xs text-gray-500 uppercase">Grade</p>
                <p className="text-xl font-bold text-green-700">{result.grade}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center border border-yellow-100">
                <p className="text-xs text-gray-500 uppercase">Attempt</p>
                <p className="text-xl font-bold text-yellow-700">{result.attemptNo}</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className={`inline-block px-6 py-2 rounded-full text-sm font-bold ${
                result.isPassed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {result.isPassed ? "🎓 PASSED" : "❌ NOT PASSED"}
              </span>
              <span className="ml-4 text-sm text-gray-500">Result Date: {result.resultDate}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t-2 border-dashed border-amber-200">
            <div className="text-center">
              <img
                src="/assets/director-sign.png"
                alt="Director Signature"
                className="h-8 mx-auto mb-1 object-contain"
              />
              <p className="text-xs text-gray-600 font-medium">Director</p>
              <p className="text-[10px] text-gray-400">(Signature)</p>
            </div>
            <div className="text-center">
              <img
                src="/assets/instructor-sign.png"
                alt="Instructor Signature"
                className="h-10 mx-auto mb-1 object-contain"
              />
              <p className="text-xs text-gray-600 font-medium">Instructor</p>
              <p className="text-[10px] text-gray-400">(Signature)</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">{certificateNumber}</span>
              <span>•</span>
              <span>Verified digitally</span>
            </div>
            <div className="flex items-center gap-1 mt-2 sm:mt-0">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">Authentic Certificate</span>
            </div>
          </div>

          <div className="mt-6 text-center print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition-colors"
            >
              <PrinterIcon className="h-5 w-5" />
              Print / Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;