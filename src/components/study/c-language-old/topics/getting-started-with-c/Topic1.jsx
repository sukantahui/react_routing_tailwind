import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import { ArrowUpRight } from "lucide-react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-sky-300">
          Where C Is Used: Systems, Embedded Devices, OS, Compilers
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          C is one of the most widely used languages in the world.  
          Its speed, portability, and low-level memory access make it ideal for
          building software that interacts directly with hardware.
        </p>

        <h3 className="text-lg text-slate-200 font-semibold">1. Operating Systems</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Most modern operating systems are written in C, including:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>Linux Kernel</li>
          <li>Windows NT Kernel</li>
          <li>macOS components</li>
        </ul>

        <h3 className="text-lg text-slate-200 font-semibold">2. Embedded Systems</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          C is the #1 language for microcontrollers, robotics, medical devices,
          automotive ECUs, IoT systems, and sensors.
        </p>

        <h3 className="text-lg text-slate-200 font-semibold">3. Compilers & Interpreters</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Compilers of many languages (Python, Java, Ruby, PHP, Lua)  
          are written in C due to its execution speed.
        </p>

        <h3 className="text-lg text-slate-200 font-semibold">4. High-Performance Applications</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Games, rendering engines, database engines, servers, and virtual machines
          depend on C for performance.
        </p>

        <hr className="border-slate-700" />

        <p className="text-slate-400 text-sm">
          C is used everywhere—from tiny chips to operating systems.  
          Understanding C opens doors to system development, hardware programming,
          and advanced software engineering careers.
        </p>

      </div>
    );
  }
}
