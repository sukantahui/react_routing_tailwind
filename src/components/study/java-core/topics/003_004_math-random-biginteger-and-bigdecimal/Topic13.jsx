import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cryptoDemoCode from "./topic13_files/BigIntegerCryptoAndGcdCapstoneDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Cryptography Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">BigInteger</code> Operations: <code className="text-emerald-400 font-mono">gcd()</code>, <code className="text-purple-400 font-mono">modPow()</code> &amp; <code className="text-sky-400 font-mono">probablePrime()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build advanced cryptographic pipelines: generating 512-bit RSA prime candidates, calculating greatest common divisors, and executing modular exponentiation with <code className="text-purple-300 font-mono">modPow()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cryptoDemoCode}
          title="BigIntegerCryptoAndGcdCapstoneDemo.java"
          highlightLines={[7, 16, 17, 18, 23, 24, 30, 31, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Crypto Math FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 13: BigInteger Crypto Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic13_crypto_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 003_004! You have mastered java.lang.Math, SecureRandom, IEEE 754 precision dilemmas, enterprise BigDecimal financial accounting, and cryptographic BigInteger operations! — Sukanta Hui"
      />
    </div>
  );
}