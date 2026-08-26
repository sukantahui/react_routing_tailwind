import React, { useRef, useEffect, useState } from "react";
import QRCode from "qrcode";

const CertificateCanvas = ({
  name,
  course,
  date,
  duration,
  instructor,
  director,
  certNumber,
  bgImage,
  logoImage,
  instructorSignImage,
  directorSignImage,
}) => {
  const canvasRef = useRef(null);
  const [qrImage, setQrImage] = useState(null);

  const CANVAS_WIDTH = 2400;
  const CANVAS_HEIGHT = 3600;

  // Generate QR code when certNumber changes
  useEffect(() => {
    if (!certNumber) {
      setQrImage(null);
      return;
    }

    const url = `https://codernaccotax.co.in/certificates/${certNumber}`;

    QRCode.toDataURL(url, { width: 400 }, (err, data) => {
      if (err) {
        console.error("QR Code generation failed", err);
        return;
      }
      const img = new Image();
      img.onload = () => {
        setQrImage(img);
      };
      img.src = data;
    });
  }, [certNumber]);

  // Redraw the certificate whenever any relevant prop or qrImage changes
  useEffect(() => {
    // Only draw if all images are available (bgImage is essential, others optional)
    if (!bgImage) return;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      drawCertificate(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    // Use requestAnimationFrame to ensure smooth rendering
    requestAnimationFrame(draw);
  }, [
    name,
    course,
    date,
    duration,
    instructor,
    director,
    certNumber,
    bgImage,
    logoImage,
    instructorSignImage,
    directorSignImage,
    qrImage,
  ]);

  //for badge
  const drawGoldSeal = (ctx, x, y, radius) => {
    const gradient = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);

    gradient.addColorStop(0, "#fff6cc");
    gradient.addColorStop(0.3, "#f5d97b");
    gradient.addColorStop(0.6, "#d4a73a");
    gradient.addColorStop(1, "#9c6d0c");

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.lineWidth = 12;
    ctx.strokeStyle = "#c9a959";
    ctx.stroke();

    // Inner circle
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.75, 0, Math.PI * 2);
    ctx.strokeStyle = "#fff2b0";
    ctx.lineWidth = 6;
    ctx.stroke();

    // Text
    ctx.fillStyle = "#5a3c00";
    ctx.textAlign = "center";
    ctx.font = `bold ${radius * 0.45}px Georgia`;
    ctx.fillText("ISO", x, y - radius * 0.1);

    ctx.font = `bold ${radius * 0.35}px Georgia`;
    ctx.fillText("9001", x, y + radius * 0.35);
  };

  // Helper functions (unchanged from original)
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

    // Background
    ctx.drawImage(bgImage, 0, 0, width, height);

    // Borders
    ctx.strokeStyle = "#c9a959";
    ctx.lineWidth = 20;
    ctx.strokeRect(120, 120, width - 240, height - 240);

    ctx.lineWidth = 6;
    ctx.strokeRect(200, 200, width - 400, height - 400);

    // badge
    drawGoldSeal(ctx, width - 350, 350, 120);

    // Logo and watermark
    if (logoImage) {
      ctx.globalAlpha = 0.5;
      const logoWidth = width * 0.12;
      const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
      ctx.drawImage(logoImage, 220, 220, logoWidth, logoHeight);

      ctx.globalAlpha = 0.08;
      const watermarkWidth = width * 0.45;
      const watermarkHeight = (logoImage.height / logoImage.width) * watermarkWidth;
      const wmX = (width - watermarkWidth) / 2;
      const wmY = (height - watermarkHeight) / 2;
      ctx.drawImage(logoImage, wmX, wmY, watermarkWidth, watermarkHeight);

      ctx.globalAlpha = 1;
    }

    ctx.textAlign = "center";

    // Header
    ctx.fillStyle = "#f0e6d2";
    ctx.font = `bold ${height * 0.035}px Georgia`;
    ctx.fillText("Coder & AccoTax", width / 2, height * 0.1);

    ctx.fillStyle = "#c9a959";
    ctx.font = `${height * 0.018}px Arial`;
    ctx.fillText("Empowering Tech Professionals", width / 2, height * 0.13);

    ctx.fillStyle = "#c9a959";
    ctx.font = `bold ${height * 0.018}px Arial`;
    ctx.fillText("ISO 9001:2025 Certified", width / 2, height * 0.16);

    // Title
    const title = "Certificate of Completion";
    ctx.fillStyle = "#f5e6b3";
    const titleFont = autoFontSize(ctx, title, width * 0.75, height * 0.06);
    ctx.font = `bold ${titleFont}px Times New Roman`;
    ctx.fillText(title, width / 2, height * 0.26);

    // Presented to
    ctx.fillStyle = "#ddd";
    ctx.font = `${height * 0.022}px Arial`;
    ctx.fillText("This certificate is proudly presented to", width / 2, height * 0.38);

    // Name
    const maxWidth = width * 0.65;
    const nameSize = autoFontSize(ctx, name, maxWidth, height * 0.055);
    ctx.font = `bold ${nameSize}px Times New Roman`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, width / 2, height * 0.46);

    // Completing text
    ctx.fillStyle = "#ddd";
    ctx.font = `${height * 0.022}px Arial`;
    ctx.fillText("for successfully completing", width / 2, height * 0.54);

    // Course (multi-line)
    ctx.fillStyle = "#f0e6d2";
    ctx.font = `bold ${height * 0.038}px Georgia`;
    const courseLines = wrapText(ctx, course, width * 0.8);
    courseLines.forEach((line, i) => {
      ctx.fillText(line, width / 2, height * 0.6 + i * height * 0.05);
    });

    // Date and duration
    ctx.fillStyle = "#c9a959";
    ctx.font = `${height * 0.02}px Arial`;
    ctx.fillText(`${date} | ${duration}`, width / 2, height * 0.7);

    // Signature lines
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

    // Signatures
    if (instructorSignImage) {
      const signWidth = width * 0.15;
      const signHeight = (instructorSignImage.height / instructorSignImage.width) * signWidth;
      ctx.drawImage(
        instructorSignImage,
        width * 0.23,
        sigY - signHeight - 70,
        signWidth,
        signHeight
      );
    }

    if (directorSignImage) {
      const dSignWidth = width * 0.15;
      const dSignHeight = (directorSignImage.height / directorSignImage.width) * dSignWidth;

      ctx.drawImage(
        directorSignImage,
        width * 0.63,
        sigY - dSignHeight - 70,
        dSignWidth,
        dSignHeight
      );
    }

    // Instructor and director labels
    ctx.fillStyle = "#ddd";
    ctx.font = `${height * 0.018}px Arial`;
    ctx.fillText("Instructor", width * 0.3, sigY + 60);
    ctx.fillText("Director", width * 0.7, sigY + 60);

    ctx.fillStyle = "#aaa";
    ctx.font = `${height * 0.018}px Arial`;
    ctx.fillText(instructor, width * 0.3, sigY - 40);
    ctx.fillText(director, width * 0.7, sigY - 40);

    // Certificate number
    if (certNumber) {
      ctx.textAlign = "right";
      ctx.fillStyle = "#888";
      ctx.font = `${height * 0.018}px Arial`;
      ctx.fillText(certNumber, width - 210, height - 210);
    }

    // QR Code
    if (qrImage) {
      const size = width * 0.12;
      const x = (width - size) / 2;
      const y = sigY + 120;
      ctx.drawImage(qrImage, x, y, size, size);

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

  // Function to download the canvas as PNG (exposed via ref if needed)
  const download = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = `${name.replace(/\s/g, "_")}_certificate.jpg`;

  // JPG with maximum quality
  link.href = canvas.toDataURL("image/jpeg", 1.0);

  link.click();
};

  // We'll attach the download function to the window or parent via ref, but for simplicity,
  // we can move the download button inside this component. However, the parent already has a button.
  // Let's expose download via a ref so parent can call it.

  // UseImperativeHandle would be ideal, but to keep it simple we'll just render the button here
  // and remove it from parent. Alternatively, we can keep both but that's redundant.

  // For now, we'll keep download inside this component and remove from parent.
  // But the parent's button is already there. To avoid confusion, we'll move the button here
  // and remove from parent. Let's adjust parent to not have download button.

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="w-full max-w-sm border shadow-lg"
      />
      <button
        onClick={download}
        className="bg-green-600 text-white w-full py-2 rounded-lg mt-4"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateCanvas;