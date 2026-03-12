import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { 
  User, BookOpen, DollarSign, Calendar, Save, List, 
  RefreshCw, Search, XCircle, ChevronUp, ChevronDown, Download, Printer
} from "lucide-react";
import { admissionService } from "../services/admissionService";
import { studentService } from "../services/studentService";
import { courseService } from "../services/courseService";

const StudentAdmission = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'admissionDate', direction: 'desc' });
    const [loading, setLoading] = useState({
        students: false,
        courses: false,
        admissions: false,
        submit: false,
    });

    const [formData, setFormData] = useState({
        studentId: "",
        courseId: "",
        courseStatusId: 1,
        courseFees: "",
        admissionDate: "",
    });

    // Helper for SweetAlert2 theme (dark mode aware)
    const getSwalTheme = () => {
        const isDark = document.documentElement.classList.contains("dark");
        return {
            background: isDark ? "#111827" : "#ffffff",
            color: isDark ? "#f9fafb" : "#111827",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#6b7280",
            didOpen: (popup) => {
                if (isDark) popup.style.border = "1px solid white";
            },
        };
    };

    // Load initial data
    useEffect(() => {
        document.documentElement.classList.add("dark");
        loadStudents();
        loadCourses();
        loadAdmissions();
    }, []);

    const loadStudents = async () => {
        setLoading(prev => ({ ...prev, students: true }));
        try {
            const response = await studentService.getAll();
            setStudents(response.data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load students.",
                ...getSwalTheme(),
            });
        } finally {
            setLoading(prev => ({ ...prev, students: false }));
        }
    };

    const loadCourses = async () => {
        setLoading(prev => ({ ...prev, courses: true }));
        try {
            const data = await courseService.getAll();
            setCourses(data.data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load courses.",
                ...getSwalTheme(),
            });
        } finally {
            setLoading(prev => ({ ...prev, courses: false }));
        }
    };

    const loadAdmissions = async () => {
        setLoading(prev => ({ ...prev, admissions: true }));
        try {
            const response = await admissionService.getAll();
            setAdmissions(response.data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load admissions.",
                ...getSwalTheme(),
            });
        } finally {
            setLoading(prev => ({ ...prev, admissions: false }));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            studentId: Number(formData.studentId),
            courseId: Number(formData.courseId),
            courseStatusId: Number(formData.courseStatusId),
            courseFees: Number(formData.courseFees),
            admissionDate: formData.admissionDate,
        };

        const swalTheme = getSwalTheme();

        const result = await Swal.fire({
            title: "Save Admission?",
            text: "Do you want to save this admission record?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Save",
            ...swalTheme,
        });

        if (!result.isConfirmed) return;

        setLoading(prev => ({ ...prev, submit: true }));

        try {
            await admissionService.create(payload);

            await Swal.fire({
                icon: "success",
                title: "Saved Successfully",
                text: "Student admission has been saved.",
                timer: 2000,
                showConfirmButton: false,
                ...swalTheme,
            });

            setFormData({
                studentId: "",
                courseId: "",
                courseStatusId: 1,
                courseFees: "",
                admissionDate: "",
            });
            await loadAdmissions();
        } catch (error) {
            let message = "Something went wrong";

            if (error.response?.data?.data) {
                message = Object.values(error.response.data.data).flat().join("\n");
            } else if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: message,
                ...swalTheme,
            });
        } finally {
            setLoading(prev => ({ ...prev, submit: false }));
        }
    };

    // Sorting logic
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortValue = (admission, key) => {
        switch (key) {
            case 'student':
                return admission.student?.studentName?.toLowerCase() || '';
            case 'course':
                return admission.course?.courseName?.toLowerCase() || '';
            case 'fees':
                return admission.courseFees || 0;
            case 'admissionDate':
                return admission.admissionDate ? new Date(admission.admissionDate) : new Date(0);
            case 'completionDate':
                return admission.completionDate ? new Date(admission.completionDate) : new Date(0);
            case 'status':
                return admission.courseStatus?.courseStatusName?.toLowerCase() || '';
            default:
                return '';
        }
    };

    // Filter and sort admissions
    const filteredAdmissions = admissions.filter(admission => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        const studentName = admission.student?.studentName?.toLowerCase() || "";
        const courseName = admission.course?.courseName?.toLowerCase() || "";
        return studentName.includes(searchLower) || courseName.includes(searchLower);
    });

    const sortedAdmissions = [...filteredAdmissions].sort((a, b) => {
        const aVal = getSortValue(a, sortConfig.key);
        const bVal = getSortValue(b, sortConfig.key);
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Export to Excel
    const exportToExcel = () => {
        if (sortedAdmissions.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Data',
                text: 'No admissions to export.',
                ...getSwalTheme(),
            });
            return;
        }

        const worksheetData = [
            ['#', 'Student', 'Course', 'Fees (₹)', 'Admission Date', 'Completion Date', 'Status'],
            ...sortedAdmissions.map((admission, index) => [
                index + 1,
                admission.student?.studentName || `ID: ${admission.student?.studentId}`,
                admission.course?.courseName || `ID: ${admission.course?.courseId}`,
                admission.courseFees || 0,
                admission.admissionDate ? new Date(admission.admissionDate).toLocaleDateString() : '',
                admission.completionDate ? new Date(admission.completionDate).toLocaleDateString() : '',
                admission.courseStatus?.courseStatusName || 'Unknown'
            ])
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(wb, ws, 'Admissions');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'admissions.xlsx');
    };

    // Print function
    const printAdmissions = () => {
        if (sortedAdmissions.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Data',
                text: 'No admissions to print.',
                ...getSwalTheme(),
            });
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            Swal.fire({
                icon: 'error',
                title: 'Popup Blocked',
                text: 'Please allow popups to print.',
                ...getSwalTheme(),
            });
            return;
        }

        const today = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const tableRows = sortedAdmissions.map((admission, index) => `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.student?.studentName || `ID: ${admission.student?.studentId}`}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.course?.courseName || `ID: ${admission.course?.courseId}`}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${admission.courseFees?.toFixed(2) || '0.00'}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.admissionDate ? new Date(admission.admissionDate).toLocaleDateString() : ''}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.completionDate ? new Date(admission.completionDate).toLocaleDateString() : '—'}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${admission.courseStatus?.courseStatusName || 'Unknown'}</td>
            </tr>
        `).join('');

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admissions List</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
                    table { border-collapse: collapse; width: 100%; }
                    th { background-color: #f2f2f2; padding: 10px; border: 1px solid #ddd; text-align: left; }
                    td { padding: 8px; border: 1px solid #ddd; }
                    .text-right { text-align: right; }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Admissions List</h1>
                    <div>Printed on: ${today}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Fees (₹)</th>
                            <th>Admission Date</th>
                            <th>Completion Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
                <p style="margin-top: 20px;">Total Records: ${sortedAdmissions.length}</p>
            </body>
            </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // Helper classes
    const inputClass = "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600";
    const labelClass = "block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300";

    // Sort icon helper
    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) {
            return <ChevronUp className="w-4 h-4 opacity-30 group-hover:opacity-100" />;
        }
        return sortConfig.direction === 'asc' 
            ? <ChevronUp className="w-4 h-4" />
            : <ChevronDown className="w-4 h-4" />;
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 pt-20">
            <div className="max-w-6xl mx-auto">
                {/* Admission Form Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <User className="w-6 h-6" />
                        Student Admission
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Student Select */}
                        <div>
                            <label htmlFor="studentId" className={labelClass}>
                                Student
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <select
                                    id="studentId"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                    disabled={loading.students}
                                >
                                    <option value="">Select Student</option>
                                    {students.map((student) => (
                                        <option key={student.studentId} value={student.studentId}>
                                            {student.studentName}
                                        </option>
                                    ))}
                                </select>
                                {loading.students && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Course Select */}
                        <div>
                            <label htmlFor="courseId" className={labelClass}>
                                Course
                            </label>
                            <div className="relative">
                                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <select
                                    id="courseId"
                                    name="courseId"
                                    value={formData.courseId}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                    disabled={loading.courses}
                                >
                                    <option value="">Select Course</option>
                                    {courses.map((course) => (
                                        <option key={course.courseId} value={course.courseId}>
                                            {course.courseName}
                                        </option>
                                    ))}
                                </select>
                                {loading.courses && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Course Fees */}
                        <div>
                            <label htmlFor="courseFees" className={labelClass}>
                                Course Fees
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 font-semibold">
                                    ₹
                                </span>
                                <input
                                    type="number"
                                    id="courseFees"
                                    name="courseFees"
                                    value={formData.courseFees}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Enter amount"
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        {/* Admission Date */}
                        <div>
                            <label htmlFor="admissionDate" className={labelClass}>
                                Admission Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input
                                    type="date"
                                    id="admissionDate"
                                    name="admissionDate"
                                    value={formData.admissionDate}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>
                        </div>

                        {/* Enhanced Save Button */}
                        <button
                            type="submit"
                            disabled={loading.submit}
                            className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                        >
                            {loading.submit ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                    <span>Save Admission</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Admissions List Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    {/* Header with Title, Search, and Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                            <List className="w-5 h-5" />
                            Admissions List
                        </h3>
                        
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by student or course..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={printAdmissions}
                                disabled={sortedAdmissions.length === 0}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Print List"
                            >
                                <Printer className="w-5 h-5" />
                            </button>
                            <button
                                onClick={exportToExcel}
                                disabled={sortedAdmissions.length === 0}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Export to Excel"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                            <button
                                onClick={loadAdmissions}
                                disabled={loading.admissions}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="Refresh"
                            >
                                <RefreshCw className={`w-5 h-5 ${loading.admissions ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {loading.admissions ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    ) : sortedAdmissions.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">
                                {searchTerm ? "No admissions match your search." : "No admissions found."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {/* Serial Number (not sortable) */}
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-16">
                                            #
                                        </th>
                                        {/* Sortable Columns */}
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={() => handleSort('student')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Student
                                                <SortIcon columnKey="student" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={() => handleSort('course')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Course
                                                <SortIcon columnKey="course" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={() => handleSort('fees')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Fees
                                                <SortIcon columnKey="fees" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={() => handleSort('admissionDate')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Admission Date
                                                <SortIcon columnKey="admissionDate" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={() => handleSort('completionDate')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Completion Date
                                                <SortIcon columnKey="completionDate" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={() => handleSort('status')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Status
                                                <SortIcon columnKey="status" />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {sortedAdmissions.map((admission, index) => {
                                        const statusColor = () => {
                                            const status = admission.courseStatus?.courseStatusName?.toLowerCase() || '';
                                            if (status.includes('active') || status.includes('ongoing')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                                            if (status.includes('completed')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                                            if (status.includes('dropped') || status.includes('cancelled')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
                                            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
                                        };

                                        return (
                                            <tr key={admission.admissionId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {admission.student?.studentName || `ID: ${admission.student?.studentId}`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                    {admission.course?.courseName || `ID: ${admission.course?.courseId}`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                                                    ₹{admission.courseFees?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                    {new Date(admission.admissionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                    {admission.completionDate ? 
                                                        new Date(admission.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 
                                                        <span className="text-gray-400 dark:text-gray-500">—</span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor()}`}>
                                                        {admission.courseStatus?.courseStatusName || 'Unknown'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentAdmission;