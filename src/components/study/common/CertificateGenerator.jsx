// src/components/study/common/CertificateGenerator.jsx
import React from "react";
import directorPhoto from "../../../assets/signature.png";   // change to your real signature image
import sealImage from "../../../assets/stamp.png";           // official seal
import QRCode from "qrcode";

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
  title = "Module Test",
  passPercent = 60,
}) {

  const generate = async () => {
    const percentage = total ? ((score / total) * 100).toFixed(2) : "0.00";
    const passed = percentage >= passPercent;
    const grade =
      percentage >= 85 ? "A+" :
        percentage >= 70 ? "A" :
          percentage >= 60 ? "B" :
            percentage >= 50 ? "C" : "D";

    const date = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const certNo = getNextCertificateNumber();

    // Generate QR with certificate verification link
    const qrData = `https://www.codernaccotax.co.in/verify?cert=${certNo}`;
    const qrBase64 = await QRCode.toDataURL(qrData);

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Certificate</title>

<style>
  @page { size: A4; margin: 0; }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Times New Roman', serif;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    height: 297mm;
    overflow: hidden;
    padding: 12mm 16mm 10mm 16mm; /* adjusted to fit perfectly */
    box-sizing: border-box;
  }

  /* Outer gold border */
  .outer-frame {
    width: 100%;
    height: 100%;
    border: 6px solid #d4af37;
    padding: 10mm;
    box-sizing: border-box;
  }

  /* Inner border */
  .inner-frame {
    width: 100%;
    height: 100%;
    border: 2px solid #b28c1a;
    padding: 10mm;
    box-sizing: border-box;
    text-align: center;
  }

  .header {
    font-size: 20px;
    font-weight: bold;
    color: #1e3a8a;
  }

  .subheader {
    font-size: 11px;
    margin-top: 2px;
    color: #444;
  }

  .cert-title {
    margin-top: 12px;
    font-size: 28px;
    font-weight: 800;
  }

  .small-text {
    font-size: 12px;
    margin-top: 2px;
  }

  .student-name {
    margin-top: 4px;
    font-size: 22px;
    font-weight: bold;
    border-bottom: 1px solid #000;
    display: inline-block;
    padding: 2px 20px;
  }

  .score-box {
    margin-top: 8px;
    font-size: 14px;
    font-weight: bold;
  }

  .qr-box {
    margin-top: 8px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 22mm; /* tuned to stay inside page */
    padding: 0 20mm;
  }

  .sign-block {
    text-align: center;
    font-size: 12px;
  }

  .sign-block img {
    width: 70px;
    height: auto;
  }

  .seal img {
    width: 80px;
    height: auto;
  }

  .cert-number {
    text-align: right;
    font-size: 12px;
    margin-bottom: 6px;
  }

  .watermark {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    color: #d0d7df;
    opacity: 0.22;
    font-weight: 700;
    pointer-events: none;
  }
</style>

</head>
<body>

<div class="page">
  <div class="outer-frame">
    <div class="inner-frame">

      <div class="cert-number">Certificate No: ${certNo}</div>

      <div class="header">Coder & AccoTax</div>
      <div class="subheader">Barrackpore · www.codernaccotax.co.in</div>

      <div class="cert-title">Certificate of Completion</div>

      <div class="small-text">This certifies that</div>
      <div class="student-name">${studentName}</div>

      <div class="small-text">has successfully completed</div>

      <h3 style="margin-top:6px;">${title}</h3>

      <div class="score-box">
        Score: ${score}/${total} (${percentage}%)  
        <br/>Result: <b style="color:${passed ? "green" : "red"};">${passed ? "PASSED" : "NOT PASSED"}</b>
        &nbsp; | &nbsp; Grade: ${grade}
      </div>

      <div class="small-text" style="margin-top:6px;">Issued on: ${date}</div>

      <div class="qr-box">
        <img src="${qrBase64}" width="110" />
        <div class="small-text">Scan to verify certificate</div>
      </div>

      <div class="watermark">Coder & AccoTax</div>

      <div class="footer">

        <div class="sign-block">
          <img src="${directorPhoto}" />
          <div>____________________</div>
          <div>Sukanta Hui</div>
          <div>Director</div>
          <div>Coder & AccoTax</div>
        </div>

        <div class="seal">
          <img src="${sealImage}" />
          <div style="font-size:11px; text-align:center;">Official Seal</div>
        </div>

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

    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
  };

  return (
    <>
      <button
        onClick={generate}
        className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-full text-white text-xs font-semibold"
      >
        Download Certificate
      </button>
      <button
  onClick={() => {
    const certNo = getNextCertificateNumber();
    const percent = total ? ((score / total) * 100).toFixed(2) : "0.00";

    const grade =
      percent >= 85 ? "A+ 🌟" :
      percent >= 70 ? "A 👍" :
      percent >= 60 ? "B 🙂" :
      percent >= 50 ? "C ⚠️" :
      "D ❌";

    const passed = percent >= passPercent;
    const resultStatus = passed ? "PASSED ✅" : "NOT PASSED ❌";

    // ------------------------------------------
    // Dynamic Inspirational Message
    // ------------------------------------------
    const dynamicMessage = passed
      ? `🎉 *Congratulations!*  
Your dedication and hard work have brought you success.  
Keep learning, keep growing — the future is yours!`
      : `💡 *Don't be discouraged!*  
Every attempt makes you stronger.  
Review your mistakes, try again, and success will follow you.  
We believe in you! 💪`;

    // ------------------------------------------
    // WhatsApp Message Body
    // ------------------------------------------
    const message =
`🏅 *CERTIFICATE OF COMPLETION*
━━━━━━━━━━━━━━━━━━━━━

👤 *Student Name:* ${studentName}
📘 *Module:* ${title}

📊 *Score:* ${score}/${total}
📈 *Percentage:* ${percent}%
🎖 *Result:* ${resultStatus}
🏷 *Grade:* ${grade}

🗓 *Issued on:* ${new Date().toLocaleDateString("en-IN")}
🔢 *Certificate No:* ${certNo}

🔗 *Verification Link:*
https://www.codernaccotax.co.in/verify?cert=${certNo}

━━━━━━━━━━━━━━━━━━━━━  
💬 *Message from Coder & AccoTax*  
━━━━━━━━━━━━━━━━━━━━━  
${dynamicMessage}

━━━━━━━━━━━━━━━━━━━━━
🏫 *Coder & AccoTax – Barrackpore*
💻 www.codernaccotax.co.in
━━━━━━━━━━━━━━━━━━━━━`;

    const url = `https://wa.me/919432456083?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }}
  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-full text-white text-xs font-semibold"
>
  Send to WhatsApp
</button>



    </>
  );
}
