import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User, BookOpen, DollarSign, Calendar, Save } from "lucide-react";
import { admissionService } from "../services/admissionService";
import { studentService } from "../services/studentService";
import { courseService } from "../services/courseService";

const StudentAdmission = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState({
        students: false,
        courses: false,
        submit: false,
    });

    const [formData, setFormData] = useState({
        studentId: "",
        courseId: "",
        courseStatusId: 1,
        courseFees: "",
        admissionDate: "",
    });

    // Load initial data
    useEffect(() => {
        document.documentElement.classList.add("dark");
        loadStudents();
        loadCourses();
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
                background: document.documentElement.classList.contains("dark") ? "#111827" : "#fff",
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
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
                background: document.documentElement.classList.contains("dark") ? "#111827" : "#fff",
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
            });
        } finally {
            setLoading(prev => ({ ...prev, courses: false }));
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

        const isDark = document.documentElement.classList.contains("dark");
        const swalTheme = {
            background: isDark ? "#111827" : "#ffffff",
            color: isDark ? "#f9fafb" : "#111827",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#6b7280",
            didOpen: (popup) => {
                if (isDark) popup.style.border = "1px solid white";
            },
        };

        // Confirm before save
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

            // Reset form
            setFormData({
                studentId: "",
                courseId: "",
                courseStatusId: 1,
                courseFees: "",
                admissionDate: "",
            });
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

    // Helper to get theme-aware classes
    const inputClass = "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600";
    const labelClass = "block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading.submit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading.submit ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Admission
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentAdmission;