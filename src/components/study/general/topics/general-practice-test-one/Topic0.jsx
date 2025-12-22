import React, { Component } from "react";
import {
  Network,
  Layers,
  ArrowRightLeft,
  Globe,
  Mail,
  ShieldCheck,
  Server,
  BookOpen,
  AlertCircle,
} from "lucide-react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-24">

        {/* =====================================================
            CHAPTER HEADER
        ===================================================== */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-sky-300">
            <Network size={22} />
            Protocols in Computer Networks
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            In a computer network, devices can communicate successfully
            only when they follow a common set of rules called
            <strong> network protocols</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            This chapter explains protocols in a
            <strong> structured, exam-ready and standard format</strong>.
          </p>
        </header>

        {/* =====================================================
            DEFINITION
        ===================================================== */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
            <BookOpen size={18} />
            Definition of Protocol
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            A <strong>network protocol</strong> is a formal set of rules
            that governs how data is transmitted, received, and interpreted
            between two or more devices in a network.
          </p>

          <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
            <p className="text-slate-300 text-sm">
              A protocol defines:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm mt-2 space-y-1">
              <li>Format of data</li>
              <li>Timing of data transmission</li>
              <li>Error detection and correction</li>
              <li>Addressing and identification</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            NEED FOR PROTOCOLS
        ===================================================== */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-300">
            <AlertCircle size={18} />
            Why Protocols Are Needed
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
            <li>To ensure correct and error-free data transmission</li>
            <li>To allow communication between different hardware and software</li>
            <li>To control data flow and avoid congestion</li>
            <li>To provide security and authentication</li>
          </ul>

          <p className="text-slate-400 text-sm">
            📌 Without protocols, different computers would not understand each other.
          </p>
        </section>

        {/* =====================================================
            CLASSIFICATION OF PROTOCOLS
        ===================================================== */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-300">
            <Layers size={18} />
            Classification of Network Protocols
          </h3>

          <p className="text-slate-300 text-sm">
            Protocols are broadly classified based on the layer in which they operate.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-lg border border-slate-700 p-4">
              <h4 className="font-semibold text-emerald-300 mb-2">
                Application Layer Protocols
              </h4>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                <li>HTTP / HTTPS</li>
                <li>FTP</li>
                <li>SMTP</li>
                <li>POP3 / IMAP</li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-700 p-4">
              <h4 className="font-semibold text-emerald-300 mb-2">
                Transport & Network Layer Protocols
              </h4>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                <li>TCP</li>
                <li>UDP</li>
                <li>IP</li>
                <li>ICMP</li>
              </ul>
            </div>

          </div>
        </section>

        {/* =====================================================
            TCP & UDP (CORE CONCEPT)
        ===================================================== */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-sky-300">
            <ArrowRightLeft size={18} />
            TCP and UDP
          </h3>

          <p className="text-slate-300 text-sm">
            TCP and UDP are the most important transport layer protocols.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-slate-700 text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="border border-slate-700 px-3 py-2">TCP</th>
                  <th className="border border-slate-700 px-3 py-2">UDP</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr>
                  <td className="border px-3 py-2">Connection-oriented</td>
                  <td className="border px-3 py-2">Connectionless</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Reliable</td>
                  <td className="border px-3 py-2">Unreliable</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Error checking & recovery</td>
                  <td className="border px-3 py-2">No recovery</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Used in Email, File Transfer</td>
                  <td className="border px-3 py-2">Used in Video, Gaming</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =====================================================
            APPLICATION LAYER PROTOCOLS
        ===================================================== */}
        <section className="space-y-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
            <Globe size={18} />
            Application Layer Protocols
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-lg border border-slate-700 p-4">
              <h4 className="text-indigo-300 font-semibold">HTTP / HTTPS</h4>
              <p className="text-slate-300 text-sm mt-1">
                Used for accessing web pages.
              </p>
              <p className="text-slate-400 text-sm">
                HTTPS provides encrypted communication.
              </p>
              <p className="text-amber-300 text-xs mt-1">
                Port: 80 (HTTP), 443 (HTTPS)
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 p-4">
              <h4 className="text-indigo-300 font-semibold">FTP</h4>
              <p className="text-slate-300 text-sm mt-1">
                Transfers files between computers.
              </p>
              <p className="text-amber-300 text-xs mt-1">Port: 21</p>
            </div>

            <div className="rounded-lg border border-slate-700 p-4">
              <h4 className="text-indigo-300 font-semibold">SMTP</h4>
              <p className="text-slate-300 text-sm mt-1">
                Sends emails from client to server.
              </p>
              <p className="text-amber-300 text-xs mt-1">Port: 25</p>
            </div>

            <div className="rounded-lg border border-slate-700 p-4">
              <h4 className="text-indigo-300 font-semibold">POP3 / IMAP</h4>
              <p className="text-slate-300 text-sm mt-1">
                Used to receive emails.
              </p>
              <p className="text-slate-400 text-sm">
                POP3 downloads emails, IMAP synchronizes emails.
              </p>
            </div>

          </div>
        </section>

        {/* =====================================================
            SUPPORT & SECURITY PROTOCOLS
        ===================================================== */}
        <section className="space-y-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-300">
            <Server size={18} />
            Support & Security Protocols
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
            <li><strong>DNS</strong> – Converts domain names to IP addresses</li>
            <li><strong>DHCP</strong> – Automatically assigns IP addresses</li>
            <li><strong>ARP</strong> – Maps IP address to MAC address</li>
            <li><strong>ICMP</strong> – Error reporting and diagnostics</li>
            <li><strong>SSH</strong> – Secure remote login</li>
            <li><strong>IPSec</strong> – Network-layer security</li>
          </ul>
        </section>

        {/* =====================================================
            TEACHER NOTE
        ===================================================== */}
        <section className="rounded-lg border border-emerald-600/40 bg-emerald-900/10 p-5">
          <p className="text-emerald-300 font-semibold text-sm mb-2">
            👨‍🏫 Teacher’s Note (Exam Standard)
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Students must prepare:
            <br />✔ Definition of protocol  
            <br />✔ TCP vs UDP table  
            <br />✔ Application of each protocol  
            <br />✔ Port numbers (very common MCQs)  
            <br />✔ Secure vs non-secure protocols
          </p>
        </section>

      </div>
    );
  }
}
