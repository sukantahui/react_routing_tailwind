import React, { useState, useEffect, useRef } from 'react';
import coursesData from '../assets/jsons/courses.json';
import CNATLogo from "../../public/assets/cnat.png";
import paidStamp from "../assets/images/paid-stamp.png";
import * as htmlToImage from 'html-to-image';

const StudentFeeReceipt = () => {
  // Get current date in YYYY-MM-DD format for default value
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    course: '',
    feeType: 'non_monthly',
    monthlyFeeAmount: '',
    feesPaid: '',
    paymentDate: getCurrentDate(),
    paymentMode: 'Cash',
    periodFrom: '',
    periodTo: '',
  });

  const [receiptData, setReceiptData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const receiptRef = useRef(null);

  useEffect(() => {
    setCourses(coursesData.courses);
  }, []);

  const generateReceiptNo = () => {
    const prefix = 'CNAT';
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

  const calculateMonthsDifference = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 0;
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
    return months > 0 ? months : 0;
  };

  const handleFeeTypeChange = (e) => {
    const feeType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      feeType: feeType,
      feesPaid: '',
      periodFrom: '',
      periodTo: '',
      monthlyFeeAmount: '',
    }));
  };

  const calculateTotalFees = () => {
    if (formData.feeType === 'monthly') {
      const months = calculateMonthsDifference(formData.periodFrom, formData.periodTo);
      const monthlyAmount = parseFloat(formData.monthlyFeeAmount) || 0;
      const total = months * monthlyAmount;
      setFormData((prev) => ({
        ...prev,
        feesPaid: total.toString(),
      }));
    }
  };

  useEffect(() => {
    if (formData.feeType === 'monthly' && formData.periodFrom && formData.periodTo && formData.monthlyFeeAmount) {
      calculateTotalFees();
    }
  }, [formData.periodFrom, formData.periodTo, formData.monthlyFeeAmount, formData.feeType]);

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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatMonthYear = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    });
  };

  const getPaymentModeIcon = (mode) => {
    switch (mode) {
      case 'Cash':
        return '💵';
      case 'Online (UPI)':
        return '📱';
      case 'Online (Card)':
        return '💳';
      case 'Online (Net Banking)':
        return '🏦';
      case 'Cheque':
        return '📝';
      default:
        return '💰';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentName || !formData.phone || !formData.course || !formData.paymentDate || !formData.paymentMode) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.feeType === 'monthly') {
      if (!formData.periodFrom || !formData.periodTo || !formData.monthlyFeeAmount) {
        alert('Please fill in period details and monthly fee amount for monthly fee type');
        return;
      }
      if (!formData.feesPaid || parseFloat(formData.feesPaid) <= 0) {
        alert('Please calculate total fees by selecting period and monthly amount');
        return;
      }
    } else {
      if (!formData.feesPaid) {
        alert('Please enter the total fees amount');
        return;
      }
    }

    let periodText = '';
    let monthlyBreakdown = '';

    if (formData.feeType === 'monthly' && formData.periodFrom && formData.periodTo) {
      const months = calculateMonthsDifference(formData.periodFrom, formData.periodTo);
      const monthlyAmount = parseFloat(formData.monthlyFeeAmount);
      periodText = `${formatMonthYear(formData.periodFrom)} to ${formatMonthYear(formData.periodTo)}`;
      monthlyBreakdown = ` (${months} months × ₹${monthlyAmount.toLocaleString('en-IN')} = ₹${(months * monthlyAmount).toLocaleString('en-IN')})`;
    }

    setReceiptData({
      studentName: formData.studentName,
      phone: formData.phone,
      course: formData.course,
      feeType: formData.feeType,
      feesPaid: formData.feesPaid,
      monthlyFeeAmount: formData.monthlyFeeAmount,
      paymentDate: formatDate(formData.paymentDate),
      paymentMode: formData.paymentMode,
      period: periodText,
      monthlyBreakdown: monthlyBreakdown,
      receiptNo: generateReceiptNo(),
    });
  };

  // Function to save receipt as JPG
  const saveAsJPG = async () => {
    if (!receiptData) {
      alert('Please generate a receipt first');
      return;
    }

    setIsSaving(true);

    try {
      const receiptElement = receiptRef.current;
      if (!receiptElement) {
        throw new Error('Receipt element not found');
      }

      // Configure options for better quality and to prevent cropping
      const options = {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        width: receiptElement.scrollWidth,
        height: receiptElement.scrollHeight,
        style: {
          margin: '0',
          padding: '0',
          transform: 'none'
        }
      };

      const dataUrl = await htmlToImage.toJpeg(receiptElement, options);

      const link = document.createElement('a');
      const fileName = `Receipt_${receiptData.receiptNo}_${receiptData.studentName.replace(/\s/g, '_')}.jpg`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      alert(`Receipt saved successfully as ${fileName}`);
    } catch (error) {
      console.error('Error saving receipt as JPG:', error);
      alert('Failed to save receipt as JPG. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Function to save as PNG
  const saveAsPNG = async () => {
    if (!receiptData) {
      alert('Please generate a receipt first');
      return;
    }

    setIsSaving(true);

    try {
      const receiptElement = receiptRef.current;
      if (!receiptElement) {
        throw new Error('Receipt element not found');
      }

      const options = {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        width: receiptElement.scrollWidth,
        height: receiptElement.scrollHeight,
      };

      const dataUrl = await htmlToImage.toPng(receiptElement, options);

      const link = document.createElement('a');
      const fileName = `Receipt_${receiptData.receiptNo}_${receiptData.studentName.replace(/\s/g, '_')}.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      alert(`Receipt saved successfully as ${fileName}`);
    } catch (error) {
      console.error('Error saving receipt as PNG:', error);
      alert('Failed to save receipt. Please try again.');
    } finally {
      setIsSaving(false);
    }
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
    const paymentModeIcon = getPaymentModeIcon(receiptData.paymentMode);

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Fee Receipt - Coder & AccoTax</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            background: white;
            margin: 0;
            padding: 0;
          }
          .receipt-container {
            max-width: 100%;
            width: 100%;
            margin: 0 auto;
            padding: 0;
            position: relative;
            overflow: visible;
          }
          .receipt {
            position: relative;
            background: white;
            border-radius: 0;
            box-shadow: none;
            margin: 0;
            padding: 0;
            overflow: visible;
          }
          .receipt-content {
            padding: 10px;
            position: relative;
            z-index: 1;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #1a3e6f;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .organisation-name {
            font-size: 20px;
            font-weight: bold;
            color: #1a3e6f;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          .organisation-logo {
            height: 30px;
            width: auto;
            vertical-align: middle;
          }
          .organisation-tagline {
            font-size: 9px;
            color: #4a5568;
            margin-top: 3px;
          }
          .address {
            font-size: 8px;
            color: #4a5568;
            margin-top: 5px;
            line-height: 1.2;
          }
          .contact-row {
            display: flex;
            justify-content: center;
            gap: 10px;
            font-size: 8px;
            color: #4a5568;
            margin-top: 5px;
            flex-wrap: wrap;
          }
          .receipt-title {
            font-size: 14px;
            font-weight: bold;
            color: #2d3748;
            margin-top: 8px;
            background: #f0f4f8;
            display: inline-block;
            padding: 3px 12px;
            border-radius: 20px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 12px 0;
            padding: 10px;
            background: #f7fafc;
            border-radius: 6px;
          }
          .info-item {
            display: flex;
            flex-direction: column;
          }
          .info-label {
            font-size: 9px;
            font-weight: 600;
            color: #4a5568;
            text-transform: uppercase;
          }
          .info-value {
            font-size: 11px;
            font-weight: bold;
            color: #2d3748;
            margin-top: 3px;
            word-break: break-word;
          }
          .details-section {
            margin-bottom: 12px;
          }
          .section-title {
            font-size: 11px;
            font-weight: bold;
            color: #1a3e6f;
            border-left: 3px solid #1a3e6f;
            padding-left: 8px;
            margin-bottom: 8px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
          }
          .details-table tr {
            border-bottom: 1px solid #e2e8f0;
          }
          .details-table td {
            padding: 5px;
            font-size: 10px;
          }
          .details-table td:first-child {
            font-weight: 600;
            color: #4a5568;
            width: 35%;
          }
          .details-table td:last-child {
            color: #2d3748;
          }
          .fee-section {
            background: #f0f9ff;
            padding: 10px;
            margin: 12px 0;
            border-radius: 6px;
            border: 1px solid #cbd5e0;
          }
          .fee-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
          }
          .fee-label {
            font-weight: bold;
            font-size: 11px;
            color: #4a5568;
          }
          .fee-amount {
            font-weight: bold;
            font-size: 14px;
            color: #2f855a;
          }
          .fee-breakdown {
            font-size: 8px;
            color: #718096;
            margin-top: 5px;
            font-style: italic;
          }
          .amount-words {
            font-size: 8px;
            color: #718096;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px dashed #cbd5e0;
            font-style: italic;
          }
          .footer {
            text-align: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            margin-top: 12px;
          }
          .signature-area {
            display: flex;
            justify-content: space-between;
            margin: 12px 0 8px;
          }
          .signature-line {
            text-align: center;
            width: 45%;
          }
          .signature-line p:first-child {
            font-size: 8px;
            color: #718096;
            margin-bottom: 6px;
          }
          .signature-line p:last-child {
            font-size: 8px;
            font-weight: 600;
            color: #4a5568;
            border-top: 1px solid #cbd5e0;
            padding-top: 5px;
            display: inline-block;
            min-width: 80px;
          }
          .footer-note {
            font-size: 7px;
            color: #a0aec0;
            margin-top: 8px;
            line-height: 1.3;
          }
          .thankyou {
            font-size: 9px;
            font-weight: bold;
            color: #1a3e6f;
            margin-top: 6px;
          }
          
          /* Watermark styles */
          .watermark-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 10;
            opacity: 0.1;
          }
          .watermark-image {
            width: 60%;
            height: auto;
            transform: rotate(-25deg);
          }

          /* PAID Stamp - Fixed positioning */
          .stamp-container {
            position: absolute;
            top: 80%;
            right: 45%;
            transform: translateY(-50%) rotate(-15deg);
            z-index: 20;
            pointer-events: none;
            opacity: 0.55;
          }

          .rounded-stamp {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            position: relative;
            border: 3px solid #b30021;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          /* Outer ring effect */
          .rounded-stamp::before {
            content: "";
            position: absolute;
            inset: 6px;
            border-radius: 50%;
            border: 1px dashed #b30021;
            opacity: 0.7;
          }

          .stamp-text {
            text-align: center;
            transform: rotate(-2deg);
          }

          /* MAIN PAID TEXT */
          .stamp-paid {
            font-size: 22px;
            font-weight: 900;
            color: #b30021;
            letter-spacing: 2px;
          }

          /* Company text */
          .stamp-company {
            font-size: 7px;
            color: #b30021;
            font-weight: 700;
            margin-top: 4px;
            letter-spacing: 1px;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .receipt-container {
              margin: 0;
              padding: 0;
            }
            .stamp-container {
              opacity: 0.7 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .rounded-stamp {
              border: 3px solid #b30021 !important;
              background: white !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .stamp-paid {
              color: #b30021 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .stamp-company {
              color: #b30021 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @page {
              margin: 0.5cm;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="receipt">
            <!-- Watermark -->
            <div class="watermark-container">
              <img src="/assets/cnat.png" alt="Watermark" class="watermark-image" />
            </div>
            
            <!-- PAID Stamp - Now positioned at right side -->
            <div class="stamp-container">
              <div class="rounded-stamp">
                <div class="stamp-text">
                  <div class="stamp-paid">PAID</div>
                  <div class="stamp-company">Coder & AccoTax</div>
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
                  <span>✉️ info@codernaccotax.co.in</span>
                </div>
                <div>
                  <span class="receipt-title">Fee Payment Receipt</span>
                </div>
              </div>
              
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Receipt No.</div>
                  <div class="info-value">${receiptData.receiptNo}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Payment Date</div>
                  <div class="info-value">${receiptData.paymentDate}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Payment Mode</div>
                  <div class="info-value">${paymentModeIcon} ${receiptData.paymentMode}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Student Name</div>
                  <div class="info-value">${receiptData.studentName}</div>
                </div>
              </div>

              <div class="details-section">
                <div class="section-title">Course Details</div>
                <table class="details-table">
                  <tr>
                    <td>Phone Number</td>
                    <td>${receiptData.phone}</td>
                  </tr>
                  <tr>
                    <td>Course Enrolled</td>
                    <td>${receiptData.course}</td>
                  </tr>
                  ${receiptData.period ? `
                  <tr>
                    <td>Course Period</td>
                    <td>${receiptData.period}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <div class="fee-section">
                <div class="fee-row">
                  <span class="fee-label">Course Fees</span>
                  <span class="fee-amount">₹ ${paidAmount}/-</span>
                </div>
                ${receiptData.monthlyBreakdown ? `
                <div class="fee-breakdown">
                  ${receiptData.monthlyBreakdown}
                </div>
                ` : ''}
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
                  This is a computer generated receipt - Valid without signature
                </div>
                <div class="thankyou">
                  ✨ Thank you for choosing Coder & AccoTax! ✨
                </div>
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
  const previewPaymentModeIcon = receiptData ? getPaymentModeIcon(receiptData.paymentMode) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4">
      <div className="flex justify-end mb-4 max-w-6xl mx-auto gap-2">
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
                Fee Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleFeeTypeChange}
                  value="non_monthly"
                  className={`px-4 py-2 rounded-lg font-semibold transition ${formData.feeType === 'non_monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                >
                  One-time / Fixed Fee
                </button>
                <button
                  type="button"
                  onClick={handleFeeTypeChange}
                  value="monthly"
                  className={`px-4 py-2 rounded-lg font-semibold transition ${formData.feeType === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                >
                  Monthly Fee
                </button>
              </div>
            </div>

            {formData.feeType === 'monthly' ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Monthly Fee Amount (₹) *
                  </label>
                  <input
                    type="number"
                    name="monthlyFeeAmount"
                    value={formData.monthlyFeeAmount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                    placeholder="Enter monthly fee amount"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Course Period (Monthly) *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From</label>
                      <input
                        type="month"
                        name="periodFrom"
                        value={formData.periodFrom}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">To</label>
                      <input
                        type="month"
                        name="periodTo"
                        value={formData.periodTo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition text-sm"
                        required
                      />
                    </div>
                  </div>
                  {formData.periodFrom && formData.periodTo && formData.monthlyFeeAmount && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Total Months: <strong>{calculateMonthsDifference(formData.periodFrom, formData.periodTo)}</strong> |
                        Total Fees: <strong>₹ {(calculateMonthsDifference(formData.periodFrom, formData.periodTo) * (parseFloat(formData.monthlyFeeAmount) || 0)).toLocaleString('en-IN')}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Total Fees Amount (₹) *
                </label>
                <input
                  type="number"
                  name="feesPaid"
                  value={formData.feesPaid}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                  placeholder="Enter total fees amount"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Payment Date *
              </label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Payment Mode *
              </label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition cursor-pointer"
                required
              >
                <option value="Cash">💵 Cash</option>
                <option value="Online (UPI)">📱 Online (UPI)</option>
                <option value="Online (Card)">💳 Online (Card)</option>
                <option value="Online (Net Banking)">🏦 Online (Net Banking)</option>
                <option value="Cheque">📝 Cheque</option>
              </select>
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
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🧾</span> Receipt Preview
              </h2>
              <p className="text-green-100 text-xs mt-1">Review before printing or saving</p>
            </div>
            {receiptData && (
              <div className="flex gap-2">
                <button
                  onClick={saveAsJPG}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? '⏳ Saving...' : '📸 Save as JPG'}
                </button>
                <button
                  onClick={saveAsPNG}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🖼️ Save as PNG
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-white text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold shadow hover:shadow-lg transition"
                >
                  🖨️ Print
                </button>
              </div>
            )}
          </div>

          <div className="p-5 flex-1 flex items-center justify-center overflow-auto">
            {receiptData ? (
              <div
                ref={receiptRef}
                className="w-full max-w-sm mx-auto bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden relative"
                style={{ backgroundColor: '#ffffff', width: '380px' }}
              >
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                  <img
                    src={CNATLogo}
                    alt="Watermark"
                    className="w-48 h-auto transform rotate-[-25deg]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                {/* PAID Stamp Image */}
                <div className="absolute top-[60%] right-[40%] transform -translate-y-1/2 rotate-[-15deg] z-20 pointer-events-none">
                  <img
                    src={paidStamp}
                    alt="Paid Stamp"
                    className="w-28 opacity-60"
                  />
                </div>

                <div className="p-4 space-y-3 relative z-10">
                  <div className="text-center border-b pb-3">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <img
                        src={CNATLogo}
                        alt="Coder & AccoTax Logo"
                        className="h-8 w-auto"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <h3 className="text-lg font-bold text-blue-700">Coder & AccoTax</h3>
                    </div>
                    <p className="text-[9px] text-gray-500 mt-1">Fee Payment Receipt</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-600">Receipt No:</span>
                      <span className="text-gray-800 font-mono text-[10px]">{receiptData.receiptNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">Date:</span>
                      <span className="text-gray-700">{receiptData.paymentDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">Mode:</span>
                      <span className="text-gray-700">{previewPaymentModeIcon} {receiptData.paymentMode}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-gray-600">Student:</span>
                        <span className="text-gray-800 font-medium text-right">{receiptData.studentName}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-gray-600">Phone:</span>
                        <span className="text-gray-700">{receiptData.phone}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-gray-600">Course:</span>
                        <span className="text-gray-700 text-right">{receiptData.course}</span>
                      </div>
                      {receiptData.period && (
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-gray-600">Period:</span>
                          <span className="text-gray-700 text-right text-[9px]">{receiptData.period}</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-700">Amount Paid:</span>
                        <span className="font-bold text-green-600 text-base">₹ {parseFloat(receiptData.feesPaid).toLocaleString('en-IN')}</span>
                      </div>
                      {receiptData.monthlyBreakdown && (
                        <div className="text-[8px] text-gray-500 italic mt-1">
                          {receiptData.monthlyBreakdown}
                        </div>
                      )}
                      <div className="text-[8px] text-gray-500 italic mt-2 pt-1 border-t">
                        {previewAmountInWords}
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-3 border-t">
                    <p className="text-[8px] text-gray-400">✓ Valid without signature</p>
                    <p className="text-[7px] text-gray-400 mt-1">25(10/A) Shibtala Road, Barrackpore, Kol-122</p>
                    <p className="text-[8px] text-blue-600 mt-2">✨ Thank you! ✨</p>
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