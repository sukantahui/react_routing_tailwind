// src/components/bijoya/LinkPhoneGroupModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2,
  Unlink,
  Users,
  UserCheck,
  Crown,
  Sparkles,
  Phone,
  MessageCircle,
  CheckCircle2,
  Utensils,
  Leaf,
  Ticket,
  Eye,
  X,
  Heart,
  ShieldCheck,
  Check,
  FileText,
  AlertCircle,
} from "lucide-react";

/**
 * LinkPhoneGroupModal
 * Modal to link multiple guests sharing the same phone/WhatsApp number
 * into a structured Family / Shared Contact Group.
 */
export default function LinkPhoneGroupModal({
  isOpen,
  onClose,
  phone,
  guests = [],
  existingGroup = null,
  isAdmin = false,
  onToggleAttendance,
  onSaveGroup,
  onUnlinkGroup,
  onViewPass,
}) {
  const [groupName, setGroupName] = useState("");
  const [primaryGuestId, setPrimaryGuestId] = useState("");
  const [relationships, setRelationships] = useState({});
  const [groupNotes, setGroupNotes] = useState("");

  const RELATIONSHIP_OPTIONS = [
    "Primary Contact",
    "Spouse",
    "Child / Dependent",
    "Parent",
    "Sibling",
    "Family Member",
    "Friend / Guest",
    "Colleague",
  ];

  // Helper to format proper case
  const toProperCase = (str) => {
    if (!str || typeof str !== "string") return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
      .join(" ");
  };

  const getGuestId = (g) => String(g?.guestId || g?.id || g?.token || "");

  // Initialize or reset state when modal opens
  useEffect(() => {
    if (!isOpen || !guests.length) return;

    const firstGuest = guests[0];
    const defaultPrimaryId =
      existingGroup?.primaryGuestId ||
      getGuestId(firstGuest);

    const defaultName =
      existingGroup?.groupName ||
      (firstGuest ? `${toProperCase(firstGuest.guestName)} & Family` : "Family Group");

    setGroupName(defaultName);
    setPrimaryGuestId(defaultPrimaryId);
    setGroupNotes(existingGroup?.notes || "");

    // Initialize relationships
    const initialRels = { ...(existingGroup?.relationships || {}) };
    guests.forEach((g) => {
      const gId = getGuestId(g);
      if (!initialRels[gId]) {
        initialRels[gId] =
          gId === defaultPrimaryId ? "Primary Contact" : "Family Member";
      }
    });
    setRelationships(initialRels);
  }, [isOpen, guests, existingGroup]);

  // When primary guest changes, update their relationship to "Primary Contact"
  const handleSelectPrimary = (gId) => {
    setPrimaryGuestId(gId);
    setRelationships((prev) => ({
      ...prev,
      [gId]: "Primary Contact",
    }));

    // If group name was default, suggest new name based on selected primary
    const primaryGuest = guests.find((g) => getGuestId(g) === gId);
    if (primaryGuest) {
      const suggested = `${toProperCase(primaryGuest.guestName)} & Family`;
      setGroupName(suggested);
    }
  };

  const handleRelationshipChange = (gId, rel) => {
    setRelationships((prev) => ({
      ...prev,
      [gId]: rel,
    }));
  };

  const handleSave = () => {
    if (!groupName.trim()) {
      return;
    }

    onSaveGroup({
      phone,
      groupName: groupName.trim(),
      primaryGuestId,
      relationships,
      notes: groupNotes.trim(),
      guestCount: guests.length,
      guestIds: guests.map(getGuestId),
      isLinked: true,
      updatedAt: new Date().toISOString(),
    });

    onClose();
  };

  const handleUnlink = () => {
    if (onUnlinkGroup) {
      onUnlinkGroup(phone);
      onClose();
    }
  };

  if (!isOpen) return null;

  const vegCount = guests.filter(
    (g) => String(g.foodPreferenceId) === "1" || String(g.foodPreferenceName).toLowerCase().includes("veg")
  ).length;
  const nonVegCount = guests.length - vegCount;
  const attendingCount = guests.filter(
    (g) => g.is_attending === true || g.is_present === true || g.isAttending === "1"
  ).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 text-slate-100 max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Top Decorative Festive Line */}
          <div className="h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-purple-600 -mt-5 -mx-5 sm:-mt-7 sm:-mx-7 mb-2" />

          {/* Modal Header */}
          <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
                <Link2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Link Attendees by Phone
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{guests.length} Attendees</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Combine registrations sharing phone{" "}
                  <strong className="text-amber-300 font-mono">
                    {phone ? String(phone).replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") : "—"}
                  </strong>{" "}
                  into a unified family or group record.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* Group Configuration Card */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Family / Group Name</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  Label used on group cards and WhatsApp messages
                </span>
              </div>

              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Hui Family Group"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white font-medium placeholder-slate-500 outline-none transition"
              />

              {/* Quick Preset Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400">Presets:</span>
                {guests[0] && (
                  <button
                    type="button"
                    onClick={() => setGroupName(`${toProperCase(guests[0].guestName)} & Family`)}
                    className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 border border-slate-700 transition cursor-pointer"
                  >
                    {toProperCase(guests[0].guestName)} &amp; Family
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setGroupName("Shared Family Contact")}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  Shared Family Contact
                </button>
                <button
                  type="button"
                  onClick={() => setGroupName("Friends / Relatives Group")}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  Friends Group
                </button>
              </div>
            </div>

            {/* Quick Group Metrics Summary */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-center">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Family Members
                </span>
                <span className="text-sm font-bold text-amber-300 font-mono">
                  {guests.length} Guests
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Meal Breakdown
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  🌱 {vegCount} Veg • 🍗 {nonVegCount} Non-Veg
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Attendance
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {attendingCount} / {guests.length} Confirmed
                </span>
              </div>
            </div>

            {/* Member Cards & Relationship Assignment */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Primary Contact &amp; Relationships
                </h4>
                <span className="text-[10px] text-slate-400">
                  👑 Click crown to select Primary Contact
                </span>
              </div>

              <div className="space-y-2">
                {guests.map((guest, idx) => {
                  const gId = getGuestId(guest);
                  const isPrimary = primaryGuestId === gId;
                  const isVeg =
                    String(guest.foodPreferenceId) === "1" ||
                    String(guest.foodPreferenceName).toLowerCase().includes("veg");

                  return (
                    <div
                      key={gId || idx}
                      className={`p-3.5 rounded-2xl border transition space-y-2.5 ${
                        isPrimary
                          ? "bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/30"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        {/* Attendee Info */}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleSelectPrimary(gId)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition cursor-pointer shrink-0 ${
                              isPrimary
                                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold"
                                : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-300"
                            }`}
                            title={isPrimary ? "Primary Contact" : "Click to make Primary Contact"}
                          >
                            <Crown className="w-4 h-4" />
                          </button>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="font-bold text-white text-sm">
                                {toProperCase(guest.guestName || "Unnamed Guest")}
                              </h5>
                              {isPrimary && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold border border-amber-500/40 flex items-center gap-1">
                                  👑 Primary Contact
                                </span>
                              )}
                              <span className="font-mono text-[10px] text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-500/10">
                                {guest.token ? String(guest.token).padStart(4, "0") : `#${idx + 1}`}
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5 text-[11px] text-slate-400 mt-0.5 flex-wrap">
                              {guest.age && <span>Age: {guest.age}</span>}
                              <span>{isVeg ? "🌱 Veg" : "🍗 Non-Veg"}</span>
                              {guest.genderName && <span>{guest.genderName}</span>}
                              {(() => {
                                const isAttending =
                                  guest.is_attending === true ||
                                  guest.is_present === true ||
                                  guest.isAttending === "1" ||
                                  guest.isAttending === 1 ||
                                  guest.is_present === 1 ||
                                  guest.is_attending === 1;

                                if (onToggleAttendance && isAdmin) {
                                  return (
                                    <button
                                      type="button"
                                      onClick={() => onToggleAttendance(guest)}
                                      title={
                                        isAttending
                                          ? "Admin: Click to mark as Absent"
                                          : "Admin: Click to mark as Attending"
                                      }
                                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                                        isAttending
                                          ? "bg-emerald-500/20 hover:bg-rose-500/20 text-emerald-300 hover:text-rose-300 border-emerald-500/30 hover:border-rose-500/40"
                                          : "bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 border-slate-700 hover:border-emerald-500/40"
                                      }`}
                                    >
                                      <span>{isAttending ? "✅ Attending" : "⭕ Absent"}</span>
                                    </button>
                                  );
                                }

                                return (
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                      isAttending
                                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                        : "bg-slate-800 text-slate-500"
                                    }`}
                                  >
                                    {isAttending ? "Attending" : "Absent"}
                                  </span>
                                );
                              })()}
                            </div>
                          </div>
                        </div>

                        {/* Relationship Selector */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-slate-400">Role:</span>
                          <select
                            value={relationships[gId] || "Family Member"}
                            onChange={(e) => handleRelationshipChange(gId, e.target.value)}
                            className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 focus:border-amber-400 outline-none transition cursor-pointer"
                          >
                            {RELATIONSHIP_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>

                          {onViewPass && (
                            <button
                              type="button"
                              onClick={() => onViewPass(guest)}
                              title="View Individual Pass"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition cursor-pointer"
                            >
                              <Ticket className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional Group Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <FileText className="w-3 h-3 text-slate-400" />
                <span>Group Notes / Arrival Remarks (Optional)</span>
              </label>
              <input
                type="text"
                value={groupNotes}
                onChange={(e) => setGroupNotes(e.target.value)}
                placeholder="e.g. Arriving together by car, VIP family reservation"
                className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-slate-700"
              />
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div>
              {existingGroup?.isLinked && (
                <button
                  type="button"
                  onClick={handleUnlink}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 cursor-pointer py-1 px-2 rounded-lg hover:bg-rose-500/10 transition"
                >
                  <Unlink className="w-3.5 h-3.5" />
                  <span>Unlink Group</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>{existingGroup?.isLinked ? "Update Linked Group" : "Confirm & Link Attendees"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
