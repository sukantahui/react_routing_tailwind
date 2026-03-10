import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

const CertificateGenerator = () => {
    const [name, setName] = useState("John Doe");
    const [course, setCourse] = useState("React Development");
    const [date, setDate] = useState("March 15, 2026");
    const [duration, setDuration] = useState("4 Weeks");
    const [instructor, setInstructor] = useState("Jane Smith");
    const [director, setDirector] = useState("Sukanta Hui");
    const [certNumber, setCertNumber] = useState("CNAT-2026-001");

    const canvasRef = useRef(null);

    const bgRef = useRef(null);
    const logoRef = useRef(null);
    const instructorSignRef = useRef(null);
    const directorSignRef = useRef(null);
    const qrRef = useRef(null);

    const BG = "/assets/certificate-bg.png";
    const LOGO = "/assets/cnat.png";
    const SIGN1 = "/assets/instructor-sign.png";
    const SIGN2 = "/assets/director-sign.png";

    const [loaded, setLoaded] = useState(false);

    const CANVAS_WIDTH = 2400;
    const CANVAS_HEIGHT = 3600;

    const courseOptions = [
        "React Development",
        "JavaScript Basics",
        "Python Programming",
        "Data Science Fundamentals",
        "Web Development Bootcamp",
        "Mobile App Development",
    ];

    useEffect(() => {
        let count = 0;

        const check = () => {
            count++;
            if (count === 4) {
                setLoaded(true);
                draw();
            }
        };

        const bg = new Image();
        bg.onload = () => {
            bgRef.current = bg;
            check();
        };
        bg.src = BG;

        const logo = new Image();
        logo.onload = () => {
            logoRef.current = logo;
            check();
        };
        logo.src = LOGO;

        const s1 = new Image();
        s1.onload = () => {
            instructorSignRef.current = s1;
            check();
        };
        s1.src = SIGN1;

        const s2 = new Image();
        s2.onload = () => {
            directorSignRef.current = s2;
            check();
        };
        s2.src = SIGN2;
    }, []);

    useEffect(() => {
        if (!certNumber) return;

        const url = `https://codernaccotax.co.in/certificates/${certNumber}`;

        QRCode.toDataURL(url, { width: 400 }, (err, data) => {
            const img = new Image();
            img.onload = () => {
                qrRef.current = img;
                draw();
            };
            img.src = data;
        });
    }, [certNumber]);

    // Redraw when any relevant state changes – including certNumber
    useEffect(() => {
        if (!loaded) return;

        const timeout = setTimeout(() => {
            draw();
        }, 50);

        return () => clearTimeout(timeout);

    }, [loaded, name, course, date, duration, instructor, director, certNumber]);

    const wrapText = (ctx, text, maxWidth) => {
        const words = text.split(" ");
        let lines = [];
        let line = words[0];

        for (let i = 1; i < words.length; i++) {
            let test = line + " " + words[i];
            let width = ctx.measureText(test).width;

            if (width < maxWidth) {
                line = test;
            } else {
                lines.push(line);
                line = words[i];
            }
        }

        lines.push(line);
        return lines;
    };

    const autoFontSize = (ctx, text, maxWidth, startSize) => {
        let size = startSize;
        ctx.font = `bold ${size}px Times New Roman`;
        while (ctx.measureText(text).width > maxWidth && size > 20) {
            size--;
            ctx.font = `bold ${size}px Times New Roman`;
        }
        return size;
    };

    const drawCertificate = (ctx, width, height) => {
        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(bgRef.current, 0, 0, width, height);

        ctx.strokeStyle = "#c9a959";
        ctx.lineWidth = 20;
        ctx.strokeRect(120, 120, width - 240, height - 240);

        ctx.lineWidth = 6;
        ctx.strokeRect(200, 200, width - 400, height - 400);

        const logo = logoRef.current;

        if (logo) {
            ctx.globalAlpha = 0.5;
            const logoWidth = width * 0.12;
            const logoHeight = (logo.height / logo.width) * logoWidth;
            ctx.drawImage(logo, 220, 220, logoWidth, logoHeight);

            ctx.globalAlpha = 0.08;
            const watermarkWidth = width * 0.45;
            const watermarkHeight = (logo.height / logo.width) * watermarkWidth;
            const wmX = (width - watermarkWidth) / 2;
            const wmY = (height - watermarkHeight) / 2;
            ctx.drawImage(logo, wmX, wmY, watermarkWidth, watermarkHeight);

            ctx.globalAlpha = 1;
        }

        ctx.textAlign = "center";

        ctx.fillStyle = "#f0e6d2";
        ctx.font = `bold ${height * 0.035}px Georgia`;
        ctx.fillText("Coder & AccoTax", width / 2, height * 0.1);

        ctx.fillStyle = "#c9a959";
        ctx.font = `${height * 0.018}px Arial`;
        ctx.fillText("Empowering Tech Professionals", width / 2, height * 0.13);

        const title = "Certificate of Completion";
        ctx.fillStyle = "#f5e6b3";
        const titleFont = autoFontSize(ctx, title, width * 0.75, height * 0.06);
        ctx.font = `bold ${titleFont}px Times New Roman`;
        ctx.fillText(title, width / 2, height * 0.26);

        ctx.fillStyle = "#ddd";
        ctx.font = `${height * 0.022}px Arial`;
        ctx.fillText("This certificate is proudly presented to", width / 2, height * 0.38);

        const maxWidth = width * 0.65;
        const nameSize = autoFontSize(ctx, name, maxWidth, height * 0.055);
        ctx.font = `bold ${nameSize}px Times New Roman`;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(name, width / 2, height * 0.46);

        ctx.fillStyle = "#ddd";
        ctx.font = `${height * 0.022}px Arial`;
        ctx.fillText("for successfully completing", width / 2, height * 0.54);

        ctx.fillStyle = "#f0e6d2";
        ctx.font = `bold ${height * 0.038}px Georgia`;
        const courseLines = wrapText(ctx, course, width * 0.6);
        courseLines.forEach((line, i) => {
            ctx.fillText(line, width / 2, height * 0.6 + i * height * 0.05);
        });

        ctx.fillStyle = "#c9a959";
        ctx.font = `${height * 0.02}px Arial`;
        ctx.fillText(`${date} | ${duration}`, width / 2, height * 0.7);

        const sigY = height * 0.78;

        ctx.strokeStyle = "#c9a959";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(width * 0.2, sigY);
        ctx.lineTo(width * 0.4, sigY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(width * 0.6, sigY);
        ctx.lineTo(width * 0.8, sigY);
        ctx.stroke();

        if (instructorSignRef.current) {
            ctx.drawImage(
                instructorSignRef.current,
                width * 0.23,
                sigY - height * 0.06,
                width * 0.15,
                height * 0.05
            );
        }

        if (directorSignRef.current) {
            ctx.drawImage(
                directorSignRef.current,
                width * 0.63,
                sigY - height * 0.06,
                width * 0.15,
                height * 0.05
            );
        }

        ctx.fillStyle = "#ddd";
        ctx.font = `${height * 0.018}px Arial`;
        ctx.fillText("Instructor", width * 0.3, sigY + 60);
        ctx.fillText("Director", width * 0.7, sigY + 60);

        ctx.fillStyle = "#aaa";
        ctx.font = `${height * 0.018}px Arial`;
        ctx.fillText(instructor, width * 0.3, sigY - 40);
        ctx.fillText(director, width * 0.7, sigY - 40);

        if (certNumber) {
            ctx.textAlign = "right";
            ctx.fillStyle = "#888";
            ctx.font = `${height * 0.018}px Arial`;
            ctx.fillText(certNumber, width - 210, height - 210);
        }

        if (qrRef.current) {
            const size = width * 0.12;
            const x = (width - size) / 2;
            const y = sigY + 120;
            ctx.drawImage(qrRef.current, x, y, size, size);

            ctx.textAlign = "center";
            ctx.fillStyle = "#aaa";
            ctx.font = `${height * 0.016}px Arial`;
            ctx.fillText(
                `Verify: https://codernaccotax.co.in/certificates/${certNumber}`,
                width / 2,
                y + size + 60
            );
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        drawCertificate(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    const download = () => {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.download = `${name.replace(/\s/g, "_")}_certificate.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-5xl">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Coder & AccoTax Certificate Generator
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <input
                            className="border p-2 w-full mb-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Student Name"
                        />

                        <select
                            className="border p-2 w-full mb-3"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                        >
                            {courseOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <input
                            className="border p-2 w-full mb-3"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Completion Date"
                        />

                        <input
                            className="border p-2 w-full mb-3"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Duration"
                        />

                        <input
                            className="border p-2 w-full mb-3"
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                            placeholder="Instructor"
                        />

                        <input
                            className="border p-2 w-full mb-3"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                            placeholder="Director"
                        />

                        <input
                            className="border p-2 w-full mb-3"
                            value={certNumber}
                            onChange={(e) => setCertNumber(e.target.value)}
                            placeholder="Certificate Number"
                        />

                        <button
                            onClick={download}
                            className="bg-green-600 text-white w-full py-2 rounded-lg"
                        >
                            Download Certificate
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <canvas
                            ref={canvasRef}
                            width={2400}
                            height={3600}
                            className="w-full max-w-sm border shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateGenerator;