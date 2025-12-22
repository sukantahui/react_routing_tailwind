import React, { Component } from "react";
import {
  Wifi,
  Cable,
  Radio,
  Layers,
  BookOpen,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-24">

        {/* =====================================================
            CHAPTER HEADER
        ===================================================== */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-sky-300">
            <Cable size={22} />
            Transmission Media (Networking Media)
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Transmission media refers to the physical or wireless path
            through which data is transmitted from one computer to another
            in a network.
          </p>

          <p className="text-slate-400 text-sm">
            This chapter explains the <strong>types, characteristics,
            advantages and disadvantages</strong> of networking media.
          </p>
        </header>

        {/* =====================================================
            DEFINITION
        ===================================================== */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
            <BookOpen size={18} />
            Definition of Transmission Media
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            <strong>Transmission media</strong> is the channel through which
            data signals are sent between the sender and the receiver.
          </p>

          <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
            <p className="text-slate-300 text-sm">
              Data can be transmitted in the form of:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm mt-2 space-y-1">
              <li>Electrical signals</li>
              <li>Light signals</li>
              <li>Radio waves</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            CLASSIFICATION
        ===================================================== */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-300">
            <Layers size={18} />
            Classification of Transmission Media
          </h3>

          <p className="text-slate-300 text-sm">
            Transmission media are broadly classified into two categories:
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-lg border border-slate-700 p-4">
              <h4 className="text-emerald-300 font-semibold mb-2">
                1. Guided Media (Wired)
              </h4>
              <p className="text-slate-300 text-sm">
                Data travels through a physical cable.
              </p>
              <ul className="list-disc list-inside text-slate-300 text-sm mt-2 space-y-1">
                <li>Twisted Pair Cable</li>
                <li>Coaxial Cable</li>
                <li>Optical Fiber Cable</li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-700 p-4">
              <h4 className="text-emerald-300 font-semibold mb-2">
                2. Unguided Media (Wireless)
              </h4>
              <p className="text-slate-300 text-sm">
                Data travels through air or space.
              </p>
              <ul className="list-disc list-inside text-slate-300 text-sm mt-2 space-y-1">
                <li>Radio Waves</li>
                <li>Microwaves</li>
                <li>Infrared</li>
              </ul>
            </div>

          </div>
        </section>

        {/* =====================================================
            GUIDED MEDIA
        ===================================================== */}
        <section className="space-y-10">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-sky-300">
            <Cable size={18} />
            Guided Transmission Media
          </h3>

          {/* Twisted Pair */}
          <div className="rounded-lg border border-slate-700 p-5">
            <h4 className="text-sky-300 font-semibold mb-2">
              Twisted Pair Cable
            </h4>
            <p className="text-slate-300 text-sm">
              Consists of two insulated copper wires twisted together to
              reduce interference.
            </p>

            <ul className="list-disc list-inside text-slate-300 text-sm mt-2 space-y-1">
              <li>Low cost</li>
              <li>Easy to install</li>
              <li>Used in LANs and telephone lines</li>
            </ul>

            <p className="text-amber-300 text-xs mt-2">
              Types: UTP (Unshielded), STP (Shielded)
            </p>
          </div>

          {/* Coaxial */}
          <div className="rounded-lg border border-slate-700 p-5">
            <h4 className="text-sky-300 font-semibold mb-2">
              Coaxial Cable
            </h4>
            <p className="text-slate-300 text-sm">
              Has a central copper conductor surrounded by insulation
              and shielding.
            </p>

            <ul className="list-disc list-inside text-slate-300 text-sm mt-2 space-y-1">
              <li>Better noise immunity than twisted pair</li>
              <li>Used in cable TV and older networks</li>
              <li>Moderate cost</li>
            </ul>
          </div>

          {/* Optical Fiber */}
          <div className="rounded-lg border border-slate-700 p-5">
            <h4 className="text-sky-300 font-semibold mb-2">
              Optical Fiber Cable
            </h4>
            <p className="text-slate-300 text-sm">
              Transmits data as light pulses through glass fibers.
            </p>

            <ul className="list-disc list-inside text-slate-300 text-sm mt-2 space-y-1">
              <li>Very high speed</li>
              <li>Immune to electromagnetic interference</li>
              <li>Used in backbone networks and internet</li>
            </ul>

            <p className="text-emerald-300 text-xs mt-2">
              ✔ Best medium for long-distance communication
            </p>
          </div>
        </section>

        {/* =====================================================
            UNGUIDED MEDIA
        ===================================================== */}
        <section className="space-y-10">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-300">
            <Wifi size={18} />
            Unguided Transmission Media
          </h3>

          <div className="rounded-lg border border-slate-700 p-5">
            <h4 className="text-purple-300 font-semibold mb-2">
              Radio Waves
            </h4>
            <p className="text-slate-300 text-sm">
              Used for wireless communication such as Wi-Fi and Bluetooth.
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 p-5">
            <h4 className="text-purple-300 font-semibold mb-2">
              Microwaves
            </h4>
            <p className="text-slate-300 text-sm">
              Used for satellite communication and long-distance wireless links.
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 p-5">
            <h4 className="text-purple-300 font-semibold mb-2">
              Infrared
            </h4>
            <p className="text-slate-300 text-sm">
              Used for short-range communication like TV remote controls.
            </p>
          </div>
        </section>

        {/* =====================================================
            COMPARISON TABLE
        ===================================================== */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-300">
            <ShieldCheck size={18} />
            Comparison of Transmission Media
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border border-slate-700 text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="border px-3 py-2">Medium</th>
                  <th className="border px-3 py-2">Speed</th>
                  <th className="border px-3 py-2">Cost</th>
                  <th className="border px-3 py-2">Noise Immunity</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr>
                  <td className="border px-3 py-2">Twisted Pair</td>
                  <td className="border px-3 py-2">Low</td>
                  <td className="border px-3 py-2">Low</td>
                  <td className="border px-3 py-2">Low</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Coaxial</td>
                  <td className="border px-3 py-2">Medium</td>
                  <td className="border px-3 py-2">Medium</td>
                  <td className="border px-3 py-2">Medium</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Optical Fiber</td>
                  <td className="border px-3 py-2">Very High</td>
                  <td className="border px-3 py-2">High</td>
                  <td className="border px-3 py-2">Very High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =====================================================
            TEACHER NOTE
        ===================================================== */}
        <section className="rounded-lg border border-emerald-600/40 bg-emerald-900/10 p-5">
          <p className="text-emerald-300 font-semibold text-sm mb-2">
            👨‍🏫 Teacher’s Note (Exam Standard)
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Students must remember:
            <br />✔ Definition of transmission media  
            <br />✔ Classification (Guided vs Unguided)  
            <br />✔ Advantages of optical fiber  
            <br />✔ Comparison table (MCQ & short answers)
          </p>
        </section>

      </div>
    );
  }
}
