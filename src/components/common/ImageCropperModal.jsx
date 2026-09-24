// src/components/common/ImageCropperModal.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Maximize2,
  RefreshCw,
  Check,
  X,
  Crop as CropIcon,
  Move,
  Circle,
  Square,
  Sparkles,
  Layers,
} from "lucide-react";

/**
 * ImageCropperModal
 * Interactive, smooth image cropper and portion selector with pan, zoom, rotation,
 * grid guide, circular/square preview masks, and high-res export.
 *
 * @param {boolean} isOpen - Whether the cropper modal is visible
 * @param {string} imageSrc - The source image data URL or object URL to crop
 * @param {function} onClose - Callback when cancelled/closed
 * @param {function} onCropComplete - Callback with cropped base64 data URL
 * @param {string} title - Optional title (defaults to "Adjust & Crop Photo")
 */
export default function ImageCropperModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  title = "Position & Crop Profile Photo",
}) {
  // Viewport & Canvas Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Loaded Image Object
  const [loadedImage, setLoadedImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Transform States
  const [zoom, setZoom] = useState(1); // 1 to 4
  const [rotation, setRotation] = useState(0); // in degrees (0, 90, 180, 270)
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [maskShape, setMaskShape] = useState("squircle"); // 'circle' | 'squircle' | 'square'
  const [showGrid, setShowGrid] = useState(true);

  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialOffsetRef = useRef({ x: 0, y: 0 });

  // Viewport Settings
  const CROP_BOX_SIZE = 300; // Screen display size in pixels
  const EXPORT_SIZE = 512; // Exported output square size in pixels

  // 1. Load image when imageSrc changes
  useEffect(() => {
    if (!isOpen || !imageSrc) {
      setLoadedImage(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setLoadedImage(img);
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      // Reset transform on new image
      setZoom(1);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
    };
    img.onerror = (err) => {
      console.error("Failed to load image in cropper:", err);
    };
    img.src = imageSrc;
  }, [isOpen, imageSrc]);

  // 2. Calculate Base Scaling to fit/cover crop box
  const getBaseScale = useCallback(() => {
    if (!loadedImage || !imageDimensions.width || !imageDimensions.height) return 1;
    const isRotated90or270 = Math.abs(rotation % 180) === 90;
    const imgW = isRotated90or270 ? imageDimensions.height : imageDimensions.width;
    const imgH = isRotated90or270 ? imageDimensions.width : imageDimensions.height;

    // Cover scale so image fully encloses the crop box
    return Math.max(CROP_BOX_SIZE / imgW, CROP_BOX_SIZE / imgH);
  }, [loadedImage, imageDimensions, rotation]);

  // 3. Draw image and guides on screen canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = CROP_BOX_SIZE;
    const height = CROP_BOX_SIZE;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Save context for transform
    ctx.save();

    // Move to center of crop box
    ctx.translate(width / 2 + offset.x, height / 2 + offset.y);
    ctx.rotate((rotation * Math.PI) / 180);

    const baseScale = getBaseScale();
    const currentScale = baseScale * zoom;

    // Draw the image centered
    const drawW = imageDimensions.width * currentScale;
    const drawH = imageDimensions.height * currentScale;

    ctx.drawImage(
      loadedImage,
      -drawW / 2,
      -drawH / 2,
      drawW,
      drawH
    );

    ctx.restore();
  }, [loadedImage, imageDimensions, offset, rotation, zoom, getBaseScale]);

  // Re-draw whenever transform changes
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // 4. Mouse & Touch Drag Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    dragStartRef.current = { x: clientX, y: clientY };
    initialOffsetRef.current = { ...offset };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;

    setOffset({
      x: initialOffsetRef.current.x + dx,
      y: initialOffsetRef.current.y + dy,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // 5. Wheel Zoom Handler
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(4, Math.max(1, prev + zoomDelta)));
  };

  // 6. Reset all adjustments
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  // 7. Crop & Generate Final Image Data URL
  const handleApplyCrop = () => {
    if (!loadedImage) return;

    try {
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = EXPORT_SIZE;
      exportCanvas.height = EXPORT_SIZE;
      const ctx = exportCanvas.getContext("2d");

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Ratio between export resolution and screen display box
      const exportRatio = EXPORT_SIZE / CROP_BOX_SIZE;

      // Transform onto export canvas
      ctx.save();
      ctx.translate(EXPORT_SIZE / 2 + offset.x * exportRatio, EXPORT_SIZE / 2 + offset.y * exportRatio);
      ctx.rotate((rotation * Math.PI) / 180);

      const baseScale = getBaseScale();
      const currentScale = baseScale * zoom * exportRatio;

      const drawW = imageDimensions.width * currentScale;
      const drawH = imageDimensions.height * currentScale;

      ctx.drawImage(
        loadedImage,
        -drawW / 2,
        -drawH / 2,
        drawW,
        drawH
      );

      ctx.restore();

      // Export as high quality JPEG
      const croppedDataUrl = exportCanvas.toDataURL("image/jpeg", 0.92);
      onCropComplete(croppedDataUrl);
      onClose();
    } catch (err) {
      console.error("Crop export error:", err);
      // Fallback to original image if export fails
      onCropComplete(imageSrc);
      onClose();
    }
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 text-slate-100 max-h-[95vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 text-lg">
              <CropIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h3>
              <p className="text-xs text-slate-400">
                Drag to reposition • Scroll or slide to zoom • Frame your portion
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Cropper Stage */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-2">
          {/* Main Interactive Viewport Box */}
          <div className="flex flex-col items-center">
            <div
              ref={containerRef}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              onWheel={handleWheel}
              style={{ width: CROP_BOX_SIZE, height: CROP_BOX_SIZE }}
              className={`relative select-none overflow-hidden rounded-2xl bg-slate-950 border-2 border-sky-500/60 shadow-2xl shadow-sky-950/50 cursor-grab ${
                isDragging ? "cursor-grabbing border-sky-400" : ""
              }`}
            >
              {/* Underlying canvas containing the transformed image */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

              {/* Mask Overlay (Darkens outside area & reveals the selected shape) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* SVG Cutout Mask */}
                <svg
                  className="w-full h-full"
                  viewBox={`0 0 ${CROP_BOX_SIZE} ${CROP_BOX_SIZE}`}
                >
                  <defs>
                    <mask id="cropMask">
                      {/* White fills everything */}
                      <rect width={CROP_BOX_SIZE} height={CROP_BOX_SIZE} fill="white" />
                      {/* Black cuts out the viewing hole */}
                      {maskShape === "circle" ? (
                        <circle
                          cx={CROP_BOX_SIZE / 2}
                          cy={CROP_BOX_SIZE / 2}
                          r={CROP_BOX_SIZE / 2 - 4}
                          fill="black"
                        />
                      ) : maskShape === "squircle" ? (
                        <rect
                          x="4"
                          y="4"
                          width={CROP_BOX_SIZE - 8}
                          height={CROP_BOX_SIZE - 8}
                          rx="48"
                          fill="black"
                        />
                      ) : (
                        <rect
                          x="4"
                          y="4"
                          width={CROP_BOX_SIZE - 8}
                          height={CROP_BOX_SIZE - 8}
                          rx="8"
                          fill="black"
                        />
                      )}
                    </mask>
                  </defs>

                  {/* Shaded backdrop outside the cutout */}
                  <rect
                    width={CROP_BOX_SIZE}
                    height={CROP_BOX_SIZE}
                    fill="rgba(3, 7, 18, 0.65)"
                    mask="url(#cropMask)"
                  />

                  {/* Cutout Ring Border */}
                  {maskShape === "circle" ? (
                    <circle
                      cx={CROP_BOX_SIZE / 2}
                      cy={CROP_BOX_SIZE / 2}
                      r={CROP_BOX_SIZE / 2 - 4}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  ) : maskShape === "squircle" ? (
                    <rect
                      x="4"
                      y="4"
                      width={CROP_BOX_SIZE - 8}
                      height={CROP_BOX_SIZE - 8}
                      rx="48"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  ) : (
                    <rect
                      x="4"
                      y="4"
                      width={CROP_BOX_SIZE - 8}
                      height={CROP_BOX_SIZE - 8}
                      rx="8"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  )}
                </svg>
              </div>

              {/* Rule-of-Thirds Alignment Grid */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 border border-sky-400/40">
                    <div className="border-r border-b border-sky-400/40" />
                    <div className="border-r border-b border-sky-400/40" />
                    <div className="border-b border-sky-400/40" />
                    <div className="border-r border-b border-sky-400/40" />
                    <div className="border-r border-b border-sky-400/40" />
                    <div className="border-b border-sky-400/40" />
                    <div className="border-r border-sky-400/40" />
                    <div className="border-r border-sky-400/40" />
                    <div />
                  </div>
                </div>
              )}

              {/* Hint badge */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-700/80 text-[10px] text-slate-300 pointer-events-none flex items-center gap-1 shadow-md">
                <Move className="w-3 h-3 text-sky-400" />
                <span>Drag to pan</span>
              </div>
            </div>
          </div>

          {/* Real-time Preview Badges & Tools */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Live Result Previews
              </span>
              <div className="flex items-center gap-4">
                {/* Large Preview */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-sky-500/50 shadow-xl overflow-hidden relative flex items-center justify-center">
                    <canvas
                      ref={(el) => {
                        if (!el || !canvasRef.current) return;
                        const ctx = el.getContext("2d");
                        el.width = 80;
                        el.height = 80;
                        ctx?.drawImage(canvasRef.current, 0, 0, 80, 80);
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">Profile Card</span>
                </div>

                {/* Navbar Circular Preview */}
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-emerald-500/50 shadow-xl overflow-hidden relative flex items-center justify-center">
                    <canvas
                      ref={(el) => {
                        if (!el || !canvasRef.current) return;
                        const ctx = el.getContext("2d");
                        el.width = 48;
                        el.height = 48;
                        ctx?.drawImage(canvasRef.current, 0, 0, 48, 48);
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">Navbar</span>
                </div>
              </div>
            </div>

            {/* Mask Shape Switcher */}
            <div className="w-full pt-2 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Preview Mask Shape:
              </span>
              <div className="flex gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setMaskShape("squircle")}
                  className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    maskShape === "squircle"
                      ? "bg-sky-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="Modern Squircle / Rounded Square"
                >
                  <Square className="w-3 h-3" />
                  <span>Squircle</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMaskShape("circle")}
                  className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    maskShape === "circle"
                      ? "bg-sky-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="Circular Avatar"
                >
                  <Circle className="w-3 h-3" />
                  <span>Circle</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMaskShape("square")}
                  className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    maskShape === "square"
                      ? "bg-sky-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="Exact Square"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Square</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar & Sliders */}
        <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="flex-1 flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 w-12">
                Zoom: {Math.round(zoom * 100)}%
              </span>
              <input
                type="range"
                min="1"
                max="4"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(4, z + 0.2))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Buttons: Rotate & Grid & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Rotate 90° Left"
              >
                <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                <span>Rotate Left</span>
              </button>

              <button
                type="button"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Rotate 90° Right"
              >
                <RotateCw className="w-3.5 h-3.5 text-sky-400" />
                <span>Rotate Right</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowGrid((g) => !g)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  showGrid
                    ? "bg-sky-500/20 text-sky-300 border border-sky-400/30"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
                title="Toggle Alignment Grid"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Reset Zoom & Pan"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApplyCrop}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20"
          >
            <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>Apply & Crop Portion</span>
          </button>
        </div>
      </div>
    </div>
  );
}
