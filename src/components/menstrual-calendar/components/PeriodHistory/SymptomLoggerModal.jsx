import React, { useState, useEffect } from 'react';
import {
  X,
  Smile,
  Droplets,
  Activity,
  Heart,
  CheckCircle2,
  Calendar,
  Save,
  Loader2,
  Tag,
} from 'lucide-react';
import { formatISODate } from '../../utils/dateUtils';

const FLOW_OPTIONS = [
  { id: 'spotting', label: 'Spotting', icon: '💧', desc: 'Minimal drops' },
  { id: 'light', label: 'Light', icon: '🩸', desc: 'Light flow' },
  { id: 'medium', label: 'Medium', icon: '🩸🩸', desc: 'Standard flow' },
  { id: 'heavy', label: 'Heavy', icon: '🌊', desc: 'Heavy bleeding' },
];

const MOOD_OPTIONS = [
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡' },
  { id: 'fatigued', label: 'Fatigued', emoji: '😴' },
  { id: 'sensitive', label: 'Sensitive', emoji: '🥺' },
  { id: 'irritable', label: 'Irritable', emoji: '😤' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
];

const SYMPTOM_OPTIONS = [
  { id: 'cramps', label: 'Cramps', emoji: '⚡' },
  { id: 'headache', label: 'Headache', emoji: '🤕' },
  { id: 'bloating', label: 'Bloating', emoji: '🎈' },
  { id: 'tender_breasts', label: 'Tender Breasts', emoji: '🌸' },
  { id: 'backache', label: 'Back Pain', emoji: '💆' },
  { id: 'acne', label: 'Skin Breakout', emoji: '🧴' },
  { id: 'cravings', label: 'Sweet Cravings', emoji: '🍫' },
  { id: 'good_energy', label: 'Great Stamina', emoji: '✨' },
];

export default function SymptomLoggerModal({
  isOpen,
  onClose,
  initialDateStr = formatISODate(new Date()),
  periodEntries = [],
  onSaveSymptomEntry, // fn(dateStr, noteString, isPeriodStart)
  isSyncing,
}) {
  const [selectedDate, setSelectedDate] = useState(initialDateStr);
  const [flow, setFlow] = useState(null);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customNote, setCustomNote] = useState('');
  const [markAsPeriod, setMarkAsPeriod] = useState(true);

  // When date changes or modal opens, prefill from existing entry if any
  useEffect(() => {
    if (!isOpen) return;
    const dateToUse = initialDateStr || formatISODate(new Date());
    setSelectedDate(dateToUse);

    const existing = periodEntries.find((e) => (e.period_start_date || e.periodStartDate) === dateToUse);
    if (existing && existing.notes) {
      try {
        // Try parsing JSON if stored as JSON
        if (existing.notes.startsWith('{')) {
          const parsed = JSON.parse(existing.notes);
          setFlow(parsed.flow || null);
          setSelectedMoods(parsed.moods || []);
          setSelectedSymptoms(parsed.symptoms || []);
          setCustomNote(parsed.note || '');
        } else {
          setCustomNote(existing.notes);
          setFlow(null);
          setSelectedMoods([]);
          setSelectedSymptoms([]);
        }
      } catch {
        setCustomNote(existing.notes);
      }
    } else {
      setFlow(null);
      setSelectedMoods([]);
      setSelectedSymptoms([]);
      setCustomNote('');
    }
  }, [isOpen, initialDateStr, periodEntries]);

  if (!isOpen) return null;

  const toggleMood = (id) => {
    setSelectedMoods((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleSymptom = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedDate) return;

    // Compact summary string or JSON
    const payloadData = {
      flow,
      moods: selectedMoods,
      symptoms: selectedSymptoms,
      note: customNote.trim(),
    };

    // Build a compact note string (<= 191 chars for DB)
    let noteText = '';
    const parts = [];
    if (flow) parts.push(`Flow:${flow}`);
    if (selectedMoods.length > 0) parts.push(`Mood:${selectedMoods.join(',')}`);
    if (selectedSymptoms.length > 0) parts.push(`Symptoms:${selectedSymptoms.join(',')}`);
    if (customNote.trim()) parts.push(customNote.trim());

    noteText = parts.join(' | ').slice(0, 190);

    if (onSaveSymptomEntry) {
      await onSaveSymptomEntry(selectedDate, noteText, markAsPeriod);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-5 relative text-slate-200 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Close symptom modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3 shrink-0">
          <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Log Symptoms &amp; Flow
            </h3>
            <p className="text-xs text-slate-400">
              Track your daily sensations, flow intensity, and moods.
            </p>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="overflow-y-auto flex-1 space-y-5 pr-1 text-xs">
          {/* 1. Date Selector */}
          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between">
            <label className="font-bold text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-400" /> Log Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* 2. Flow Intensity */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-rose-400" /> Bleeding / Flow Intensity:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {FLOW_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFlow(flow === f.id ? null : f.id)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    flow === f.id
                      ? 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-lg">{f.icon}</span>
                  <span className="font-bold text-[11px] mt-1">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Moods */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 flex items-center gap-2">
              <Smile className="w-4 h-4 text-amber-400" /> Today's Mood:
            </label>
            <div className="flex flex-wrap gap-2">
              {MOOD_OPTIONS.map((m) => {
                const isSelected = selectedMoods.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleMood(m.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Physical Symptoms */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" /> Physical Sensations:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SYMPTOM_OPTIONS.map((s) => {
                const isSelected = selectedSymptoms.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSymptom(s.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500 text-purple-200 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{s.emoji}</span>
                    <span className="truncate">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Custom Note */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 block">Personal Note / Diary:</label>
            <textarea
              rows={2}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Felt relaxed after chamomile tea, mild lower belly tightness in morning..."
              maxLength={100}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-rose-500 placeholder:text-slate-600"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSyncing}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-rose-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSyncing ? 'Saving to DB…' : 'Save to Database'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
