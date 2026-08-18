// common/PlainTextPrint.jsx

import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";

/*
|--------------------------------------------------------------------------
| Organisation Information
|--------------------------------------------------------------------------
*/

const ORGANISATION = {
    name: "Coder & AccoTax",
    phone: "700356860",
    website: "https://codernaccotax.co.in",
    email: "codernaccotax@gmail.com",
    address: "25(10/A) Shibtala Road, PO: NC Pukur, Barrackpore",
    teacher: "Sukanta Hui",
};

/*
|--------------------------------------------------------------------------
| PlainTextPrint Component
|--------------------------------------------------------------------------
|
| Props:
|
| filePath           : Path to .txt file (optional if content provided)
| content            : Direct text content (optional if filePath provided)
| buttonText         : Print button text (default: "Print Note")
| title              : Title displayed on printed document (also used for download filename)
| className          : Additional Tailwind classes for the container
|
| Stamp Props        :
| stampEnabled       : Show/hide stamp on print (default: true)
| stampColor         : Primary colour for stamp (default: "#4f46e5")
| stampText          : Override organisation name for stamp (optional)
|
| Download Props     :
| showDownload       : Show download button (default: true)
| downloadButtonText : Text on download button (default: "Download TXT")
| downloadFileName   : Custom filename (default: title + ".txt")
|
*/

const PlainTextPrint = ({
    filePath,
    content: initialContent,
    buttonText = "Print Note",
    title = "Printable Note",
    className,
    stampEnabled = true,
    stampColor = "#4f46e5",
    stampText = ORGANISATION.name,
    showDownload = true,
    downloadButtonText = "Download TXT",
    downloadFileName,
}) => {
    const [textContent, setTextContent] = useState(
        initialContent || ""
    );

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Load text file
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (initialContent) {
            setTextContent(initialContent);
            setError(null);
            return;
        }

        if (!filePath) {
            setError("No file path or content provided.");
            return;
        }

        const fetchFile = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(filePath);

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}: ${response.statusText}`
                    );
                }

                const text = await response.text();

                setTextContent(text);
            } catch (err) {
                setError(
                    err.message || "Failed to load the file."
                );

                console.error(
                    "PlainTextPrint fetch error:",
                    err
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchFile();
    }, [filePath, initialContent]);

    /*
    |--------------------------------------------------------------------------
    | Escape HTML
    |--------------------------------------------------------------------------
    */

    const escapeHtml = (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    /*
    |--------------------------------------------------------------------------
    | Format Plain Text (for print)
    |--------------------------------------------------------------------------
    */

    const formatTextForPrint = (text) => {
        const lines = escapeHtml(text).split("\n");

        let html = "";

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            if (!trimmed) {
                html += `
        <div class="paragraph-space"></div>
      `;
                continue;
            }

            if (/^={5,}$/.test(trimmed)) {
                html += `
        <hr class="note-divider note-divider-strong" />
      `;
                continue;
            }

            if (/^-{5,}$/.test(trimmed)) {
                html += `
        <hr class="note-divider note-divider-light" />
      `;
                continue;
            }

            if (/^_{5,}$/.test(trimmed)) {
                html += `
        <hr class="note-divider note-divider-thin" />
      `;
                continue;
            }

            if (/^[-*]\s+/.test(trimmed)) {
                const bulletText = trimmed.replace(/^[-*]\s+/, "");
                html += `
        <div class="note-bullet">
          <span class="bullet-marker">•</span>
          <span>${bulletText}</span>
        </div>
      `;
                continue;
            }

            if (/^\d+\.\s+/.test(trimmed)) {
                const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
                html += `
        <div class="note-numbered">
          <span class="number-marker">${match[1]}.</span>
          <span>${match[2]}</span>
        </div>
      `;
                continue;
            }

            if (
                trimmed === trimmed.toUpperCase() &&
                trimmed.length < 100 &&
                !/^\d/.test(trimmed)
            ) {
                html += `
        <h2 class="note-heading">
          ${trimmed}
        </h2>
      `;
                continue;
            }

            html += `
      <div class="note-line">
        ${line}
      </div>
    `;
        }

        // Make the line immediately before a light divider bold (second pass)
        const parts = html.split(
            '<hr class="note-divider note-divider-light" />'
        );
        if (parts.length > 1) {
            html = parts
                .map((part, index) => {
                    if (index === parts.length - 1) return part;
                    const headingMatch = part.match(
                        /(<h2 class="note-heading">)(.*?)(<\/h2>)(?![\s\S]*<h2)/
                    );
                    if (headingMatch) return part;
                    const lineMatch = part.match(
                        /(<div class="note-line">)(.*?)(<\/div>)(?![\s\S]*<div class="note-line">)/
                    );
                    if (lineMatch) {
                        const replacement =
                            `${lineMatch[1]}` +
                            `<strong>${lineMatch[2]}</strong>` +
                            `${lineMatch[3]}`;
                        return part.replace(lineMatch[0], replacement);
                    }
                    return part;
                })
                .join(
                    '<hr class="note-divider note-divider-light" />'
                );
        }

        return html;
    };

    /*
    |--------------------------------------------------------------------------
    | Print Handler
    |--------------------------------------------------------------------------
    */

    const handlePrint = useCallback(() => {
        if (!textContent && !isLoading) {
            alert(
                "No content to print. Please ensure the file has loaded."
            );
            return;
        }

        const printWindow = window.open(
            "",
            "_blank",
            "width=900,height=700"
        );

        if (!printWindow) {
            alert("Please allow pop-ups to print the note.");
            return;
        }

        const today = new Date();
        const printDate = today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        );

        const formattedContent =
            formatTextForPrint(textContent);

        // Stamp SVG
        let stampHtml = "";
        if (stampEnabled) {
            const safeStampText = escapeHtml(stampText);
            const safeColor = escapeHtml(stampColor);
            stampHtml = `
        <div class="stamp-wrapper">
          <div class="stamp">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="88" fill="none" stroke="${safeColor}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.4" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="${safeColor}" stroke-width="2" opacity="0.5" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="${safeColor}" stroke-width="0.8" opacity="0.25" />
              <circle cx="100" cy="30" r="3" fill="${safeColor}" opacity="0.4" />
              <circle cx="100" cy="170" r="3" fill="${safeColor}" opacity="0.4" />
              <circle cx="30" cy="100" r="3" fill="${safeColor}" opacity="0.4" />
              <circle cx="170" cy="100" r="3" fill="${safeColor}" opacity="0.4" />
              <path d="M 80,105 L 92,117 L 120,83" stroke="${safeColor}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />
              <path id="stamp-path" d="M 40,100 A 60,60 0 1,1 160,100" fill="none" />
              <text font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="12" fill="${safeColor}" letter-spacing="2" opacity="0.8">
                <textPath href="#stamp-path" startOffset="50%" text-anchor="middle">${safeStampText}</textPath>
              </text>
              <text x="100" y="155" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="8" fill="${safeColor}" letter-spacing="3" opacity="0.5">CERTIFIED</text>
            </svg>
          </div>
        </div>
      `;
        }

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 25mm 16mm;
      @bottom-right {
        content: "Page " counter(page);
        font-size: 9px;
        color: #6b7280;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 400;
      }
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: white; color: #1f2937; font-family: Georgia, "Times New Roman", serif; font-size: 14px; line-height: 1.75; }
    .page { max-width: 820px; margin: 0 auto; }
    .organisation-header { text-align: center; padding-bottom: 14px; margin-bottom: 24px; border-bottom: 2px solid #312e81; }
    .organisation-name { font-family: Arial, Helvetica, sans-serif; font-size: 27px; font-weight: 800; color: #312e81; letter-spacing: 0.4px; margin-bottom: 5px; }
    .organisation-tagline { font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #6b7280; margin-bottom: 8px; }
    .organisation-contact { font-family: Arial, Helvetica, sans-serif; font-size: 10.5px; color: #374151; line-height: 1.6; }
    .organisation-contact a { color: #312e81; text-decoration: none; }
    .course-info { margin-bottom: 24px; padding: 12px 16px; background: #f8fafc; border: 1px solid #e5e7eb; border-left: 4px solid #4f46e5; border-radius: 5px; font-family: Arial, Helvetica, sans-serif; }
    .course-title { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 5px; }
    .teacher { font-size: 11px; color: #4b5563; }
    .note-content { margin-top: 10px; }
    .note-line { margin: 3px 0; }
    .paragraph-space { height: 8px; }
    .note-heading { font-family: Arial, Helvetica, sans-serif; font-size: 18px; color: #312e81; margin-top: 24px; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #d1d5db; page-break-after: avoid; }
    .note-divider { width: 100%; height: 0; border: 0; }
    .note-divider-strong { border-top: 2px solid #374151; margin: 20px 0; }
    .note-divider-light { border-top: 1px solid #9ca3af; margin: 10px 0 16px; }
    .note-divider-thin { border-top: 1px solid #d1d5db; margin: 12px 0; }
    .stamp-wrapper { display: flex; justify-content: flex-end; margin-top: 20px; margin-bottom: 12px; page-break-after: avoid; }
    .stamp { width: 110px; height: 110px; opacity: 0.8; transform: rotate(-6deg); }
    .stamp svg { width: 100%; height: 100%; display: block; }
    .document-footer { margin-top: 20px; padding-top: 12px; border-top: 1px solid #d1d5db; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 9px; color: #6b7280; line-height: 1.6; }
    .footer-brand { font-weight: 700; color: #312e81; }
    @media print {
      body { background: white; }
      .page { max-width: none; }
      a { color: inherit; text-decoration: none; }
      .note-heading { page-break-after: avoid; }
      .note-line { orphans: 3; widows: 3; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="organisation-header">
      <div class="organisation-name">${escapeHtml(ORGANISATION.name)}</div>
      <div class="organisation-tagline">Computer Training • Programming • Accounts & Taxation</div>
      <div class="organisation-contact">
        📞 ${escapeHtml(ORGANISATION.phone)} &nbsp;|&nbsp;
        🌐 <a href="${ORGANISATION.website}">${escapeHtml(ORGANISATION.website)}</a> &nbsp;|&nbsp;
        ✉ <a href="mailto:${ORGANISATION.email}">${escapeHtml(ORGANISATION.email)}</a>
        <br />${escapeHtml(ORGANISATION.address)}
      </div>
    </header>
    <section class="course-info">
      <div class="course-title">${escapeHtml(title)}</div>
      <div class="teacher">Teacher: ${escapeHtml(ORGANISATION.teacher)}</div>
    </section>
    <main class="note-content">${formattedContent}</main>
    ${stampHtml}
    <footer class="document-footer">
      <div><span class="footer-brand">${escapeHtml(ORGANISATION.name)}</span> — Educational Course Material</div>
      <div>${escapeHtml(ORGANISATION.website)} &nbsp;|&nbsp; ${escapeHtml(ORGANISATION.phone)}</div>
      <div>Printed on ${escapeHtml(printDate)}</div>
    </footer>
  </div>
  <script>
    window.onload = function () {
      setTimeout(function () {
        window.print();
      }, 300);
    };
  <\/script>
</body>
</html>
`;

        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    }, [
        textContent,
        isLoading,
        title,
        stampEnabled,
        stampColor,
        stampText,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Download Handler
    |--------------------------------------------------------------------------
    */

    const handleDownload = useCallback(() => {
        if (!textContent) {
            alert("No content to download.");
            return;
        }

        const fileName = downloadFileName || `${title}.txt`;
        const blob = new Blob([textContent], {
            type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [textContent, downloadFileName, title]);

    /*
    |--------------------------------------------------------------------------
    | Button State
    |--------------------------------------------------------------------------
    */

    const isDisabled = isLoading || !!error || !textContent;

    /*
    |--------------------------------------------------------------------------
    | Component UI
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className={clsx(
                "flex flex-wrap items-center justify-end gap-3",
                className
            )}
        >
            {/* Print Button */}
            <button
                onClick={handlePrint}
                disabled={isDisabled}
                className={clsx(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl",
                    "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-800/50",
                    "text-indigo-700 dark:text-indigo-300",
                    "border border-indigo-200/60 dark:border-indigo-700/40",
                    "text-sm font-medium",
                    "transition-all duration-300",
                    "hover:shadow-md hover:shadow-indigo-500/20 dark:hover:shadow-indigo-400/20",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    {
                        "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none": isDisabled,
                    }
                )}
            >
                {/* Printer Icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                {isLoading ? "Loading…" : error ? "Error" : buttonText}
            </button>

            {/* Download Button */}
            {showDownload && (
                <button
                    onClick={handleDownload}
                    disabled={isDisabled}
                    className={clsx(
                        "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl",
                        "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:hover:bg-emerald-800/50",
                        "text-emerald-700 dark:text-emerald-300",
                        "border border-emerald-200/60 dark:border-emerald-700/40",
                        "text-sm font-medium",
                        "transition-all duration-300",
                        "hover:shadow-md hover:shadow-emerald-500/20 dark:hover:shadow-emerald-400/20",
                        "hover:scale-[1.02] active:scale-[0.98]",
                        {
                            "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none": isDisabled,
                        }
                    )}
                >
                    {/* Download Icon */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {isLoading ? "Loading…" : error ? "Error" : downloadButtonText}
                </button>
            )}

            {/* Error message (if any) */}
            {error && (
                <span className="text-xs text-red-500 ml-2 w-full text-right">
                    {error}
                </span>
            )}
        </div>
    );
};

export default PlainTextPrint;