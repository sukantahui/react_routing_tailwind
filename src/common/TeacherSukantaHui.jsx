import teacherImage from "../assets/image/sukantahui.jpg";
import { Github, GitBranch } from "lucide-react";

export default function TeacherSukantaHui({ note = "" }) {
    const workingFrom = "1998-05-20";
    const name = "Sukanta Hui";

    const calculateExperience = (date) => {
        const startDate = new Date(date);
        const today = new Date();

        let years = today.getFullYear() - startDate.getFullYear();
        const monthDiff = today.getMonth() - startDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < startDate.getDate())
        ) {
            years--;
        }

        return years;
    };

    const experience = calculateExperience(workingFrom);

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-xl transition duration-300">

            {/* Note */}
            {note && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 italic">
                    {note}
                </p>
            )}

            {/* Profile Image */}
            <div className="flex justify-center">
                <img
                    src={teacherImage}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md hover:scale-105 transition duration-300"
                />
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">
                {name}
            </h1>

            {/* GitHub Section */}
            <div className="flex items-center justify-center gap-2 mt-3 text-gray-700 dark:text-gray-300">
                <Github size={18} />
                <a
                    href="https://github.com/sukantahui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition"
                >
                    github.com/sukantahui
                </a>
            </div>

            {/* Skills Icon Row */}
            <div className="flex justify-center gap-4 mt-3 text-gray-600 dark:text-gray-400">
                <GitBranch size={18} />
                <Github size={18} />
            </div>

            {/* Experience */}
            <h2 className="mt-4 text-lg font-semibold text-blue-600">
                Experience: {experience}+ Years
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                A dedicated Software Engineer with 27+ years of experience in building scalable and efficient applications.
                Strong in Data Structures & Algorithms with excellent problem-solving skills.
                Skilled in Python, C, C++, Java, VB.NET, JavaScript, Angular, React, Laravel, SQL,
                Advanced Excel, Power BI, and Shell Scripting. Passionate about mentoring students.
            </p>
        </div>
    );
}