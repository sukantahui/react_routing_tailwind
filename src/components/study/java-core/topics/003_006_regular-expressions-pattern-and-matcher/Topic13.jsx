import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import recipesDemoCode from "./topic13_files/EnterpriseValidationRecipesDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Production Recipes
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Common Validation Recipes: Email, Indian Phone (<code className="text-emerald-400 font-mono">+91</code>), PAN Card &amp; IPv4
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build production-ready authentication and billing filters: pre-compiling validated recipes for Indian mobile numbers, income tax PAN cards, and RFC-compliant emails.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={recipesDemoCode}
          title="EnterpriseValidationRecipesDemo.java"
          highlightLines={[7, 12, 15, 18, 21, 27, 30, 33, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Validation Recipes FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 13: Validation Recipes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic13_validation_recipes_note.txt"
        />
      </section>

      <Teacher
        note="Keep these 4 validation patterns handy in your utility class! You will use them in almost every Spring Boot microservice you write at Barrackpore. — Sukanta Hui"
      />
    </div>
  );
}