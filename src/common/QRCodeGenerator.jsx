import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [link, setLink] = useState('https://example.com');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  // Generate QR code whenever the link changes
  useEffect(() => {
    if (!canvasRef.current) return;

    if (!link.trim()) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setError('');
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
        }
      }
    );
  }, [link]);

  // Sanitize title for use as a filename
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          QR Code Generator
        </h1>

        {/* Title input field */}
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

        <div className="flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width={256}
            height={256}
            className="border border-gray-200 rounded-lg shadow-sm"
          />
        </div>

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