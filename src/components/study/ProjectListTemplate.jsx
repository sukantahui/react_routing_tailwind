import React, { Component } from "react";
import {
  Code,
  GraduationCap,
  Lightbulb,
  BookOpen,
} from "lucide-react";

export default class ProjectListTemplate extends Component {
  render() {
    const {
      title,
      subtitle,
      teacherNote,
      projects = [],
    } = this.props;

    return (
      <div className="space-y-12">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-300">
            <GraduationCap size={22} />
            {title}
          </h2>

          {subtitle && (
            <p className="text-slate-400 text-sm max-w-4xl">
              {subtitle}
            </p>
          )}
        </header>

        {/* ================= PROJECT LIST ================= */}
        <div className="space-y-6">

          {projects.map((project) => (
            <div
              key={project.projectId}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-lg transition-colors duration-300 hover:border-indigo-500"
            >
              {/* ---------- TOP ROW ---------- */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                {/* PROJECT NO + TITLE */}
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-300 font-semibold text-sm border border-indigo-500/30">
                    {project.projectId}
                  </span>

                  <h3 className="text-lg font-semibold text-sky-300 flex items-center gap-2">
                    <Code size={18} />
                    {project.title}
                  </h3>
                </div>

                {/* DIFFICULTY */}
                {project.difficulty && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium
                      ${
                        project.difficulty === "Beginner"
                          ? "bg-emerald-900/40 text-emerald-300"
                          : project.difficulty === "Intermediate"
                          ? "bg-amber-900/40 text-amber-300"
                          : "bg-rose-900/40 text-rose-300"
                      }
                    `}
                  >
                    {project.difficulty}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              {project.description && (
                <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-5xl">
                  {project.description}
                </p>
              )}

              {/* CONCEPT TAGS */}
              {project.concepts && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.concepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-lg"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              )}

              {/* CONCEPTUAL EXAMPLE */}
              {project.example && (
                <div className="mt-5 rounded-xl border border-slate-700 bg-slate-800/40 p-4">
                  <div className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-medium">
                    <BookOpen size={16} className="text-indigo-300" />
                    Conceptual Example
                  </div>

                  <p className="text-slate-200 text-sm leading-relaxed">
                    {project.example}
                  </p>
                </div>
              )}

              {/* LEARNING OUTCOME */}
              {project.learningOutcome && (
                <div className="flex gap-2 mt-5 text-sm text-slate-400">
                  <Lightbulb size={16} className="text-yellow-300 mt-0.5" />
                  <span>{project.learningOutcome}</span>
                </div>
              )}
            </div>
          ))}

        </div>

        {/* ================= TEACHER NOTE ================= */}
        {teacherNote && (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-emerald-300">
            👩‍🏫 <b>Teacher Note:</b><br />
            {teacherNote}
          </div>
        )}

      </div>
    );
  }
}
