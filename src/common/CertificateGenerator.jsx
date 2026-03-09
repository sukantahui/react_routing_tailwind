import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode'; // make sure to install: npm install qrcode

const CertificateGenerator = () => {
    const [name, setName] = useState('John Doe');
    const [course, setCourse] = useState('React Development');
    const [date, setDate] = useState('March 15, 2026');
    const [duration, setDuration] = useState('4 weeks');
    const [instructor, setInstructor] = useState('Jane Smith');
    const [certNumber, setCertNumber] = useState('CERT-001');
    const [bgLoaded, setBgLoaded] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [qrLoaded, setQrLoaded] = useState(false); // track QR generation
    const [error, setError] = useState('');
    const canvasRef = useRef(null);
    const bgImageRef = useRef(null);
    const logoImageRef = useRef(null);
    const qrImageRef = useRef(null); // store generated QR code as Image

    const BACKGROUND_PATH = '/assets/certificate-bg.png';
    const LOGO_PATH = '/assets/cnat.png';

    // Preload background and logo
    useEffect(() => {
        let bgReady = false;
        let logoReady = false;

        const checkAllLoaded = () => {
            if (bgReady && logoReady) drawCertificate();
        };

        const bgImg = new Image();
        bgImg.crossOrigin = 'anonymous';
        bgImg.onload = () => {
            bgImageRef.current = bgImg;
            setBgLoaded(true);
            bgReady = true;
            checkAllLoaded();
        };
        bgImg.onerror = () => setError('Background image failed to load.');
        bgImg.src = BACKGROUND_PATH;

        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = () => {
            logoImageRef.current = logoImg;
            setLogoLoaded(true);
            logoReady = true;
            checkAllLoaded();
        };
        logoImg.onerror = () => setError('Logo image failed to load.');
        logoImg.src = LOGO_PATH;
    }, []);

    // Generate QR code whenever certificate number changes
    useEffect(() => {
        if (!certNumber || certNumber.trim() === '') {
            qrImageRef.current = null;
            setQrLoaded(false);
            if (bgLoaded && logoLoaded) drawCertificate();
            return;
        }

        const url = `https://codernaccotax.co.in/certificates/${encodeURIComponent(certNumber.trim())}`;
        QRCode.toDataURL(url, { width: 200, margin: 1 }, (err, dataUrl) => {
            if (err) {
                console.error('QR generation failed:', err);
                setError('QR code could not be generated.');
                return;
            }
            const img = new Image();
            img.onload = () => {
                qrImageRef.current = img;
                setQrLoaded(true);
                if (bgLoaded && logoLoaded) drawCertificate();
            };
            img.src = dataUrl;
        });
    }, [certNumber, bgLoaded, logoLoaded]);

    // Redraw on input changes (excluding qrLoaded to avoid loops)
    useEffect(() => {
        if (bgLoaded && logoLoaded) drawCertificate();
    }, [name, course, date, duration, instructor, certNumber, bgLoaded, logoLoaded]);

    // Helper: wrap text
    const wrapText = (ctx, text, maxWidth) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    // Draw certificate at given dimensions
    const drawCertificateOnCanvas = (ctx, width, height) => {
        const bg = bgImageRef.current;
        const logo = logoImageRef.current;
        const qr = qrImageRef.current;
        if (!bg) return;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(bg, 0, 0, width, height);

        // Subtle inner border
        ctx.strokeStyle = '#c9a959';
        ctx.lineWidth = height * 0.006;
        ctx.strokeRect(width * 0.03, height * 0.03, width * 0.94, height * 0.94);

        // Logo top left
        if (logo) {
            const logoWidth = width * 0.1;
            const logoHeight = (logo.height / logo.width) * logoWidth;
            ctx.drawImage(logo, width * 0.05, height * 0.05, logoWidth, logoHeight);
        }

        // Organization name and tagline (top center)
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.font = `bold ${height * 0.03}px "Georgia", serif`;
        ctx.fillStyle = '#f0e6d2';
        ctx.fillText('Coder & AccoTax', width / 2, height * 0.08);

        ctx.font = `${height * 0.018}px "Arial", sans-serif`;
        ctx.fillStyle = '#c9a959';
        ctx.fillText('Empowering Tech Professionals', width / 2, height * 0.12);

        // Main title
        ctx.font = `bold ${height * 0.055}px "Times New Roman", serif`;
        ctx.fillStyle = '#f5e6b3';
        ctx.fillText('Certificate of Completion', width / 2, height * 0.26);

        // Presentation line
        ctx.font = `${height * 0.022}px "Arial", sans-serif`;
        ctx.fillStyle = '#dcdcdc';
        ctx.fillText('This is awarded to', width / 2, height * 0.38);

        // Student name (with possible wrapping)
        ctx.font = `bold ${height * 0.05}px "Times New Roman", serif`;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        const maxNameWidth = width * 0.6;
        const nameLines = wrapText(ctx, name, maxNameWidth);
        nameLines.forEach((line, i) => {
            ctx.fillText(line, width / 2, height * 0.45 + i * height * 0.07);
        });

        // Course completion line
        ctx.font = `${height * 0.022}px "Arial", sans-serif`;
        ctx.fillStyle = '#dcdcdc';
        ctx.shadowBlur = 6;
        const courseY = height * 0.52 + (nameLines.length - 1) * height * 0.07;
        ctx.fillText('for successfully completing the course', width / 2, courseY);

        // Course name
        ctx.font = `bold ${height * 0.035}px "Georgia", serif`;
        ctx.fillStyle = '#f0e6d2';
        const maxCourseWidth = width * 0.5;
        const courseLines = wrapText(ctx, course, maxCourseWidth);
        courseLines.forEach((line, i) => {
            ctx.fillText(line, width / 2, courseY + height * 0.06 + i * height * 0.045);
        });

        // Date and duration
        const infoY = courseY + height * 0.12 + (courseLines.length - 1) * height * 0.045;
        ctx.font = `${height * 0.02}px "Arial", sans-serif`;
        ctx.fillStyle = '#c9a959';
        ctx.fillText(`${date}  |  ${duration}`, width / 2, infoY);

        // Signature lines
        ctx.shadowBlur = 4;
        ctx.strokeStyle = '#c9a959';
        ctx.lineWidth = 2;
        const signatureY = height * 0.75;
        ctx.beginPath();
        ctx.moveTo(width * 0.2, signatureY);
        ctx.lineTo(width * 0.4, signatureY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(width * 0.6, signatureY);
        ctx.lineTo(width * 0.8, signatureY);
        ctx.stroke();

        ctx.font = `${height * 0.018}px "Arial", sans-serif`;
        ctx.fillStyle = '#dcdcdc';
        ctx.fillText('Instructor', width * 0.3, signatureY + height * 0.02);
        ctx.fillText('Director', width * 0.7, signatureY + height * 0.02);

        if (instructor) {
            ctx.font = `${height * 0.02}px "Arial", sans-serif`;
            ctx.fillStyle = '#f0e6d2';
            ctx.fillText(instructor, width * 0.3, signatureY - height * 0.02);
        }

        // Certificate Number (bottom right)
        if (certNumber && certNumber.trim() !== '') {
            ctx.shadowBlur = 2;
            ctx.font = `${height * 0.015}px "Arial", sans-serif`;
            ctx.fillStyle = '#888';
            ctx.textAlign = 'right';
            ctx.fillText(certNumber, width - width * 0.05, height * 0.96);
        }

        // QR Code – centered between signature lines, below them
        if (qr) {
            const qrSize = width * 0.15; // 15% of canvas width (a bit bigger)
            const qrX = (width - qrSize) / 2; // centered horizontally
            const qrY = signatureY + height * 0.05; // just below signature lines (5% of height down)

            // Draw QR
            ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

            // Add label below QR
            ctx.font = `${height * 0.016}px "Arial", sans-serif`;
            ctx.fillStyle = '#aaaaaa';
            ctx.textAlign = 'center';
            ctx.fillText('Verify the certificate', width / 2, qrY + qrSize + height * 0.02);
        }
    };

    const drawCertificate = () => {
        const canvas = canvasRef.current;
        if (!canvas || !bgImageRef.current || !logoImageRef.current) return;
        drawCertificateOnCanvas(canvas.getContext('2d'), 600, 800);
    };

    const sanitizeFilename = (str) => str.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'certificate';

    const handleDownloadHighRes = () => {
        if (!bgImageRef.current || !logoImageRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = 2400;
        canvas.height = 3600;
        drawCertificateOnCanvas(canvas.getContext('2d'), 2400, 3600);
        const link = document.createElement('a');
        link.download = `${sanitizeFilename(name)}_certificate_8x12.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Professional Certificate Generator
                </h1>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                            <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Completion Date</label>
                            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="March 15, 2026" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="4 weeks" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Name (optional)</label>
                            <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="Jane Smith" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                            <input type="text" value={certNumber} onChange={(e) => setCertNumber(e.target.value)} placeholder="e.g., CERT-001" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button onClick={handleDownloadHighRes} disabled={!bgLoaded || !logoLoaded} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg">
                            Download 8×12 inch Certificate (300 DPI)
                        </button>
                    </div>

                    <div className="flex justify-center items-start">
                        <canvas ref={canvasRef} width={600} height={800} className="w-full max-w-sm border rounded-lg shadow-lg" />
                    </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                    Place background in <code>public/assets/certificate-bg.png</code> and logo in <code>public/assets/cnat.png</code>
                </p>
            </div>
        </div>
    );
};

export default CertificateGenerator;