import React, { Component } from "react";
import logo from "../assets/cnat.png";
import QRCode from "react-qr-code";

export default class TypingTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.generateRandomParagraph(),
      input: "",
      timeLeft: 60,
      running: false,
      showCertificate: false,
      studentName: "",
      nameInput: "",
      showNameModal: true,
      certificateNumber: this.generateCertificateNumber(),
    };
  }

  // ================================================
  // Generate Unique Certificate Number
  // Pattern: CNAT-######-2425 (AY compact)
  // ================================================
  generateCertificateNumber = () => {
    const randomSix = Math.floor(100000 + Math.random() * 900000); // 6-digit random

    const now = new Date();
    let year = now.getFullYear();
    const month = now.getMonth() + 1; // 1–12

    // Determine accounting year
    let startYear;
    if (month >= 4) {
      // From April to December → accounting year starts this year
      startYear = year;
    } else {
      // From Jan to March → accounting year started last year
      startYear = year - 1;
    }

    const shortStart = String(startYear).slice(-2);
    const shortEnd = String(startYear + 1).slice(-2);

    // Example: CNAT-123456-2425
    return `CNAT-${randomSix}-${shortStart}${shortEnd}`;
  };

  // ================================================
  // Random Paragraph Generator
  // ================================================
  generateRandomParagraph = () => {
    const sentences = [
      "Technology continues to reshape the world in remarkable ways influencing industries communication and daily life.",
      "Consistency is more powerful than motivation because it helps you grow even on days when you feel low.",
      "Learning is a lifelong process and those who embrace curiosity often discover opportunities before anyone else.",
      "Success requires discipline patience and the confidence to keep moving even when progress feels slow.",
      "Modern education demands adaptability creativity and the courage to explore innovative ideas.",
      "Typing efficiently improves productivity sharpens focus and supports faster execution of thoughts.",
      "Every great achievement begins as a small step taken consistently without giving up.",
      "The digital world expands rapidly and mastering key skills helps individuals stay future ready.",
      "True progress is not measured by speed but by the courage to continue despite challenges.",
      "Reading regularly strengthens language skills enhances imagination and broadens perspective.",
      "Time management is a crucial ability that improves efficiency and reduces unnecessary stress.",
      "Staying organized helps maintain clarity and allows you to focus on what truly matters.",
      "Success is often the result of perseverance dedication and a willingness to learn from failures.",
      "Effective communication builds strong relationships and improves teamwork across all fields.",
      "Creativity thrives when you allow yourself to think freely explore ideas and experiment.",
      "Hard work combined with smart planning leads to meaningful and lasting achievements.",
      "Self-discipline empowers individuals to control impulses stay consistent and stay committed.",
      "Small daily improvements compound into significant long-term results over time.",
      "Patience is a powerful skill that allows you to stay calm composed and focused.",
      "Adaptability helps individuals adjust to change and thrive in unpredictable environments.",
      "Confidence grows when you step outside your comfort zone and challenge yourself.",
      "Good habits shape your future while negative habits hold you back from progress.",
      "A positive mindset helps you perceive challenges as opportunities for growth.",
      "Knowledge becomes powerful only when it is applied consistently in real situations.",
      "A healthy balance between work and rest is essential for long-term productivity.",
      "Keeping your goals visible helps maintain clarity and strengthens determination.",
      "Success rarely happens overnight it is built with consistent effort and dedication.",
      "True learning occurs when you question explore and seek deeper understanding.",
      "Technology continues to evolve requiring individuals to stay updated and engaged.",
      "The ability to think critically allows you to make wise decisions with confidence.",
      "Staying humble keeps you grounded and open to learning from everyone around you.",
      "Your attitude determines how you interpret situations and respond to challenges.",
      "Focusing on solutions rather than problems creates a strong problem-solving mindset.",
      "Practice improves accuracy sharpens technique and builds long-term confidence.",
      "Discipline acts as the bridge between goals and accomplishment.",
      "Persistence means continuing even when progress feels slow or invisible.",
      "Courage allows you to move forward despite uncertainty and fear.",
      "Learning from mistakes helps you grow refine your skills and improve judgment.",
      "Investing in self-improvement is the best investment you can make for your future.",
      "Every day offers a new opportunity to learn grow and become better than yesterday.",
    ];

    let paragraph = "";
    const count = Math.floor(Math.random() * 4) + 6;

    for (let i = 0; i < count; i++) {
      paragraph += sentences[Math.floor(Math.random() * sentences.length)] + " ";
    }
    return paragraph.trim();
  };

  // ================================================
  // ⭐ GRADE SYSTEM HELPERS
  // ================================================
  calculateGrade = (wpm, accuracy) => {
    if (wpm >= 45 && accuracy >= 95) return "A+";
    if (wpm >= 35 && accuracy >= 90) return "A";
    if (wpm >= 25 && accuracy >= 85) return "B";
    if (wpm >= 15 && accuracy >= 80) return "C";
    if (wpm >= 5 && accuracy >= 70) return "D";
    return "F";
  };

  gradeRemarks = {
    "A+": "Outstanding performance! Excellent professional typing skills.",
    "A": "Great job! You type with high accuracy and strong speed.",
    "B": "Good typing skills. A little more practice will make you excellent.",
    "C": "Satisfactory performance. Focus on improving speed and consistency.",
    "D": "Beginner level. Daily practice will help you improve quickly.",
    "F": "Result below the qualifying standard. Accuracy and speed need significant improvement.",
  };

  // Gradient badge colors
  gradeColors = {
    "A+": "bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-black",
    "A": "bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 text-white",
    "B": "bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-500 text-white",
    "C": "bg-gradient-to-r from-amber-200 via-amber-300 to-orange-400 text-black",
    "D": "bg-gradient-to-r from-orange-300 via-orange-400 to-red-500 text-white",
    "F": "bg-gradient-to-r from-red-500 via-red-600 to-red-800 text-white",
  };

  // Grade-based certificate paragraph text
  certificateTexts = {
    "A+": "for outstanding performance in the Typing Speed Assessment Test, demonstrating exceptional speed, accuracy, and technical mastery.",
    "A": "for excellent performance in the Typing Speed Assessment Test, showing strong typing accuracy, impressive speed, and consistent technique.",
    "B": "for very good performance in the Typing Speed Assessment Test, demonstrating reliable accuracy and good typing speed.",
    "C": "for satisfactory performance in the Typing Speed Assessment Test, showing basic proficiency and clear scope for further improvement.",
    "D": "for participating in the Typing Speed Assessment Test and demonstrating initial typing ability. Continued regular practice is recommended to improve skills.",
    "F": "for attempting the Typing Speed Assessment Test. The performance does not meet the minimum qualifying criteria, and further practice with focus on accuracy is required.",
  };

  isPass = (grade) => grade !== "F";

  generateAdvice = (wpm, accuracy) => {
    if (accuracy < 70) return "Improve accuracy before focusing on speed.";
    if (wpm < 20) return "Increase typing speed with short, daily practice sessions.";
    if (wpm < 35) return "Speed is improving — keep practicing to reach higher levels.";
    if (wpm < 45) return "Great performance — a little more practice can push you to distinction.";
    return "Excellent! Maintain this performance and help others to improve.";
  };

  calculateStars = (wpm, accuracy) => {
    if (wpm >= 50 && accuracy >= 97) return 5;
    if (wpm >= 40 && accuracy >= 90) return 4;
    if (wpm >= 30 && accuracy >= 85) return 3;
    if (wpm >= 15 && accuracy >= 75) return 2;
    return 1;
  };

  // ================================================
  // Timer Logic
  // ================================================
  componentDidUpdate(prevProps, prevState) {
    if (this.state.running && !prevState.running) {
      this.startTimer();
    }
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(this.timer);

          return {
            timeLeft: 0,
            running: false,
            showCertificate: true,
            certificateNumber: this.generateCertificateNumber(),
          };
        }
        return { timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // ================================================
  // Name Modal Submit
  // ================================================
  handleNameSubmit = (e) => {
    e.preventDefault();
    const cleaned = (this.state.nameInput || "").trim() || "Student";

    this.setState({
      studentName: cleaned,
      showNameModal: false,
      nameInput: "",
      text: this.generateRandomParagraph(),
      input: "",
      timeLeft: 60,
      running: false,
      showCertificate: false,
      certificateNumber: this.generateCertificateNumber(),
    });
  };

  // ================================================
  // Restart Test
  // ================================================
  restartTest = () => {
    clearInterval(this.timer);
    this.setState({
      text: this.generateRandomParagraph(),
      input: "",
      timeLeft: 60,
      running: false,
      showCertificate: false,
      studentName: "",
      nameInput: "",
      showNameModal: true,
      certificateNumber: this.generateCertificateNumber(),
    });
  };

  // ================================================
  // Render
  // ================================================
  render() {
    const {
      text,
      input,
      timeLeft,
      showCertificate,
      studentName,
      nameInput,
      showNameModal,
      certificateNumber,
    } = this.state;

    // =========================================================
    // WPM + ACCURACY (word based)
    // =========================================================
    const textWords = text.trim().split(/\s+/);
    const inputWords = input.trim() ? input.trim().split(/\s+/) : [];

    let correctWords = 0;
    let ti = 0;
    let oi = 0;

    while (ti < inputWords.length && oi < textWords.length) {
      if (inputWords[ti] === textWords[oi]) {
        correctWords++;
      }
      ti++;
      oi++;
    }

    const elapsedSeconds = 60 - timeLeft;
    const wpm =
      elapsedSeconds > 0 ? Math.round((correctWords / elapsedSeconds) * 60) : 0;

    const accuracy =
      inputWords.length > 0
        ? Math.round((correctWords / inputWords.length) * 100)
        : 0;

    const grade = this.calculateGrade(wpm, accuracy);
    const remarks = this.gradeRemarks[grade];
    const gradeColor = this.gradeColors[grade];
    const pass = this.isPass(grade);
    const advice = this.generateAdvice(wpm, accuracy);
    const stars = this.calculateStars(wpm, accuracy);

    const starIcons = Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < stars ? "text-yellow-400" : "text-gray-400"}>
        ★
      </span>
    ));

    // Dynamic certificate title & size
    let certificateTitle = "";
    let titleClass = "";

    if (grade === "A+" || grade === "A") {
      certificateTitle = "Certificate of Excellence";
      titleClass = "text-3xl";
    } else if (grade === "B") {
      certificateTitle = "Certificate of Achievement";
      titleClass = "text-3xl";
    } else if (grade === "F") {
      certificateTitle = "Assessment Report (Non-Qualifying)";
      titleClass = "text-2xl";
    } else {
      certificateTitle = "Certificate of Participation";
      titleClass = "text-2xl";
    }

    const today = new Date().toLocaleDateString();

    return (
      <div
        className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8"
        // 🔒 Global restriction: copy, cut, paste, right-click disabled everywhere
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* PRINT STYLES */}
        <style>
          {`
            @media print {
              body * { visibility: hidden !important; }
              #certificate, #certificate * { visibility: visible !important; }
              .no-print { display: none !important; }
              @page { size: A4 portrait; margin: 0; }
              #certificate {
                position: absolute;
                left: 0; top: 0;
                width: 210mm !important;
                height: 297mm !important;
                padding: 12mm !important;
                box-sizing: border-box;
                overflow: hidden !important;
              }
            }
          `}
        </style>

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          Typing Speed Test
        </h1>

        {/* PASSAGE DISPLAY */}
        <div className="max-w-3xl bg-gray-800 p-6 rounded-xl shadow-xl mb-6 text-xl font-mono leading-relaxed">
          {text.split("").map((char, i) => {
            let color = "text-gray-500";
            if (i < input.length) {
              color = input[i] === char ? "text-green-400" : "text-red-400";
            }
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </div>

        {/* INPUT AREA */}
        <textarea
          value={input}
          onChange={(e) =>
            this.setState({ input: e.target.value, running: true })
          }
          placeholder="Start typing..."
          className="max-w-3xl w-full h-36 p-4 bg-gray-800 border border-gray-700 rounded-xl text-lg font-mono outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          // 🔒 Extra safety in textarea
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* LIVE STATS + GRADE PREVIEW */}
        <div className="flex flex-col items-center gap-3 mt-6 text-xl">
          <div className="flex flex-wrap justify-center gap-6">
            <p>
              <b className="text-blue-400">{timeLeft}s</b>
            </p>
            <p>
              ⚡ WPM: <b className="text-green-400">{wpm}</b>
            </p>
            <p>
              🎯 Accuracy: <b className="text-yellow-400">{accuracy}%</b>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-base">
            <span
              className={`px-4 py-1 rounded-full font-semibold shadow-md ${gradeColor}`}
            >
              Grade: {grade}
            </span>
            <span className="text-2xl flex gap-1">{starIcons}</span>
            <span
              className={`text-lg font-bold ${pass ? "text-green-400" : "text-red-400"
                }`}
            >
              {pass ? "PASS" : "FAIL"}
            </span>
          </div>
        </div>

        {/* RESTART BUTTON */}
        <button
          onClick={this.restartTest}
          className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg"
        >
          Restart Test
        </button>

        {/* ================================================
            NAME MODAL
        ================================================= */}
        {showNameModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 max-w-md w-full">
              <h2 className="text-2xl font-bold text-blue-400 text-center mb-4">
                Enter Student Name
              </h2>

              <form onSubmit={this.handleNameSubmit}>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => this.setState({ nameInput: e.target.value })}
                  placeholder="Student Name"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoFocus
                />

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    Start Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================
            CERTIFICATE (SCROLLABLE)
        ================================================= */}
        {showCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto py-6">
            <div className="flex justify-center">
              <div
                id="certificate"
                className="bg-white text-black shadow-2xl rounded-xl border-[10px] border-yellow-600 relative"
                style={{
                  width: "210mm",
                  height: "297mm",
                  padding: "12mm",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                  {/* LOGO */}
                  <div className="flex flex-col items-center">
                    <img
                      src={logo}
                      alt="Institute Logo"
                      className="rounded-lg"
                      style={{ width: "70px" }}
                    />
                    <p className="text-[10px] mt-1 font-bold text-gray-700">
                      ESTD. 1997
                    </p>
                  </div>

                  {/* DETAILS */}
                  <div className="text-center leading-tight">
                    <h1 className="text-4xl font-extrabold text-yellow-700 tracking-wide">
                      Coder & AccoTax
                    </h1>

                    <p className="text-[11px] text-gray-700 font-semibold mt-1">
                      ISO 9001:2015 Certified Institution
                    </p>

                    <p className="text-[10px]">
                      25(10/A) Shibtala Road, PO – N.C. Pukur, Barrackpore
                    </p>

                    <p className="text-[10px]">
                      Website: www.codernaccotax.co.in | Phone: 7003756860
                    </p>
                  </div>

                  {/* QR CODE */}
                  <div className="flex flex-col items-center">
                    <QRCode
                      value={`https://www.codernaccotax.co.in/certificates/${certificateNumber}`}
                      size={70}
                    />
                    <p className="text-[10px] mt-1 text-gray-600 font-semibold">
                      Scan to Verify
                    </p>
                  </div>
                </div>

                <hr className="border-t-2 border-yellow-600 mb-6 rounded-full" />

                {/* TITLE (Dynamic) */}
                <h2
                  className={`${titleClass} font-extrabold text-yellow-700 mb-3 text-center`}
                >
                  {certificateTitle}
                </h2>

                <p className="text-center text-sm text-gray-700 mb-3 italic">
                  Certificate No: <b>{certificateNumber}</b>
                </p>

                <p className="text-center text-lg">
                  This certificate is proudly awarded to
                </p>

                <p className="text-center text-2xl font-bold text-blue-900 mt-2">
                  {studentName.toUpperCase()}
                </p>

                {/* GRADE-BASED MAIN TEXT */}
                <p className="text-center text-base mt-6 leading-relaxed mx-6 text-gray-800">
                  {this.certificateTexts[grade]} <br />
                  This certificate is issued by{" "}
                  <b className="text-blue-700">Coder & AccoTax</b>{" "}
                  in recognition of the performance shown in the assessment.
                </p>

                {/* RESULTS + GRADE BLOCK */}
                <div className="mt-8 text-lg font-semibold px-2">
                  {/* Grade badge & stars side by side */}
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                    <div
                      className={`px-5 py-1.5 rounded-full text-xl font-bold shadow-md ${gradeColor}`}
                    >
                      Grade: {grade}
                    </div>
                    <div className="text-3xl flex gap-1">{starIcons}</div>
                  </div>

                  {/* WPM & Accuracy row */}
                  <div className="flex justify-between mt-1 text-base">
                    <p>
                      ⚡ WPM: <b>{wpm}</b>
                    </p>
                    <p>
                      🎯 Accuracy: <b>{accuracy}%</b>
                    </p>
                  </div>

                  {/* Pass / Fail */}
                  <p
                    className={`mt-4 text-xl font-bold text-center ${pass ? "text-green-700" : "text-red-700"
                      }`}
                  >
                    {pass ? "PASS" : "FAIL"}
                  </p>

                  {/* Remarks */}
                  <p className="text-center text-sm mt-2 text-gray-700 italic">
                    {remarks}
                  </p>

                  {/* Advice */}
                  <p className="text-center text-sm mt-2 text-blue-700">
                    💡 {advice}
                  </p>
                </div>

                {/* DATE */}
                <p className="text-center text-sm mt-8 text-gray-700">
                  Date of Issue: <b>{today}</b>
                </p>

                {/* SIGNATURES */}
                <div className="flex justify-between mt-10 px-6">
                  <div className="text-center">
                    <img
                      src="https://i.imgur.com/eptFw5W.png"
                      alt="Seal"
                      style={{ width: "70px", opacity: 0.5 }}
                      className="mx-auto mb-2"
                    />
                    <hr className="border-t border-black w-32 mx-auto" />
                    <p className="mt-1 text-sm font-semibold">
                      Authorized Signatory
                    </p>
                  </div>

                  <div className="text-center">
                    <img
                      src="https://i.imgur.com/FqE5Q0T.png"
                      alt="Signature"
                      style={{ width: "100px", opacity: 0.8 }}
                      className="mx-auto mb-1"
                    />
                    <hr className="border-t border-black w-32 mx-auto" />
                    <p className="mt-1 text-sm font-semibold">Instructor</p>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-center gap-6 mt-10 no-print">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md text-base"
                  >
                    Print / Download
                  </button>

                  <button
                    onClick={() => this.setState({ showCertificate: false })}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-xl shadow-md text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
