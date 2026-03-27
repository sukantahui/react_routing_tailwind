// PrintButton.jsx
import React from 'react';

const PrintButton = ({ targetId, title, organizationDetails = {} }) => {
  const handlePrint = () => {
    try {
      // Check if target element exists
      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        console.error(`Element with id "${targetId}" not found`);
        alert('Unable to print: Content not found');
        return;
      }

      // Clone the content
      const content = targetElement.cloneNode(true);
      
      // Remove interactive elements for print
      const interactiveElements = content.querySelectorAll('button, .no-print, .answer-content');
      interactiveElements.forEach(el => el.remove());
      
      // Create print window
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        alert('Please allow pop-ups to print the question paper');
        return;
      }
      
      // Default organization details
      const defaultOrg = {
        name: 'Coder & AccoTax',
        address: '123 Education Street, Knowledge City, KC 123456',
        phone: '+91 1234567890',
        email: 'info@coderandaccotax.com',
        website: 'www.coderandaccotax.com',
        logo: null
      };
      
      const org = { ...defaultOrg, ...organizationDetails };
      
      // Get current date for printout
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title || 'Question Paper'}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              /* Professional print styles with optimized spacing */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: 'Times New Roman', Georgia, 'Segoe UI', serif;
                background: white;
                padding: 12px;
                margin: 0;
                line-height: 1.35;
                color: #000000 !important;
                font-weight: normal;
              }
              
              .print-container {
                max-width: 1100px;
                margin: 0 auto;
                background: white;
              }
              
              /* Make all text darker */
              p, span, div, li, h1, h2, h3, h4, h5, h6, .paper-title, .section-title, .question-content {
                color: #000000 !important;
              }
              
              /* Organization Header - Compact */
              .org-header {
                text-align: center;
                margin-bottom: 15px;
                padding-bottom: 8px;
                border-bottom: 2px solid #000000;
              }
              
              .org-name {
                font-size: 20px;
                font-weight: bold;
                color: #000000 !important;
                margin-bottom: 4px;
                letter-spacing: 0.5px;
              }
              
              .org-details {
                font-size: 10px;
                color: #000000 !important;
                line-height: 1.3;
              }
              
              .org-details-row {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
                margin-top: 3px;
              }
              
              .print-date {
                text-align: right;
                font-size: 10px;
                color: #000000 !important;
                margin-bottom: 10px;
                border-bottom: 1px solid #000000;
                padding-bottom: 5px;
                font-weight: 500;
              }
              
              /* Question paper content */
              .question-paper {
                margin-top: 5px;
              }
              
              /* Header section - Compact */
              .paper-header {
                text-align: center;
                margin-bottom: 15px;
                padding-bottom: 8px;
                border-bottom: 1px solid #000000;
              }
              
              .paper-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 5px;
                color: #000000 !important;
              }
              
              .paper-id {
                font-size: 10px;
                color: #000000 !important;
                margin-bottom: 5px;
              }
              
              .paper-meta {
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                color: #000000 !important;
                margin-top: 5px;
                padding: 5px 0;
                border-top: 1px solid #000000;
                border-bottom: 1px solid #000000;
                font-weight: 500;
              }
              
              /* Sections - Compact */
              .section {
                margin-bottom: 18px;
                page-break-inside: avoid;
              }
              
              .section-header {
                margin-bottom: 8px;
                background: #f0f0f0;
                padding: 5px 10px;
                border-left: 3px solid #000000;
              }
              
              .section-title {
                font-size: 14px;
                font-weight: bold;
                color: #000000 !important;
                margin-bottom: 2px;
              }
              
              .section-meta {
                font-size: 9px;
                color: #000000 !important;
                font-weight: 500;
              }
              
              /* Questions list - Compact */
              .questions-list {
                list-style: decimal;
                padding-left: 25px;
                margin: 0;
              }
              
              .question-item {
                margin-bottom: 8px;
                page-break-inside: avoid;
              }
              
              .question-text {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 12px;
                line-height: 1.35;
                font-size: 12px;
              }
              
              .question-content {
                flex: 1;
                color: #000000 !important;
              }
              
              .question-marks {
                font-size: 11px;
                color: #000000 !important;
                font-weight: bold;
                white-space: nowrap;
              }
              
              /* Footer - Compact */
              .org-footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 8px;
                border-top: 1px solid #000000;
                font-size: 8px;
                color: #000000 !important;
              }
              
              /* Code blocks - Compact but readable */
              pre {
                background: #f0f0f0 !important;
                border: 1px solid #000000 !important;
                border-radius: 4px !important;
                padding: 8px !important;
                margin: 8px 0 !important;
                overflow-x: auto !important;
                font-size: 10px !important;
                line-height: 1.3 !important;
                font-family: 'Courier New', 'Monaco', monospace !important;
                color: #000000 !important;
              }
              
              code {
                font-family: 'Courier New', 'Monaco', monospace !important;
                color: #000000 !important;
                font-size: 10px !important;
                background: #f0f0f0 !important;
                padding: 1px 3px !important;
                border-radius: 2px !important;
              }
              
              /* Special styling for code inside pre */
              pre code {
                background: transparent !important;
                padding: 0 !important;
              }
              
              /* Tables - Compact */
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
              }
              
              th, td {
                border: 1px solid #000000;
                padding: 5px 8px;
                text-align: left;
                font-size: 10px;
                color: #000000 !important;
              }
              
              th {
                background: #f0f0f0;
                font-weight: bold;
              }
              
              /* Print-specific styles */
              @media print {
                body {
                  padding: 0.3in !important;
                  margin: 0 !important;
                  color: #000000 !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                
                .org-header {
                  margin-bottom: 12px !important;
                  padding-bottom: 6px !important;
                }
                
                .org-name {
                  font-size: 18px !important;
                }
                
                .paper-title {
                  font-size: 16px !important;
                }
                
                .section {
                  margin-bottom: 14px !important;
                }
                
                .section-header {
                  margin-bottom: 6px !important;
                  padding: 4px 8px !important;
                }
                
                .question-item {
                  margin-bottom: 6px !important;
                }
                
                .question-text {
                  font-size: 11px !important;
                  line-height: 1.3 !important;
                }
                
                .question-marks {
                  font-size: 10px !important;
                }
                
                .org-footer {
                  margin-top: 15px !important;
                  padding-top: 5px !important;
                }
                
                pre {
                  padding: 6px !important;
                  margin: 6px 0 !important;
                  font-size: 9px !important;
                }
                
                /* Page breaks */
                .page-break {
                  page-break-before: always;
                }
                
                .section {
                  page-break-inside: avoid;
                }
                
                pre {
                  page-break-inside: avoid;
                }
              }
              
              /* Instruction box - Compact */
              .instruction-box {
                background: #f0f0f0;
                border-left: 3px solid #000000;
                padding: 8px 10px;
                margin: 12px 0;
                font-size: 9px;
                color: #000000 !important;
              }
              
              hr {
                border: none;
                border-top: 1px solid #000000;
                margin: 12px 0;
              }
              
              /* Page number */
              @page {
                margin: 1.2cm;
              }
              
              /* Improve readability with compact layout */
              p, li {
                text-align: justify;
                color: #000000 !important;
              }
              
              li {
                color: #000000 !important;
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              <!-- Organization Header -->
              <div class="org-header">
                <div class="org-name">${org.name}</div>
                <div class="org-details">
                  <div>${org.address}</div>
                  <div class="org-details-row">
                    <span>📞 ${org.phone}</span>
                    <span>✉️ ${org.email}</span>
                    <span>🌐 ${org.website}</span>
                  </div>
                </div>
              </div>
              
              <!-- Print Date -->
              <div class="print-date">
                Date of Issue: ${currentDate}
              </div>
              
              <!-- Main Content -->
              <div class="question-paper">
                ${content.innerHTML}
              </div>
              
              <!-- Instructions -->
              <div class="instruction-box">
                <strong>📝 Instructions:</strong><br>
                • Answer all questions<br>
                • Write clearly and legibly<br>
                • Marks are indicated against each question<br>
                • Draw diagrams wherever necessary
              </div>
              
              <!-- Footer -->
              <div class="org-footer">
                <div>${org.name} - Empowering Education Through Technology</div>
                <div>This is a system-generated document. No signature required.</div>
                <div>Page 1 of 1</div>
              </div>
            </div>
            <script>
              // Auto trigger print when window loads
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                  setTimeout(() => window.close(), 500);
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
    } catch (error) {
      console.error('Print error:', error);
      alert('An error occurred while trying to print. Please try again.');
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Print Question Paper
    </button>
  );
};

export default PrintButton;