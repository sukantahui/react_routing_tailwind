import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [link, setLink] = useState('https://example.com');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [defaultLogoLoaded, setDefaultLogoLoaded] = useState(false);
  const defaultLogoImageRef = useRef(null);
  const canvasRef = useRef(null);

  const DEFAULT_LOGO = '/assets/cnat.png'; // adjust path if needed

  // Preload default logo on mount
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log('Default logo loaded successfully');
      defaultLogoImageRef.current = img;
      setDefaultLogoLoaded(true);
      // If no custom logo is set, set logoPreview to trigger QR generation with default
      if (!logoPreview) {
        setLogoPreview(DEFAULT_LOGO);
      }
    };
    img.onerror = (err) => {
      console.error('Failed to load default logo:', DEFAULT_LOGO, err);
      // Optionally show a message to the user
      setError('Default logo could not be loaded. Please check the file path.');
    };
    img.src = DEFAULT_LOGO;
  }, []);

  // Generate QR code whenever link or logoPreview changes
  useEffect(() => {
    if (!canvasRef.current) return;

    if (!link.trim()) {
      clearCanvas();
      return;
    }

    QRCode.toCanvas(
      canvasRef.current,
      link,
      {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      },
      (err) => {
        if (err) {
          setError('Failed to generate QR code. The link may be too long or invalid.');
          console.error(err);
        } else {
          setError('');
          // After QR is drawn, draw the logo
          drawLogoOnCanvas();
        }
      }
    );
  }, [link, logoPreview]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setError('');
  };

  // Draw the logo (either default or custom) onto the canvas
  const drawLogoOnCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Determine which image to use
    let img;
    if (logoPreview && logoPreview !== DEFAULT_LOGO) {
      // Custom logo – load it fresh each time (could also cache)
      img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = logoPreview;
    } else if (defaultLogoLoaded && defaultLogoImageRef.current) {
      // Use preloaded default logo
      img = defaultLogoImageRef.current;
    } else {
      // No logo available
      return;
    }

    const ctx = canvas.getContext('2d');
    const qrSize = canvas.width;
    const logoSize = qrSize * 0.2; // 20% of QR width
    const x = (qrSize - logoSize) / 2;
    const y = (qrSize - logoSize) / 2;

    // If it's a fresh Image object (custom), wait for it to load
    if (img.complete && img.naturalHeight !== 0) {
      // Already loaded (for preloaded default)
      drawImage(ctx, img, x, y, logoSize);
    } else {
      img.onload = () => {
        drawImage(ctx, img, x, y, logoSize);
      };
      img.onerror = () => {
        console.error('Failed to load custom logo');
      };
    }
  };

  const drawImage = (ctx, img, x, y, size) => {
    // Draw white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, size, size);
    // Draw logo
    ctx.drawImage(img, x, y, size, size);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target.result);
    };
    reader.readAsDataURL(file);
    setLogo(file);
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoPreview(DEFAULT_LOGO); // revert to default
  };

  const sanitizeFilename = (name) => {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'qrcode';
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const filename = title.trim() ? `${sanitizeFilename(title)}.png` : 'qrcode.png';
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const isCustomLogo = logoPreview && logoPreview !== DEFAULT_LOGO;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          QR Code Generator with Logo
        </h1>

        {/* Title input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title (optional)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., My QR Code"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Link input */}
        <div className="mb-4">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your link
          </label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Logo upload */}
        <div className="mb-4">
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
            Add Custom Logo (optional)
          </label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {logoPreview && (
            <div className="flex items-center mt-2">
              {isCustomLogo ? (
                <>
                  <span className="text-xs text-gray-600 mr-2">Custom logo added</span>
                  <button
                    onClick={handleRemoveLogo}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove custom logo
                  </button>
                </>
              ) : (
                <span className="text-xs text-gray-600">
                  {defaultLogoLoaded ? 'Default logo applied' : 'Loading default logo...'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* QR Code canvas */}
        <div className="flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width={256}
            height={256}
            className="border border-gray-200 rounded-lg shadow-sm"
          />
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={!link.trim() || !!error}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Download QR Code
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Powered by <span className="font-mono">qrcode</span> library
        </p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;