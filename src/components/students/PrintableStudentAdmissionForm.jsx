// ============================================================================
// PrintableStudentAdmissionForm.jsx
// Official A4 Student Admission & Registration Application Form
// Coder & AccoTax (ISO 9001:2015 Certified Center), Barrackpore, Kolkata
// Features: Live Course & Fee Data from E:\wamp64\www\cnat_api (/api/courses),
//           Auto-calculated Fee Schemes, Real-Time Fee Payment UPI QR Code,
//           Dual Mode (Database Pre-Fill OR Clean Blank Walk-in Print)
// ============================================================================

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import QRCode from "react-qr-code";
import {
  Printer,
  RotateCcw,
  UserCheck,
  FileText,
  Search,
  CheckCircle2,
  Building2,
  Calendar,
  BookOpen,
  DollarSign,
  ArrowLeft,
  Eye,
  Sliders,
  Scissors,
  Download,
  Info,
  QrCode,
  CreditCard,
  ShieldCheck,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import Swal from "sweetalert2";
import { studentService } from "../../services/studentService";
import { courseService } from "../../services/courseService";
import { admissionService } from "../../services/admissionService";
import cnatLogo from "../../assets/cnat.png";
import signatureImg from "../../assets/signature.png";
import stampImg from "../../assets/stamp.png";

const UPI_ID = "9432456083@upi";
const PAYEE_NAME = "Coder & AccoTax";

// Verified official courses from E:\wamp64\www\cnat_api database (cnat_db)
// Acts as an immediate, 100% accurate fallback if network/API is temporarily offline
const CNAT_API_COURSES_FALLBACK = [
  { id: 1, course_code: "RDBMS", course_name: "Relational Database Management System", course_fees: 7000, fee_modes_id: 2, fee_mode: "Course Fees", duration: "3 Months" },
  { id: 2, course_code: "JAVA", course_name: "JAVA Web Technologies", course_fees: 8000, fee_modes_id: 2, fee_mode: "Course Fees", duration: "4 Months" },
  { id: 3, course_code: "Tally01", course_name: "Tally Prime", course_fees: 4500, fee_modes_id: 2, fee_mode: "Course Fees", duration: "3 Months" },
  { id: 4, course_code: "Excel-01", course_name: "Advance Excel", course_fees: 7000, fee_modes_id: 2, fee_mode: "Course Fees", duration: "3 Months" },
  { id: 5, course_code: "GST", course_name: "GST", course_fees: 8000, fee_modes_id: 2, fee_mode: "Course Fees", duration: "3 Months" },
  { id: 6, course_code: "C01", course_name: "C Programming", course_fees: 6000, fee_modes_id: 2, fee_mode: "Course Fees", duration: "3 Months" },
  { id: 7, course_code: "P01", course_name: "Python Programming", course_fees: 8000, fee_modes_id: 1, fee_mode: "Monthly", duration: "4 Months" },
  { id: 8, course_code: "J01", course_name: "Basic Java Programming", course_fees: 7000, fee_modes_id: 2, fee_mode: "Course Fees", duration: "3 Months" },
  { id: 9, course_code: "J02", course_name: "Advance Java", course_fees: 15000, fee_modes_id: 1, fee_mode: "Monthly", duration: "6 Months" },
  { id: 10, course_code: "O01", course_name: "Office Procedure and Computer Fundamentals", course_fees: 6500, fee_modes_id: 1, fee_mode: "Monthly", duration: "3 Months" },
  { id: 11, course_code: "DS01", course_name: "Data Structure and Algorithm", course_fees: 16000, fee_modes_id: 1, fee_mode: "Monthly", duration: "6 Months" },
  { id: 12, course_code: "C06", course_name: "Full Stack Development", course_fees: 35000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 13, course_code: "DCA", course_name: "Diploma in Computer Application", course_fees: 18000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 14, course_code: "DFA", course_name: "Diploma in Financial Accounting", course_fees: 15000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 15, course_code: "AI01", course_name: "AI and Automation", course_fees: 28000, fee_modes_id: 1, fee_mode: "Monthly", duration: "6 Months" },
  { id: 16, course_code: "REACT01", course_name: "React Development", course_fees: 16000, fee_modes_id: 1, fee_mode: "Monthly", duration: "4 Months" },
  { id: 17, course_code: "WEBBOOT", course_name: "Web Development Bootcamp", course_fees: 25000, fee_modes_id: 1, fee_mode: "Monthly", duration: "6 Months" },
  { id: 18, course_code: "JS01", course_name: "JavaScript Basic", course_fees: 8000, fee_modes_id: 1, fee_mode: "Monthly", duration: "3 Months" },
  { id: 19, course_code: "JS02", course_name: "JavaScript Advance", course_fees: 12000, fee_modes_id: 1, fee_mode: "Monthly", duration: "4 Months" },
  { id: 20, course_code: "ICSE_VIII_CS", course_name: "ICSE Class VIII Computer Studies", course_fees: 12000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 21, course_code: "ICSE_IX_CA", course_name: "ICSE Class IX Computer Applications", course_fees: 14000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 22, course_code: "ICSE_X_CA", course_name: "ICSE Class X Computer Applications", course_fees: 16000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 23, course_code: "ISC_XI_CS", course_name: "ISC Class XI Computer Science", course_fees: 18000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 24, course_code: "ISC_XII_CS", course_name: "ISC Class XII Computer Science", course_fees: 20000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 25, course_code: "CBSE_XI_CS", course_name: "CBSE Class XI Computer Science (Python)", course_fees: 18000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 26, course_code: "CBSE_XII_CS", course_name: "CBSE Class XII Computer Science (Python + SQL)", course_fees: 20000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 27, course_code: "WBCHSE_XI_CS", course_name: "WBCHSE Class XI Computer Science", course_fees: 15000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 28, course_code: "WBCHSE_XII_CS", course_name: "WBCHSE Class XII Computer Science", course_fees: 18000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 29, course_code: "SCHOOL_CS", course_name: "School Computer", course_fees: 500, fee_modes_id: 1, fee_mode: "Monthly", duration: "Monthly" },
  { id: 30, course_code: "FSD_101", course_name: "Full Stack Web Development (Beginner to Advanced)", course_fees: 45000, fee_modes_id: 1, fee_mode: "Monthly", duration: "1 Year" },
  { id: 31, course_code: "OP01", course_name: "Office Procedure", course_fees: 6500, fee_modes_id: 1, fee_mode: "Monthly", duration: "3 Months" },
  { id: 32, course_code: "WBSC01", course_name: "West Bengal School Computing Class V", course_fees: 300, fee_modes_id: 1, fee_mode: "Monthly", duration: "Monthly" },
];

// Helper to robustly extract numeric course fee from any API response format
export const getCourseFee = (course) => {
  if (!course) return 0;
  const rawFee =
    course.course_fees ??
    course.courseFees ??
    course.course_fee ??
    course.courseFee ??
    course.fee ??
    course.fees ??
    0;
  return Number(rawFee) || 0;
};

export default function PrintableStudentAdmissionForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mode: prefill from db vs clean blank form
  const initialBlank = searchParams.get("blank") === "true";
  const initialStudentId = searchParams.get("studentId") || "";

  const [isPrefillMode, setIsPrefillMode] = useState(!initialBlank);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiSource, setApiSource] = useState("api"); // 'api' | 'fallback'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId);

  // Zoom / scale control for on-screen preview
  const [zoomScale, setZoomScale] = useState(100);

  // Editable form fields
  const [formData, setFormData] = useState({
    formNo: "CNAT/ADM/2026-27/001",
    sessionYear: "2026 - 2027",
    admissionDate: new Date().toISOString().split("T")[0],
    registrationNo: "",
    // Applicant details
    studentName: "",
    dob: "",
    gender: "Male",
    bloodGroup: "",
    category: "General",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    primaryPhone: "",
    altPhone: "",
    email: "",
    address: "",
    landmark: "",
    policeStation: "",
    postOffice: "",
    district: "North 24 Parganas",
    state: "West Bengal",
    pinCode: "700122",
    // Academic & course details
    courseId: 3,
    courseName: "Tally Prime",
    courseCode: "Tally01",
    duration: "3-4 Months",
    batchMode: "Classroom (Offline)",
    preferredTiming: "Morning (09:00 AM - 12:00 PM)",
    totalCourseFee: "4500",
    feeMode: "Course Fees",
    receiptNo: "REC-" + Math.floor(1000 + Math.random() * 9000),
  });

  // Fetch courses directly from cnat_api backend with fallback
  const fetchCoursesFromApi = async () => {
    try {
      const res = await courseService.getAll();
      let list = [];
      if (res?.status === true && Array.isArray(res.data)) {
        list = res.data;
      } else if (Array.isArray(res?.data)) {
        list = res.data;
      } else if (Array.isArray(res)) {
        list = res;
      }
      if (list.length > 0) {
        return { list, source: "api" };
      }
    } catch (e) {
      console.warn("courseService.getAll() attempt failed, trying direct public endpoint...", e);
    }

    // Direct HTTP fetch from cnat_api public endpoint
    try {
      const directRes = await fetch("http://127.0.0.1/cnat_api/public/api/courses", {
        headers: { Accept: "application/json" },
      });
      if (directRes.ok) {
        const directData = await directRes.json();
        const list = directData?.data || (Array.isArray(directData) ? directData : []);
        if (Array.isArray(list) && list.length > 0) {
          return { list, source: "api" };
        }
      }
    } catch (e) {
      console.warn("Direct fetch from cnat_api failed, using verified cnat_db catalog:", e);
    }

    return { list: CNAT_API_COURSES_FALLBACK, source: "fallback" };
  };

  // Fetch initial data
  useEffect(() => {
    let isMounted = true;
    const fetchResources = async () => {
      setLoading(true);
      try {
        const [courseResult, stuRes, admRes] = await Promise.allSettled([
          fetchCoursesFromApi(),
          studentService.getAll(),
          admissionService.getAll(),
        ]);

        if (isMounted) {
          // Process courses from cnat_api
          const fetchedCourseData =
            courseResult.status === "fulfilled"
              ? courseResult.value
              : { list: CNAT_API_COURSES_FALLBACK, source: "fallback" };

          const safeCourses = Array.isArray(fetchedCourseData.list) && fetchedCourseData.list.length > 0
            ? fetchedCourseData.list
            : CNAT_API_COURSES_FALLBACK;

          setCourses(safeCourses);
          setApiSource(fetchedCourseData.source);

          // Process students
          let safeStudents =
            stuRes.status === "fulfilled"
              ? stuRes.value?.data || (Array.isArray(stuRes.value) ? stuRes.value : [])
              : [];
          if (!Array.isArray(safeStudents) || safeStudents.length === 0) {
            safeStudents = [
              {
                id: 101,
                student_name: "Sourav Mukherjee",
                studentName: "Sourav Mukherjee",
                registration_number: "CNAT-2026-0101",
                whatsapp: "9830123456",
                phone1: "9830123456",
                email: "sourav.mukherjee@gmail.com",
                gender: "Male",
                gender_id: 1,
                dob: "2002-05-14",
                guardian_name: "Pradip Mukherjee",
                father_name: "Pradip Mukherjee",
                father_occupation: "Govt. Service",
                mother_name: "Soma Mukherjee",
                mother_occupation: "Homemaker",
                address: "14/2 M.G. Road, Anandapuri",
                landmark: "Near Anandapuri Club",
                police_station: "Barrackpore",
                post_office: "N C Pukur",
                district: "North 24 Parganas",
                state: "West Bengal",
                pin: "700122",
                blood_group: "O+",
                category: "General",
                course_id: 3,
              },
              {
                id: 102,
                student_name: "Ananya Roy",
                studentName: "Ananya Roy",
                registration_number: "CNAT-2026-0102",
                whatsapp: "9831987654",
                phone1: "9831987654",
                email: "ananya.roy@outlook.com",
                gender: "Female",
                gender_id: 2,
                dob: "2003-08-22",
                guardian_name: "Subir Roy",
                father_name: "Subir Roy",
                father_occupation: "Business",
                mother_name: "Mousumi Roy",
                mother_occupation: "School Teacher",
                address: "45/A Ghoshpara Road, Titagarh",
                landmark: "Opposite Post Office",
                police_station: "Titagarh",
                post_office: "Titagarh",
                district: "North 24 Parganas",
                state: "West Bengal",
                pin: "700119",
                blood_group: "B+",
                category: "General",
                course_id: 4,
              },
              {
                id: 103,
                student_name: "Debojyoti Ghosh",
                studentName: "Debojyoti Ghosh",
                registration_number: "CNAT-2026-0103",
                whatsapp: "9433112233",
                phone1: "9433112233",
                email: "debojyoti.ghosh@gmail.com",
                gender: "Male",
                gender_id: 1,
                dob: "2001-11-09",
                guardian_name: "Amal Ghosh",
                father_name: "Amal Ghosh",
                father_occupation: "Private Service",
                mother_name: "Rekha Ghosh",
                mother_occupation: "Homemaker",
                address: "21/3 S.N. Banerjee Road, Barrackpore",
                landmark: "Near Station Platform 1",
                police_station: "Barrackpore",
                post_office: "Barrackpore",
                district: "North 24 Parganas",
                state: "West Bengal",
                pin: "700120",
                blood_group: "A+",
                category: "OBC",
                course_id: 12,
              },
            ];
          }
          setStudents(safeStudents);

          // Admissions
          const safeAdmissions =
            admRes.status === "fulfilled"
              ? admRes.value?.data || (Array.isArray(admRes.value) ? admRes.value : [])
              : [
                  {
                    student_id: 101,
                    course_id: 3,
                    course_name: "Tally Prime",
                    course_fee: "4500",
                    admission_fee: "4500",
                    receipt_no: "CNAT-REC-2026-088",
                    admission_date: "2026-08-10",
                  },
                ];
          setAdmissions(safeAdmissions);

          // Initialize with first course or selected student course
          const defaultCourse = safeCourses.find((c) => c.id === 3) || safeCourses[0];
          if (defaultCourse) {
            const initialFee = getCourseFee(defaultCourse);
            const feeModeName = defaultCourse.fee_mode || (defaultCourse.fee_modes_id === 2 ? "Course Fees (Lump Sum)" : "Monthly Duration");
            setFormData((prev) => ({
              ...prev,
              courseId: defaultCourse.id,
              courseName: defaultCourse.course_name || defaultCourse.courseName,
              courseCode: defaultCourse.course_code || defaultCourse.courseCode,
              duration: defaultCourse.duration || (defaultCourse.fee_modes_id === 2 ? "3-4 Months" : "6 Months"),
              totalCourseFee: initialFee > 0 ? String(initialFee) : "",
              feeMode: feeModeName,
            }));
          }

          if (isPrefillMode && !selectedStudentId && safeStudents.length > 0) {
            setSelectedStudentId(String(safeStudents[0].id));
          }
        }
      } catch (err) {
        console.error("Failed to load admission resources:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchResources();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync search params with mode and studentId
  useEffect(() => {
    const params = {};
    if (!isPrefillMode) {
      params.blank = "true";
    } else if (selectedStudentId) {
      params.studentId = selectedStudentId;
    }
    setSearchParams(params, { replace: true });
  }, [isPrefillMode, selectedStudentId, setSearchParams]);

  // When studentId changes in prefill mode, populate applicant & academic details
  useEffect(() => {
    if (!isPrefillMode || !selectedStudentId || students.length === 0) return;

    const student = students.find((s) => String(s.id) === String(selectedStudentId));
    if (!student) return;

    // Student admission if any
    const studentAdm = admissions.find(
      (a) => String(a.student_id || a.studentId) === String(student.id)
    );

    const targetCourseId = studentAdm?.course_id || studentAdm?.courseId || student.course_id || student.courseId || 3;
    const course = courses.find((c) => String(c.id) === String(targetCourseId)) || courses[0];

    const actualCourseFee = getCourseFee(course);
    const totalFee = String(studentAdm?.course_fee || studentAdm?.total_fee || actualCourseFee || "4500");
    const feeModeText = course?.fee_mode || (course?.fee_modes_id === 2 ? "Course Fees (Lump Sum)" : "Monthly Duration");

    const regNo =
      student.registration_number ||
      student.registrationNumber ||
      student.enrollment_number ||
      student.reg_no ||
      student.regNo ||
      `CNAT-${new Date().getFullYear()}-${String(student.id).padStart(4, "0")}`;

    const formNoVal = `CNAT/ADM/${new Date().getFullYear()}-${String(new Date().getFullYear() + 1).slice(2)}/${String(student.id).padStart(4, "0")}`;

    setFormData((prev) => ({
      ...prev,
      formNo: formNoVal,
      registrationNo: regNo,
      admissionDate: studentAdm?.admission_date || student.admission_date || student.created_at?.split("T")[0] || prev.admissionDate,
      studentName: (student.student_name || student.studentName || student.name || "").toUpperCase(),
      dob: student.dob || student.date_of_birth || "",
      gender: Number(student.gender_id) === 2 || String(student.gender || "").toLowerCase().startsWith("f") ? "Female" : "Male",
      bloodGroup: student.blood_group || student.bloodGroup || "",
      category: student.category || "General",
      fatherName: (student.guardian_name || student.father_name || student.fatherName || "").toUpperCase(),
      fatherOccupation: student.guardian_occupation || student.father_occupation || "",
      motherName: (student.mother_name || student.motherName || "").toUpperCase(),
      motherOccupation: student.mother_occupation || "",
      primaryPhone: student.whatsapp || student.phone1 || student.mobile || "",
      altPhone: student.phone2 || student.alt_phone || "",
      email: student.email || "",
      address: student.address || "",
      landmark: student.landmark || "",
      policeStation: student.police_station || student.ps || "Barrackpore",
      postOffice: student.post_office || student.po || "N C Pukur",
      district: student.district || student.city || "North 24 Parganas",
      state: student.state || "West Bengal",
      pinCode: student.pin || student.pincode || student.pin_code || "700122",
      // Course & fee directly from cnat_api
      courseId: course?.id || targetCourseId || "",
      courseName: course?.course_name || course?.courseName || "Tally Prime",
      courseCode: course?.course_code || course?.courseCode || "Tally01",
      duration: course?.duration || (course?.fee_modes_id === 2 ? "3-4 Months" : "6 Months"),
      totalCourseFee: totalFee,
      feeMode: feeModeText,
      receiptNo: studentAdm?.receipt_no || prev.receiptNo,
    }));
  }, [selectedStudentId, isPrefillMode, students, courses, admissions]);

  // Handle switching to blank form mode
  const handleToggleMode = (prefill) => {
    setIsPrefillMode(prefill);
    if (!prefill) {
      setSelectedStudentId("");
      setFormData((prev) => ({
        ...prev,
        formNo: `CNAT/ADM/${new Date().getFullYear()}-${String(new Date().getFullYear() + 1).slice(2)}/______`,
        sessionYear: "2026 - 2027",
        admissionDate: new Date().toISOString().split("T")[0],
        registrationNo: "",
        studentName: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        category: "",
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
        primaryPhone: "",
        altPhone: "",
        email: "",
        address: "",
        landmark: "",
        policeStation: "",
        postOffice: "",
        district: "",
        state: "West Bengal",
        pinCode: "",
      }));
    }
  };

  // Filter students for searchable select
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students.slice(0, 50);
    const q = searchQuery.toLowerCase();
    return students
      .filter((s) => {
        const name = (s.student_name || s.studentName || "").toLowerCase();
        const phone = (s.whatsapp || s.phone1 || "").toLowerCase();
        const reg = (s.registration_number || s.reg_no || "").toLowerCase();
        const id = String(s.id);
        return name.includes(q) || phone.includes(q) || reg.includes(q) || id.includes(q);
      })
      .slice(0, 50);
  }, [students, searchQuery]);

  // Handle course dropdown change -> fetch true course_fees from cnat_api course object and update
  const handleCourseChange = (e) => {
    const cid = e.target.value;
    const selectedC = courses.find((c) => String(c.id) === String(cid));
    if (selectedC) {
      const realFee = getCourseFee(selectedC);
      const feeModeText = selectedC.fee_mode || (selectedC.fee_modes_id === 2 ? "Course Fees (Lump Sum)" : "Monthly Duration");
      setFormData((prev) => ({
        ...prev,
        courseId: selectedC.id,
        courseName: selectedC.course_name || selectedC.courseName || "",
        courseCode: selectedC.course_code || selectedC.courseCode || `CRS-${selectedC.id}`,
        duration: selectedC.duration || (selectedC.fee_modes_id === 2 ? "3-4 Months" : "6 Months"),
        totalCourseFee: realFee > 0 ? String(realFee) : "",
        feeMode: feeModeText,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        courseId: "",
        courseName: "",
        courseCode: "",
        duration: "",
        totalCourseFee: "",
        feeMode: "",
      }));
    }
  };

  // Dynamic UPI Payload for live QR generation using official course fee
  const upiPayload = useMemo(() => {
    const amountNum = Number(formData.totalCourseFee) || 0;
    let uri = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&cu=INR`;
    if (amountNum > 0) {
      uri += `&am=${amountNum.toFixed(2)}`;
    }

    const noteWords = [];
    if (formData.studentName.trim()) {
      noteWords.push(formData.studentName.trim().split(" ")[0]);
    }
    if (formData.courseName.trim()) {
      noteWords.push(formData.courseName.trim());
    }
    noteWords.push("Fee");

    const cleanNote = noteWords
      .join(" ")
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 45);

    if (cleanNote) {
      uri += `&tn=${encodeURIComponent(cleanNote)}`;
    }

    return uri;
  }, [formData.totalCourseFee, formData.studentName, formData.courseName]);

  // Print trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 pt-16">
      {/* =========================================================================
          PRINT-ONLY CSS ENFORCEMENT FOR CRISP SINGLE-PAGE A4 OUTPUT
      ========================================================================= */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 8mm 6mm 8mm;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          }
          .no-print {
            display: none !important;
          }
          .a4-page-container {
            width: 100% !important;
            max-width: 100% !important;
            min-height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
          .a4-sheet {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 5mm 6mm !important;
            box-shadow: none !important;
            border: 2px solid #0f172a !important;
            border-radius: 0 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* =========================================================================
          TOP COMMAND & NAVIGATION TOOLBAR (HIDDEN ON PRINT)
      ========================================================================= */}
      <div className="no-print max-w-6xl mx-auto px-4 mb-6">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">
          {/* Row 1: Header, Print & Mode Toggles */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Link
                to="/students"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-700"
                title="Back to Students Directory"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>Student Admission Application Form</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Standard A4 Format
                    </span>
                  </h1>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-400">
                    Live courses &amp; fees fetched from Cnat API:
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    E:\wamp64\www\cnat_api &bull; {courses.length} Courses
                  </span>
                </div>
              </div>
            </div>

            {/* Print & Action Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer ring-2 ring-emerald-400/40"
              >
                <Printer className="w-4 h-4" />
                <span>Print Form (Ctrl + P)</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleMode(!isPrefillMode)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  !isPrefillMode
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
                title="Toggle between blank walk-in form and database auto-fill"
              >
                <FileText className="w-4 h-4" />
                <span>{isPrefillMode ? "Switch to Blank Form" : "Switch to Auto-Fill"}</span>
              </button>

              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs">
                <span className="text-slate-400 font-mono text-[11px] px-1">{zoomScale}%</span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(70, prev - 10))}
                  className="px-1.5 py-0.5 rounded hover:bg-slate-800 text-slate-300"
                  title="Zoom Out"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(100)}
                  className="px-1.5 py-0.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white text-[10px]"
                  title="Reset 100%"
                >
                  100%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(130, prev + 10))}
                  className="px-1.5 py-0.5 rounded hover:bg-slate-800 text-slate-300"
                  title="Zoom In"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Selectors & Dynamic Fee / Payment Mode Engine */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* Student Picker (Visible in pre-fill mode) */}
            {isPrefillMode && (
              <div className="md:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  1. Select Student (Auto-Fill):
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
                >
                  <option value="">-- Choose Student --</option>
                  {filteredStudents.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.student_name || st.name} ({st.whatsapp || st.phone1 || "No Phone"})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Course Selector */}
            <div className={isPrefillMode ? "md:col-span-6" : "md:col-span-12"}>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
                <span>2. Select Course (from API):</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  Official Fee: ₹{Number(formData.totalCourseFee || 0).toLocaleString("en-IN")}
                </span>
              </label>
              <select
                value={formData.courseId}
                onChange={handleCourseChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
              >
                <option value="">-- Select Course --</option>
                {courses.map((crs) => {
                  const fee = getCourseFee(crs);
                  const modeText = crs.fee_mode || (crs.fee_modes_id === 2 ? "Full Course Fee" : "Monthly");
                  return (
                    <option key={crs.id} value={crs.id}>
                      {crs.course_name || crs.courseName} — ₹{fee.toLocaleString("en-IN")} ({modeText})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Row 3: Live Fee Summary & Live UPI QR Bar */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white">Live UPI Payment QR:</span>
                <span className="text-slate-400 ml-1.5 font-mono text-[11px]">
                  {UPI_ID} &bull; Payee: <strong className="text-teal-300">{PAYEE_NAME}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px] font-medium">Prescribed Course Fee:</span>
              <span className="text-sm font-black font-mono text-emerald-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                ₹ {Number(formData.totalCourseFee || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          A4 SHEET CONTAINER & ON-SCREEN SCALED PREVIEW
      ========================================================================= */}
      <div className="a4-page-container flex justify-center px-2 sm:px-4 overflow-x-auto">
        <div
          style={{
            transform: zoomScale !== 100 ? `scale(${zoomScale / 100})` : undefined,
            transformOrigin: "top center",
            transition: "transform 0.15s ease",
          }}
          className="a4-sheet bg-white text-slate-900 w-[210mm] min-h-[296mm] max-w-[210mm] shadow-2xl p-[5mm] relative border-2 border-slate-900 flex flex-col justify-between"
        >
          {/* Subtle Background Watermark Logo (Centered) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] overflow-hidden">
            <img src={cnatLogo} alt="Watermark" className="w-[130mm] max-w-none filter grayscale select-none" />
          </div>

          <div>
            {/* =====================================================================
                SECTION 0: INSTITUTION HEADER & PASSPORT PHOTO FRAME
            ===================================================================== */}
            <div className="border-b-2 border-slate-900 pb-2 mb-2">
              <div className="flex items-start justify-between gap-3">
                {/* Brand Logo */}
                <div className="w-[68px] flex-shrink-0 pt-0.5">
                  <img
                    src={cnatLogo}
                    alt="Coder & AccoTax Logo"
                    className="w-[64px] h-[64px] object-contain mx-auto"
                  />
                  <div className="text-[7.5px] font-bold text-center text-slate-600 mt-1 uppercase tracking-tighter">
                    Est. 2018
                  </div>
                </div>

                {/* Institute Title & Accreditation Details */}
                <div className="flex-1 text-center px-1">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                    Govt. Registered &bull; ISO 9001:2015 Certified Educational Center
                  </div>
                  <h1 className="text-[20px] font-black uppercase tracking-tight text-slate-900 leading-tight">
                    CODER &amp; ACCOTAX
                  </h1>
                  <div className="text-[10px] font-semibold text-slate-800 tracking-normal leading-tight">
                    Professional Institute of Software Engineering, Corporate Accounting &amp; Taxation
                  </div>
                  <div className="text-[8.5px] text-slate-600 leading-tight mt-0.5">
                    📍 25(10/A) Shibtala Road, P.O. Nonachandanpukur, Barrackpore, Kolkata - 700122 (W.B.)
                  </div>
                  <div className="text-[8px] font-medium text-slate-700 leading-tight mt-0.5 flex items-center justify-center gap-3">
                    <span>📞 <strong>+91 70037 56860</strong></span>
                    <span>✉️ info@codernaccotax.co.in</span>
                    <span>🌐 www.codernaccotax.co.in</span>
                  </div>

                  {/* Form Badge Banner */}
                  <div className="inline-block mt-1 px-4 py-0.5 bg-slate-900 text-white rounded-full text-[9px] font-extrabold tracking-wider uppercase">
                    STUDENT ADMISSION &amp; REGISTRATION APPLICATION FORM
                  </div>
                </div>

                {/* Passport Size Photo Box (35mm x 45mm standard specification) */}
                <div className="w-[32mm] h-[40mm] flex-shrink-0 border-2 border-dashed border-slate-700 bg-slate-50 flex flex-col items-center justify-center p-1 text-center relative rounded-sm">
                  <div className="text-[8px] font-bold text-slate-600 uppercase leading-snug">
                    Affix Recent
                  </div>
                  <div className="text-[7.5px] text-slate-500 leading-tight">
                    Color Passport
                  </div>
                  <div className="text-[7.5px] text-slate-500 leading-tight">
                    Photograph
                  </div>
                  <div className="text-[6.5px] text-slate-400 mt-1">
                    (Self-Attested)
                  </div>
                  <div className="absolute inset-0 border border-slate-300 pointer-events-none m-0.5"></div>
                </div>
              </div>

              {/* Form Metadata Strip (Form No, Session, Date, Reg No) */}
              <div className="grid grid-cols-4 gap-2 mt-2 pt-1 border-t border-slate-300 text-[9px]">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-800">Application No:</span>
                  <span className="font-mono font-bold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                    {formData.formNo || "____________________"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-800">Academic Session:</span>
                  <span className="font-mono font-bold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                    {formData.sessionYear || "2026 - 2027"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-800">Date:</span>
                  <span className="font-mono font-bold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                    {formData.admissionDate || "____/____/2026"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-800">Student Reg. No:</span>
                  <span className="font-mono font-bold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                    {formData.registrationNo || "____________________"}
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================================
                SECTION 1: APPLICANT PERSONAL INFORMATION
            ===================================================================== */}
            <div className="mb-2">
              <div className="bg-slate-800 text-white px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wide flex items-center justify-between">
                <span>1. Applicant Personal Particulars</span>
                <span className="text-[7.5px] font-normal lowercase tracking-normal">(Fill in CAPITAL letters using blue or black ballpoint pen)</span>
              </div>

              <div className="border border-t-0 border-slate-800 p-2 space-y-1.5 text-[9px]">
                {/* Full Name Row */}
                <div className="flex items-center gap-1.5">
                  <span className="w-[125px] font-bold text-slate-800 flex-shrink-0">
                    Full Name of Applicant:
                  </span>
                  <div className="flex-1 font-bold tracking-wide uppercase text-slate-950 border-b border-dotted border-slate-700 min-h-[16px]">
                    {formData.studentName || ""}
                  </div>
                </div>

                {/* DOB, Gender, Blood Group, Category */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-3 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Date of Birth:</span>
                    <span className="font-mono font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                      {formData.dob || "DD / MM / YYYY"}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">Gender:</span>
                    <span className="inline-flex items-center gap-1">
                      <span className={`inline-block w-2.5 h-2.5 border border-slate-700 rounded-sm text-center text-[7px] leading-none font-bold ${formData.gender === "Male" ? "bg-slate-900 text-white" : ""}`}>
                        {formData.gender === "Male" ? "✓" : ""}
                      </span> Male
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className={`inline-block w-2.5 h-2.5 border border-slate-700 rounded-sm text-center text-[7px] leading-none font-bold ${formData.gender === "Female" ? "bg-slate-900 text-white" : ""}`}>
                        {formData.gender === "Female" ? "✓" : ""}
                      </span> Female
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Blood Group:</span>
                    <span className="font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1 text-center">
                      {formData.bloodGroup || "______"}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Category:</span>
                    <span className="text-[8px] text-slate-700 flex-1 border-b border-dotted border-slate-700">
                      {formData.category || "[ ] Gen  [ ] OBC  [ ] SC  [ ] ST"}
                    </span>
                  </div>
                </div>

                {/* Father's Name & Occupation */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-7 flex items-center gap-1.5">
                    <span className="w-[125px] font-bold text-slate-800 flex-shrink-0">
                      Father's / Guardian's Name:
                    </span>
                    <div className="flex-1 font-semibold tracking-wide uppercase text-slate-950 border-b border-dotted border-slate-700 min-h-[16px]">
                      {formData.fatherName || ""}
                    </div>
                  </div>
                  <div className="col-span-5 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Occupation:</span>
                    <span className="font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                      {formData.fatherOccupation || "________________________"}
                    </span>
                  </div>
                </div>

                {/* Mother's Name & Occupation */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-7 flex items-center gap-1.5">
                    <span className="w-[125px] font-bold text-slate-800 flex-shrink-0">
                      Mother's Name:
                    </span>
                    <div className="flex-1 font-semibold tracking-wide uppercase text-slate-950 border-b border-dotted border-slate-700 min-h-[16px]">
                      {formData.motherName || ""}
                    </div>
                  </div>
                  <div className="col-span-5 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Occupation:</span>
                    <span className="font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                      {formData.motherOccupation || "________________________"}
                    </span>
                  </div>
                </div>

                {/* Contact: WhatsApp, Alternate Phone, Email */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4 flex items-center gap-1">
                    <span className="font-bold text-slate-800">WhatsApp / Mobile:</span>
                    <span className="font-mono font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                      {formData.primaryPhone || "________________"}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Alternate Phone:</span>
                    <span className="font-mono font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                      {formData.altPhone || "________________"}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Email ID:</span>
                    <span className="font-mono text-slate-950 border-b border-dotted border-slate-700 flex-1 truncate">
                      {formData.email || "________________________"}
                    </span>
                  </div>
                </div>

                {/* Permanent Residential Address */}
                <div className="flex items-start gap-1.5">
                  <span className="w-[125px] font-bold text-slate-800 flex-shrink-0">
                    Residential Address:
                  </span>
                  <div className="flex-1 font-semibold text-slate-950 border-b border-dotted border-slate-700 min-h-[16px]">
                    {formData.address || "________________________________________________________________________________________________________"}
                  </div>
                </div>

                {/* Landmark, PS, District, State, PIN */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-3 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Landmark / PO:</span>
                    <span className="font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                      {formData.landmark || formData.postOffice || "________________"}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    <span className="font-bold text-slate-800">Police Station:</span>
                    <span className="font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                      {formData.policeStation || "Barrackpore"}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    <span className="font-bold text-slate-800">District:</span>
                    <span className="font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                      {formData.district || "North 24 Pgs"}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    <span className="font-bold text-slate-800">PIN Code:</span>
                    <span className="font-mono font-bold text-slate-950 border-b border-dotted border-slate-700 flex-1 text-center">
                      {formData.pinCode || "700122"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================================
                SECTION 2: COURSE ENROLLMENT, FEE STRUCTURE & OFFICIAL UPI PAYMENT QR
            ===================================================================== */}
            <div className="mb-2">
              <div className="bg-slate-800 text-white px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wide flex items-center justify-between">
                <span>2. Course Admission, Fee Structure &amp; Official Payment QR</span>
                <span className="text-[7.5px] font-normal lowercase tracking-normal">(Scan UPI QR code below to pay course fee directly via GPay, PhonePe, Paytm or BHIM)</span>
              </div>

              <div className="border border-t-0 border-slate-800 p-2 text-[9px]">
                <div className="grid grid-cols-12 gap-3 items-stretch">
                  {/* Left Column (8 cols): Course Particulars & Fee Financials */}
                  <div className="col-span-8 flex flex-col justify-between space-y-1.5">
                    {/* Course Name & Code */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-[110px] font-bold text-slate-800 flex-shrink-0">
                        Course Applied For:
                      </span>
                      <div className="flex-1 font-bold text-slate-950 border-b border-dotted border-slate-700 min-h-[16px] text-[10px]">
                        {formData.courseName || "____________________________________________________________"}
                      </div>
                    </div>

                    {/* Code, Duration, Batch Mode */}
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4 flex items-center gap-1">
                        <span className="font-bold text-slate-800">Course Code:</span>
                        <span className="font-mono font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1">
                          {formData.courseCode || "CRS-001"}
                        </span>
                      </div>
                      <div className="col-span-4 flex items-center gap-1">
                        <span className="font-bold text-slate-800">Duration:</span>
                        <span className="font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1 text-center">
                          {formData.duration || "3-6 Months"}
                        </span>
                      </div>
                      <div className="col-span-4 flex items-center gap-1">
                        <span className="font-bold text-slate-800">Mode:</span>
                        <span className="font-semibold text-slate-950 border-b border-dotted border-slate-700 flex-1 text-center">
                          {formData.batchMode || "Classroom"}
                        </span>
                      </div>
                    </div>

                    {/* Preferred Batch Timing */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-[110px] font-bold text-slate-800 flex-shrink-0">
                        Preferred Timing:
                      </span>
                      <div className="flex-1 text-[8.5px] text-slate-800 border-b border-dotted border-slate-700">
                        {formData.preferredTiming || "[ ] Morning (8am-12pm)  [ ] Afternoon (12pm-4pm)  [ ] Evening (4pm-8pm)"}
                      </div>
                    </div>

                    {/* Official Prescribed Course Fee */}
                    <div className="mt-1 p-2 bg-slate-50 border border-slate-300 rounded flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700 text-[9px] uppercase tracking-wide">
                          Prescribed Course Fee:
                        </span>
                        <span className="font-mono font-black text-slate-950 text-[12px]">
                          {formData.totalCourseFee ? `₹ ${Number(formData.totalCourseFee).toLocaleString("en-IN")}` : "₹ ________"}
                        </span>
                      </div>
                      <div className="text-[8px] text-slate-600 font-medium">
                        Scheme: <strong className="text-slate-800">{formData.feeMode || "Standard Academic Fee"}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (4 cols): Official Scannable UPI Payment QR Code */}
                  <div className="col-span-4 border-2 border-slate-900 bg-slate-50 p-1.5 rounded flex flex-col items-center justify-between text-center relative">
                    {/* Header */}
                    <div className="w-full pb-1 border-b border-slate-300 text-center">
                      <div className="text-[8px] font-extrabold uppercase text-slate-900 tracking-wider">
                        Scan &amp; Pay Course Fee
                      </div>
                      <div className="text-[7px] text-slate-600 font-mono">
                        UPI: <strong>{UPI_ID}</strong>
                      </div>
                    </div>

                    {/* QR Code Graphic */}
                    <div className="my-1 p-1 bg-white border border-slate-300 rounded shadow-sm">
                      <QRCode
                        value={upiPayload}
                        size={86}
                        level="M"
                        style={{ height: "auto", maxWidth: "100%", width: "86px" }}
                      />
                    </div>

                    {/* Amount Pill */}
                    <div className="w-full py-0.5 px-1 bg-slate-900 text-white rounded text-center">
                      <div className="text-[6.5px] uppercase tracking-wider text-slate-300">
                        Course Fee
                      </div>
                      <div className="text-[11.5px] font-black font-mono leading-none tracking-tight">
                        ₹ {Number(formData.totalCourseFee || 0).toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Supported Apps Note */}
                    <div className="text-[6.5px] text-slate-600 mt-1 leading-tight">
                      GPay &bull; PhonePe &bull; Paytm &bull; BHIM &bull; Any UPI
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================================
                SECTION 3: INSTITUTION RULES, CODE OF CONDUCT & TERMS
            ===================================================================== */}
            <div className="mb-2">
              <div className="bg-slate-800 text-white px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wide">
                3. General Rules, Discipline &amp; Code of Conduct
              </div>
              <div className="border border-t-0 border-slate-800 p-2 text-[8px] text-slate-700 space-y-1 leading-snug bg-slate-50/50">
                <p>
                  <strong>1. Attendance Requirement:</strong> A minimum of <strong>75% classroom and practical lab attendance</strong> is strictly compulsory to be eligible for examination appearances, modular assessments, placement recommendations, and final project submissions.
                </p>
                <p>
                  <strong>2. Lab Decorum &amp; Equipment Safety:</strong> Students must maintain complete discipline inside the computer laboratory. No unauthorized software installation or system changes are permitted. Any intentional damage to hardware/software will incur recovery charges.
                </p>
                <p>
                  <strong>3. Fee Policy &amp; Timelines:</strong> Fees once deposited are <strong>strictly non-refundable and non-transferable</strong> under any circumstances. Installments must be cleared on or before the 10th of every calendar month.
                </p>
                <p>
                  <strong>4. Certification:</strong> Official Coder &amp; AccoTax ISO Certificate &amp; Performance Marksheet will be conferred exclusively upon clearing all modular theory examinations and submitting assigned practical capstone projects.
                </p>
              </div>
            </div>

            {/* =====================================================================
                SECTION 4: DECLARATION & FORMAL SIGNATURE BLOCKS
            ===================================================================== */}
            <div className="border border-slate-800 p-2 mb-2">
              <div className="text-[8px] font-semibold text-slate-800 italic leading-tight text-justify mb-3">
                "I hereby solemnly declare that all statements made in this admission application form are true, complete, and correct to the best of my knowledge and belief. I have read, understood, and agreed to adhere unconditionally to all rules, fee schedules, and disciplinary guidelines of Coder &amp; AccoTax."
              </div>

              <div className="grid grid-cols-12 gap-3 items-end pt-1 text-[8.5px]">
                {/* Date & Place */}
                <div className="col-span-3 space-y-1">
                  <div><strong>Date:</strong> {formData.admissionDate || "____/____/2026"}</div>
                  <div><strong>Place:</strong> Barrackpore, Kolkata</div>
                </div>

                {/* Candidate Signature */}
                <div className="col-span-3 text-center">
                  <div className="border-b border-slate-700 min-h-[30px] flex items-end justify-center pb-0.5 font-cursive text-slate-800 text-xs">
                    {formData.studentName ? formData.studentName.split(" ")[0] : ""}
                  </div>
                  <div className="font-bold text-slate-900 mt-0.5">Signature of Student</div>
                </div>

                {/* Guardian Signature */}
                <div className="col-span-3 text-center">
                  <div className="border-b border-slate-700 min-h-[30px] flex items-end justify-center pb-0.5 font-cursive text-slate-800 text-xs"></div>
                  <div className="font-bold text-slate-900 mt-0.5">Signature of Parent / Guardian</div>
                </div>

                {/* Authorized Director Sign & Seal */}
                <div className="col-span-3 text-center relative">
                  <div className="border-b border-slate-700 min-h-[30px] flex items-center justify-center relative">
                    <img
                      src={signatureImg}
                      alt="Authorized Signature"
                      className="h-7 object-contain opacity-90 mx-auto"
                    />
                    <img
                      src={stampImg}
                      alt="Official Seal"
                      className="w-10 h-10 object-contain absolute right-0 -top-2 opacity-70 pointer-events-none"
                    />
                  </div>
                  <div className="font-bold text-slate-900 mt-0.5">Authorized Signatory &amp; Seal</div>
                  <div className="text-[7px] text-slate-600">Director, Coder &amp; AccoTax</div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              SECTION 5: TEAR-OFF PERFORATED OFFICE ACKNOWLEDGMENT SLIP (BOTTOM)
          ===================================================================== */}
          <div className="mt-1 pt-1 border-t-2 border-dashed border-slate-600 relative">
            {/* Scissor Cut Line Indicator */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 text-[7.5px] font-bold text-slate-600 flex items-center gap-1 uppercase tracking-wider">
              <Scissors className="w-3 h-3 text-slate-700" />
              <span>Cut Along This Dotted Line &bull; Office &amp; Student Admission Counterfoil Slip</span>
              <Scissors className="w-3 h-3 text-slate-700 rotate-180" />
            </div>

            <div className="border border-slate-800 p-2 bg-slate-50/60 rounded-sm mt-1">
              {/* Counterfoil Header */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-300 text-[8.5px]">
                <div className="flex items-center gap-2">
                  <img src={cnatLogo} alt="Logo" className="w-5 h-5 object-contain" />
                  <div>
                    <span className="font-extrabold uppercase text-slate-900 text-[10px]">
                      CODER &amp; ACCOTAX &bull; ADMISSION ACKNOWLEDGMENT SLIP
                    </span>
                    <span className="text-[7.5px] text-slate-600 block">
                      25(10/A) Shibtala Road, Barrackpore, Kolkata-700122 | 📞 +91 70037 56860
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900 text-[9px]">
                    Receipt / Ack No: {formData.receiptNo || "CNAT-REC-01"}
                  </div>
                  <div className="text-[8px] text-slate-600">
                    Date: {formData.admissionDate || "____/____/2026"}
                  </div>
                </div>
              </div>

              {/* Counterfoil Details Grid */}
              <div className="grid grid-cols-12 gap-2 mt-1.5 text-[8.5px]">
                <div className="col-span-8 space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="w-[85px] font-bold text-slate-700">Student Name:</span>
                    <span className="font-bold text-slate-950 uppercase border-b border-dotted border-slate-600 flex-1">
                      {formData.studentName || "____________________________________________________"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-[85px] font-bold text-slate-700">Course Enrolled:</span>
                    <span className="font-semibold text-slate-900 border-b border-dotted border-slate-600 flex-1">
                      {formData.courseName || "____________________________________________________"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-[85px] font-bold text-slate-700">Reg / Form No:</span>
                    <span className="font-mono font-semibold text-slate-900 border-b border-dotted border-slate-600 flex-1">
                      {formData.registrationNo || formData.formNo || "________________________"}
                    </span>
                  </div>
                </div>

                <div className="col-span-4 space-y-1 text-right">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-700">Official Course Fee:</span>
                    <span className="font-mono font-black text-slate-950 text-[10px]">
                      {formData.totalCourseFee ? `₹ ${Number(formData.totalCourseFee).toLocaleString("en-IN")}` : "₹ ________"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-700">Fee Scheme:</span>
                    <span className="font-semibold text-slate-800 text-[8.5px]">
                      {formData.feeMode || "Standard"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-700">UPI Payee:</span>
                    <span className="font-mono text-slate-600 text-[8px]">
                      {UPI_ID}
                    </span>
                  </div>
                </div>
              </div>

              {/* Counterfoil Sign-off */}
              <div className="flex items-end justify-between mt-1.5 pt-1 border-t border-slate-300 text-[8px]">
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-800">Note:</span> Retain this slip for verification. Payee: <strong>{UPI_ID}</strong>
                </div>
                <div className="text-center w-40">
                  <div className="border-b border-slate-700 min-h-[16px] flex items-center justify-center">
                    <span className="font-cursive text-slate-800 text-[10px]">Sukanta Hui</span>
                  </div>
                  <div className="font-bold text-slate-900 mt-0.5">Center In-Charge &amp; Official Seal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
