import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  QrCode,
  Globe,
  FileText,
  Wifi,
  CreditCard,
  MessageCircle,
  Mail,
  User,
  Phone,
  Download,
  Copy,
  Check,
  Printer,
  Upload,
  Trash2,
  Sparkles,
  Palette,
  Settings2,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  Info,
  Sliders,
  Layers
} from 'lucide-react';

const DEFAULT_LOGO = '/assets/cnat.png';
const MAITRI_LOGO = '/assets/maitri-mahotsav-27.png';

// Curated contrast color presets
const COLOR_PRESETS = [
  { id: 'slate', name: 'Classic Slate', dark: '#0f172a', light: '#ffffff', border: '#cbd5e1' },
  { id: 'cyan', name: 'Cyber Cyan', dark: '#082f49', light: '#ecfeff', border: '#a5f3fc' },
  { id: 'emerald', name: 'Emerald Mint', dark: '#064e3b', light: '#ecfdf5', border: '#a7f3d0' },
  { id: 'indigo', name: 'Royal Indigo', dark: '#1e1b4b', light: '#eef2ff', border: '#c7d2fe' },
  { id: 'rose', name: 'Crimson Rose', dark: '#4c0519', light: '#fff1f2', border: '#fecdd3' },
  { id: 'amber', name: 'Warm Amber', dark: '#451a03', light: '#fffbeb', border: '#fde68a' },
  { id: 'neon', name: 'Inverted Dark', dark: '#22d3ee', light: '#090d16', border: '#1e293b' },
];

const CONTENT_TYPES = [
  { id: 'url', label: 'Website URL', icon: Globe, desc: 'Web addresses, articles, links' },
  { id: 'text', label: 'Plain Text', icon: FileText, desc: 'Notes, serials, raw information' },
  { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi, desc: '1-tap instant network connect' },
  { id: 'upi', label: 'UPI Payment', icon: CreditCard, desc: 'GPay, PhonePe, Paytm, BHIM' },
  { id: 'whatsapp', label: 'WhatsApp Chat', icon: MessageCircle, desc: 'Direct message with prefill text' },
  { id: 'email', label: 'Email Draft', icon: Mail, desc: 'Recipient, subject and body' },
  { id: 'vcard', label: 'Contact Card', icon: User, desc: 'vCard 3.0 phonebook entry' },
  { id: 'sms', label: 'SMS / Phone', icon: Phone, desc: 'Direct SMS message or call' },
];

const RESOLUTIONS = [
  { size: 256, label: '256px', tag: 'Standard' },
  { size: 512, label: '512px', tag: 'HD' },
  { size: 1024, label: '1024px', tag: 'Ultra HD' },
  { size: 2048, label: '2048px', tag: 'Print Ready' },
];

const QRCodeGenerator = () => {
  const navigate = useNavigate();

  // Navigation tab for configuration
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'appearance' | 'logo' | 'specs'
  const [contentType, setContentType] = useState('url');

  // Title / Label
  const [title, setTitle] = useState('');

  // Form states per type
  const [urlData, setUrlData] = useState({
    url: 'https://coderandaccotax.com',
  });

  const [textData, setTextData] = useState({
    text: 'Welcome to Coder & AccoTax!',
  });

  const [wifiData, setWifiData] = useState({
    ssid: 'CoderAccoTax_Guest',
    password: '',
    encryption: 'WPA',
    hidden: false,
    showPassword: false,
  });

  const [upiData, setUpiData] = useState({
    pa: 'coderaccotax@okhdfcbank',
    pn: 'Coder & AccoTax',
    am: '',
    tn: 'Course Admission',
  });

  const [whatsappData, setWhatsappData] = useState({
    phone: '919830000000',
    message: 'Hello Coder & AccoTax! I would like to inquire about upcoming training courses.',
  });

  const [emailData, setEmailData] = useState({
    to: 'info@coderandaccotax.com',
    subject: 'Course Information Inquiry',
    body: 'Hello Team,\n\nI am interested in learning more about your professional training programs.\n\nThank you.',
  });

  const [vcardData, setVcardData] = useState({
    firstName: 'Sukanta',
    lastName: 'Hui',
    org: 'Coder & AccoTax',
    title: 'Director & Lead Trainer',
    phone: '+91 98300 00000',
    email: 'contact@coderandaccotax.com',
    url: 'https://coderandaccotax.com',
  });

  const [smsData, setSmsData] = useState({
    mode: 'sms', // 'sms' | 'tel'
    phone: '+919830000000',
    message: 'Hello, requesting a callback regarding Coder & AccoTax courses.',
  });

  // Styling states
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [activePreset, setActivePreset] = useState('slate');
  const [margin, setMargin] = useState(2); // Quiet zone
  const [ecc, setEcc] = useState('H'); // 'L' | 'M' | 'Q' | 'H'
  const [downloadSize, setDownloadSize] = useState(1024);

  // Logo states
  const [logoMode, setLogoMode] = useState('cnat'); // 'cnat' | 'custom' | 'none'
  const [customLogoUrl, setCustomLogoUrl] = useState(null);
  const [logoSizePercent, setLogoSizePercent] = useState(22); // 15 to 28
  const [logoShape, setLogoShape] = useState('circle'); // 'circle' | 'rounded'
  const [badgeBg, setBadgeBg] = useState('#ffffff');

  // Preview & Engine refs
  const canvasRef = useRef(null);
  const [loadedDefaultImg, setLoadedDefaultImg] = useState(null);
  const [loadedMaitriImg, setLoadedMaitriImg] = useState(null);
  const [loadedCustomImg, setLoadedCustomImg] = useState(null);
  const [defaultLogoDataUrl, setDefaultLogoDataUrl] = useState(null);
  const [maitriLogoDataUrl, setMaitriLogoDataUrl] = useState(null);
  const [error, setError] = useState('');
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showRawPayload, setShowRawPayload] = useState(false);

  // Preload logos
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setLoadedDefaultImg(img);
      // Generate base64 data URL for self-contained SVGs
      try {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = img.naturalWidth || 150;
        offCanvas.height = img.naturalHeight || 150;
        const ctx = offCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        setDefaultLogoDataUrl(offCanvas.toDataURL('image/png'));
      } catch (e) {
        console.warn('Could not generate base64 default logo for SVG embedding', e);
      }
    };
    img.onerror = () => {
      console.warn('Default logo could not be loaded at:', DEFAULT_LOGO);
    };
    img.src = DEFAULT_LOGO;

    const imgMaitri = new Image();
    imgMaitri.crossOrigin = 'anonymous';
    imgMaitri.onload = () => {
      setLoadedMaitriImg(imgMaitri);
      try {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = imgMaitri.naturalWidth || 300;
        offCanvas.height = imgMaitri.naturalHeight || 100;
        const ctx = offCanvas.getContext('2d');
        ctx.drawImage(imgMaitri, 0, 0);
        setMaitriLogoDataUrl(offCanvas.toDataURL('image/png'));
      } catch (e) {
        console.warn('Could not generate base64 maitri logo for SVG embedding', e);
      }
    };
    imgMaitri.onerror = () => {
      console.warn('Maitri logo could not be loaded at:', MAITRI_LOGO);
    };
    imgMaitri.src = MAITRI_LOGO;
  }, []);

  // Compute standard payload string based on active content type
  const computedPayload = useMemo(() => {
    switch (contentType) {
      case 'url': {
        const trimmed = (urlData.url || '').trim();
        if (!trimmed) return 'https://example.com';
        if (!/^https?:\/\//i.test(trimmed)) {
          return `https://${trimmed}`;
        }
        return trimmed;
      }
      case 'text':
        return textData.text || ' ';

      case 'wifi': {
        const { ssid, password, encryption, hidden } = wifiData;
        const enc = encryption || 'nopass';
        const p = enc === 'nopass' ? '' : password || '';
        const h = hidden ? 'true' : 'false';
        return `WIFI:T:${enc};S:${ssid || 'Network'};P:${p};H:${h};;`;
      }

      case 'upi': {
        const { pa, pn, am, tn } = upiData;
        const cleanPa = (pa || '').trim();
        const cleanPn = (pn || '').trim() || 'Merchant';
        let str = `upi://pay?pa=${encodeURIComponent(cleanPa)}&pn=${encodeURIComponent(cleanPn)}&cu=INR`;
        if (am && !isNaN(Number(am)) && Number(am) > 0) {
          str += `&am=${encodeURIComponent(Number(am).toFixed(2))}`;
        }
        if (tn && tn.trim()) {
          str += `&tn=${encodeURIComponent(tn.trim())}`;
        }
        return str;
      }

      case 'whatsapp': {
        const cleanPhone = (whatsappData.phone || '').replace(/[^0-9]/g, '');
        const msg = whatsappData.message ? encodeURIComponent(whatsappData.message) : '';
        return `https://wa.me/${cleanPhone}${msg ? `?text=${msg}` : ''}`;
      }

      case 'email': {
        const { to, subject, body } = emailData;
        const cleanTo = (to || '').trim();
        const sub = subject ? encodeURIComponent(subject) : '';
        const b = body ? encodeURIComponent(body) : '';
        let str = `mailto:${cleanTo}`;
        const params = [];
        if (sub) params.push(`subject=${sub}`);
        if (b) params.push(`body=${b}`);
        if (params.length > 0) str += `?${params.join('&')}`;
        return str;
      }

      case 'vcard': {
        const { firstName, lastName, org, title: jobTitle, phone, email, url } = vcardData;
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `N:${lastName || ''};${firstName || ''};;;`,
          `FN:${[firstName, lastName].filter(Boolean).join(' ')}`,
          org ? `ORG:${org}` : '',
          jobTitle ? `TITLE:${jobTitle}` : '',
          phone ? `TEL;TYPE=CELL:${phone}` : '',
          email ? `EMAIL:${email}` : '',
          url ? `URL:${url}` : '',
          'END:VCARD',
        ]
          .filter(Boolean)
          .join('\n');
      }

      case 'sms': {
        const { mode, phone, message } = smsData;
        const cleanPhone = (phone || '').trim();
        if (mode === 'tel') {
          return `tel:${cleanPhone}`;
        }
        return `smsto:${cleanPhone}:${message || ''}`;
      }

      default:
        return 'https://example.com';
    }
  }, [contentType, urlData, textData, wifiData, upiData, whatsappData, emailData, vcardData, smsData]);

  // Active logo image object for drawing
  const currentLogoImage = useMemo(() => {
    if (logoMode === 'cnat') return loadedDefaultImg;
    if (logoMode === 'maitri') return loadedMaitriImg;
    if (logoMode === 'custom') return loadedCustomImg;
    return null;
  }, [logoMode, loadedDefaultImg, loadedMaitriImg, loadedCustomImg]);

  // Active logo data URL or source for SVG embedding
  const currentLogoSrc = useMemo(() => {
    if (logoMode === 'cnat') return defaultLogoDataUrl || DEFAULT_LOGO;
    if (logoMode === 'maitri') return maitriLogoDataUrl || MAITRI_LOGO;
    if (logoMode === 'custom') return customLogoUrl;
    return null;
  }, [logoMode, defaultLogoDataUrl, maitriLogoDataUrl, customLogoUrl]);

  // Re-draw canvas whenever dependencies change
  useEffect(() => {
    let isCancelled = false;

    const renderPreview = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!computedPayload || !computedPayload.trim()) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setError('');
        return;
      }

      try {
        // Enforce ECC Level 'H' or 'Q' if logo is enabled for reliable scanning
        const effectiveEcc = logoMode !== 'none' && (ecc === 'L' || ecc === 'M') ? 'H' : ecc;

        // 1. Render base QR code onto preview canvas (fixed 320x320 for crisp retina)
        await QRCode.toCanvas(canvas, computedPayload, {
          width: 320,
          margin: margin,
          errorCorrectionLevel: effectiveEcc,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });

        if (isCancelled) return;

        // 2. Draw logo badge if active
        if (logoMode !== 'none' && currentLogoImage) {
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          const qrSize = canvas.width;
          const logoSize = Math.round(qrSize * (logoSizePercent / 100));
          const badgeSize = Math.round(logoSize * 1.2);
          const badgeX = (qrSize - badgeSize) / 2;
          const badgeY = (qrSize - badgeSize) / 2;
          const imgX = (qrSize - logoSize) / 2;
          const imgY = (qrSize - logoSize) / 2;

          ctx.save();

          // Background badge with shadow
          ctx.fillStyle = badgeBg;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
          ctx.shadowBlur = 6;
          ctx.shadowOffsetY = 2;

          if (logoShape === 'circle') {
            ctx.beginPath();
            ctx.arc(qrSize / 2, qrSize / 2, badgeSize / 2, 0, Math.PI * 2);
            ctx.fill();

            // Border ring
            ctx.shadowColor = 'transparent';
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#e2e8f0';
            ctx.stroke();

            // Clip for image
            ctx.beginPath();
            ctx.arc(qrSize / 2, qrSize / 2, logoSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(currentLogoImage, imgX, imgY, logoSize, logoSize);
          } else {
            // Rounded square
            const radius = Math.round(badgeSize * 0.22);
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, radius);
            } else {
              ctx.rect(badgeX, badgeY, badgeSize, badgeSize);
            }
            ctx.fill();

            // Border ring
            ctx.shadowColor = 'transparent';
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#e2e8f0';
            ctx.stroke();

            // Draw image
            ctx.drawImage(currentLogoImage, imgX, imgY, logoSize, logoSize);
          }

          ctx.restore();
        }

        setError('');
      } catch (err) {
        if (!isCancelled) {
          console.error('QR Render error:', err);
          setError(err.message || 'Payload exceeds QR capacity or format is invalid.');
        }
      }
    };

    renderPreview();

    return () => {
      isCancelled = true;
    };
  }, [
    computedPayload,
    fgColor,
    bgColor,
    margin,
    ecc,
    logoMode,
    currentLogoImage,
    logoSizePercent,
    logoShape,
    badgeBg,
  ]);

  // Preset color selector
  const handleSelectPreset = (preset) => {
    setActivePreset(preset.id);
    setFgColor(preset.dark);
    setBgColor(preset.light);
  };

  // Custom logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCustomLogoUrl(dataUrl);
      const img = new Image();
      img.onload = () => {
        setLoadedCustomImg(img);
        setLogoMode('custom');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Render high-resolution off-screen canvas for export
  const generateExportCanvas = async (targetPx) => {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = targetPx;
    offCanvas.height = targetPx;

    const effectiveEcc = logoMode !== 'none' && (ecc === 'L' || ecc === 'M') ? 'H' : ecc;

    await QRCode.toCanvas(offCanvas, computedPayload, {
      width: targetPx,
      margin: margin,
      errorCorrectionLevel: effectiveEcc,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    });

    if (logoMode !== 'none' && currentLogoImage) {
      const ctx = offCanvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const logoSize = Math.round(targetPx * (logoSizePercent / 100));
      const badgeSize = Math.round(logoSize * 1.2);
      const badgeX = (targetPx - badgeSize) / 2;
      const badgeY = (targetPx - badgeSize) / 2;
      const imgX = (targetPx - logoSize) / 2;
      const imgY = (targetPx - logoSize) / 2;

      ctx.save();
      ctx.fillStyle = badgeBg;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = Math.max(6, Math.round(targetPx * 0.015));
      ctx.shadowOffsetY = Math.max(2, Math.round(targetPx * 0.005));

      if (logoShape === 'circle') {
        ctx.beginPath();
        ctx.arc(targetPx / 2, targetPx / 2, badgeSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.lineWidth = Math.max(2, Math.round(targetPx * 0.006));
        ctx.strokeStyle = '#e2e8f0';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(targetPx / 2, targetPx / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(currentLogoImage, imgX, imgY, logoSize, logoSize);
      } else {
        const radius = Math.round(badgeSize * 0.22);
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, radius);
        } else {
          ctx.rect(badgeX, badgeY, badgeSize, badgeSize);
        }
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.lineWidth = Math.max(2, Math.round(targetPx * 0.006));
        ctx.strokeStyle = '#e2e8f0';
        ctx.stroke();

        ctx.drawImage(currentLogoImage, imgX, imgY, logoSize, logoSize);
      }

      ctx.restore();
    }

    return offCanvas;
  };

  const sanitizeFilename = (name) => {
    return name.replace(/[^a-z0-9_-]/gi, '_').toLowerCase() || 'qrcode';
  };

  // Export handlers
  const handleDownloadPNG = async (size = downloadSize) => {
    try {
      setIsExporting(true);
      const exportCanvas = await generateExportCanvas(size);
      const dataUrl = exportCanvas.toDataURL('image/png');
      const filename = `${sanitizeFilename(title || `${contentType}-qrcode`)}-${size}px.png`;
      const a = document.createElement('a');
      a.download = filename;
      a.href = dataUrl;
      a.click();
    } catch (err) {
      console.error('PNG download error:', err);
      alert('Error downloading PNG: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadJPEG = async (size = downloadSize) => {
    try {
      setIsExporting(true);
      const exportCanvas = await generateExportCanvas(size);
      const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.95);
      const filename = `${sanitizeFilename(title || `${contentType}-qrcode`)}-${size}px.jpg`;
      const a = document.createElement('a');
      a.download = filename;
      a.href = dataUrl;
      a.click();
    } catch (err) {
      console.error('JPEG download error:', err);
      alert('Error downloading JPEG: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSVG = async () => {
    try {
      setIsExporting(true);
      const effectiveEcc = logoMode !== 'none' && (ecc === 'L' || ecc === 'M') ? 'H' : ecc;

      const rawSvg = await QRCode.toString(computedPayload, {
        type: 'svg',
        margin: margin,
        errorCorrectionLevel: effectiveEcc,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });

      let finalSvg = rawSvg;

      // Embed logo badge if enabled
      if (logoMode !== 'none' && currentLogoSrc) {
        const match = rawSvg.match(/viewBox="0 0 (\d+) (\d+)"/);
        if (match) {
          const vbSize = parseInt(match[1], 10);
          const logoSize = vbSize * (logoSizePercent / 100);
          const badgeSize = logoSize * 1.2;
          const badgeX = (vbSize - badgeSize) / 2;
          const badgeY = (vbSize - badgeSize) / 2;
          const imgX = (vbSize - logoSize) / 2;
          const imgY = (vbSize - logoSize) / 2;

          let badgeElements = '';
          if (logoShape === 'circle') {
            badgeElements = `
              <circle cx="${vbSize / 2}" cy="${vbSize / 2}" r="${badgeSize / 2}" fill="${badgeBg}" stroke="#cbd5e1" stroke-width="0.3" filter="drop-shadow(0 1px 1px rgba(0,0,0,0.2))" />
              <clipPath id="logo-circle-clip">
                <circle cx="${vbSize / 2}" cy="${vbSize / 2}" r="${logoSize / 2}" />
              </clipPath>
              <image href="${currentLogoSrc}" x="${imgX}" y="${imgY}" width="${logoSize}" height="${logoSize}" clip-path="url(#logo-circle-clip)" preserveAspectRatio="xMidYMid meet" />
            `;
          } else {
            const rx = badgeSize * 0.22;
            badgeElements = `
              <rect x="${badgeX}" y="${badgeY}" width="${badgeSize}" height="${badgeSize}" rx="${rx}" fill="${badgeBg}" stroke="#cbd5e1" stroke-width="0.3" filter="drop-shadow(0 1px 1px rgba(0,0,0,0.2))" />
              <image href="${currentLogoSrc}" x="${imgX}" y="${imgY}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet" />
            `;
          }

          finalSvg = rawSvg.replace('</svg>', `${badgeElements}</svg>`);
        }
      }

      const blob = new Blob([finalSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sanitizeFilename(title || `${contentType}-qrcode`)}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('SVG download error:', err);
      alert('Error generating SVG: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const exportCanvas = await generateExportCanvas(1024);
      exportCanvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Could not render image blob');
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        } catch (clipboardErr) {
          console.warn('Image clipboard write failed, copying raw text payload instead:', clipboardErr);
          await navigator.clipboard.writeText(computedPayload);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
    }
  };

  const handlePrint = async () => {
    try {
      const exportCanvas = await generateExportCanvas(1024);
      const dataUrl = exportCanvas.toDataURL('image/png');

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to print your QR code.');
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title || 'QR Code'} - Print</title>
            <style>
              @page { size: auto; margin: 20mm; }
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                text-align: center;
                color: #0f172a;
                background: #ffffff;
                margin: 0;
                padding: 40px;
              }
              .card {
                max-width: 480px;
                margin: 0 auto;
                border: 2px dashed #94a3b8;
                border-radius: 20px;
                padding: 32px;
              }
              .title { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
              .subtitle { font-size: 14px; color: #64748b; margin-bottom: 24px; }
              .qr-img { width: 320px; height: 320px; margin: 0 auto 20px; display: block; }
              .caption { font-size: 13px; color: #64748b; margin-top: 16px; word-break: break-all; }
              .footer { margin-top: 24px; font-size: 12px; color: #94a3b8; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="title">${title || 'Scan Me'}</div>
              <div class="subtitle">${CONTENT_TYPES.find((t) => t.id === contentType)?.label || 'Quick Scan'}</div>
              <img src="${dataUrl}" class="qr-img" alt="QR Code" />
              <div class="caption">Point your camera or QR scanner app to scan.</div>
              <div class="footer">Generated via Coder & AccoTax QR Studio</div>
            </div>
            <script>
              window.onload = function() {
                window.focus();
                window.print();
                setTimeout(() => window.close(), 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (err) {
      console.error('Print error:', err);
    }
  };

  const handleReset = () => {
    setUrlData({ url: 'https://coderandaccotax.com' });
    setTextData({ text: 'Welcome to Coder & AccoTax!' });
    setWifiData({ ssid: 'CoderAccoTax_Guest', password: '', encryption: 'WPA', hidden: false, showPassword: false });
    setUpiData({ pa: 'coderaccotax@okhdfcbank', pn: 'Coder & AccoTax', am: '', tn: 'Course Admission' });
    setWhatsappData({ phone: '919830000000', message: 'Hello Coder & AccoTax!' });
    setEmailData({ to: 'info@coderandaccotax.com', subject: 'Inquiry', body: 'Hello,\n\nI would like more information.' });
    setVcardData({ firstName: 'Sukanta', lastName: 'Hui', org: 'Coder & AccoTax', title: 'Director', phone: '+919830000000', email: 'contact@coderandaccotax.com', url: 'https://coderandaccotax.com' });
    setSmsData({ mode: 'sms', phone: '+919830000000', message: 'Hello!' });
    setTitle('');
    setFgColor('#0f172a');
    setBgColor('#ffffff');
    setActivePreset('slate');
    setMargin(2);
    setEcc('H');
    setLogoMode('cnat');
    setLogoSizePercent(22);
    setLogoShape('circle');
    setBadgeBg('#ffffff');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Ambient background glow elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight text-white">QR Code Studio</h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Pro Edition
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  High-resolution vector & raster QR generator with custom branding
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition"
              title="Reset all fields to defaults"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration Controls (7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Title Card */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="qr-title" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  QR Code Label / Title <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <span className="text-xs text-slate-500">Appears on preview & printed tickets</span>
              </div>
              <input
                id="qr-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Coder & AccoTax Wifi, Event Registration, Menu Pass..."
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition"
              />
            </div>

            {/* Studio Navigation Tabs */}
            <div className="flex border-b border-slate-800/80 gap-1 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'content', label: '1. Content Type', icon: Layers },
                { id: 'appearance', label: '2. Colors & Style', icon: Palette },
                { id: 'logo', label: '3. Logo & Branding', icon: Sparkles },
                { id: 'specs', label: '4. Specs & ECC', icon: ShieldCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: CONTENT TYPE & INPUTS */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Content Type Selector Grid */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Select Data Format
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {CONTENT_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = contentType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setContentType(type.id)}
                          className={`p-3 rounded-xl text-left border transition flex flex-col justify-between min-h-[82px] ${
                            isSelected
                              ? 'bg-gradient-to-br from-cyan-950/70 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                              : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <Icon
                              className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`}
                            />
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            )}
                          </div>
                          <div>
                            <div
                              className={`text-xs font-semibold ${
                                isSelected ? 'text-white' : 'text-slate-300'
                              }`}
                            >
                              {type.label}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">{type.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DYNAMIC FORM PER TYPE */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm space-y-4">
                  {/* --- 1. URL --- */}
                  {contentType === 'url' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                          Destination Website URL
                        </label>
                        <div className="flex rounded-xl overflow-hidden border border-slate-800 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                          <span className="px-3.5 py-2.5 bg-slate-950 text-slate-400 text-xs font-mono flex items-center border-r border-slate-800">
                            https://
                          </span>
                          <input
                            type="text"
                            value={urlData.url.replace(/^https?:\/\//i, '')}
                            onChange={(e) => setUrlData({ ...urlData, url: e.target.value })}
                            placeholder="coderandaccotax.com"
                            className="flex-1 px-4 py-2.5 bg-slate-950/80 text-sm text-white placeholder-slate-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Quick URL samples */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs text-slate-500">Quick suggestions:</span>
                        {[
                          { label: 'CNAT Home', val: 'https://coderandaccotax.com' },
                          { label: 'Facebook Page', val: 'https://www.facebook.com/profile.php?id=61561702110617' },
                          { label: 'Instagram', val: 'https://www.instagram.com/codernaccotax' },
                          { label: 'Courses', val: 'https://coderandaccotax.com/courses' },
                          { label: 'Google Review', val: 'https://g.page/r/coderaccotax/review' },
                        ].map((s) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => setUrlData({ url: s.val })}
                            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition"
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* --- 2. PLAIN TEXT --- */}
                  {contentType === 'text' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                          Plain Text / Message Content
                        </label>
                        <span className="text-xs text-slate-500">
                          {textData.text.length} characters
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        value={textData.text}
                        onChange={(e) => setTextData({ text: e.target.value })}
                        placeholder="Enter your message, code snippet, serial number or instructions here..."
                        className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-mono transition"
                      />
                    </div>
                  )}

                  {/* --- 3. WI-FI NETWORK --- */}
                  {contentType === 'wifi' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                          Network Name (SSID)
                        </label>
                        <input
                          type="text"
                          value={wifiData.ssid}
                          onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                          placeholder="e.g., Office_WiFi_5G"
                          className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
                        />
                      </div>

                      {wifiData.encryption !== 'nopass' && (
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type={wifiData.showPassword ? 'text' : 'password'}
                              value={wifiData.password}
                              onChange={(e) =>
                                setWifiData({ ...wifiData, password: e.target.value })
                              }
                              placeholder="Enter network password"
                              className="w-full px-4 py-2.5 pr-10 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-mono transition"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setWifiData({ ...wifiData, showPassword: !wifiData.showPassword })
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            >
                              {wifiData.showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                            Encryption Security
                          </label>
                          <select
                            value={wifiData.encryption}
                            onChange={(e) =>
                              setWifiData({ ...wifiData, encryption: e.target.value })
                            }
                            className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          >
                            <option value="WPA">WPA / WPA2 / WPA3 (Default)</option>
                            <option value="WEP">WEP (Legacy)</option>
                            <option value="nopass">None (Open Network)</option>
                          </select>
                        </div>

                        <div className="flex items-center pt-6">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={wifiData.hidden}
                              onChange={(e) =>
                                setWifiData({ ...wifiData, hidden: e.target.checked })
                              }
                              className="w-4 h-4 rounded border-slate-800 text-cyan-600 focus:ring-cyan-500 bg-slate-950"
                            />
                            <span className="text-xs text-slate-300">Hidden Network (SSID not broadcast)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- 4. UPI PAYMENT --- */}
                  {contentType === 'upi' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-xs flex items-center gap-2">
                        <CreditCard className="w-4 h-4 flex-shrink-0" />
                        <span>
                          Instant scan on Indian payment apps (GPay, PhonePe, Paytm, BHIM, Cred).
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                            UPI ID / VPA <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={upiData.pa}
                            onChange={(e) => setUpiData({ ...upiData, pa: e.target.value })}
                            placeholder="merchant@okhdfcbank"
                            className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                            Payee Business / Full Name
                          </label>
                          <input
                            type="text"
                            value={upiData.pn}
                            onChange={(e) => setUpiData({ ...upiData, pn: e.target.value })}
                            placeholder="Coder & AccoTax"
                            className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                            Amount (₹ INR) <span className="text-slate-500">(Optional)</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={upiData.am}
                            onChange={(e) => setUpiData({ ...upiData, am: e.target.value })}
                            placeholder="Leave empty to let payer enter"
                            className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                            Transaction Note / Remarks
                          </label>
                          <input
                            type="text"
                            value={upiData.tn}
                            onChange={(e) => setUpiData({ ...upiData, tn: e.target.value })}
                            placeholder="e.g., Course Fee, Invoice #1024"
                            className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- 5. WHATSAPP --- */}
                  {contentType === 'whatsapp' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                          WhatsApp Phone Number (with Country Code)
                        </label>
                        <input
                          type="tel"
                          value={whatsappData.phone}
                          onChange={(e) =>
                            setWhatsappData({ ...whatsappData, phone: e.target.value })
                          }
                          placeholder="e.g., 919830000000 (no spaces or +)"
                          className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                          Pre-filled Message
                        </label>
                        <textarea
                          rows={3}
                          value={whatsappData.message}
                          onChange={(e) =>
                            setWhatsappData({ ...whatsappData, message: e.target.value })
                          }
                          placeholder="Enter default message text to open in WhatsApp chat..."
                          className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* --- 6. EMAIL --- */}
                  {contentType === 'email' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                          Recipient Email Address
                        </label>
                        <input
                          type="email"
                          value={emailData.to}
                          onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                          placeholder="contact@company.com"
                          className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                          Subject Line
                        </label>
                        <input
                          type="text"
                          value={emailData.subject}
                          onChange={(e) =>
                            setEmailData({ ...emailData, subject: e.target.value })
                          }
                          placeholder="Inquiry regarding services"
                          className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                          Email Body Template
                        </label>
                        <textarea
                          rows={3}
                          value={emailData.body}
                          onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                          placeholder="Write pre-composed email draft..."
                          className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* --- 7. VCARD --- */}
                  {contentType === 'vcard' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={vcardData.firstName}
                            onChange={(e) =>
                              setVcardData({ ...vcardData, firstName: e.target.value })
                            }
                            placeholder="Sukanta"
                            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={vcardData.lastName}
                            onChange={(e) =>
                              setVcardData({ ...vcardData, lastName: e.target.value })
                            }
                            placeholder="Hui"
                            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-cyan-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                            Organization / Company
                          </label>
                          <input
                            type="text"
                            value={vcardData.org}
                            onChange={(e) => setVcardData({ ...vcardData, org: e.target.value })}
                            placeholder="Coder & AccoTax"
                            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                            Job Title
                          </label>
                          <input
                            type="text"
                            value={vcardData.title}
                            onChange={(e) => setVcardData({ ...vcardData, title: e.target.value })}
                            placeholder="Director"
                            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-cyan-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                            Mobile Phone
                          </label>
                          <input
                            type="tel"
                            value={vcardData.phone}
                            onChange={(e) =>
                              setVcardData({ ...vcardData, phone: e.target.value })
                            }
                            placeholder="+91 98300 00000"
                            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={vcardData.email}
                            onChange={(e) =>
                              setVcardData({ ...vcardData, email: e.target.value })
                            }
                            placeholder="contact@coderaccotax.com"
                            className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-cyan-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                          Website / Portfolio URL
                        </label>
                        <input
                          type="url"
                          value={vcardData.url}
                          onChange={(e) => setVcardData({ ...vcardData, url: e.target.value })}
                          placeholder="https://coderandaccotax.com"
                          className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* --- 8. SMS / CALL --- */}
                  {contentType === 'sms' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSmsData({ ...smsData, mode: 'sms' })}
                          className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${
                            smsData.mode === 'sms'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          Send SMS Message
                        </button>
                        <button
                          type="button"
                          onClick={() => setSmsData({ ...smsData, mode: 'tel' })}
                          className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${
                            smsData.mode === 'tel'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          Direct Phone Call (tel:)
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={smsData.phone}
                          onChange={(e) => setSmsData({ ...smsData, phone: e.target.value })}
                          placeholder="+919830000000"
                          className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>

                      {smsData.mode === 'sms' && (
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                            Pre-filled SMS Message
                          </label>
                          <textarea
                            rows={3}
                            value={smsData.message}
                            onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
                            placeholder="Enter text message..."
                            className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: APPEARANCE & COLORS */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                {/* Presets Grid */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-cyan-400" />
                      Curated Contrast Themes
                    </label>
                    <span className="text-xs text-slate-500">Tested for optical readability</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {COLOR_PRESETS.map((preset) => {
                      const isSel = activePreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                            isSel
                              ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-sm'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div
                            className="w-7 h-7 rounded-lg border flex items-center justify-center shadow-sm flex-shrink-0"
                            style={{
                              backgroundColor: preset.light,
                              borderColor: preset.border,
                            }}
                          >
                            <div
                              className="w-3.5 h-3.5 rounded"
                              style={{ backgroundColor: preset.dark }}
                            />
                          </div>
                          <span className="text-xs font-medium truncate">{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Color Pickers */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Custom Colors
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Dark / Pattern color */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-white">QR Code Pattern (Foreground)</div>
                        <div className="text-[11px] font-mono text-slate-400 uppercase">{fgColor}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={fgColor}
                          onChange={(e) => {
                            setFgColor(e.target.value);
                            setActivePreset('custom');
                          }}
                          className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                    </div>

                    {/* Light / Background color */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-white">Card Background</div>
                        <div className="text-[11px] font-mono text-slate-400 uppercase">{bgColor}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => {
                            setBgColor(e.target.value);
                            setActivePreset('custom');
                          }}
                          className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quiet Zone / Margin */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Quiet Zone (Outer Padding)
                    </label>
                    <span className="text-xs text-cyan-400 font-mono font-medium">
                      {margin} modules
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { val: 0, label: 'None (0)' },
                      { val: 1, label: 'Compact (1)' },
                      { val: 2, label: 'Standard (2)' },
                      { val: 4, label: 'Spacious (4)' },
                    ].map((m) => (
                      <button
                        key={m.val}
                        type="button"
                        onClick={() => setMargin(m.val)}
                        className={`py-2 rounded-xl text-xs font-medium border transition ${
                          margin === m.val
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LOGO & BRANDING */}
            {activeTab === 'logo' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Center Logo Branding
                      </div>
                      <div className="text-xs text-slate-500">
                        Adds a high-contrast badge in the center of the QR code
                      </div>
                    </div>
                    {logoMode !== 'none' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Logo Source Selection */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setLogoMode('cnat')}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                        logoMode === 'cnat'
                          ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <img
                        src={DEFAULT_LOGO}
                        alt="CNAT Logo"
                        className="w-7 h-7 rounded object-contain bg-white/90 p-0.5 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate">Coder & AccoTax</div>
                        <div className="text-[10px] text-slate-500 truncate">Default Brand</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLogoMode('maitri')}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                        logoMode === 'maitri'
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-md shadow-amber-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <img
                        src={MAITRI_LOGO}
                        alt="২৭ তম মৈত্রী মহোৎসব"
                        className="w-7 h-7 rounded object-contain bg-slate-900/90 p-0.5 border border-amber-400/30 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-amber-200 truncate">২৭তম মৈত্রী</div>
                        <div className="text-[10px] text-slate-400 truncate">Festival 2026</div>
                      </div>
                    </button>

                    <label
                      className={`p-3 rounded-xl border cursor-pointer text-left transition flex items-center gap-2.5 ${
                        logoMode === 'custom'
                          ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        <Upload className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate">
                          {customLogoUrl ? 'Custom Image' : 'Upload Custom'}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">PNG, JPG, SVG</div>
                      </div>
                    </label>

                    <button
                      type="button"
                      onClick={() => setLogoMode('none')}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                        logoMode === 'none'
                          ? 'bg-rose-500/10 border-rose-500 text-rose-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        <Trash2 className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate">No Logo</div>
                        <div className="text-[10px] text-slate-500 truncate">Pure QR Grid</div>
                      </div>
                    </button>
                  </div>
                </div>

                {logoMode !== 'none' && (
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
                    {/* Logo Shape */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Badge Background Shape
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setLogoShape('circle')}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                            logoShape === 'circle'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          Circular Badge
                        </button>
                        <button
                          type="button"
                          onClick={() => setLogoShape('rounded')}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                            logoShape === 'rounded'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          Rounded Square
                        </button>
                      </div>
                    </div>

                    {/* Logo Size Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                          Logo Relative Size
                        </label>
                        <span className="text-xs text-cyan-400 font-mono font-medium">
                          {logoSizePercent}% of QR code
                        </span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={28}
                        value={logoSizePercent}
                        onChange={(e) => setLogoSizePercent(Number(e.target.value))}
                        className="w-full accent-cyan-500 bg-slate-950 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>15% (Subtle)</span>
                        <span>22% (Recommended)</span>
                        <span>28% (Prominent)</span>
                      </div>
                    </div>

                    {/* Badge Background Color */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-white">Badge Protective Backing</div>
                        <div className="text-[11px] text-slate-400">Protects contrast behind logo</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400 uppercase">{badgeBg}</span>
                        <input
                          type="color"
                          value={badgeBg}
                          onChange={(e) => setBadgeBg(e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 text-xs flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                      <span>
                        Error Correction Level is automatically maintained at <strong>Level H (30%)</strong> so scanners can read every module without interference.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SPECS & RESOLUTION */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                {/* Error Correction Level */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      Error Correction Code (ECC)
                    </label>
                    <span className="text-xs text-slate-500">Redundancy for damaged scans</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { level: 'L', name: 'Low', pct: '~7% recovery', desc: 'Dense, clean' },
                      { level: 'M', name: 'Medium', pct: '~15% recovery', desc: 'Standard' },
                      { level: 'Q', name: 'Quartile', pct: '~25% recovery', desc: 'Robust' },
                      { level: 'H', name: 'High', pct: '~30% recovery', desc: 'Best for logos' },
                    ].map((item) => {
                      const isSel = ecc === item.level;
                      return (
                        <button
                          key={item.level}
                          type="button"
                          onClick={() => setEcc(item.level)}
                          className={`p-3 rounded-xl border text-left transition ${
                            isSel
                              ? 'bg-cyan-500/10 border-cyan-500 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-cyan-400">{item.level}</span>
                            <span className="text-[10px] text-slate-500">{item.name}</span>
                          </div>
                          <div className="text-xs font-medium text-slate-200">{item.pct}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Export Resolution */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Default Download Dimension
                    </label>
                    <span className="text-xs text-slate-500">Applies to PNG & JPEG files</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {RESOLUTIONS.map((res) => {
                      const isSel = downloadSize === res.size;
                      return (
                        <button
                          key={res.size}
                          type="button"
                          onClick={() => setDownloadSize(res.size)}
                          className={`p-3 rounded-xl border text-left transition ${
                            isSel
                              ? 'bg-cyan-500/10 border-cyan-500 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-mono text-sm font-semibold text-white">{res.label}</div>
                          <div className="text-[11px] text-cyan-400 mt-0.5">{res.tag}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Live Preview & Action Dock (5 Cols on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              {/* Top ambient glow inside card */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header inside preview */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Live Optical Preview
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                  {downloadSize}x{downloadSize} px
                </span>
              </div>

              {/* Title preview badge if title is set */}
              {title.trim() && (
                <div className="text-center mb-3">
                  <span className="text-sm font-bold text-white tracking-tight px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 inline-block">
                    {title}
                  </span>
                </div>
              )}

              {/* QR Code Canvas Housing with tech corner reticles */}
              <div className="relative flex justify-center items-center py-4">
                <div className="relative p-4 rounded-2xl bg-white shadow-2xl border border-slate-200/20 max-w-full">
                  {/* Modern corner bracket scan aesthetic */}
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={320}
                    className="max-w-full h-auto rounded-lg block"
                    style={{ aspectRatio: '1 / 1' }}
                  />
                </div>
              </div>

              {/* Error readout */}
              {error && (
                <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs text-center">
                  {error}
                </div>
              )}

              {/* Metadata chips */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/50">
                  Type: <strong className="text-slate-200">{contentType.toUpperCase()}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/50 font-mono">
                  ECC: <strong className="text-cyan-300">{ecc}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/50 font-mono">
                  Payload: <strong className="text-slate-200">{computedPayload.length}B</strong>
                </span>
                {logoMode !== 'none' && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/50 text-emerald-300">
                    Branded
                  </span>
                )}
              </div>

              {/* Collapsible raw string inspector */}
              <div className="mt-4 border-t border-slate-800/80 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRawPayload(!showRawPayload)}
                  className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition"
                >
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    Inspect Encoded Payload
                  </span>
                  <span>{showRawPayload ? 'Hide ▲' : 'Show ▼'}</span>
                </button>

                {showRawPayload && (
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 relative group">
                    <div className="text-[11px] font-mono text-slate-300 break-all max-h-24 overflow-y-auto pr-8">
                      {computedPayload}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(computedPayload);
                        setCopiedPayload(true);
                        setTimeout(() => setCopiedPayload(false), 2000);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
                      title="Copy encoded raw text"
                    >
                      {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>

              {/* PRIMARY DOWNLOAD & EXPORT DOCK */}
              <div className="mt-6 space-y-3">
                {/* Master Action: PNG Download */}
                <button
                  type="button"
                  onClick={() => handleDownloadPNG(downloadSize)}
                  disabled={isExporting || Boolean(error)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PNG ({downloadSize}px)</span>
                </button>

                {/* Secondary Actions Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {/* SVG Vector */}
                  <button
                    type="button"
                    onClick={handleDownloadSVG}
                    disabled={isExporting || Boolean(error)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 active:scale-[0.99] text-slate-200 border border-slate-700/80 font-medium text-xs transition flex items-center justify-center gap-2"
                    title="Infinite scalability without pixelation"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Vector (SVG)</span>
                  </button>

                  {/* JPEG */}
                  <button
                    type="button"
                    onClick={() => handleDownloadJPEG(downloadSize)}
                    disabled={isExporting || Boolean(error)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 active:scale-[0.99] text-slate-200 border border-slate-700/80 font-medium text-xs transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>JPEG Image</span>
                  </button>

                  {/* Copy Image to Clipboard */}
                  <button
                    type="button"
                    onClick={handleCopyToClipboard}
                    disabled={isExporting || Boolean(error)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 active:scale-[0.99] text-slate-200 border border-slate-700/80 font-medium text-xs transition flex items-center justify-center gap-2"
                    title="Copy directly to paste into Word, Figma, Photoshop, WhatsApp Web"
                  >
                    {copySuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied Image!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Copy Image</span>
                      </>
                    )}
                  </button>

                  {/* Print QR Code */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    disabled={isExporting || Boolean(error)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 active:scale-[0.99] text-slate-200 border border-slate-700/80 font-medium text-xs transition flex items-center justify-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Print Card</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick helper tip */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-300">Scanning tip:</strong> When using custom logos,
                ensure high contrast between your foreground pattern and badge background. High ECC
                level ensures 100% read reliability.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRCodeGenerator;