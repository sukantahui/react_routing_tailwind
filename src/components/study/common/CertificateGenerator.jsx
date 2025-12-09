// V3 Ultra Premium Certificate Generator – A4 Perfect Layout
import React from "react";
import cnatLogo from "../../../assets/cnat.png";

// Auto certificate number generator
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

export default function CertificateGenerator({
  studentName = "Student Name",
  score = 0,
  total = 0,
  title = "Test Title",
  certificateHeader = "Coder & AccoTax",
  certificateSubtitle = "Barrackpore · www.codernaccotax.co.in",
  certificateTitle = "Certificate of Completion",
  passPercent = 60,
}) {
  const generate = () => {
    const percent = total > 0 ? ((score / total) * 100).toFixed(2) : "0.00";

    const p = parseFloat(percent);
    let grade = "D";
    if (p >= 85) grade = "A+";
    else if (p >= 70) grade = "A";
    else if (p >= 60) grade = "B";
    else if (p >= 50) grade = "C";

    const passed = p >= passPercent;
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const certNo = getNextCertificateNumber();
    const verifyLink = `https://www.codernaccotax.co.in/verify?cert=${certNo}`;

    // ========================================================================================
    // ULTRA PREMIUM LAYOUT
    // ========================================================================================
    const html = `
<!DOCTYPE html>
<html>
<head>
<title>${certificateTitle}</title>
<meta charset="UTF-8" />
<style>
  @page { size: A4; margin: 0; }

  body {
    margin: 0;
    padding: 0;
    background: #f3f4f6;
    font-family: 'Times New Roman', serif;
  }

  .page {
    width: 210mm;
    height: 297mm;
    padding: 18mm;
    background: white;
    position: relative;
    box-sizing: border-box;
  }

  /* OUTER GOLD BORDER */
  .outer-border {
    width: 100%;
    height: 100%;
    border: 12px solid #d4af37;
    padding: 10mm;
    box-sizing: border-box;
    position: relative;
  }

  /* INNER BORDER */
  .outer-border::after {
    content: "";
    position: absolute;
    inset: 10mm;
    border: 3px solid #b8860b;
    pointer-events: none;
  }

  /* WATERMARK */
  .watermark {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.08;
    font-size: 85px;
    color: #1e3a8a;
    font-weight: 700;
    white-space: nowrap;
    user-select: none;
  }

  /* HEADER */
  .header-text {
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    color: #1e3a8a;
    margin-top: 5mm;
  }

  .subtitle {
    text-align: center;
    font-size: 13px;
    color: #374151;
    margin-bottom: 8mm;
  }

  /* MAIN TITLE */
  .cert-title {
    text-align: center;
    font-size: 34px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  .mid-text {
    text-align: center;
    font-size: 16px;
    margin-bottom: 8px;
  }

  /* Student name */
  .student-name {
    font-size: 26px;
    font-weight: bold;
    border-bottom: 2px solid #1e3a8a;
    display: inline-block;
    padding: 3px 25px;
    margin-bottom: 10px;
  }

  .module-title {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
  }

  /* Score and result */
  .score-box {
    text-align: center;
    font-size: 17px;
    margin-top: 12px;
  }
  .passed { color: green; font-weight: bold; }
  .failed { color: red; font-weight: bold; }

  /* QR block */
  .qr-wrapper {
    text-align: center;
    margin-top: 15px;
  }
  .qr-wrapper img {
    width: 130px;
    height: 130px;
  }
  .qr-caption {
    font-size: 11px;
    margin-top: 4px;
  }

  /* SIGNATURE + SEAL ROW */
  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 22mm;
    padding: 0 18mm;
  }

  .sign-block {
    text-align: center;
    width: 45%;
  }
  .sign-line {
    width: 140px;
    height: 1px;
    background: black;
    margin: 0 auto 5px auto;
  }
  .sign-text {
    font-size: 14px;
  }

  .seal-block {
    text-align: center;
    width: 45%;
  }
  .seal-block img {
    width: 90px;
    height: 90px;
  }
  .seal-label {
    font-size: 12px;
    margin-top: 3px;
  }

  /* Certificate Number positioning */
  .cert-num {
    position: absolute;
    right: 20mm;
    top: 16mm;
    font-size: 13px;
  }
</style>
</head>

<body>
<div class="page">

  <div class="watermark">Coder & AccoTax</div>

  <div class="outer-border">

    <div class="cert-num"><b>Certificate No:</b> ${certNo}</div>

    <div class="header-text">${certificateHeader}</div>
    <div class="subtitle">${certificateSubtitle}</div>

    <div class="cert-title">${certificateTitle}</div>

    <div class="mid-text">This certifies that</div>

    <p style="text-align:center;">
      <span class="student-name">${studentName}</span>
    </p>

    <div class="mid-text">has successfully completed</div>

    <div class="module-title">${title}</div>

    <div class="score-box">
      Score: <b>${score}/${total}</b> (${percent}%)  
      <br/>
      Result: 
      <span class="${passed ? "passed" : "failed"}">${passed ? "PASSED" : "NOT PASSED"}</span>
      &nbsp; | &nbsp;
      Grade: <b>${grade}</b>
      <br/>
      <span style="font-size:14px;">Issued on: ${today}</span>
    </div>

    <!-- QR CODE -->
    <div class="qr-wrapper">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        verifyLink
      )}" />
      <div class="qr-caption">Scan to verify certificate</div>
    </div>

    <!-- SIGNATURE + SEAL -->
    <div class="bottom-row">

      <div class="sign-block">
        <div class="sign-line"></div>
        <div class="sign-text">
          <b>Sukanta Hui</b><br/>
          Director<br/>
          Coder & AccoTax
        </div>
      </div>

      <div class="seal-block">
        <img src="${cnatLogo}" alt="Seal"/>
        <div class="seal-label">Official Seal</div>
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
      className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 hover:bg-violet-500 px-4 py-1.5 text-xs font-semibold text-white shadow"
    >
      Download Ultra Certificate
    </button>
  );
}
