import React, { Component } from "react";

/* =========================================================
   Inline Scoped Animations (Zero Config)
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(24px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes packetFlow {
  0% { transform: translateY(0); opacity:0; }
  10% { opacity:1; }
  100% { transform: translateY(420px); opacity:0; }
}
`;

export default class Topic3 extends Component {
    state = { activeLayer: 7 };

    render() {
        const reveal = "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]";

        const layers = [
            { no: 7, name: "Application", detail: "User-facing services. This is where network applications like browsers, mail clients and FTP tools operate.", example: "HTTP, FTP, SMTP, DNS" },
            { no: 6, name: "Presentation", detail: "Converts data formats, encryption & compression. Ensures sender & receiver interpret data identically.", example: "SSL/TLS, JPEG/MP3 encoding" },
            { no: 5, name: "Session", detail: "Establishes, maintains and terminates sessions between systems.", example: "Video calls, login sessions" },
            { no: 4, name: "Transport", detail: "Controls flow, segmentation, reliability and error recovery.", example: "TCP (reliable), UDP (fast)" },
            { no: 3, name: "Network", detail: "Handles routing and logical addressing.", example: "IP, Routers" },
            { no: 2, name: "Data Link", detail: "Frames data, detects & corrects errors.", example: "MAC address, Switches" },
            { no: 1, name: "Physical", detail: "Transmits raw bits as electrical / optical signals.", example: "Ethernet cable, Fiber optics" },
        ];

        const active = layers.find(l => l.no === this.state.activeLayer);

        return (
            <div className="p-6 space-y-10 text-slate-200">
                <style>{animationStyles}</style>

                <header className={`space-y-3 ${reveal}`}>
                    <h2 className="text-2xl font-bold text-indigo-300">
                        OSI Model – Animated Data Flow
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Click any layer to see detailed explanation and watch how a data packet
                        travels through the OSI stack.
                    </p>
                </header>

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* ================= SVG STACK ================= */}
                    <div className="relative">
                        <svg viewBox="0 0 260 500" className="w-[260px] border border-slate-700 rounded-xl bg-slate-950">
                            {layers.map((l, i) => (
                                <g key={l.no}>
                                    <rect
                                        x="30"
                                        y={20 + i * 65}
                                        width="200"
                                        height="55"
                                        rx="10"
                                        fill={this.state.activeLayer === l.no ? "#38bdf8" : "#1e293b"}
                                        className="cursor-pointer"
                                        onClick={() => this.setState({ activeLayer: l.no })}
                                    />
                                    <text
                                        x="130"
                                        y={52 + i * 65}
                                        textAnchor="middle"
                                        fill={this.state.activeLayer === l.no ? "#020617" : "#cbd5f5"}
                                        fontSize="12"
                                        fontWeight="bold"
                                    >
                                        L{l.no} - {l.name}
                                    </text>
                                </g>
                            ))}

                            {/* Animated Packet */}
                            <circle
                                cx="15"
                                cy="45"
                                r="6"
                                fill="#22c55e"
                                style={{ animation: "packetFlow 4s linear infinite" }}
                            />
                        </svg>
                    </div>

                    {/* ================= DETAILS ================= */}
                    <div className={`flex-1 space-y-5 ${reveal}`}>
                        <div className="p-5 rounded-xl border border-sky-500/40 bg-slate-900">
                            <h3 className="text-xl font-semibold text-sky-300">
                                Layer {active.no}: {active.name}
                            </h3>
                            <p className="mt-2 text-slate-300 leading-relaxed">
                                {active.detail}
                            </p>
                            <p className="mt-3 text-sm text-emerald-400">
                                Real-world examples: {active.example}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                                <h4 className="font-semibold text-indigo-300 mb-1">Sender Side</h4>
                                <p className="text-slate-400">Data encapsulation starts from Layer 7 down to Layer 1.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                                <h4 className="font-semibold text-indigo-300 mb-1">Receiver Side</h4>
                                <p className="text-slate-400">Decapsulation occurs from Layer 1 up to Layer 7.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= THEORY ================= */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-indigo-300">
                        Encapsulation & Decapsulation
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        When you send a WhatsApp message, it does not travel as plain text.
                        It is encrypted, framed, routed and finally transmitted as electrical
                        signals — each OSI layer adds its own header. On receiving side,
                        headers are removed in reverse order.
                    </p>
                </section>

                {/* ================= REAL LIFE EXAMPLE ================= */}
                <section className="p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-300">
                        Example: Opening <span className="text-sky-300">www.google.com</span>
                    </h3>

                    <ol className="space-y-2 text-sm text-slate-200 list-decimal ml-5">
                        <li>
                            <span className="text-sky-300 font-semibold">Application Layer (7):</span>
                            &nbsp;You type the URL in the browser and press Enter.
                        </li>

                        <li>
                            <span className="text-sky-300 font-semibold">Presentation Layer (6):</span>
                            &nbsp;Data is converted into standard format and encrypted using HTTPS.
                        </li>

                        <li>
                            <span className="text-sky-300 font-semibold">Session Layer (5):</span>
                            &nbsp;A session is created between your computer and Google server.
                        </li>

                        <li>
                            <span className="text-sky-300 font-semibold">Transport Layer (4):</span>
                            &nbsp;TCP breaks the data into segments and assigns port numbers.
                        </li>

                        <li>
                            <span className="text-sky-300 font-semibold">Network Layer (3):</span>
                            &nbsp;IP address of Google server is found and best route is selected.
                        </li>

                        <li>
                            <span className="text-sky-300 font-semibold">Data Link Layer (2):</span>
                            &nbsp;MAC addresses are added and data is converted into frames.
                        </li>

                        <li>
                            <span className="text-sky-300 font-semibold">Physical Layer (1):</span>
                            &nbsp;Finally, data is sent as electrical / optical signals through cable or Wi-Fi.
                        </li>
                    </ol>

                    <p className="text-[11px] text-slate-400">
                        On the receiving computer, the process happens in <strong>reverse order</strong>
                        (from Layer 1 to Layer 7) – this is called <span className="text-emerald-300 font-semibold">Decapsulation</span>.
                    </p>
                </section>

            </div>
        );
    }
}
