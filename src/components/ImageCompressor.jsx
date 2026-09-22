import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  Download,
  Sliders,
  Image as ImageIcon,
  Minimize2,
  Maximize2,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  FileArchive,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  Lock,
  Unlock,
  AlertCircle,
  Eye,
  Trash2,
  HelpCircle,
  Scissors
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// Dimension Presets
const PRESET_DIMENSIONS = [
  { id: "custom", label: "Custom Resolution", width: null, height: null, category: "custom" },
  { id: "passport", label: "Passport / Exam Photo", width: 413, height: 531, aspect: "3.5:4.5", desc: "Standard 3.5×4.5cm for exams, UPSC, SSC, Visa" },
  { id: "signature", label: "Signature Scan", width: 200, height: 100, aspect: "2:1", desc: "Official exam/application portal signature" },
  { id: "square_insta", label: "Square (1:1)", width: 1080, height: 1080, aspect: "1:1", desc: "Instagram post, profile avatar" },
  { id: "story_reels", label: "Story / Reels (9:16)", width: 1080, height: 1920, aspect: "9:16", desc: "Instagram & TikTok full vertical" },
  { id: "full_hd", label: "Full HD (16:9)", width: 1920, height: 1080, aspect: "16:9", desc: "Desktop wallpaper, YouTube video standard" },
  { id: "hd_ready", label: "HD Ready (16:9)", width: 1280, height: 720, aspect: "16:9", desc: "YouTube thumbnail, fast web hero" },
  { id: "web_banner", label: "Web Banner / OG", width: 1200, height: 630, aspect: "1.91:1", desc: "Social media share card, website header" },
];

// Target File Size Presets
const TARGET_SIZE_PRESETS = [
  { label: "20 KB", val: 20, unit: "KB", desc: "Signatures (Govt portals)" },
  { label: "50 KB", val: 50, unit: "KB", desc: "Passport photos (UPSC, SSC)" },
  { label: "100 KB", val: 100, unit: "KB", desc: "Certificates / ID cards" },
  { label: "200 KB", val: 200, unit: "KB", desc: "Email attachments" },
  { label: "500 KB", val: 500, unit: "KB", desc: "Standard web publishing" },
  { label: "1 MB", val: 1, unit: "MB", desc: "High-res web portfolio" },
];

export default function ImageCompressor() {
  // Current active file & queue
  const [queue, setQueue] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // Settings
  const [compressionMode, setCompressionMode] = useState("targetSize"); // "targetSize" | "manualQuality"
  const [targetSizeVal, setTargetSizeVal] = useState(50);
  const [targetSizeUnit, setTargetSizeUnit] = useState("KB"); // "KB" | "MB"
  const [manualQuality, setManualQuality] = useState(80); // 1-100
  const [outputFormat, setOutputFormat] = useState("image/jpeg"); // "image/jpeg" | "image/webp" | "image/png"
  const [autoScaleIfExceeded, setAutoScaleIfExceeded] = useState(true);

  // Resolution controls
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [resizeMode, setResizeMode] = useState("contain"); // "contain" | "cover" | "exact"
  const [selectedPresetId, setSelectedPresetId] = useState("custom");

  // UI States
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [comparisonMode, setComparisonMode] = useState("split"); // "split" | "sideBySide"
  const [sliderPos, setSliderPos] = useState(50); // 0 - 100 for split comparison
  const [copied, setCopied] = useState(false);
  const [batchZipping, setBatchZipping] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  const fileInputRef = useRef(null);
  const splitContainerRef = useRef(null);
  const isDraggingSlider = useRef(false);

  const activeItem = queue[activeIdx] || null;

  // Format bytes helper
  const formatBytes = (bytes, decimals = 1) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Convert canvas to blob promise
  const canvasToBlob = (canvas, type, quality) => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), type, quality);
    });
  };

  // Process a single image with current settings
  const compressSingleImage = useCallback(
    async (item, customSettings = {}) => {
      const mode = customSettings.compressionMode || compressionMode;
      const tVal = customSettings.targetSizeVal !== undefined ? customSettings.targetSizeVal : targetSizeVal;
      const tUnit = customSettings.targetSizeUnit || targetSizeUnit;
      const mQual = customSettings.manualQuality !== undefined ? customSettings.manualQuality : manualQuality;
      const fmt = customSettings.outputFormat || outputFormat;
      const tWidth = customSettings.targetWidth !== undefined ? customSettings.targetWidth : targetWidth;
      const tHeight = customSettings.targetHeight !== undefined ? customSettings.targetHeight : targetHeight;
      const rMode = customSettings.resizeMode || resizeMode;
      const autoScale = customSettings.autoScaleIfExceeded !== undefined ? customSettings.autoScaleIfExceeded : autoScaleIfExceeded;

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = async () => {
          const startTime = performance.now();
          const origW = img.naturalWidth || img.width;
          const origH = img.naturalHeight || img.height;

          // Determine target dimensions
          let finalW = tWidth > 0 ? Math.round(tWidth) : origW;
          let finalH = tHeight > 0 ? Math.round(tHeight) : origH;

          // Offscreen canvas setup
          const drawOnCanvas = (w, h, modeToUse) => {
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // If format is JPEG, draw white background to avoid transparent black artifact
            if (fmt === "image/jpeg") {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, w, h);
            }

            if (modeToUse === "exact") {
              ctx.drawImage(img, 0, 0, w, h);
            } else if (modeToUse === "cover") {
              // Center crop
              const scale = Math.max(w / origW, h / origH);
              const nw = origW * scale;
              const nh = origH * scale;
              const ox = (w - nw) / 2;
              const oy = (h - nh) / 2;
              ctx.drawImage(img, ox, oy, nw, nh);
            } else {
              // Contain
              const scale = Math.min(w / origW, h / origH);
              const nw = origW * scale;
              const nh = origH * scale;
              const ox = (w - nw) / 2;
              const oy = (h - nh) / 2;
              ctx.drawImage(img, ox, oy, nw, nh);
            }
            return canvas;
          };

          let currentCanvas = drawOnCanvas(finalW, finalH, rMode);
          let finalBlob = null;
          let appliedQuality = 0.8;
          let scaleAdjusted = false;

          if (mode === "manualQuality" || fmt === "image/png") {
            // Manual quality slider
            appliedQuality = fmt === "image/png" ? 1.0 : Math.max(0.01, Math.min(1.0, mQual / 100));
            finalBlob = await canvasToBlob(currentCanvas, fmt, appliedQuality);
          } else {
            // Target File Size Mode (Binary Search Optimization)
            const targetBytes = (tUnit === "MB" ? tVal * 1024 * 1024 : tVal * 1024);

            let low = 0.02;
            let high = 1.0;
            let bestBlob = null;
            let bestDiff = Infinity;
            let bestQ = 0.8;

            // 8 iterations of binary search on quality
            for (let i = 0; i < 8; i++) {
              const midQ = (low + high) / 2;
              const testBlob = await canvasToBlob(currentCanvas, fmt, midQ);

              if (testBlob.size <= targetBytes) {
                // Feasible
                const diff = targetBytes - testBlob.size;
                if (diff < bestDiff) {
                  bestDiff = diff;
                  bestBlob = testBlob;
                  bestQ = midQ;
                }
                low = midQ; // try higher quality
              } else {
                high = midQ; // need lower quality
              }
            }

            // If even at minimum quality, blob size > targetBytes, try auto-scaling resolution
            if ((!bestBlob || bestBlob.size > targetBytes) && autoScale) {
              scaleAdjusted = true;
              let scaleFactor = 0.85;
              let currentW = finalW;
              let currentH = finalH;

              for (let s = 0; s < 5; s++) {
                currentW = Math.max(64, Math.round(currentW * scaleFactor));
                currentH = Math.max(64, Math.round(currentH * scaleFactor));
                const scaledCanvas = drawOnCanvas(currentW, currentH, rMode);

                const testBlob = await canvasToBlob(scaledCanvas, fmt, 0.5);
                if (testBlob.size <= targetBytes) {
                  bestBlob = testBlob;
                  bestQ = 0.5;
                  finalW = currentW;
                  finalH = currentH;
                  currentCanvas = scaledCanvas;
                  break;
                }
                scaleFactor -= 0.1;
              }
            }

            if (!bestBlob) {
              bestBlob = await canvasToBlob(currentCanvas, fmt, 0.05);
              bestQ = 0.05;
            }

            finalBlob = bestBlob;
            appliedQuality = bestQ;
          }

          const endTime = performance.now();
          const procTime = Math.round(endTime - startTime);

          const compressedUrl = URL.createObjectURL(finalBlob);
          const ext = fmt === "image/png" ? ".png" : fmt === "image/webp" ? ".webp" : ".jpg";
          const baseName = item.name.replace(/\.[^/.]+$/, "");
          const fileName = `${baseName}_compressed_${finalW}x${finalH}${ext}`;

          const percentSaved = Math.round(
            ((item.origSize - finalBlob.size) / item.origSize) * 100
          );

          resolve({
            ...item,
            status: "done",
            compressedBlob: finalBlob,
            compressedUrl,
            compressedSize: finalBlob.size,
            compressedWidth: finalW,
            compressedHeight: finalH,
            appliedQuality: Math.round(appliedQuality * 100),
            percentSaved,
            procTime,
            outputName: fileName,
            outputFormat: fmt,
            scaleAdjusted,
          });
        };

        img.onerror = () => reject(new Error("Failed to load image for processing"));
        img.src = item.originalUrl;
      });
    },
    [compressionMode, targetSizeVal, targetSizeUnit, manualQuality, outputFormat, targetWidth, targetHeight, resizeMode, autoScaleIfExceeded]
  );

  // Re-compress the active item when settings change
  const triggerActiveRecompress = useCallback(async () => {
    if (!activeItem || !activeItem.originalUrl) return;
    setIsProcessing(true);
    try {
      const updated = await compressSingleImage(activeItem);
      setQueue((prev) =>
        prev.map((item, idx) => (idx === activeIdx ? updated : item))
      );
    } catch (err) {
      console.error("Compression error:", err);
    } finally {
      setIsProcessing(false);
    }
  }, [activeItem, activeIdx, compressSingleImage]);

  // Debounced update on settings change
  useEffect(() => {
    if (!activeItem) return;
    const timer = setTimeout(() => {
      triggerActiveRecompress();
    }, 280);
    return () => clearTimeout(timer);
  }, [
    compressionMode,
    targetSizeVal,
    targetSizeUnit,
    manualQuality,
    outputFormat,
    targetWidth,
    targetHeight,
    resizeMode,
    autoScaleIfExceeded,
  ]);

  // Load new files
  const handleFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;

    const validFiles = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/")
    );
    if (validFiles.length === 0) return;

    const newItems = validFiles.map((file) => {
      const originalUrl = URL.createObjectURL(file);
      return {
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        origSize: file.size,
        origType: file.type,
        originalUrl,
        origWidth: 0,
        origHeight: 0,
        status: "pending",
        compressedBlob: null,
        compressedUrl: null,
        compressedSize: 0,
        compressedWidth: 0,
        compressedHeight: 0,
        percentSaved: 0,
        procTime: 0,
        outputName: file.name,
        outputFormat,
      };
    });

    // Inspect image sizes and initialize dimensions
    newItems.forEach((item, index) => {
      const img = new Image();
      img.onload = () => {
        item.origWidth = img.naturalWidth || img.width;
        item.origHeight = img.naturalHeight || img.height;

        // If this is the active item (first in batch), initialize target width & height
        if (index === 0 && (targetWidth === 0 || queue.length === 0)) {
          setTargetWidth(item.origWidth);
          setTargetHeight(item.origHeight);
        }

        // Compress right away
        compressSingleImage(item).then((processed) => {
          setQueue((prev) =>
            prev.map((it) => (it.id === item.id ? processed : it))
          );
        });
      };
      img.src = item.originalUrl;
    });

    setQueue((prev) => [...prev, ...newItems]);
    if (queue.length === 0) {
      setActiveIdx(0);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Clipboard Paste Support (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        handleFiles(e.clipboardData.files);
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // When active item switches, sync its dimensions into control inputs
  const selectQueueItem = (idx) => {
    setActiveIdx(idx);
    const item = queue[idx];
    if (item && item.origWidth && item.origHeight) {
      if (selectedPresetId === "custom") {
        setTargetWidth(item.origWidth);
        setTargetHeight(item.origHeight);
      }
    }
  };

  // Handle Preset selection
  const handlePresetSelect = (preset) => {
    setSelectedPresetId(preset.id);
    if (preset.width && preset.height) {
      setTargetWidth(preset.width);
      setTargetHeight(preset.height);
      setLockAspectRatio(false); // preset defines both exact dimensions
    } else if (activeItem && activeItem.origWidth) {
      setTargetWidth(activeItem.origWidth);
      setTargetHeight(activeItem.origHeight);
      setLockAspectRatio(true);
    }
  };

  // Quick scale percentage (25%, 50%, 75%, 100%, 150%, 200%)
  const handleQuickScale = (pct) => {
    if (!activeItem || !activeItem.origWidth) return;
    const nw = Math.round((activeItem.origWidth * pct) / 100);
    const nh = Math.round((activeItem.origHeight * pct) / 100);
    setSelectedPresetId("custom");
    setTargetWidth(nw);
    setTargetHeight(nh);
  };

  // Width input change with aspect ratio sync
  const handleWidthChange = (val) => {
    const w = parseInt(val, 10) || 0;
    setTargetWidth(w);
    setSelectedPresetId("custom");
    if (lockAspectRatio && activeItem && activeItem.origWidth && activeItem.origHeight && w > 0) {
      const ratio = activeItem.origHeight / activeItem.origWidth;
      setTargetHeight(Math.round(w * ratio));
    }
  };

  // Height input change with aspect ratio sync
  const handleHeightChange = (val) => {
    const h = parseInt(val, 10) || 0;
    setTargetHeight(h);
    setSelectedPresetId("custom");
    if (lockAspectRatio && activeItem && activeItem.origWidth && activeItem.origHeight && h > 0) {
      const ratio = activeItem.origWidth / activeItem.origHeight;
      setTargetWidth(Math.round(h * ratio));
    }
  };

  // Generate a high-resolution sample image for instant testing
  const loadSampleImage = () => {
    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = 1920;
    sampleCanvas.height = 1080;
    const ctx = sampleCanvas.getContext("2d");

    // Vibrant background gradient
    const grad = ctx.createLinearGradient(0, 0, 1920, 1080);
    grad.addColorStop(0, "#0f172a");
    grad.addColorStop(0.3, "#0369a1");
    grad.addColorStop(0.7, "#6366f1");
    grad.addColorStop(1, "#0284c7");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1920, 1080);

    // Decorative geometric art & lighting
    ctx.beginPath();
    ctx.arc(960, 540, 320, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(700, 380, 220, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1220, 700, 260, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(168, 85, 247, 0.2)";
    ctx.fill();

    // Sharp detailed typography
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Ultra High Resolution Sample Photo", 960, 500);

    ctx.fillStyle = "#93c5fd";
    ctx.font = "500 32px Inter, sans-serif";
    ctx.fillText("Original 1920 × 1080 • Testing Resolution & Target Size Engine", 960, 570);

    // Grid lines for edge sharpness evaluation
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    for (let x = 100; x < 1920; x += 120) {
      ctx.beginPath();
      ctx.moveTo(x, 100);
      ctx.lineTo(x, 980);
      ctx.stroke();
    }

    sampleCanvas.toBlob(
      (blob) => {
        const file = new File([blob], "sample_high_res_photo.jpg", {
          type: "image/jpeg",
        });
        handleFiles([file]);
      },
      "image/jpeg",
      0.95
    );
  };

  // Download active compressed image
  const downloadActiveImage = () => {
    if (!activeItem || !activeItem.compressedBlob) return;
    saveAs(activeItem.compressedBlob, activeItem.outputName || "compressed_image.jpg");
  };

  // Copy compressed image to clipboard
  const copyToClipboard = async () => {
    if (!activeItem || !activeItem.compressedBlob) return;
    try {
      // ClipboardItem supports image/png best across browsers
      if (activeItem.outputFormat === "image/png") {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": activeItem.compressedBlob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Convert to PNG for clipboard
        const img = new Image();
        img.onload = () => {
          const cvs = document.createElement("canvas");
          cvs.width = img.width;
          cvs.height = img.height;
          const ctx = cvs.getContext("2d");
          ctx.drawImage(img, 0, 0);
          cvs.toBlob(async (pngBlob) => {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": pngBlob }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }, "image/png");
        };
        img.src = activeItem.compressedUrl;
      }
    } catch (err) {
      console.warn("Clipboard copy fallback:", err);
      // Fallback: download
      downloadActiveImage();
    }
  };

  // Download all queue items as a ZIP
  const downloadAllZip = async () => {
    if (queue.length === 0) return;
    setBatchZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("compressed_images");

      for (let i = 0; i < queue.length; i++) {
        let it = queue[i];
        // If not compressed yet, compress now
        if (!it.compressedBlob) {
          it = await compressSingleImage(it);
        }
        folder.file(it.outputName || `image_${i + 1}.jpg`, it.compressedBlob);
      }

      const zipContent = await zip.generateAsync({ type: "blob" });
      saveAs(zipContent, `compressed_images_batch_${Date.now()}.zip`);
    } catch (err) {
      console.error("Batch ZIP error:", err);
    } finally {
      setBatchZipping(false);
    }
  };

  // Remove single item from queue
  const removeItem = (idx, e) => {
    e?.stopPropagation();
    setQueue((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      if (activeIdx >= next.length) {
        setActiveIdx(Math.max(0, next.length - 1));
      }
      return next;
    });
  };

  // Clear all items
  const clearAll = () => {
    setQueue([]);
    setActiveIdx(0);
    setTargetWidth(0);
    setTargetHeight(0);
    setSelectedPresetId("custom");
  };

  // Split Comparison Slider Drag Logic
  const handleSliderMouseDown = (e) => {
    isDraggingSlider.current = true;
    updateSliderPos(e);
  };

  const updateSliderPos = useCallback((e) => {
    if (!splitContainerRef.current) return;
    const rect = splitContainerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let newPos = ((clientX - rect.left) / rect.width) * 100;
    newPos = Math.max(0, Math.min(100, newPos));
    setSliderPos(newPos);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (isDraggingSlider.current) {
        updateSliderPos(e);
      }
    };
    const onUp = () => {
      isDraggingSlider.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateSliderPos]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-950/40 border border-slate-800/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Subtle glowing background orbs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold tracking-wide">
                <Sparkles size={14} className="animate-pulse" />
                <span>100% In-Browser Private • Instant Compression Engine</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Image Compressor &amp; Resizer
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300">
                Compress pictures to your <strong className="text-sky-300">exact desired file size (KB / MB)</strong> and <strong className="text-cyan-300">target resolution</strong>. Perfect for government forms, job portals, UPSC, SSC, passport photos, signatures, web optimization, and social media.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Zero Server Uploads</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                <Zap size={16} className="text-amber-400" />
                <span>Binary Search Size Optimizer</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                <Layers size={16} className="text-indigo-400" />
                <span>Batch Processing &amp; ZIP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        {queue.length === 0 ? (
          /* Empty State / Upload Dropzone */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-16 text-center transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[380px] ${
              isDragging
                ? "border-sky-400 bg-sky-500/10 scale-[1.01]"
                : "border-slate-800 hover:border-sky-500/50 bg-slate-900/40 hover:bg-slate-900/60"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFiles(e.target.files)}
              multiple
              accept="image/*"
              className="hidden"
            />

            <div className="w-20 h-20 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-sky-400/50 group-hover:text-sky-300 transition duration-300 shadow-xl shadow-sky-500/5">
              <Upload size={38} />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Drop images here, or <span className="text-sky-400 underline decoration-sky-500/40 underline-offset-4">browse files</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
              Supports JPEG, PNG, WebP, AVIF, GIF, BMP. You can also paste directly from clipboard with <kbd className="px-1.5 py-0.5 text-[11px] bg-slate-800 border border-slate-700 rounded text-slate-200 font-mono">Ctrl + V</kbd>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 transition cursor-pointer flex items-center gap-2"
              >
                <Upload size={16} />
                Select Photos
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  loadSampleImage();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-medium text-sm transition cursor-pointer flex items-center gap-2"
              >
                <Sparkles size={16} className="text-amber-400" />
                Try Sample Photo
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Passport (3.5×4.5cm)
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Target &lt; 50 KB / 20 KB
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Custom Resolution (W × H)
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Bulk Batch Queue
              </span>
            </div>
          </div>
        ) : (
          /* Active Compression Studio */
          <div className="space-y-6">

            {/* Top Workspace Bar (File Switcher, Batch Actions, Reset) */}
            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 shrink-0">
                  Files ({queue.length}):
                </span>
                <div className="flex items-center gap-2">
                  {queue.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => selectQueueItem(idx)}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition shrink-0 cursor-pointer ${
                        idx === activeIdx
                          ? "bg-sky-500/20 border-sky-500/40 text-sky-300"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      <span className="truncate max-w-[120px]">{item.name}</span>
                      {item.percentSaved > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                          -{item.percentSaved}%
                        </span>
                      )}
                      <span
                        onClick={(e) => removeItem(idx, e)}
                        className="hover:text-rose-400 p-0.5 rounded transition"
                        title="Remove file"
                      >
                        ✕
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-sky-400 border border-slate-700 shrink-0 flex items-center gap-1 transition cursor-pointer"
                  title="Add more files"
                >
                  <Upload size={13} />
                  <span>Add</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFiles(e.target.files)}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {queue.length > 1 && (
                  <button
                    onClick={downloadAllZip}
                    disabled={batchZipping}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                  >
                    <FileArchive size={14} />
                    <span>{batchZipping ? "Packaging ZIP..." : `Download All (${queue.length}) .ZIP`}</span>
                  </button>
                )}

                <button
                  onClick={clearAll}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition cursor-pointer flex items-center gap-1"
                >
                  <Trash2 size={13} />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Main 2-Column Layout: Controls & Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Left Column: Settings Panel (5 cols) */}
              <div className="lg:col-span-5 space-y-5">

                {/* Card 1: Desired File Size & Quality Settings */}
                <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        <Minimize2 size={16} />
                      </span>
                      <h2 className="font-bold text-sm text-white">Desired File Size &amp; Quality</h2>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Engine: Binary Search
                    </span>
                  </div>

                  {/* Mode Tabs */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setCompressionMode("targetSize")}
                      className={`py-2 px-3 rounded-lg transition cursor-pointer text-center ${
                        compressionMode === "targetSize"
                          ? "bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Target File Size (KB/MB)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompressionMode("manualQuality")}
                      className={`py-2 px-3 rounded-lg transition cursor-pointer text-center ${
                        compressionMode === "manualQuality"
                          ? "bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Manual Quality (%)
                    </button>
                  </div>

                  {/* Mode A: Target Size Controls */}
                  {compressionMode === "targetSize" ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Maximum File Size Limit:
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            max="50000"
                            value={targetSizeVal}
                            onChange={(e) => setTargetSizeVal(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-2 text-sm text-white font-mono font-medium outline-none transition"
                            placeholder="e.g. 50"
                          />
                          <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => setTargetSizeUnit("KB")}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                targetSizeUnit === "KB"
                                  ? "bg-sky-500 text-white"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              KB
                            </button>
                            <button
                              type="button"
                              onClick={() => setTargetSizeUnit("MB")}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                targetSizeUnit === "MB"
                                  ? "bg-sky-500 text-white"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              MB
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quick Target Size Chips */}
                      <div>
                        <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                          Common Portal Presets:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {TARGET_SIZE_PRESETS.map((p) => (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => {
                                setTargetSizeVal(p.val);
                                setTargetSizeUnit(p.unit);
                              }}
                              className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border text-center transition cursor-pointer ${
                                targetSizeVal === p.val && targetSizeUnit === p.unit
                                  ? "bg-sky-500/20 border-sky-500/40 text-sky-300 font-semibold"
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                              }`}
                              title={p.desc}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Auto scale down checkbox */}
                      <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-300 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={autoScaleIfExceeded}
                          onChange={(e) => setAutoScaleIfExceeded(e.target.checked)}
                          className="mt-0.5 rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0"
                        />
                        <span>
                          <strong className="text-slate-200">Auto-scale resolution</strong> if file size exceeds target even at lowest quality setting
                        </span>
                      </label>
                    </div>
                  ) : (
                    /* Mode B: Manual Quality Slider */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Quality Level:</span>
                        <span className="font-mono text-sky-300 font-bold text-sm bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                          {manualQuality}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={manualQuality}
                        onChange={(e) => setManualQuality(parseInt(e.target.value, 10))}
                        className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>Smallest File (5%)</span>
                        <span>Balanced (80%)</span>
                        <span>Best Quality (100%)</span>
                      </div>
                    </div>
                  )}

                  {/* Output Format Selector */}
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Output Format:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "image/jpeg", label: "JPEG / JPG", note: "Govt / Exams" },
                        { id: "image/webp", label: "WebP", note: "Best Speed" },
                        { id: "image/png", label: "PNG", note: "Lossless" },
                      ].map((fmt) => (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setOutputFormat(fmt.id)}
                          className={`p-2 rounded-xl text-xs font-medium border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                            outputFormat === fmt.id
                              ? "bg-sky-500/20 border-sky-500/40 text-sky-300 font-semibold"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <span>{fmt.label}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5">{fmt.note}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2: Desired Resolution & Dimensions */}
                <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Maximize2 size={16} />
                      </span>
                      <h2 className="font-bold text-sm text-white">Desired Resolution (Dimensions)</h2>
                    </div>
                    {activeItem?.origWidth ? (
                      <span className="text-[11px] font-mono text-slate-400">
                        Original: {activeItem.origWidth} × {activeItem.origHeight} px
                      </span>
                    ) : null}
                  </div>

                  {/* Preset Buttons */}
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                      1-Click Dimension Presets:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PRESET_DIMENSIONS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handlePresetSelect(preset)}
                          className={`px-2.5 py-2 rounded-xl text-[11px] border text-left transition cursor-pointer ${
                            selectedPresetId === preset.id
                              ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-semibold"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                          }`}
                          title={preset.desc}
                        >
                          <div className="font-medium truncate">{preset.label}</div>
                          {preset.width && (
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              {preset.width} × {preset.height} px
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Width & Height Inputs with Lock */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-300">
                        Pixel Dimensions:
                      </label>
                      <button
                        type="button"
                        onClick={() => setLockAspectRatio((prev) => !prev)}
                        className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                          lockAspectRatio
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                        }`}
                        title={lockAspectRatio ? "Aspect Ratio is Locked" : "Aspect Ratio is Unlocked"}
                      >
                        {lockAspectRatio ? <Lock size={12} /> : <Unlock size={12} />}
                        <span>{lockAspectRatio ? "Ratio Locked" : "Free Scale"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">W:</span>
                        <input
                          type="number"
                          min="10"
                          max="16000"
                          value={targetWidth || ""}
                          onChange={(e) => handleWidthChange(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-8 pr-8 py-2 text-sm text-white font-mono font-medium outline-none transition"
                          placeholder="Width"
                        />
                        <span className="absolute right-2.5 top-2.5 text-[11px] text-slate-500 font-mono">px</span>
                      </div>

                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">H:</span>
                        <input
                          type="number"
                          min="10"
                          max="16000"
                          value={targetHeight || ""}
                          onChange={(e) => handleHeightChange(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-8 pr-8 py-2 text-sm text-white font-mono font-medium outline-none transition"
                          placeholder="Height"
                        />
                        <span className="absolute right-2.5 top-2.5 text-[11px] text-slate-500 font-mono">px</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Scale Percentage Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-medium text-slate-400 block">
                      Quick Scaling:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[25, 50, 75, 100, 150].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => handleQuickScale(pct)}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] text-slate-300 font-mono border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fit / Crop Mode */}
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Fitting Method:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-xs">
                      {[
                        { id: "contain", label: "Fit (Contain)" },
                        { id: "cover", label: "Crop (Cover)" },
                        { id: "exact", label: "Stretch (Exact)" },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setResizeMode(m.id)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition cursor-pointer ${
                            resizeMode === m.id
                              ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Comparison & Preview Studio (7 cols) */}
              <div className="lg:col-span-7 space-y-5">

                {/* Compression Metrics Banner */}
                {activeItem && (
                  <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-950/40 border border-slate-800 rounded-2xl p-4 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
                        Original Size
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-300 font-mono">
                        {formatBytes(activeItem.origSize)}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        {activeItem.origWidth}×{activeItem.origHeight} px
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
                        Compressed Size
                      </span>
                      <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
                        {formatBytes(activeItem.compressedSize)}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {activeItem.compressedWidth}×{activeItem.compressedHeight} px
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
                        Space Saved
                      </span>
                      <span className="text-sm sm:text-base font-bold text-sky-400 font-mono">
                        {activeItem.percentSaved > 0 ? `-${activeItem.percentSaved}%` : "0%"}
                      </span>
                      <span className="text-[10px] text-emerald-400 block font-medium">
                        {activeItem.origSize > activeItem.compressedSize
                          ? `Saved ${formatBytes(activeItem.origSize - activeItem.compressedSize)}`
                          : "Optimized"}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
                        Target Status
                      </span>
                      {compressionMode === "targetSize" ? (
                        <div className="mt-0.5">
                          {activeItem.compressedSize <=
                          (targetSizeUnit === "MB" ? targetSizeVal * 1024 * 1024 : targetSizeVal * 1024) ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                              <Check size={13} /> Within Target
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
                              <AlertCircle size={13} /> Near Target
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                            Quality: {activeItem.appliedQuality}%
                          </span>
                        </div>
                      ) : (
                        <div className="mt-0.5">
                          <span className="text-xs font-semibold text-sky-300">
                            {manualQuality}% Quality
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                            {activeItem.procTime} ms
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Auto Scale Notice if triggered */}
                {activeItem?.scaleAdjusted && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
                    <Info size={16} className="shrink-0 text-amber-400" />
                    <span>
                      <strong>Auto-Scaled Resolution:</strong> Dimensions were adjusted to{" "}
                      <span className="font-mono font-bold text-amber-200">
                        {activeItem.compressedWidth} × {activeItem.compressedHeight} px
                      </span>{" "}
                      so the file could meet your strict {targetSizeVal} {targetSizeUnit} limit.
                    </span>
                  </div>
                )}

                {/* Preview Canvas / Split Slider Card */}
                <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
                  {/* Preview Toolbar */}
                  <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-300">View Mode:</span>
                      <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
                        <button
                          onClick={() => setComparisonMode("split")}
                          className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                            comparisonMode === "split"
                              ? "bg-sky-500 text-white font-medium"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Split Slider
                        </button>
                        <button
                          onClick={() => setComparisonMode("sideBySide")}
                          className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                            comparisonMode === "sideBySide"
                              ? "bg-sky-500 text-white font-medium"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Side-by-Side
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-xl border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                        title="Copy compressed picture to clipboard"
                      >
                        {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        <span>{copied ? "Copied!" : "Copy"}</span>
                      </button>

                      <button
                        onClick={downloadActiveImage}
                        disabled={!activeItem?.compressedBlob}
                        className="px-4 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-sky-500/20 flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                      >
                        <Download size={13} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                  {/* Interactive Visual Comparison Stage */}
                  <div className="p-4 sm:p-6 bg-[#070b14] min-h-[360px] flex items-center justify-center relative overflow-hidden">
                    {isProcessing && (
                      <div className="absolute inset-0 z-20 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-sky-400">
                          <RefreshCw size={26} className="animate-spin" />
                          <span className="text-xs font-medium">Compressing &amp; Optimizing...</span>
                        </div>
                      </div>
                    )}

                    {activeItem && (
                      comparisonMode === "split" ? (
                        /* Split Drag Slider Comparison */
                        <div
                          ref={splitContainerRef}
                          onMouseDown={handleSliderMouseDown}
                          onTouchStart={handleSliderMouseDown}
                          className="relative w-full max-w-2xl max-h-[460px] select-none overflow-hidden rounded-xl border border-slate-800 cursor-ew-resize group shadow-2xl flex items-center justify-center bg-black/40"
                        >
                          {/* Compressed Image (Base / Right side) */}
                          <img
                            src={activeItem.compressedUrl || activeItem.originalUrl}
                            alt="Compressed preview"
                            className="w-full h-auto max-h-[460px] object-contain block pointer-events-none"
                          />

                          {/* Original Image (Clipped / Left side) */}
                          <div
                            className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none"
                            style={{ width: `${sliderPos}%` }}
                          >
                            <img
                              src={activeItem.originalUrl}
                              alt="Original preview"
                              className="absolute top-0 left-0 h-full max-h-[460px] object-contain block pointer-events-none"
                              style={{
                                width: splitContainerRef.current
                                  ? `${splitContainerRef.current.clientWidth}px`
                                  : "100%",
                                maxWidth: "none",
                              }}
                            />
                          </div>

                          {/* Split Handle Line */}
                          <div
                            className="absolute top-0 bottom-0 w-0.5 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] pointer-events-none"
                            style={{ left: `${sliderPos}%` }}
                          >
                            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-sky-400 shadow-xl flex items-center justify-center text-sky-300">
                              <span className="text-[10px] font-bold tracking-tighter">⇄</span>
                            </div>
                          </div>

                          {/* Floating Labels */}
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur border border-slate-800 text-[10px] font-mono text-slate-300 pointer-events-none">
                            Original: {formatBytes(activeItem.origSize)}
                          </div>
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-sky-950/80 backdrop-blur border border-sky-800 text-[10px] font-mono text-sky-300 pointer-events-none">
                            Compressed: {formatBytes(activeItem.compressedSize)}
                          </div>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur text-[10px] text-slate-400 pointer-events-none">
                            Drag slider horizontally to inspect visual quality
                          </div>
                        </div>
                      ) : (
                        /* Side-by-Side Dual View */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                          {/* Original Card */}
                          <div className="bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden p-3 space-y-2">
                            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                              <span className="font-semibold text-slate-300">Original Picture</span>
                              <span className="font-mono text-slate-400 text-[11px]">
                                {formatBytes(activeItem.origSize)}
                              </span>
                            </div>
                            <div className="h-64 flex items-center justify-center bg-black/40 rounded-lg overflow-hidden">
                              <img
                                src={activeItem.originalUrl}
                                alt="Original"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="text-center font-mono text-[11px] text-slate-500">
                              {activeItem.origWidth} × {activeItem.origHeight} px
                            </div>
                          </div>

                          {/* Compressed Card */}
                          <div className="bg-slate-950/90 border border-sky-500/30 rounded-xl overflow-hidden p-3 space-y-2">
                            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                              <span className="font-semibold text-sky-300">Compressed Picture</span>
                              <span className="font-mono text-emerald-400 font-bold text-[11px]">
                                {formatBytes(activeItem.compressedSize)} (-{activeItem.percentSaved}%)
                              </span>
                            </div>
                            <div className="h-64 flex items-center justify-center bg-black/40 rounded-lg overflow-hidden">
                              <img
                                src={activeItem.compressedUrl || activeItem.originalUrl}
                                alt="Compressed"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="text-center font-mono text-[11px] text-sky-400">
                              {activeItem.compressedWidth} × {activeItem.compressedHeight} px • {activeItem.outputFormat.replace("image/", "").toUpperCase()}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Footer Bar with Download & Status */}
                  <div className="bg-slate-950 px-5 py-3.5 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <Check size={14} /> Ready for Download
                      </span>
                      <span>•</span>
                      <span className="font-mono truncate max-w-[240px] text-slate-300">
                        {activeItem?.outputName}
                      </span>
                    </div>

                    <button
                      onClick={downloadActiveImage}
                      disabled={!activeItem?.compressedBlob}
                      className="px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/25 flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
                    >
                      <Download size={15} />
                      <span>Download Compressed Photo</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Feature Highlights & Portal Upload Guide Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <ShieldCheck size={18} />
              <h3>100% Client-Side Privacy</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every operation runs locally in your browser using HTML5 Canvas &amp; Blob APIs. Your personal photographs, passport documents, and signatures are never sent to any server.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <Zap size={18} />
              <h3>Job &amp; Exam Form Ready</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Government portals (UPSC, SSC, IBPS, GATE, WBJEE, State PSCs) mandate strict size thresholds like &lt; 50 KB for photos and &lt; 20 KB for signatures. Our binary search engine guarantees meeting these limits.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
              <Sparkles size={18} />
              <h3>Smart Aspect Ratio Preservation</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintain the natural proportion of your images while scaling, or crop to standard dimensions (1:1 Square, 3.5×4.5cm Passport, 16:9 Full HD) without squishing or distortion.
            </p>
          </div>
        </div>

        {/* Informational FAQ / Help Accordion */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-3">
          <button
            type="button"
            onClick={() => setShowFaq((prev) => !prev)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <HelpCircle size={16} className="text-sky-400" />
              <span>Image Compression &amp; Resizing Guidelines (FAQ)</span>
            </div>
            <span className="text-xs text-sky-400 font-medium">
              {showFaq ? "Hide Guide ▲" : "Read Guide ▼"}
            </span>
          </button>

          {showFaq && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs text-slate-400 border-t border-slate-800/80 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">Which format should I choose?</h4>
                <p>
                  • <strong className="text-sky-300">JPEG (.jpg)</strong>: The universal standard for all admission forms, government portals, and exam submissions. Always use JPEG when uploading to official portals.
                </p>
                <p>
                  • <strong className="text-cyan-300">WebP (.webp)</strong>: The modern web standard developed by Google. Provides 25-35% smaller file sizes than JPEG at the same visual quality. Ideal for websites and blogs.
                </p>
                <p>
                  • <strong className="text-emerald-300">PNG (.png)</strong>: Best for logos, line art, signatures with transparent backgrounds, and technical diagrams where pixel sharpness is paramount.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200">How to get a Passport Photo under 50 KB?</h4>
                <p>
                  1. Upload your photo or drop it into the studio.
                </p>
                <p>
                  2. In the <strong>1-Click Dimension Presets</strong>, click <strong className="text-slate-200">Passport / Exam Photo</strong> (413 × 531 px).
                </p>
                <p>
                  3. In the <strong>Desired File Size</strong> tab, select <strong className="text-slate-200">50 KB</strong> preset and keep format as <strong className="text-slate-200">JPEG</strong>.
                </p>
                <p>
                  4. Inspect the result in the split slider and click <strong className="text-slate-200">Download Compressed Photo</strong>!
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
