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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span role="img" aria-label="audio">🎵</span> Extract Audio from Video
      </h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          file ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-blue-400"
        }`}
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
          <div className="space-y-1">
            <div className="text-green-600 text-4xl">✅</div>
            <p className="font-medium text-gray-800">{file.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            <button
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setAudioUrl(null);
                setError(null);
              }}
            >
              Choose another file
            </button>
          </div>
        ) : (
          <div>
            <p className="text-4xl mb-2">📂</p>
            <p className="text-gray-600">Drag & drop a video file here, or click to browse</p>
            <p className="text-xs text-gray-400 mt-1">Uses browser’s built‑in audio decoder</p>
          </div>
        )}
      </div>

      {loading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
          <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>Decoding audio…</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-300">
          ⚠️ {error}
        </div>
      )}

      {audioUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Extracted audio ready</p>
          <audio controls src={audioUrl} className="w-full mb-3" />
          <a
            href={audioUrl}
            download="extracted_audio.wav"
            className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            ⬇️ Download WAV
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioExtractor;