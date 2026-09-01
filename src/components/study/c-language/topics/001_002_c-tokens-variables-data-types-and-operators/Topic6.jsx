import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic6_files/Module2ProjectsDemo.c?raw";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const projectData = {
  projectCategory: "Module 001_002 · Hands-on C Projects & Lab Solutions",
  subject: "C Programming",
  board: "WBCHSE / ICSE / BCA / B.Tech Systems Lab",
  class: "Undergraduate / Systems Programming",
  tools: ["GCC Compiler", "GDB", "VS Code"],
  institute: {
    name: "Coder & AccoTax",
    author: "Sukanta Hui",
    location: "Barrackpore, West Bengal"
  },
  projects: [
    {
      projectId: "P2.1",
      title: "Bitwise Hardware Status Register & Flags Inspector",
      difficulty: "Intermediate",
      description: "Design an embedded firmware status register module using an 8-bit unsigned integer (`uint8_t`). Implement bitmask constants for POWER_ON (bit 0), SENSOR_READY (bit 1), TX_ACTIVE (bit 2), RX_BUFFER (bit 3), and ERROR_ALERT (bit 4). Provide routines to set, clear, test, and toggle individual flags without altering adjacent bits.",
      exampleText: "Initial State: 0x00 -> Turn ON Power & Sensor -> Activate TX -> Trigger Error & Clear TX",
      exampleOutput: "=== PROJECT 1: BITWISE STATUS REGISTER & FLAGS INSPECTOR ===\nInitial Register State: 0x00\nAfter Power & Sensor Init : 0x03\nAfter Transmit Activated  : 0x07\nIs Sensor Ready?          : YES\nIs Error Alert Active?    : NO\nAfter Error Triggered     : 0x13 (TX Cleared, Error Set)\nAfter Toggling RX Buffer  : 0x1B",
      logicExplanation: "1. Define flag bitmasks using bit shifts: (1 << 0), (1 << 1), etc.\n2. Set flags using bitwise OR: status |= (FLAG_POWER | FLAG_SENSOR);\n3. Test flags using bitwise AND: if (status & FLAG_SENSOR) ...\n4. Clear flags using bitwise AND with inverted mask: status &= ~FLAG_TX;\n5. Toggle flags using bitwise XOR: status ^= FLAG_RX;",
      answer: `#include <stdio.h>
#include <stdint.h>

#define FLAG_POWER_ON     (1 << 0)
#define FLAG_SENSOR_READY (1 << 1)
#define FLAG_TX_ACTIVE    (1 << 2)
#define FLAG_RX_BUFFER    (1 << 3)
#define FLAG_ERROR_ALERT  (1 << 4)

int main(void) {
    uint8_t statusRegister = 0x00;

    /* Set Power and Sensor */
    statusRegister |= (FLAG_POWER_ON | FLAG_SENSOR_READY);

    /* Set TX Active */
    statusRegister |= FLAG_TX_ACTIVE;

    /* Check Sensor */
    if (statusRegister & FLAG_SENSOR_READY) {
        printf("Sensor is online.\\n");
    }

    /* Error occurred: Clear TX and Set Error */
    statusRegister &= ~FLAG_TX_ACTIVE;
    statusRegister |= FLAG_ERROR_ALERT;

    /* Toggle RX buffer */
    statusRegister ^= FLAG_RX_BUFFER;

    printf("Final Status Register: 0x%02X\\n", statusRegister);
    return 0;
}`,
      codeExplanation: "Demonstrates silicon-efficient hardware register manipulation using bitwise masks and bit shifts without consuming multi-byte boolean variables."
    },
    {
      projectId: "P2.2",
      title: "Payroll Tax, Allowance & Net Take-Home Calculator",
      difficulty: "Beginner",
      description: "Create an enterprise financial payroll calculator in C that accepts employee basic salary, computes House Rent Allowance (HRA 20%), Dearness Allowance (DA 15%), Provident Fund (PF 12%), and Professional Tax (INR 200). Ensure double precision floating arithmetic to avoid decimal truncation errors.",
      exampleText: "Basic Salary: INR 45,000.00",
      exampleOutput: "=== PROJECT 2: PAYROLL TAX & ALLOWANCE CALCULATOR ===\n----------------------------------------------------\nBasic Salary         : INR 45000.00\nHRA (20%)            : INR 9000.00\nDA  (15%)            : INR 6750.00\n----------------------------------------------------\nGross Salary         : INR 60750.00\n----------------------------------------------------\nPF Deduction (12%)   : INR 5400.00\nProfessional Tax     : INR 200.00\nTotal Deductions     : INR 5600.00\n====================================================\nNET TAKE-HOME SALARY : INR 55150.00\n====================================================",
      logicExplanation: "1. Declare constants: HRA_PERCENT = 20.0, DA_PERCENT = 15.0, PF_PERCENT = 12.0, PTAX = 200.0.\n2. Prompt user for double basicSalary.\n3. Compute hra = (basicSalary * HRA_PERCENT) / 100.0 and da = (basicSalary * DA_PERCENT) / 100.0.\n4. Compute grossSalary = basicSalary + hra + da.\n5. Compute pf = (basicSalary * PF_PERCENT) / 100.0 and totalDeductions = pf + PTAX.\n6. Compute netSalary = grossSalary - totalDeductions.\n7. Format tabular output using %-20s and %10.2f.",
      answer: `#include <stdio.h>

int main(void) {
    const double HRA_RATE = 20.0;
    const double DA_RATE = 15.0;
    const double PF_RATE = 12.0;
    const double PTAX = 200.0;

    double basicSalary;
    printf("Enter Employee Basic Salary (INR): ");
    if (scanf("%lf", &basicSalary) != 1 || basicSalary <= 0.0) {
        printf("Invalid salary input.\\n");
        return 1;
    }

    double hra = (basicSalary * HRA_RATE) / 100.0;
    double da = (basicSalary * DA_RATE) / 100.0;
    double gross = basicSalary + hra + da;

    double pf = (basicSalary * PF_RATE) / 100.0;
    double deductions = pf + PTAX;
    double net = gross - deductions;

    printf("\\n--- Payroll Summary ---\\n");
    printf("Gross Salary : INR %.2f\\n", gross);
    printf("Deductions   : INR %.2f\\n", deductions);
    printf("Net Salary   : INR %.2f\\n", net);

    return 0;
}`,
      codeExplanation: "Demonstrates high-precision monetary calculations using double types, floating point literals, scanf validation, and format specifiers."
    },
    {
      projectId: "P2.3",
      title: "Exact-Width Sensor Telemetry Packet Serializer",
      difficulty: "Intermediate",
      description: "Build a low-level IoT telemetry packet serializer that packs an 8-bit sensor ID (uint8_t), an 8-bit battery level (uint8_t), and a 16-bit temperature reading in centi-degrees (int16_t) into a single 32-bit unsigned integer (`uint32_t`). Provide an unpacker routine to reconstruct the original telemetry values.",
      exampleText: "Sensor ID: 42, Battery: 95%, Temp: 2850 (28.50 °C)",
      exampleOutput: "Packed 32-bit Telemetry Word: 0x2A5F0B22\nUnpacked Sensor ID: 42\nUnpacked Battery  : 95%\nUnpacked Temp     : 28.50 °C",
      logicExplanation: "1. Pack: ((uint32_t)sensorId << 24) | ((uint32_t)battery << 16) | ((uint16_t)temp & 0xFFFF)\n2. Unpack sensorId: (packed >> 24) & 0xFF\n3. Unpack battery: (packed >> 16) & 0xFF\n4. Unpack temp: (int16_t)(packed & 0xFFFF)",
      answer: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t sensorId = 42;
    uint8_t battery = 95;
    int16_t tempCentiDeg = 2850; /* 28.50 °C */

    /* Pack into 32-bit unsigned int */
    uint32_t packet = ((uint32_t)sensorId << 24) |
                      ((uint32_t)battery << 16)  |
                      ((uint32_t)(uint16_t)tempCentiDeg & 0xFFFF);

    printf("Packed Packet: 0x%08X\\n", packet);

    /* Unpack */
    uint8_t outId = (packet >> 24) & 0xFF;
    uint8_t outBatt = (packet >> 16) & 0xFF;
    int16_t outTemp = (int16_t)(packet & 0xFFFF);

    printf("Unpacked ID   : %u\\n", outId);
    printf("Unpacked Batt : %u%%\\n", outBatt);
    printf("Unpacked Temp : %.2f °C\\n", outTemp / 100.0);

    return 0;
}`,
      codeExplanation: "Demonstrates bitwise serialization, exact-width stdint data types, bit masking, and integer division formatting."
    }
  ]
};

export default function Topic6() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_002 · Topic 6
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects &amp; Lab Solutions
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 001_002 Practical Capstone Projects &amp; Lab Solutions
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Apply C tokens, primitive memory sizing, exact-width integer types (<code>&lt;stdint.h&gt;</code>), bitwise manipulation masks, and arithmetic precision in real-world systems engineering projects.
        </p>
      </header>

      {/* 2. Reference C Code Demonstration */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>💻</span> Reference C Implementation: Module2ProjectsDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="Module2ProjectsDemo.c" editable={false} />
      </section>

      {/* 3. Hands-on Projects Section using CProjectAnswerTemplate */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3 flex items-center gap-2">
          <span>🚀</span> Module 001_002 Capstone Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      {/* 4. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_002 Topic 6 FAQs: Projects & Lab Practice" questions={questions} />
      </section>

      {/* 5. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 6 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_002_topic6_note.txt"
        />
      </section>

      {/* 6. Teacher's Note Section */}
      <section>
        <Teacher note="Always test edge cases: try negative numbers in salary inputs and observe bitmask boundaries. Building robust systems begins with mastering data types and bit-level mechanics! — Sukanta Hui" />
      </section>
    </div>
  );
}
