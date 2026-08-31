import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import vltDemoCode from "./topic2_files/EncryptedFileVaultProjectDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_007 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Project 2: Encrypted Vault
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Project 2: Encrypted File Vault (Cryptographic Stream Filter)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build security stream filters: applying cryptographic transformations to protect sensitive financial records on disk with on-the-fly encryption and decryption.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={vltDemoCode}
          title="EncryptedFileVaultProjectDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 38, 39, 47, 48]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="File Vault FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_007 Topic 2: Encrypted File Vault"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_007_topic2_encrypted_file_vault_note.txt"
        />
      </section>

      <Teacher
        note="In banking and taxation software, data stored on disk must always be encrypted at rest! Building a stream filter lets you secure files of any size without needing gigabytes of RAM! — Sukanta Hui"
      />
    </div>
  );
}