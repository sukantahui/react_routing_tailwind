import React, { Component } from "react";

export default class App extends Component {
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
      showNameModal: true, // 🔹 Ask name before test
    };
  }

  // RANDOM PARAGRAPH GENERATOR
  generateRandomParagraph = () => {
    const sentences = [
      "Technology continues to reshape the world in remarkable ways influencing industries communication and daily life.",
      "Consistency is more powerful than motivation because it helps you grow even on days when you feel low.",
      "Learning is a lifelong process and those who embrace curiosity often discover opportunities before anyone else.",
      "Success requires discipline patience and the confidence to keep moving even when progress feels slow.",
      "Modern education demands adaptability creativity and the courage to explore innovative ideas.",
      "Typing efficiently improves productivity sharpens focus and supports faster execution of thoughts.",
      "Every great achievement begins as a small step taken consistently without giving up.",
      "The digital world expands rapidly and mastering key skills helps individuals stay future ready."
    ];

    let paragraph = "";
    const count = Math.floor(Math.random() * 4) + 6; // 6–10 sentences

    for (let i = 0; i < count; i++) {
      paragraph += sentences[Math.floor(Math.random() * sentences.length)] + " ";
    }

    return paragraph.trim();
  };

  // TIMER – start when running becomes true
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
          };
        }
        return { timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // 🔹 Name form submit
  handleNameSubmit = (e) => {
    e.preventDefault();
    const cleaned = (this.state.nameInput || "").trim() || "Student";
    this.setState({
      studentName: cleaned,
      showNameModal: false,
      nameInput: "",
      // fresh test whenever a student starts
      text: this.generateRandomParagraph(),
      input: "",
      timeLeft: 60,
      running: false,
      showCertificate: false,
    });
  };

  // RESET TEST – ask name again
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
      showNameModal: true, // 🔹 ask name every time before starting test
    });
  };

  render() {
    const {
      text,
      input,
      timeLeft,
      showCertificate,
      studentName,
      showNameModal,
      nameInput,
    } = this.state;

    // WPM & Accuracy
    const wordsTyped = input.trim().split(" ").filter(Boolean).length;
    const wpm =
      timeLeft !== 60 ? Math.round((wordsTyped / (60 - timeLeft)) * 60) : 0;

    const correctChars = [...input].filter(
      (char, i) => char === text[i]
    ).length;

    const accuracy =
      input.length === 0 ? 100 : Math.round((correctChars / input.length) * 100);

    const today = new Date().toLocaleDateString();

    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">

        {/* GLOBAL STYLES (print + animation) */}
        <style>
          {`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.97); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.4s ease-out;
          }

          @media print {
            body * {
              visibility: hidden !important;
            }

            #certificate, #certificate * {
              visibility: visible !important;
            }

            .no-print {
              display: none !important;
            }

            @page {
              size: A4 portrait;
              margin: 0;
            }

            #certificate {
              position: absolute;
              left: 0;
              top: 0;
              width: 210mm !important;
              height: 297mm !important;
              padding: 20mm !important;
              box-sizing: border-box;
            }
          }
          `}
        </style>

        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          Typing Speed Test
        </h1>

        {/* DISPLAY PARAGRAPH */}
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

        {/* INPUT (typing starts timer, but only after name is set) */}
        <textarea
          value={input}
          onChange={(e) =>
            this.setState({ input: e.target.value, running: true })
          }
          placeholder="Start typing here..."
          className="max-w-3xl w-full h-36 p-4 bg-gray-800 border border-gray-700 rounded-xl text-lg font-mono outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {/* STATS */}
        <div className="flex gap-10 mt-8 text-2xl">
          <p><b className="text-blue-400">{timeLeft}s</b></p>
          <p>⚡ WPM: <b className="text-green-400">{wpm}</b></p>
          <p>🎯 Accuracy: <b className="text-yellow-400">{accuracy}%</b></p>
        </div>

        {/* RESTART */}
        <button
          onClick={this.restartTest}
          className="mt-10 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg shadow-md"
        >
          New Paragraph & Restart
        </button>

        {/* 🔹 NAME MODAL – shown before test starts */}
        {showNameModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
                Enter Student Name
              </h2>
              <form onSubmit={this.handleNameSubmit} className="space-y-4">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) =>
                    this.setState({ nameInput: e.target.value })
                  }
                  placeholder="Student Name"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <p className="text-xs text-gray-400">
                  This name will appear on the certificate.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
                  >
                    Start Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CERTIFICATE POPUP */}
        {showCertificate && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
            <div
              id="certificate"
              className="bg-white text-black shadow-2xl rounded-xl animate-fade-in border-[10px] border-yellow-600"
              style={{
                width: "210mm",
                height: "297mm",
                padding: "20mm",
                boxSizing: "border-box",
              }}
            >
              {/* ORG HEADER */}
              <h1 className="text-center text-3xl font-extrabold text-yellow-700 tracking-wide">
                Coder & AccoTax
              </h1>
              <p className="text-center text-sm mt-1">
                25(10/A) Shibtala Road, PO – N.C. Pukur, Barrackpore
              </p>
              <p className="text-center text-sm">
                Website: www.codernaccotax.co.in | Phone: 7003756860
              </p>

              <hr className="border-t-2 border-yellow-600 my-6" />

              {/* TITLE */}
              <h2 className="text-center text-4xl font-bold text-yellow-700 mb-4">
                Certificate of Completion
              </h2>

              {/* STUDENT NAME */}
              <p className="text-center text-xl">
                This certificate is proudly awarded to
              </p>

              <p className="text-center text-3xl font-bold text-blue-900 mt-2">
                {studentName || "Student"}
              </p>

              {/* DESCRIPTION */}
              <p className="text-center text-xl mt-6">
                for successfully completing the
              </p>

              <p className="text-center text-3xl font-bold text-blue-800 mt-2">
                Typing Speed Assessment Test
              </p>

              {/* SCORES */}
              <div className="flex justify-around mt-16 text-2xl">
                <p>⚡ WPM: <b>{wpm}</b></p>
                <p>🎯 Accuracy: <b>{accuracy}%</b></p>
              </div>

              {/* DATE */}
              <p className="text-center text-lg mt-16 text-gray-700">
                Date of Issue: <b>{today}</b>
              </p>

              {/* SIGNATURE AREA */}
              <div className="flex justify-between mt-20 px-10">
                <div className="text-center">
                  <hr className="border-t-2 border-black w-40 mx-auto" />
                  <p className="mt-2 font-semibold">Authorized Signatory</p>
                </div>

                <div className="text-center">
                  <hr className="border-t-2 border-black w-40 mx-auto" />
                  <p className="mt-2 font-semibold">Instructor</p>
                </div>
              </div>

              {/* ACTION BUTTONS (not printed) */}
              <div className="flex justify-center gap-8 mt-16 no-print">
                <button
                  onClick={() => window.print()}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md text-lg"
                >
                  Print / Download
                </button>

                <button
                  onClick={() => this.setState({ showCertificate: false })}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl shadow-md text-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}
