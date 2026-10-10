import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic5Questions } from "./topic5_files/topic5_questions";

export default function Topic5() {
  // Interactive State for Robotics Sense-Plan-Act Simulator
  const [obstacleDistance, setObstacleDistance] = useState(65); // cm
  const [floorLineType, setFloorLineType] = useState("BLACK_LINE");
  const [targetDetected, setTargetDetected] = useState("NONE");

  // Determine Sense-Plan-Act logic
  let robotPlan = "CRUISE_FORWARD";
  let leftMotorPWM = 70;
  let rightMotorPWM = 70;
  let gripperState = "OPEN";
  let armAngle = 30;
  let actionLog = "Cruising forward on floor path.";

  if (obstacleDistance < 25) {
    robotPlan = "EMERGENCY_OBSTACLE_AVOIDANCE";
    leftMotorPWM = -60;
    rightMotorPWM = 60;
    actionLog = "⚠️ Ultrasonic alert! Obstacle < 25cm. Reversing left motor & spinning right.";
  } else if (targetDetected === "PAYLOAD_BOX") {
    robotPlan = "GRIP_PAYLOAD";
    leftMotorPWM = 0;
    rightMotorPWM = 0;
    gripperState = "CLOSED (GRIPPING)";
    armAngle = 90;
    actionLog = "🎯 Vision camera detected payload! Motors halted, arm lowered to 90°, gripper clamped.";
  } else if (floorLineType === "OFF_TRACK_LEFT") {
    robotPlan = "CORRECT_STEER_RIGHT";
    leftMotorPWM = 80;
    rightMotorPWM = 25;
    actionLog = "🔄 IR sensor lost line on left. Powering left motor to steer right.";
  } else if (floorLineType === "OFF_TRACK_RIGHT") {
    robotPlan = "CORRECT_STEER_LEFT";
    leftMotorPWM = 25;
    rightMotorPWM = 80;
    actionLog = "🔄 IR sensor lost line on right. Powering right motor to steer left.";
  }

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic5Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-cyan-950 via-slate-900 to-teal-950 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 5: Robotics — Components, Sensors & Control
          </h1>
          <p className="text-cyan-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Discover the electro-mechanical foundations of autonomous machines. Master the 
            <strong> Sense-Plan-Act Feedback Loop</strong>, explore essential subsystems 
            (<strong>Controllers</strong>, <strong>Sensors</strong>, <strong>Actuators</strong>, <strong>End Effectors</strong>), 
            and analyze real-world deployments in <strong>Industrial Automation</strong>, <strong>Robotic Surgery</strong>, and <strong>Planetary Exploration</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Sense - Plan - Act Feedback Loop */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">01</span>
            The Autonomous Feedback Loop: Sense &rarr; Plan &rarr; Act
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            A robot is not merely a static mechanism; it is an active physical agent that continuously observes its surroundings, computes optimal decisions, and executes physical movements in the real world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/70 border border-teal-500/30 p-5 rounded-xl">
              <div className="flex items-center gap-2 text-teal-400 font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-xs">1</span>
                SENSE (The Perception)
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sensors convert physical environmental variables (distances, infrared reflections, temperature, camera pixels) into digital electrical signals.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-cyan-500/30 p-5 rounded-xl">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">2</span>
                PLAN (The Computation)
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                The central controller (Microcontroller / CPU) executes algorithms, parses sensor telemetry, and calculates motor trajectory decisions.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-emerald-500/30 p-5 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">3</span>
                ACT (The Physical Execution)
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Actuators (DC motors, servo joints, hydraulic pistons, mechanical grippers) convert computed commands into physical force and torque.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Robot Controller & Telemetry Sandbox */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">02</span>
            Interactive Robot Sense-Plan-Act Simulator
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mb-6">
            Adjust environmental inputs (Ultrasonic distance, IR line tracker, and Vision camera) to watch the robot controller calculate motor PWM signals and arm movements in real time.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
            {/* Input Controls */}
            <div className="space-y-5 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider block">
                1. Sensed Environmental Inputs
              </span>

              {/* Ultrasonic Slider */}
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-200">Ultrasonic Obstacle Distance:</span>
                  <span className={`font-mono font-bold ${obstacleDistance < 25 ? "text-red-400" : "text-emerald-400"}`}>
                    {obstacleDistance} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={obstacleDistance}
                  onChange={(e) => setObstacleDistance(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>5 cm (Immediate Hazard)</span>
                  <span>25 cm (Threshold)</span>
                  <span>150 cm (Clear)</span>
                </div>
              </div>

              {/* IR Floor Line Selector */}
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <label className="font-semibold text-slate-200 block mb-2">IR Ground Line Tracker:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "BLACK_LINE", label: "Centered on Line" },
                    { id: "OFF_TRACK_LEFT", label: "Drifted Left" },
                    { id: "OFF_TRACK_RIGHT", label: "Drifted Right" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFloorLineType(item.id)}
                      className={`p-2 rounded text-[11px] font-semibold transition border ${
                        floorLineType === item.id
                          ? "bg-cyan-600 border-cyan-400 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vision Camera Target */}
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <label className="font-semibold text-slate-200 block mb-2">Computer Vision Target:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTargetDetected("NONE")}
                    className={`p-2 rounded text-[11px] font-semibold transition border ${
                      targetDetected === "NONE"
                        ? "bg-cyan-600 border-cyan-400 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    No Target Object
                  </button>
                  <button
                    onClick={() => setTargetDetected("PAYLOAD_BOX")}
                    className={`p-2 rounded text-[11px] font-semibold transition border ${
                      targetDetected === "PAYLOAD_BOX"
                        ? "bg-amber-600 border-amber-400 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    📦 Payload Box Reached
                  </button>
                </div>
              </div>
            </div>

            {/* Output Actuator Telemetry */}
            <div className="space-y-4 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-teal-400 uppercase tracking-wider block mb-2">
                  2. Controller Decision & Actuator Outputs
                </span>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Current Plan Action:</span>
                    <span className="font-mono font-bold text-cyan-300">{robotPlan}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Left DC Motor</div>
                      <div className="text-lg font-mono font-black text-cyan-400 mt-1">{leftMotorPWM}% PWM</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Right DC Motor</div>
                      <div className="text-lg font-mono font-black text-cyan-400 mt-1">{rightMotorPWM}% PWM</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">End-Effector Gripper</div>
                      <div className="text-sm font-bold text-amber-400 mt-1">{gripperState}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Arm Servo Angle</div>
                      <div className="text-sm font-bold text-purple-400 mt-1">{armAngle}° Degree</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-emerald-300">
                    <strong>Action Log:</strong> {actionLog}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded text-xs text-cyan-200">
                💡 <strong>Exam Insight:</strong> The microcontroller translates sensor voltage levels into Pulse Width Modulation (PWM) signals to control motor speeds and direction.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Subsystems of a Robot */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">03</span>
            Anatomy of a Robot: Primary Subsystems
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-cyan-400 font-bold text-xs uppercase mb-1">Subsystem 1</div>
              <h4 className="text-white font-semibold text-sm mb-1">Controller (Brain)</h4>
              <p className="text-slate-400 text-xs">
                Microprocessor/Microcontroller executing programmed logic and feedback loops.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-teal-400 font-bold text-xs uppercase mb-1">Subsystem 2</div>
              <h4 className="text-white font-semibold text-sm mb-1">Sensors (Senses)</h4>
              <p className="text-slate-400 text-xs">
                Ultrasonic, LiDAR, IR, IMUs, and Cameras collecting real-world data.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-amber-400 font-bold text-xs uppercase mb-1">Subsystem 3</div>
              <h4 className="text-white font-semibold text-sm mb-1">Actuators (Muscles)</h4>
              <p className="text-slate-400 text-xs">
                Electric DC/Servo motors, hydraulic cylinders, and pneumatic air valves.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-purple-400 font-bold text-xs uppercase mb-1">Subsystem 4</div>
              <h4 className="text-white font-semibold text-sm mb-1">End Effector (Hands)</h4>
              <p className="text-slate-400 text-xs">
                Mechanical claws, welding torches, suction cups, and surgical scalpels.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Real-World Applications */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">04</span>
            High-Impact Robotics Deployments in Society
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-cyan-400 font-bold mb-2">🏭 Industrial Automotive Manufacturing</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                6-DoF articulated robotic arms perform 24x7 high-speed spot welding, laser cutting, and spray painting on automobile assembly lines with sub-millimeter precision.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-teal-400 font-bold mb-2">🩺 Healthcare & Robotic Surgery</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Systems like the da Vinci Surgical Robot enable surgeons to execute minimally invasive microsurgeries with tremor filtration, 3D HD vision, and faster patient recovery.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-amber-400 font-bold mb-2">🚀 Space & Extreme Hazard Robotics</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                ISRO's Pragyan Moon Rover and NASA's Perseverance Rover explore planetary terrain, drill mineral rock samples, and navigate hostile environments autonomously.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">05</span>
            Python Companion Simulation: Robot Subsystems & Control Loop
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Explore the pure Python code implementing the Sense-Plan-Act feedback loop, ultrasonic obstacle detection, and actuator PWM driving.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic5_files/robotics_control_simulator.py"
            title="robotics_control_simulator.py"
          />
        </section>

        {/* Section 6: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">06</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic5_files/topic5_note.txt"
            title="Topic 5 Revision Notes"
          />
        </section>

        {/* Section 7: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">07</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your mastery of robot controllers, sensors, actuators, and industrial applications.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-cyan-400 my-1">
                {calculateScore()} / {topic5Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic5Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic5Questions.map((q, qIndex) => {
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
                              ? "bg-cyan-600/30 border-cyan-500 text-white font-medium"
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
                      <div className="text-cyan-400">
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
                q: "What is the primary role of an Actuator in robotics?",
                a: "An actuator is the component that converts electrical, hydraulic, or pneumatic energy into physical mechanical motion, allowing the robot to move its joints, drive wheels, or grip objects."
              },
              {
                q: "What is an End Effector?",
                a: "An end effector is the tool or gripper attached to the terminal wrist joint of a robotic arm to interact directly with tasks—such as a mechanical claw, welding electrode, suction cup, or drill."
              },
              {
                q: "How does the 'Sense-Plan-Act' paradigm work?",
                a: "The robot senses environmental parameters via sensors (cameras, ultrasonic), plans the appropriate decision using its microcontroller algorithms, and acts by commanding its actuators to move."
              },
              {
                q: "What is a Cobot (Collaborative Robot)?",
                a: "A Cobot is an industrial robot engineered with advanced proximity and force sensors that allow it to safely work shoulder-to-shoulder with human workers without needing protective isolation cages."
              }
            ]}
          />
        </section>

        {/* Section 9: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Robotics bridges computer software logic with physical electrical and mechanical hardware. For CBSE board questions, ensure you can define the four essential subsystems (Controller, Sensors, Actuators, End Effector), draw the Sense-Plan-Act cycle, and provide real-world examples in surgery, space exploration, and industry."
        />
      </div>
    </div>
  );
}
