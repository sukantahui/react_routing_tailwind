import React, { useState, useEffect } from 'react';
import coursesData from '../assets/jsons/courses.json';
import CNATLogo from "../../public/assets/cnat.png";

const StudentFeeReceipt = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    course: '',
    feesPaid: '',
  });

  const [receiptData, setReceiptData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(coursesData.courses);
  }, []);

  const generateReceiptNo = () => {
    const prefix = 'RCPT';
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return `${prefix}-${timestamp}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const numberToWords = (num) => {
    if (!num || isNaN(num)) return '';
    num = Math.floor(num);
    if (num === 0) return 'Zero Only';
    
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
    const convertBelowHundred = (n) => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    };
    
    const convertBelowThousand = (n) => {
      if (n === 0) return '';
      if (n < 100) return convertBelowHundred(n);
      const hundredPart = Math.floor(n / 100);
      const remainder = n % 100;
      return ones[hundredPart] + ' Hundred' + (remainder ? ' and ' + convertBelowHundred(remainder) : '');
    };
    
    let result = '';
    let remaining = num;
    
    if (remaining >= 10000000) {
      const crores = Math.floor(remaining / 10000000);
      result += convertBelowHundred(crores) + ' Crore';
      remaining %= 10000000;
      if (remaining > 0) result += ' ';
    }
    if (remaining >= 100000) {
      const lakhs = Math.floor(remaining / 100000);
      result += convertBelowHundred(lakhs) + ' Lakh';
      remaining %= 100000;
      if (remaining > 0) result += ' ';
    }
    if (remaining >= 1000) {
      const thousands = Math.floor(remaining / 1000);
      result += convertBelowThousand(thousands) + ' Thousand';
      remaining %= 1000;
      if (remaining > 0) result += ' ';
    }
    if (remaining > 0) {
      result += convertBelowThousand(remaining);
    }
    return result + ' Only';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone || !formData.course || !formData.feesPaid) {
      alert('Please fill in all fields');
      return;
    }
    setReceiptData({
      studentName: formData.studentName,
      phone: formData.phone,
      course: formData.course,
      feesPaid: formData.feesPaid,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      receiptNo: generateReceiptNo(),
    });
  };

  const handlePrint = () => {
    if (!receiptData) {
      alert('Please generate a receipt first');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow pop-ups to print the receipt');
      return;
    }

    const amountInWords = numberToWords(parseFloat(receiptData.feesPaid));
    const paidAmount = parseFloat(receiptData.feesPaid).toLocaleString('en-IN');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Fee Receipt - Coder & AccoTax</title>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Times New Roman', Times, serif;
              font-size: 13px;
              background: white;
              margin: 0;
              padding: 0;
            }
            .receipt {
              width: 100%;
              height: 100vh;
              background: white;
              margin: 0;
              padding: 0;
              position: relative;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            .receipt-content {
              padding: 4mm 8mm 4mm 8mm;
              height: 100%;
              display: flex;
              flex-direction: column;
              background: white;
              position: relative;
              z-index: 1;
            }
            .stamp-container {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-15deg);
              z-index: 10;
              pointer-events: none;
            }
            .rounded-stamp {
              width: 180px;
              height: 180px;
              border-radius: 50%;
              border: 4px solid #c41e3a;
              background: rgba(196, 30, 58, 0.08);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 20px;
              box-shadow: 0 0 0 2px rgba(196, 30, 58, 0.3);
            }
            .stamp-text {
              font-family: 'Times New Roman', Times, serif;
            }
            .stamp-paid {
              font-size: 32px;
              font-weight: bold;
              color: #c41e3a;
              letter-spacing: 4px;
              margin-bottom: 8px;
              text-transform: uppercase;
              border-bottom: 2px solid #c41e3a;
              display: inline-block;
              padding-bottom: 5px;
            }
            .stamp-company {
              font-size: 11px;
              color: #c41e3a;
              font-weight: 600;
              margin-top: 8px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .stamp-since {
              font-size: 10px;
              color: #c41e3a;
              margin-top: 4px;
              font-style: italic;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #1a3e6f;
              padding-bottom: 4px;
              margin-bottom: 6px;
              position: relative;
              z-index: 1;
              background: white;
            }
            .organisation-name {
              font-size: 24px;
              font-weight: bold;
              color: #1a3e6f;
              letter-spacing: 1px;
              margin-bottom: 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            }
            .organisation-logo {
              height: 36px;
              width: auto;
              vertical-align: middle;
            }
            .organisation-tagline {
              font-size: 9px;
              color: #4a5568;
              margin-top: 2px;
              font-style: italic;
            }
            .address {
              font-size: 8px;
              color: #4a5568;
              margin-top: 3px;
              line-height: 1.2;
            }
            .contact-row {
              display: flex;
              justify-content: center;
              gap: 12px;
              font-size: 8px;
              color: #4a5568;
              margin-top: 3px;
              flex-wrap: wrap;
            }
            .receipt-title {
              font-size: 16px;
              font-weight: bold;
              color: #2d3748;
              margin-top: 4px;
              text-transform: uppercase;
              letter-spacing: 1px;
              background: #f0f4f8;
              display: inline-block;
              padding: 2px 16px;
              border-radius: 20px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin: 6px 0;
              padding: 4px 0;
              border-bottom: 1px dashed #cbd5e0;
              position: relative;
              z-index: 1;
              background: white;
            }
            .info-box {
              background: #f7fafc;
              padding: 3px 10px;
              border-radius: 4px;
              border: 1px solid #e2e8f0;
            }
            .info-label {
              font-size: 10px;
              font-weight: 600;
              color: #4a5568;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .info-value {
              font-size: 13px;
              font-weight: bold;
              color: #2d3748;
              margin-top: 1px;
            }
            .details-section {
              margin-bottom: 8px;
              position: relative;
              z-index: 1;
              background: white;
            }
            .section-title {
              font-size: 11px;
              font-weight: bold;
              color: #1a3e6f;
              border-left: 3px solid #1a3e6f;
              padding-left: 6px;
              margin-bottom: 6px;
              text-transform: uppercase;
            }
            .details-table {
              width: 100%;
              border-collapse: collapse;
            }
            .details-table tr {
              border-bottom: 1px solid #e2e8f0;
            }
            .details-table td {
              padding: 4px 5px;
              font-size: 10px;
            }
            .details-table td:first-child {
              font-weight: 600;
              color: #4a5568;
              width: 35%;
            }
            .details-table td:last-child {
              color: #2d3748;
              font-weight: 500;
            }
            .fee-section {
              background: #f7fafc;
              padding: 8px 10px;
              margin: 6px 0;
              border-radius: 6px;
              border: 1px solid #e2e8f0;
              position: relative;
              z-index: 1;
            }
            .fee-row {
              display: flex;
              justify-content: space-between;
              padding: 4px 0;
            }
            .fee-label {
              font-weight: bold;
              font-size: 11px;
              color: #4a5568;
            }
            .fee-amount {
              font-weight: bold;
              font-size: 15px;
              color: #2f855a;
            }
            .amount-words {
              font-size: 8px;
              color: #718096;
              margin-top: 4px;
              padding-top: 4px;
              border-top: 1px dashed #cbd5e0;
              font-style: italic;
            }
            .footer {
              margin-top: auto;
              text-align: center;
              border-top: 1px solid #e2e8f0;
              padding-top: 6px;
              position: relative;
              z-index: 1;
              background: white;
            }
            .signature-area {
              display: flex;
              justify-content: space-between;
              margin: 8px 0 4px 0;
            }
            .signature-line {
              text-align: center;
              width: 45%;
            }
            .signature-line p:first-child {
              font-size: 8px;
              color: #718096;
              margin-bottom: 10px;
            }
            .signature-line p:last-child {
              font-size: 8px;
              font-weight: 600;
              color: #4a5568;
              border-top: 1px solid #cbd5e0;
              padding-top: 3px;
              display: inline-block;
              min-width: 90px;
            }
            .footer-note {
              font-size: 7px;
              color: #a0aec0;
              margin-top: 4px;
              line-height: 1.3;
            }
            .thankyou {
              font-size: 9px;
              font-weight: bold;
              color: #1a3e6f;
              margin-top: 4px;
            }
            @media print {
              body {
                background: white;
                margin: 0;
                padding: 0;
              }
              .receipt {
                box-shadow: none;
                margin: 0;
                padding: 0;
                width: 100%;
                height: auto;
                min-height: 148mm;
              }
              @page {
                size: A4;
                margin: 0;
              }
              .receipt-content {
                padding: 4mm 8mm;
              }
              .rounded-stamp {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="stamp-container">
              <div class="rounded-stamp">
                <div class="stamp-text">
                  <div class="stamp-paid">PAID</div>
                  <div class="stamp-company">Coder & AccoTax</div>
                  <div class="stamp-since">Since 1997</div>
                </div>
              </div>
            </div>
            <div class="receipt-content">
              <div class="header">
                <div class="organisation-name">
                  <img src="/assets/cnat.png" alt="Coder & AccoTax Logo" class="organisation-logo" />
                  <span>CODER & ACCOTAX</span>
                </div>
                <div class="organisation-tagline">Quality Education | Professional Training | Tax Solutions</div>
                <div class="address">
                  25(10/A) Shibtala Road, PO-N C Pukur, Barrackpore, Kolkata-700122
                </div>
                <div class="contact-row">
                  <span>📞 +91 70037 56860</span>
                  <span>🌐 codernaccotax.co.in</span>
                  <span>✉️ info@codernaccotax.co.in</span>
                </div>
                <div>
                  <span class="receipt-title">Fee Payment Receipt</span>
                </div>
              </div>
              <div class="info-row">
                <div class="info-box">
                  <div class="info-label">Receipt No.</div>
                  <div class="info-value">${receiptData.receiptNo}</div>
                </div>
                <div class="info-box">
                  <div class="info-label">Payment Date</div>
                  <div class="info-value">${receiptData.date}</div>
                </div>
                <div class="info-box">
                  <div class="info-label">Payment Mode</div>
                  <div class="info-value">Cash / Online</div>
                </div>
              </div>
              <div class="details-section">
                <div class="section-title">Student Information</div>
                <table class="details-table">
                  <tr>
                    <td>Student Name</td>
                    <td><strong>${receiptData.studentName}</strong></td>
                    <td>Phone Number</td>
                    <td>${receiptData.phone}</td>
                  </tr>
                  <tr>
                    <td>Course Enrolled</td>
                    <td><strong>${receiptData.course}</strong></td>
                  </tr>
                </table>
              </div>
              <div class="fee-section">
                <div class="fee-row">
                  <span class="fee-label">Course Fees</span>
                  <span class="fee-amount">₹ ${paidAmount}/-</span>
                </div>
                <div class="fee-row">
                  <span class="fee-label">Payment Status</span>
                  <span style="color: #2f855a; font-weight: bold;">✓ PAID IN FULL</span>
                </div>
                <div class="amount-words">
                  Amount in words: Rupees ${amountInWords}
                </div>
              </div>
              <div class="footer">
                <div class="signature-area">
                  <div class="signature-line">
                    <p>Student's Signature</p>
                    <p>(Student)</p>
                  </div>
                  <div class="signature-line">
                    <p>Authorized Signatory</p>
                    <p>(Coder & AccoTax)</p>
                  </div>
                </div>
                <div class="footer-note">
                  This is a computer generated receipt - Valid without signature<br>
                  For any queries, please contact our support team | Office Hours: 10 AM - 7 PM (Mon-Sat)
                </div>
                <div class="thankyou">
                  ✨ Thank you for choosing Coder & AccoTax! ✨
                </div>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              }, 300);
            };
          <\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const previewAmountInWords = receiptData ? numberToWords(parseFloat(receiptData.feesPaid)) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4">
      <div className="flex justify-end mb-4 max-w-6xl mx-auto">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg transition border border-gray-200 dark:border-gray-600 text-sm"
        >
          {darkMode ? (
            <>
              <span>☀️</span> Light Mode
            </>
          ) : (
            <>
              <span>🌙</span> Dark Mode
            </>
          )}
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📝</span> Student Fee Payment Form
            </h2>
            <p className="text-blue-100 text-xs mt-1">Enter payment details to generate receipt</p>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                placeholder="Enter student name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Course Name *
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition cursor-pointer"
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Fees Amount (₹) *
              </label>
              <input
                type="number"
                name="feesPaid"
                value={formData.feesPaid}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                placeholder="Enter amount"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Generate Receipt →
            </button>
          </form>
        </div>

        {/* Receipt Preview Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🧾</span> Receipt Preview
              </h2>
              <p className="text-green-100 text-xs mt-1">Review before printing</p>
            </div>
            {receiptData && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-white text-green-700 px-4 py-1.5 rounded-lg text-sm font-semibold shadow hover:shadow-lg transition"
              >
                🖨️ Print Receipt
              </button>
            )}
          </div>

          <div className="p-5 flex-1 flex items-center justify-center">
            {receiptData ? (
              <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden relative">
                {/* Preview Stamp */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                  <div className="w-32 h-32 rounded-full border-2 border-red-600 flex flex-col items-center justify-center transform -rotate-12">
                    <div className="text-lg font-bold text-red-600">PAID</div>
                    <div className="text-[8px] text-red-600 text-center px-2">Coder & AccoTax</div>
                    <div className="text-[7px] text-red-600">Since 1997</div>
                  </div>
                </div>
                <div className="p-4 space-y-2 relative z-10">
                  <div className="text-center border-b pb-2">
                    <h3 className="text-base font-bold text-blue-700 dark:text-blue-400">Coder & AccoTax</h3>
                    <p className="text-[10px] text-gray-500">Fee Payment Receipt</p>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="font-semibold">Receipt No:</span>
                      <span className="text-gray-600 dark:text-gray-300">{receiptData.receiptNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Date:</span>
                      <span className="text-gray-600 dark:text-gray-300">{receiptData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Student:</span>
                      <span className="text-gray-800 dark:text-white font-medium">{receiptData.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Phone:</span>
                      <span className="text-gray-600 dark:text-gray-300">{receiptData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Course:</span>
                      <span className="text-gray-600 dark:text-gray-300">{receiptData.course}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t mt-1">
                      <span className="font-bold">Amount Paid:</span>
                      <span className="font-bold text-green-600 text-sm">₹ {parseFloat(receiptData.feesPaid).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pt-1 pb-1">
                      <span className="font-semibold text-[10px] text-gray-500">Amount in words:</span>
                      <p className="text-[9px] text-gray-600 dark:text-gray-400 italic">{previewAmountInWords}</p>
                    </div>
                  </div>
                  <div className="text-center pt-2 border-t">
                    <p className="text-[9px] text-gray-400">✓ Ready to print on half A4 sheet (no top margin)</p>
                    <p className="text-[8px] text-gray-400 mt-1">25(10/A) Shibtala Road, Barrackpore, Kol-122</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">No receipt generated yet</p>
                <p className="text-xs text-gray-400 mt-1">Fill the form and click "Generate Receipt"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeReceipt;