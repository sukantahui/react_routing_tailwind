import React from "react";
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
        <div className="dark max-w-lg mx-auto bg-slate-900/80 rounded-2xl shadow-xl p-6 text-center border border-slate-800 hover:border-slate-700 transition duration-300 text-slate-100">

            {/* Note */}
            {note && (
                <div className="p-3.5 mb-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed text-left font-sans">
                    <span className="text-amber-400 font-bold mr-1">👨‍🏫 Instructor Note:</span>
                    {note}
                </div>
            )}

            {/* Profile Image */}
            <div className="flex justify-center">
                <img
                    src={teacherImage}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-sky-500 shadow-lg hover:scale-105 transition duration-300"
                />
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold mt-4 text-white">
                {name}
            </h2>

            {/* GitHub Section */}
            <div className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-slate-300">
                <Github size={16} className="text-sky-400" />
                <a
                    href="https://github.com/sukantahui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition underline font-mono"
                >
                    github.com/sukantahui
                </a>
            </div>

            {/* Experience */}
            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-300 text-xs font-semibold font-mono">
                Corporate &amp; Academic Experience: {experience}+ Years
            </div>

            {/* Description */}
            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                Senior Lead Software Architect &amp; Corporate Instructor with 27+ years of industry experience across enterprise architecture, advanced analytics, financial modeling, and engineering systems.
            </p>
        </div>
    );
}