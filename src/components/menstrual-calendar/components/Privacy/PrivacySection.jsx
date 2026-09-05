import React, { useState } from 'react';
import { ShieldCheck, HardDrive, Lock, Trash2, X, AlertTriangle } from 'lucide-react';

export default function PrivacySection({ isOpen, onClose, onClearAllData }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    onClearAllData();
    setShowConfirmDelete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-6 relative text-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Close privacy modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Privacy &amp; Data Security
            </h3>
            <p className="text-xs text-slate-400">
              Your sensitive health data stays 100% private.
            </p>
          </div>
        </div>

        {/* Privacy Principles */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3">
            <HardDrive className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-slate-200">Hybrid Storage — Local + Secure Cloud</p>
              <p className="text-slate-400 leading-relaxed">
                When you are <span className="text-emerald-300 font-semibold">logged in</span>, your cycle data is securely
                stored in our private MySQL database via the cnat_api (Laravel + Sanctum).
                When not logged in, data stays in your browser's <code>localStorage</code> only.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3">
            <Lock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-slate-200">Token-Secured — No Third-Party Sharing</p>
              <p className="text-slate-400 leading-relaxed">
                All API requests are authenticated with a Bearer token. Your menstrual data is
                <span className="text-sky-300 font-semibold"> never shared</span> with any third-party
                analytics, advertising, or external cloud providers. Only you can access your records.
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone: Delete All Data */}
        <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Delete All Local Data</span>
            </div>

            {!showConfirmDelete && (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-all duration-200 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Data</span>
              </button>
            )}
          </div>

          {showConfirmDelete && (
            <div className="p-3 bg-rose-900/80 border border-rose-600 rounded-xl space-y-2 text-xs text-rose-100 animate-fadeIn">
              <p className="font-bold">Are you sure you want to delete all cycle history?</p>
              <p className="text-[11px] text-rose-200/80">
                This will permanently delete all entered period dates and custom settings from this browser. This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-3 py-1 rounded-lg bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md"
                >
                  Yes, Delete Everything
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Close */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
