import React from "react";
import QRCode from "react-qr-code";
import cnatLogo from "../../../assets/cnat.png";

// --------------------------------------------------
// AUTO CERTIFICATE NUMBER
// --------------------------------------------------
function getNextCertificateNumber() {
  const key = "certificate_counter";
  let current = parseInt(localStorage.getItem(key), 10);
  if (isNaN(current) || current < 1) current = 1;

  const year = new Date().getFullYear();
  const padded = String(current).padStart(5, "0");

  const cert = `CAT-${year}-${padded}`;
  localStorage.setItem(key, current + 1);
  return cert;
}

// ==================================================
//        ✨ UPGRADED CERTIFICATE GENERATOR
// ==================================================
export default function CertificateGenerator({
  studentName = "Student Name",
  score = 0,
  total = 0,
  title = "Test Title",
  certificateHeader = "Coder & AccoTax",
  certificateSubtitle = "Barrackpore · www.codernaccotax.co.in",
  certificateTitle = "Certificate of Achievement",
  passPercent = 60,
  profilePhoto = null,
}) {
  const generate = () => {
    const percent = total > 0 ? ((score / total) * 100).toFixed(2) : "0.00";
    const percentNum = parseFloat(percent);

    let grade = "D";
    if (percentNum >= 85) grade = "A+";
    else if (percentNum >= 70) grade = "A";
    else if (percentNum >= 60) grade = "B";
    else if (percentNum >= 50) grade = "C";

    const passed = percentNum >= passPercent;
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const certNo = getNextCertificateNumber();
    const qrValue = `https://www.codernaccotax.co.in/certificate/verify/${certNo}`;

    // --------------------------------------------------
    //  Build Printable Certificate
    // --------------------------------------------------
    const html = `
<!DOCTYPE html>
<html>
<head>
<title>${certificateTitle}</title>
<meta charset="UTF-8" />
<style>
  @page { size: A4; margin: 0; }
  body { 
    margin: 0; padding: 0;
    font-family: 'Georgia', serif;
    background: #f9fafb;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm; height: 297mm;
    background: #ffffff;
    padding: 18mm;
    box-sizing: border-box;
    position: relative;
  }

  /* GOLD BORDER */
  .page::before {
    content: "";
    position: absolute;
    inset: 10mm;
    border: 6px solid #d4af37;
    border-radius: 8px;
  }

  .watermark {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px;
    color: rgba(180, 180, 180, 0.15);
    font-weight: bold;
    pointer-events: none;
    user-select: none;
  }

  .certificate {
    position: relative;
    z-index: 10;
    text-align: center;
    padding-top: 10mm;
  }

  .cert-number { 
    text-align: right; 
    font-size: 14px;
    margin-right: 5mm;
    margin-bottom: 10px;
    color: #1f2937;
  }

  .header-title { 
    font-size: 26px; 
    font-weight: bold; 
    color: #1e3a8a; 
  }

  .subtitle { 
    font-size: 14px; 
    color: #374151; 
    margin-bottom: 16px; 
  }

  .main-title { 
    font-size: 40px; 
    font-weight: 700; 
    margin-bottom: 12px;
    color: #111827;
  }

  .student-name {
    font-size: 28px;
    font-weight: bold;
    border-bottom: 2px solid #38bdf8;
    padding: 6px 20px;
    display: inline-block;
    margin-bottom: 10px;
  }

  .photo-box {
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .photo-box img {
    width: 90px;
    height: 90px;
    border-radius: 8px;
    border: 2px solid #1e3a8a;
    object-fit: cover;
  }

  .score { 
    margin-top: 12px; 
    font-size: 18px; 
    font-weight: bold; 
  }

  .result-box { margin-top: 10px; font-size: 18px; }

  .result-pass { color: green; font-weight: bold; }
  .result-fail { color: red; font-weight: bold; }

  .signature-block {
    margin-top: 35px;
    display: flex;
    justify-content: space-between;
    padding: 0 20mm;
  }

  .sign-box {
    text-align: center;
    font-size: 14px;
  }

  .sign-line {
    width: 160px;
    height: 1px;
    background: #000;
    margin: auto;
    margin-bottom: 4px;
  }

  .qr-section {
    margin-top: 25px;
  }

  .qr-label {
    font-size: 12px;
    color: #374151;
    margin-top: 4px;
  }

</style>
</head>

<body>

<div class="page">
  <div class="watermark">CODER & ACCOTAX</div>

  <div class="cert-number"><b>Certificate No:</b> ${certNo}</div>

  <div class="certificate">

    <div class="header-title">${certificateHeader}</div>
    <div class="subtitle">${certificateSubtitle}</div>

    <div class="main-title">${certificateTitle}</div>

    <p>This certifies that</p>

    <div class="student-name">${studentName}</div>

    ${
      profilePhoto
        ? `<div class="photo-box"><img src="${profilePhoto}" alt="photo" /></div>`
        : ""
    }

    <p style="margin-top: 14px;">has successfully completed</p>
    <h2 style="margin-top: 6px;">${title}</h2>

    <div class="score">Score: ${score}/${total} (${percent}%)</div>

    <div class="result-box">
      Result:
      <span class="${passed ? "result-pass" : "result-fail"}">
        ${passed ? "PASSED" : "NOT PASSED"}
      </span>
      &nbsp; | &nbsp; Grade: ${grade}
    </div>

    <p style="margin-top: 16px;">Issued on: ${today}</p>

    <div class="qr-section">
      <div id="qr"></div>
      <div class="qr-label">Scan to verify certificate</div>
    </div>

    <div class="signature-block">

      <div class="sign-box">
        <div class="sign-line"></div>
        <b>Sukanta Hui</b><br/>
        Director<br/>
        Coder & AccoTax
      </div>

      <div class="sign-box">
        <img src="${cnatLogo}" width="70" height="70" />
        <div><b>Official Seal</b></div>
      </div>

    </div>

  </div>
</div>

<script>
  window.print();
</script>

</body>
</html>
    `;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
  };

  return (
    <button
      onClick={generate}
      className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 hover:bg-sky-500 px-4 py-1.5 text-xs font-semibold text-white"
    >
      🎖 Print Certificate
    </button>
  );
}
