import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic7Questions } from "./topic7_files/topic7_questions";

export default function Topic7() {
  // Interactive IoT Simulator State
  const [ambientTemp, setAmbientTemp] = useState(31);
  const [soilMoisture, setSoilMoisture] = useState(22);
  const [roomOccupancy, setRoomOccupancy] = useState(true);

  // Automated Actuations
  const smartACState = ambientTemp > 28 && roomOccupancy ? "ON (Cooling at 22°C)" : "STANDBY (Eco Mode)";
  const smartIrrigation = soilMoisture < 30 ? "ACTIVE (Drip Valve OPEN)" : "OFF (Optimal Moisture)";
  const smartLighting = roomOccupancy ? "ON (Auto 80% Brightness)" : "OFF (No Motion Detected)";

  // RFID FASTag Simulator State
  const [tagId, setTagId] = useState("TAG_001_TOLL");
  const [walletBalance, setWalletBalance] = useState(350);
  const [tollLog, setTollLog] = useState("Vehicle approaching toll booth. RFID Tag scanned.");
  const [barrierState, setBarrierState] = useState("CLOSED");

  const handlePayToll = () => {
    const tollFee = 65;
    if (walletBalance >= tollFee) {
      const newBal = walletBalance - tollFee;
      setWalletBalance(newBal);
      setBarrierState("OPEN (GREEN SIGNAL)");
      setTollLog(`✅ Authorized! ₹${tollFee} deducted from FASTag. Remaining Balance: ₹${newBal}. Barrier lifted.`);
    } else {
      setBarrierState("CLOSED (RED SIGNAL)");
      setTollLog(`🚨 Toll Denied! Insufficient FASTag balance (₹${walletBalance}). Barrier remains locked.`);
    }
  };

  const handleRechargeWallet = () => {
    setWalletBalance((prev) => prev + 500);
    setTollLog("💳 FASTag wallet recharged with ₹500 successfully.");
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic7Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 7: Internet of Things (IoT) & Smart Ecosystems
          </h1>
          <p className="text-emerald-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Discover the interconnected universe of smart cyber-physical devices. Master 
            <strong> IoT Multi-Tier Architecture</strong>, differentiate between <strong>Sensors</strong> (Data In) 
            and <strong>Actuators</strong> (Action Out), explore <strong>RFID & FASTag</strong> telemetry, and examine deployments across 
            <strong> Smart Homes</strong>, <strong>Precision Agriculture</strong>, and <strong>Smart Cities</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: What is IoT & Multi-Tier Architecture */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">01</span>
            What is the Internet of Things (IoT) & Its Architecture?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            The <strong>Internet of Things (IoT)</strong> is a vast network of physical objects ("things") embedded with sensors, microcontrollers, software, actuators, and network connectivity that autonomously collect, transmit, and act upon environmental data without human intervention.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-emerald-500/40 p-4 rounded-xl">
              <div className="text-emerald-400 font-bold text-xs uppercase mb-1">Layer 1</div>
              <h3 className="font-bold text-white text-sm mb-1">Perception (Sensing)</h3>
              <p className="text-slate-400 text-xs">
                Sensors (Temp, LDR, Soil, Gas), Actuators, and RFID tags collecting raw physical signals.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-teal-500/40 p-4 rounded-xl">
              <div className="text-teal-400 font-bold text-xs uppercase mb-1">Layer 2</div>
              <h3 className="font-bold text-white text-sm mb-1">Network / Transport</h3>
              <p className="text-slate-400 text-xs">
                Wi-Fi, Bluetooth Low Energy (BLE), Zigbee, LoRaWAN, Cellular 5G, and MQTT messaging.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-cyan-500/40 p-4 rounded-xl">
              <div className="text-cyan-400 font-bold text-xs uppercase mb-1">Layer 3</div>
              <h3 className="font-bold text-white text-sm mb-1">Middleware / Cloud</h3>
              <p className="text-slate-400 text-xs">
                Edge gateways, cloud storage, database stream processors, and rule automation engines.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-purple-500/40 p-4 rounded-xl">
              <div className="text-purple-400 font-bold text-xs uppercase mb-1">Layer 4</div>
              <h3 className="font-bold text-white text-sm mb-1">Application Layer</h3>
              <p className="text-slate-400 text-xs">
                Smart home smartphone dashboards, municipal traffic maps, and agricultural monitoring portals.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Smart Home & Agriculture IoT Lab */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">02</span>
            Interactive IoT Telemetry & Actuation Sandbox
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mb-6">
            Adjust environmental sensor sliders below to observe how the IoT middleware triggers automated actuator responses in real time.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
            {/* Environmental Sensor Inputs */}
            <div className="space-y-4 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block">
                1. Sensed Environmental Telemetry (Sensors &rarr; In)
              </span>

              {/* Temperature */}
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-200">Ambient Room Temperature:</span>
                  <span className={`font-mono font-bold ${ambientTemp > 28 ? "text-amber-400" : "text-emerald-400"}`}>
                    {ambientTemp}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="42"
                  value={ambientTemp}
                  onChange={(e) => setAmbientTemp(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="text-[10px] text-slate-500 mt-1">Threshold for Smart AC trigger: &gt; 28°C</div>
              </div>

              {/* Soil Moisture */}
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-200">Soil Moisture Level:</span>
                  <span className={`font-mono font-bold ${soilMoisture < 30 ? "text-red-400" : "text-emerald-400"}`}>
                    {soilMoisture}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={soilMoisture}
                  onChange={(e) => setSoilMoisture(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="text-[10px] text-slate-500 mt-1">Threshold for Drip Irrigation: &lt; 30%</div>
              </div>

              {/* Occupancy Toggle */}
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">PIR Motion / Occupancy Sensor:</div>
                  <div className="text-[11px] text-slate-400">{roomOccupancy ? "Occupant Present in Room" : "Room Empty"}</div>
                </div>
                <button
                  onClick={() => setRoomOccupancy(!roomOccupancy)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                    roomOccupancy ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {roomOccupancy ? "Motion Detected" : "No Motion"}
                </button>
              </div>
            </div>

            {/* Actuator Outputs */}
            <div className="space-y-4 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-teal-400 uppercase tracking-wider block mb-2">
                  2. Autonomous Actuator Responses (Action &rarr; Out)
                </span>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">❄️ Smart HVAC Air Conditioner</div>
                      <div className="text-[11px] text-slate-400">Triggered by Temp & Occupancy</div>
                    </div>
                    <span className={`font-bold font-mono text-xs px-2.5 py-1 rounded ${
                      smartACState.includes("ON") ? "bg-cyan-950 border border-cyan-500 text-cyan-300" : "bg-slate-800 text-slate-400"
                    }`}>
                      {smartACState}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">💧 Smart Drip Irrigation Valve</div>
                      <div className="text-[11px] text-slate-400">Triggered by Soil Moisture Probe</div>
                    </div>
                    <span className={`font-bold font-mono text-xs px-2.5 py-1 rounded ${
                      smartIrrigation.includes("ACTIVE") ? "bg-emerald-950 border border-emerald-500 text-emerald-300" : "bg-slate-800 text-slate-400"
                    }`}>
                      {smartIrrigation}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">💡 Automated Room Lighting</div>
                      <div className="text-[11px] text-slate-400">Triggered by PIR Motion Sensor</div>
                    </div>
                    <span className={`font-bold font-mono text-xs px-2.5 py-1 rounded ${
                      smartLighting.includes("ON") ? "bg-amber-950 border border-amber-500 text-amber-300" : "bg-slate-800 text-slate-400"
                    }`}>
                      {smartLighting}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-xs text-emerald-200">
                💡 <strong>Key Principle:</strong> Sensors read physical inputs (Data In) &rarr; Microcontroller evaluates rules &rarr; Actuators perform physical actions (Action Out).
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: RFID & FASTag Toll Plaza Simulation */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">03</span>
            RFID Technology & FASTag Toll Plaza Simulation
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Experience how passive RFID tags mounted on vehicle windshields communicate wirelessly with RFID reader antennas at highway toll booths.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
            {/* Toll Console */}
            <div className="space-y-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Windshield RFID Tag:</span>
                  <span className="font-mono font-bold text-teal-400">{tagId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Vehicle Registration:</span>
                  <span className="font-mono font-bold text-white">DL-01-AB-1234 (Amit Verma)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-slate-300 font-semibold">Prepaid FASTag Wallet:</span>
                  <span className="font-mono font-bold text-emerald-400 text-base">₹{walletBalance}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handlePayToll}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition text-xs shadow-lg"
                >
                  🚙 Scan Tag & Pay Toll (₹65)
                </button>
                <button
                  onClick={handleRechargeWallet}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition text-xs"
                >
                  💳 Top-Up ₹500
                </button>
              </div>
            </div>

            {/* Barrier Telemetry Output */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between text-xs">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Toll Barrier Physical State</div>
                <div className={`p-4 rounded-lg text-center font-bold text-base mb-3 border ${
                  barrierState.includes("OPEN")
                    ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                    : "bg-red-950/60 border-red-500 text-red-300"
                }`}>
                  🚧 BOLLARD / BOOM BARRIER: {barrierState}
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-slate-300">
                  <strong>Reader Log:</strong> {tollLog}
                </div>
              </div>
              <div className="text-[10px] text-slate-500 mt-2">
                RFID Frequency: 865-868 MHz (UHF band) | Tag Type: Passive EPC Gen2
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Sensors vs. Actuators Matrix */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">04</span>
            Sensors vs. Actuators in IoT Ecosystems
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 uppercase font-bold">
                <tr>
                  <th className="p-3.5 border-b border-slate-800">Characteristic</th>
                  <th className="p-3.5 border-b border-slate-800 text-teal-400">Sensors (Data Input)</th>
                  <th className="p-3.5 border-b border-slate-800 text-amber-400">Actuators (Physical Output)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Primary Function</td>
                  <td className="p-3.5">Measures physical environmental changes and converts them to electrical signals.</td>
                  <td className="p-3.5">Receives electrical control signals and converts them into physical mechanical movement.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Direction of Information</td>
                  <td className="p-3.5">Inward: Physical World &rarr; Controller (Microprocessor)</td>
                  <td className="p-3.5">Outward: Controller &rarr; Physical World</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Real-World Examples</td>
                  <td className="p-3.5">Thermistor, LDR Photoresistor, PIR Motion, Ultrasonic, Soil Moisture, Gyroscope</td>
                  <td className="p-3.5">Electric DC/Servo Motors, Solenoid Water Valves, Relays, Buzzer Alarms, Linear Pistons</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Smart Home Example</td>
                  <td className="p-3.5">LDR detects sunset (darkness in front yard).</td>
                  <td className="p-3.5">Relay actuator switches on the high-voltage porch floodlights.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">05</span>
            Python Companion Simulation: IoT Ecosystem & FASTag Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Explore the pure Python script implementing multi-layer telemetry reading, automated smart decision rules, and RFID toll plaza transactions.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic7_files/iot_ecosystem_simulator.py"
            title="iot_ecosystem_simulator.py"
          />
        </section>

        {/* Section 6: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">06</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic7_files/topic7_note.txt"
            title="Topic 7 Revision Notes"
          />
        </section>

        {/* Section 7: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">07</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your mastery of IoT architecture, sensors, actuators, RFID, and smart city domains.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-emerald-400 my-1">
                {calculateScore()} / {topic7Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic7Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic7Questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-red-950/20 border-red-500/40"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">
                      Q{qIndex + 1}. {q.question}
                    </span>
                    {showResults && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition border ${
                            isSelected
                              ? "bg-emerald-600/30 border-emerald-500 text-white font-medium"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-emerald-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-teal-300">
                        <strong>ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 8: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">08</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is the primary difference between passive and active RFID tags?",
                a: "Passive RFID tags have no internal battery; they are powered directly by incoming electromagnetic waves from the reader. Active RFID tags contain an onboard battery, allowing long-range transmission up to 100 meters."
              },
              {
                q: "Why is MQTT favored over HTTP in IoT networks?",
                a: "MQTT is an ultra-lightweight publish/subscribe messaging protocol with minimal header overhead, making it ideal for low-bandwidth networks and battery-constrained IoT microcontrollers compared to heavy HTTP request/response headers."
              },
              {
                q: "What is the role of IPv6 in the Internet of Things?",
                a: "With tens of billions of connected smart devices globally, IPv4's 32-bit address space was exhausted. IPv6's 128-bit address space provides virtually limitless unique IP addresses for every smart device."
              },
              {
                q: "How does IoT contribute to Smart Cities?",
                a: "IoT enables smart cities through dynamic traffic signal control, smart waste bin monitoring, energy-saving smart streetlights, and smart water grid leak detection."
              }
            ]}
          />
        </section>

        {/* Section 9: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="The Internet of Things merges digital software with physical physical infrastructure. When studying for Class 11 exams, focus clearly on the 4 architectural layers, master the precise distinction between Sensors (Data In) and Actuators (Action Out), and understand how RFID powers FASTag toll systems."
        />
      </div>
    </div>
  );
}
