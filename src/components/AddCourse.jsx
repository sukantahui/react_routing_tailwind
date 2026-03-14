import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
    BookOpen,
    Save,
    PlusCircle,
    Trash2,
    List,
    Eye,
} from "lucide-react";
import { courseService } from "../services/courseService";

const defaultForm = {
    courseCode: "",
    courseName: "",
    topics: [
        {
            topicTitle: "",
            topicDescription: "",
            theoryDuration: "",
            practicalDuration: "",
            sequence: 1,
        },
    ],
};

const AddCourse = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(defaultForm);

    const getSwalTheme = () => ({
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#6b7280",
        didOpen: (popup) => {
            popup.style.border = "1px solid #374151";
        },
    });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const res = await courseService.getAllWithDetails();
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCourseChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTopicChange = (index, field, value) => {
        const updated = [...formData.topics];
        updated[index][field] = value;
        setFormData({ ...formData, topics: updated });
    };

    const addTopic = () => {
        setFormData({
            ...formData,
            topics: [
                ...formData.topics,
                {
                    topicTitle: "",
                    topicDescription: "",
                    theoryDuration: "",
                    practicalDuration: "",
                    sequence: formData.topics.length + 1,
                },
            ],
        });
    };

    const removeTopic = (index) => {
        const updated = formData.topics
            .filter((_, i) => i !== index)
            .map((t, i) => ({
                ...t,
                sequence: i + 1,
            }));

        setFormData({ ...formData, topics: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirm = await Swal.fire({
            title: "Save Course?",
            icon: "question",
            showCancelButton: true,
            ...getSwalTheme(),
        });

        if (!confirm.isConfirmed) return;

        setLoading(true);

        try {
            await courseService.create(formData);

            await Swal.fire({
                icon: "success",
                title: "Course Saved",
                timer: 2000,
                showConfirmButton: false,
                ...getSwalTheme(),
            });

            setFormData(defaultForm);
            loadCourses();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error saving course",
                ...getSwalTheme(),
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleCourse = (id) => {
        setSelectedCourseId(selectedCourseId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 pt-24 p-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

                {/* ADD COURSE FORM */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-900 border border-gray-800 rounded-3xl p-8"
                >
                    <h2 className="text-2xl font-bold text-sky-400 mb-6 flex items-center gap-2">
                        <BookOpen /> Add Course
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <Input
                            label="Course Code"
                            name="courseCode"
                            value={formData.courseCode}
                            onChange={handleCourseChange}
                            required
                        />

                        <Input
                            label="Course Name"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleCourseChange}
                            required
                        />

                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold flex items-center gap-2">
                                <List size={18} /> Topics
                            </h3>

                            <button
                                type="button"
                                onClick={addTopic}
                                className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded-lg"
                            >
                                <PlusCircle size={16} /> Add
                            </button>
                        </div>

                        {formData.topics.map((topic, index) => (
                            <div key={index} className="border border-gray-700 p-4 rounded-lg">

                                <Input
                                    label="Topic Title"
                                    value={topic.topicTitle}
                                    onChange={(e) =>
                                        handleTopicChange(index, "topicTitle", e.target.value)
                                    }
                                />

                                <Input
                                    label="Topic Description"
                                    value={topic.topicDescription}
                                    onChange={(e) =>
                                        handleTopicChange(index, "topicDescription", e.target.value)
                                    }
                                />

                                <div className="grid grid-cols-3 gap-3">

                                    <Input
                                        label="Theory"
                                        type="number"
                                        value={topic.theoryDuration}
                                        onChange={(e) =>
                                            handleTopicChange(index, "theoryDuration", e.target.value)
                                        }
                                    />

                                    <Input
                                        label="Practical"
                                        type="number"
                                        value={topic.practicalDuration}
                                        onChange={(e) =>
                                            handleTopicChange(index, "practicalDuration", e.target.value)
                                        }
                                    />

                                    <Input
                                        label="Sequence"
                                        type="number"
                                        value={topic.sequence}
                                        onChange={(e) =>
                                            handleTopicChange(index, "sequence", e.target.value)
                                        }
                                    />
                                </div>

                                {formData.topics.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeTopic(index)}
                                        className="flex items-center gap-1 text-red-400 mt-2"
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-sky-500 px-6 py-2 rounded-xl flex items-center gap-2"
                        >
                            <Save size={18} />
                            {loading ? "Saving..." : "Save Course"}
                        </button>
                    </form>
                </motion.div>

                {/* COURSE LIST */}
                <div className="space-y-3">
                    {courses?.map((course) => (
                        <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden">

                            <div
                                onClick={() => toggleCourse(course.id)}
                                className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-700"
                            >
                                <div>
                                    <div className="font-semibold">{course.courseName}</div>
                                    <div className="text-xs text-gray-400">{course.courseCode}</div>
                                </div>

                                <Eye size={16} />
                            </div>

                            {selectedCourseId === course.id && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-t border-gray-700 p-3 space-y-2"
                                >
                                    {course.details?.map((topic) => (
                                        <div key={topic.id} className="bg-gray-900 p-3 rounded-lg text-sm">

                                            <div className="font-semibold text-sky-400">
                                                {topic.sequence}. {topic.topicTitle}
                                            </div>

                                            <div className="text-gray-400 text-xs mt-1">
                                                {topic.topicDescription}
                                            </div>

                                            <div className="text-gray-300 text-xs mt-1">
                                                Theory: {topic.theoryDuration}h | Practical: {topic.practicalDuration}h
                                            </div>

                                        </div>
                                    ))}
                                </motion.div>
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

function Input({ label, name, value, onChange, type = "text", required = false }) {
    return (
        <div className="flex flex-col mb-2">
            <label className="text-sm text-gray-400 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
            />
        </div>
    );
}

export default AddCourse;