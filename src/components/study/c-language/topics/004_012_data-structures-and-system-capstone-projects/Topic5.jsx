import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic5_files/MakefileBuildDemo.c?raw";
import { topic5Questions } from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_012</span>
          <span>•</span>
          <span>Topic 5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Build Automation &amp; Makefiles: Target Rules, Automatic Variables (<code className="text-emerald-600 dark:text-emerald-400 font-mono">$@</code>, <code className="text-emerald-600 dark:text-emerald-400 font-mono">$&lt;</code>, <code className="text-emerald-600 dark:text-emerald-400 font-mono">$^</code>)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master industrial build engineering. Learn how GNU Make tracks file modification timestamps to perform high-speed incremental builds, pattern compilation rules, automatic dependency generation, and phony cleanup targets.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚙️ Classroom Story: The 30-Minute Rebuild Nightmare</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Shyamnagar software project, <strong>Debangshu</strong> was compiling a 200-file C application using a bash script: <code>gcc -Wall src/*.c -o app</code>. Every time he changed a single character in one file, the script recompiled all 200 files from scratch, wasting half an hour every afternoon.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> showed him how to write an industrial Makefile: <em>&ldquo;GNU Make checks timestamps! If only <code>student.c</code> has changed since its corresponding <code>student.o</code> was created, Make recompiles only that one file and relinks the binary in under 0.2 seconds!&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: GNU Make Dependency Graph &amp; Incremental Rebuild
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Makefile Dependency Graph"
          >
            <rect width="900" height="280" fill="none" />

            {/* Target: bin/app */}
            <rect x="340" y="20" width="220" height="60" rx="8" fill="#047857" stroke="#10b981" strokeWidth="2" />
            <text x="450" y="45" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">TARGET: bin/app ($@)</text>
            <text x="450" y="65" fill="#a7f3d0" fontSize="11" textAnchor="middle">gcc $^ -o $@</text>

            {/* Object Prerequisites */}
            <path d="M 400 80 L 220 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-make)" />
            <path d="M 500 80 L 680 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-make)" />

            <rect x="130" y="120" width="180" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="220" y="145" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">obj/student.o</text>
            <text x="220" y="160" fill="#94a3b8" fontSize="10" textAnchor="middle">mtime: 14:00 (UP TO DATE)</text>

            <rect x="590" y="120" width="180" height="50" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text x="680" y="145" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">obj/main.o</text>
            <text x="680" y="160" fill="#fde68a" fontSize="10" textAnchor="middle">mtime: 13:55 (OUTDATED!)</text>

            {/* Source Prerequisite */}
            <path d="M 680 170 L 680 215" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-make)" />

            <rect x="590" y="215" width="180" height="50" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
            <text x="680" y="240" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">src/main.c ($&lt;)</text>
            <text x="680" y="255" fill="#fde68a" fontSize="10" textAnchor="middle">mtime: 14:05 (MODIFIED!)</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-make" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Automatic Variables Cheat Sheet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-lg font-bold">$@</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Target File</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Represents the file name of the target currently being generated (e.g. <code>bin/app</code> or <code>obj/main.o</code>).
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="text-sky-600 dark:text-sky-400 font-mono text-lg font-bold">$&lt;</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">First Prerequisite</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Represents the first dependency listed in the rule (commonly the <code>src/%.c</code> source file).
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="text-purple-600 dark:text-purple-400 font-mono text-lg font-bold">$^</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">All Prerequisites</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Represents the full list of all prerequisites separated by spaces (commonly all <code>.o</code> object files during final link).
            </p>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Makefile Architecture &amp; Variable Inspector
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program prints out an industry-standard Makefile template alongside automatic variable references and incremental build logic.
        </p>
        <CFileLoader
          fileName="MakefileBuildDemo.c"
          code={cCode}
          title="Industrial Makefile Architecture & Rule Template"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Build Automation & Makefile Architecture in C
=====================================================

>>> 1. Inspecting Standard GNU Makefile Structure:

-----------------------------------------------------
  INDUSTRIAL MAKEFILE TEMPLATE FOR MULTI-FILE C
-----------------------------------------------------

# Compiler & Build Flags
CC      := gcc
CFLAGS  := -Wall -Wextra -Werror -O2 -std=c11 -Iinclude
LDFLAGS :=

# Directories
SRC_DIR := src
OBJ_DIR := obj
BIN_DIR := bin

# Source and Object Files
SRCS    := $(wildcard $(SRC_DIR)/*.c)
OBJS    := $(patsubst $(SRC_DIR)/%.c, $(OBJ_DIR)/%.o, $(SRCS))
TARGET  := $(BIN_DIR)/student_system

# Phony Targets (Prevent conflicts with files of the same name)
.PHONY: all clean rebuild run

# Default Target
all: $(TARGET)

# Linking Rule (Produces Final Binary)
$(TARGET): $(OBJS) | $(BIN_DIR)
	$(CC) $(OBJS) -o $@ $(LDFLAGS)
	@echo "[BUILD] Successfully linked binary: $@"

# Compilation Pattern Rule (Produces .o from .c)
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c | $(OBJ_DIR)
	$(CC) $(CFLAGS) -c $< -o $@
	@echo "[CC] Compiled $< -> $@"

# Directory Creation
$(BIN_DIR) $(OBJ_DIR):
	mkdir -p $@

# Clean Build Artifacts
clean:
	rm -rf $(OBJ_DIR) $(BIN_DIR)
	@echo "[CLEAN] Removed build artifacts."

-----------------------------------------------------
>>> 2. Automatic Variable Cheat Sheet:
    $@  -> The target filename being generated.
    $<  -> The FIRST prerequisite (usually source .c file).
    $^  -> ALL prerequisites list (all required .o files).
    $*  -> The stem matching a '%' pattern rule.

=== Makefile Architecture Demonstration Completed ===`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common Pitfalls &amp; Professional Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <span>⚠️ Spaces Instead of Tabs in Recipes</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              GNU Make strictly requires an ASCII TAB character (<code>\t</code>) at the start of recipe command lines. Using 4 or 8 spaces triggers a fatal <code>Makefile: missing separator</code> error!
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Always Declare .PHONY Targets</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Declare non-file action targets like <code>all</code>, <code>clean</code>, and <code>test</code> under <code>.PHONY:</code> to prevent Make from confusing them with real files on disk.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Parallel Compilation with make -j</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When you run <code>make -j8</code>, Make analyzes the dependency graph and compiles 8 independent <code>.c</code> files simultaneously across 8 CPU cores! Only when all <code>.o</code> files are finished does it invoke the linker.
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic5Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic5_Build_Automation_Makefiles_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="A great C engineer doesn't just write code—they build the automated toolchains that compile, test, and package systems with mathematical precision."
      />
    </div>
  );
};

export default Topic5;
