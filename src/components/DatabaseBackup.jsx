// ============================================================================
// DatabaseBackup.jsx - Ultra-Modern MySQL Database Backup & Recovery Center
// ============================================================================

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import backupService from "../services/backupService";

const DatabaseBackup = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [error, setError] = useState(null);

  // Load backups list
  const fetchBackups = useCallback(async (showToast = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await backupService.getBackups();
      if (response && response.status) {
        setBackups(response.data?.backups || []);
        if (showToast) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Backup list refreshed",
            showConfirmButton: false,
            timer: 2000,
            background: "#0f172a",
            color: "#f8fafc",
          });
        }
      } else {
        setBackups([]);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to load backups";
      setError(msg);
      console.error("Backup fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBackups();
  }, [fetchBackups]);

  // Create new backup
  const handleCreateBackup = async () => {
    setCreating(true);
    try {
      const response = await backupService.createBackup();
      if (response && response.status) {
        await Swal.fire({
          icon: "success",
          title: "Backup Created Successfully!",
          html: `
            <div class="text-left text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1 font-mono">
              <p><span class="text-slate-400">File:</span> <span class="text-sky-400 font-bold">${response.data?.filename}</span></p>
              <p><span class="text-slate-400">Size:</span> <span class="text-emerald-400 font-semibold">${response.data?.size_human}</span></p>
              <p><span class="text-slate-400">Time:</span> <span class="text-slate-300">${new Date(response.data?.created_at).toLocaleString()}</span></p>
            </div>
          `,
          background: "#0f172a",
          color: "#f8fafc",
          confirmButtonColor: "#0284c7",
          confirmButtonText: "Awesome",
        });
        await fetchBackups();
      } else {
        throw new Error(response?.message || "Failed to generate backup");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.data?.mysqldump_error ||
        err.response?.data?.message ||
        err.message ||
        "Could not execute database backup";

      Swal.fire({
        icon: "error",
        title: "Backup Creation Failed",
        text: errorMsg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setCreating(false);
    }
  };

  // Download backup
  const handleDownload = async (filename) => {
    setDownloadingFile(filename);
    try {
      await backupService.downloadBackup(filename);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Downloaded ${filename}`,
        showConfirmButton: false,
        timer: 2500,
        background: "#0f172a",
        color: "#f8fafc",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: err.message || "Failed to stream download",
        background: "#0f172a",
        color: "#f8fafc",
      });
    } finally {
      setDownloadingFile(null);
    }
  };

  // Delete single backup
  const handleDelete = async (filename) => {
    const result = await Swal.fire({
      title: "Delete this backup?",
      text: `Are you sure you want to permanently delete "${filename}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, Delete File",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#f8fafc",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await backupService.deleteBackup(filename);
      if (response && response.status) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Backup file deleted",
          showConfirmButton: false,
          timer: 2000,
          background: "#0f172a",
          color: "#f8fafc",
        });
        setBackups((prev) => prev.filter((b) => b.filename !== filename));
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || err.message || "Failed to delete backup file",
        background: "#0f172a",
        color: "#f8fafc",
      });
    }
  };

  // Delete all backups
  const handleDeleteAll = async () => {
    if (backups.length === 0) return;

    const result = await Swal.fire({
      title: "PURGE ALL DATABASE BACKUPS?",
      text: `Warning: This will delete ALL ${backups.length} SQL dump files from the server storage!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, Delete Everything",
      cancelButtonText: "Keep Backups",
      background: "#0f172a",
      color: "#f8fafc",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await backupService.deleteAllBackups();
      if (response && response.status) {
        Swal.fire({
          icon: "success",
          title: "All Backups Purged",
          text: `Deleted ${response.data?.deleted_count || 0} backup files.`,
          background: "#0f172a",
          color: "#f8fafc",
          confirmButtonColor: "#0284c7",
        });
        setBackups([]);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Purge Failed",
        text: err.response?.data?.message || err.message || "Failed to purge backups",
        background: "#0f172a",
        color: "#f8fafc",
      });
    }
  };

  // Metrics computation
  const totalSizeBytes = useMemo(() => {
    return backups.reduce((acc, b) => acc + (b.size_bytes || 0), 0);
  }, [backups]);

  const totalSizeHuman = useMemo(() => {
    if (totalSizeBytes >= 1073741824) return (totalSizeBytes / 1073741824).toFixed(2) + " GB";
    if (totalSizeBytes >= 1048576) return (totalSizeBytes / 1048576).toFixed(2) + " MB";
    if (totalSizeBytes >= 1024) return (totalSizeBytes / 1024).toFixed(2) + " KB";
    return totalSizeBytes + " B";
  }, [totalSizeBytes]);

  const latestBackupDate = useMemo(() => {
    if (!backups.length) return "None";
    const date = new Date(backups[0].created_at);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [backups]);

  // Filtered backups
  const filteredBackups = useMemo(() => {
    if (!searchTerm.trim()) return backups;
    const q = searchTerm.toLowerCase();
    return backups.filter(
      (b) =>
        b.filename.toLowerCase().includes(q) ||
        (b.created_at && b.created_at.toLowerCase().includes(q))
    );
  }, [backups, searchTerm]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. HEADER & HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 p-6 sm:p-8 shadow-2xl shadow-black/60">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/10">
                  <i className="bi bi-database-fill-down text-xl"></i>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/30">
                    Disaster Recovery
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    MySQL 9.1 WAMP
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Database Snapshots & Backups
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Safeguard the <code className="text-sky-300 font-mono bg-slate-800/80 px-1.5 py-0.5 rounded">cnat_db</code> database with instant SQL snapshots, transaction integrity, stored procedures, and triggers.
              </p>
            </div>

            {/* Quick Action Trigger */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCreateBackup}
                disabled={creating}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-sky-600 hover:from-sky-400 hover:to-indigo-500 active:scale-98 transition shadow-lg shadow-sky-500/25 border border-sky-400/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Dumping Database...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-cloud-arrow-down-fill text-base"></i>
                    <span>Create Snapshot Now</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => fetchBackups(true)}
                disabled={loading}
                title="Refresh Backup List"
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition cursor-pointer"
              >
                <i className={`bi bi-arrow-clockwise text-base ${loading ? "animate-spin text-sky-400" : ""}`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* 2. STATS & OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Backups */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Snapshots</span>
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <i className="bi bi-collection-fill text-sm"></i>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{backups.length}</span>
              <span className="text-xs text-slate-400 font-medium">file{backups.length === 1 ? "" : "s"} on disk</span>
            </div>
          </div>

          {/* Card 2: Disk Space */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Storage Footprint</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <i className="bi bi-hdd-fill text-sm"></i>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400">{totalSizeHuman}</span>
              <span className="text-xs text-slate-400 font-medium">allocated</span>
            </div>
          </div>

          {/* Card 3: Latest Snapshot */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Latest Backup</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <i className="bi bi-clock-history text-sm"></i>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-white truncate max-w-[170px]">{latestBackupDate}</span>
            </div>
          </div>

          {/* Card 4: Database Target */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Target Instance</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <i className="bi bi-server text-sm"></i>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-amber-300 font-mono">cnat_db@127.0.0.1</span>
            </div>
          </div>
        </div>

        {/* 3. SEARCH & CONTROLS TOOLBAR */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by filename or date..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/60"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>

          {/* Danger Purge Button */}
          {backups.length > 0 && (
            <button
              type="button"
              onClick={handleDeleteAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition cursor-pointer self-end sm:self-auto"
            >
              <i className="bi bi-trash3-fill"></i>
              <span>Purge All ({backups.length})</span>
            </button>
          )}
        </div>

        {/* 4. ERROR NOTICE */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-3">
            <i className="bi bi-exclamation-triangle-fill text-lg text-rose-400"></i>
            <div className="flex-1">
              <span className="font-bold">Error loading backups:</span> {error}
            </div>
            <button
              type="button"
              onClick={() => fetchBackups(false)}
              className="px-3 py-1 rounded-lg bg-rose-900/50 hover:bg-rose-900 border border-rose-700 text-white font-medium transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* 5. BACKUP FILES LIST */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Stored SQL Snapshots</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {filteredBackups.length} available
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
              storage/app/backups/
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-medium">Scanning backup directory...</p>
            </div>
          ) : filteredBackups.length === 0 ? (
            <div className="py-16 px-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-500 text-2xl mx-auto shadow-inner">
                <i className="bi bi-database-slash"></i>
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <p className="text-sm font-bold text-white">
                  {searchTerm ? "No matching backups found" : "No Database Backups Found"}
                </p>
                <p className="text-xs text-slate-400">
                  {searchTerm
                    ? "Try adjusting your search query to find the desired file."
                    : "No SQL dumps currently exist in storage. Click 'Create Snapshot Now' to generate your first full database backup."}
                </p>
              </div>
              {!searchTerm && (
                <button
                  type="button"
                  onClick={handleCreateBackup}
                  disabled={creating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition shadow cursor-pointer"
                >
                  <i className="bi bi-plus-circle-fill"></i>
                  <span>Create First Backup</span>
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {filteredBackups.map((backup, idx) => {
                const isDownloading = downloadingFile === backup.filename;
                const formattedDate = new Date(backup.created_at).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });

                return (
                  <motion.div
                    key={backup.filename}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition group"
                  >
                    {/* File info */}
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:scale-105 transition">
                        <i className="bi bi-filetype-sql text-lg"></i>
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 font-mono transition truncate">
                            {backup.filename}
                          </p>
                          {idx === 0 && (
                            <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Newest
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1 font-semibold text-emerald-400">
                            <i className="bi bi-hdd text-[10px]"></i>
                            {backup.size_human}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <i className="bi bi-calendar3 text-[10px]"></i>
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                      {/* Download Button */}
                      <button
                        type="button"
                        onClick={() => handleDownload(backup.filename)}
                        disabled={isDownloading}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-sky-600 border border-slate-700 hover:border-sky-500 transition shadow-sm cursor-pointer disabled:opacity-50"
                        title="Download SQL dump"
                      >
                        {isDownloading ? (
                          <>
                            <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            <span>Downloading...</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-download text-xs text-sky-400"></i>
                            <span>Download</span>
                          </>
                        )}
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDelete(backup.filename)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition cursor-pointer"
                        title="Delete backup"
                      >
                        <i className="bi bi-trash3 text-sm"></i>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. CLI & AUTOMATION CHEATSHEET */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* CLI Automation */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-300">
              <i className="bi bi-terminal text-sky-400"></i>
              <span className="text-xs font-bold uppercase tracking-wider">Artisan CLI Command</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              You can trigger a backup anytime from your terminal or script it via Windows Task Scheduler or cron:
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs text-sky-300">
              <span>php artisan db:backup</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("php artisan db:backup");
                  Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Copied to clipboard",
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#0f172a",
                    color: "#f8fafc",
                  });
                }}
                className="text-slate-500 hover:text-white text-xs cursor-pointer"
                title="Copy command"
              >
                <i className="bi bi-clipboard"></i>
              </button>
            </div>
          </div>

          {/* Database Restoration Guide */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-300">
              <i className="bi bi-arrow-counterclockwise text-emerald-400"></i>
              <span className="text-xs font-bold uppercase tracking-wider">How to Restore from Snapshot</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              To restore a downloaded <code className="text-slate-200">.sql</code> dump into your MySQL instance:
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 truncate">
              mysql -u root -p cnat_db &lt; cnat_db_backup.sql
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DatabaseBackup;
