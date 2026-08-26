import React, { useState, useRef } from "react";

const AudioExtractor = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const extractAudio = async (videoFile) => {
    setLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const arrayBuffer = await videoFile.arrayBuffer();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const wavBlob = audioBufferToWav(audioBuffer);
      const url = URL.createObjectURL(wavBlob);
      setAudioUrl(url);
    } catch (err) {
      console.error(err);
      setError("This video format is not supported by the browser’s audio decoder. Please try a different file.");
    } finally {
      setLoading(false);
    }
  };

  // Convert AudioBuffer to WAV Blob (16-bit PCM)
  const audioBufferToWav = (buffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const length = buffer.length * numChannels * 2;
    const data = new DataView(new ArrayBuffer(44 + length));

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        data.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    writeString(0, "RIFF");
    data.setUint32(4, 36 + length, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    data.setUint32(16, 16, true);
    data.setUint16(20, 1, true);
    data.setUint16(22, numChannels, true);
    data.setUint32(24, sampleRate, true);
    data.setUint32(28, sampleRate * numChannels * 2, true);
    data.setUint16(32, numChannels * 2, true);
    data.setUint16(34, 16, true);
    writeString(36, "data");
    data.setUint32(40, length, true);

    const channels = [];
    for (let i = 0; i < numChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        const sample = Math.max(-1, Math.min(1, channels[ch][i]));
        data.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }
    return new Blob([data], { type: "audio/wav" });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      extractAudio(selected);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      extractAudio(dropped);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
      {/* Header with gradient accent */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
          <span className="text-2xl text-white">🎵</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Audio Extractor
          </h2>
          <p className="text-sm text-gray-500">Extract audio from any video file</p>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 cursor-pointer ${
          file
            ? "border-green-400 bg-green-50/50"
            : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30"
        } ${loading ? "opacity-60 pointer-events-none" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {file ? (
          <div className="space-y-2">
            <div className="text-5xl mb-2">🎬</div>
            <p className="font-semibold text-gray-800 text-lg truncate">{file.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            <button
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setAudioUrl(null);
                setError(null);
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Choose another file
            </button>
          </div>
        ) : (
          <div>
            <div className="text-6xl mb-4">📂</div>
            <p className="text-gray-700 font-medium">Drop your video here</p>
            <p className="text-sm text-gray-400 mt-1">or click to browse</p>
            <p className="text-xs text-gray-400 mt-3">Supports MP4, MOV, AVI, and more</p>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="mt-6 flex items-center justify-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
          <svg className="animate-spin h-6 w-6 text-indigo-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span className="font-medium">Decoding audio…</span>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-semibold">Decoding failed</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Audio result */}
      {audioUrl && (
        <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-green-500">✅</span> Audio ready
          </p>
          <audio controls src={audioUrl} className="w-full mb-4" />
          <a
            href={audioUrl}
            download="extracted_audio.wav"
            className="inline-flex w-full items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download WAV
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioExtractor;