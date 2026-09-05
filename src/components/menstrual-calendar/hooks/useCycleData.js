/**
 * Custom React Hook — Menstrual Cycle State Management
 *
 * Strategy:
 *  - On mount: call GET /api/cycle/me (auth:sanctum). On success, use DB data
 *    as source of truth and mirror it to localStorage as offline cache.
 *  - All mutations (add/edit/delete/clear/sync) call the API first; on success
 *    update local React state (which the API response always returns in full).
 *  - If the API call fails (network error / not logged in), falls back to
 *    localStorage-only mode so the UI still works.
 *  - "Sync to Cloud" syncs any localStorage-only data to the DB.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { DEFAULT_SETTINGS, SAMPLE_PERIOD_STARTS } from '../constants/cycleConstants';
import { compareISODates } from '../utils/dateUtils';
import {
  calculateCycleStats,
  generatePredictedCycles,
  buildDateStatusMap,
} from '../utils/cycleCalculations';
import { validatePeriodStartDate, validateImportedData } from '../utils/validation';
import { cycleApi } from '../api/cycleApi';

const LOCAL_STORAGE_KEY = 'menstrual_cycle_app_data_v1';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Read from localStorage */
function readLocalStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Write to localStorage */
function writeLocalStorage(periodStarts, settings) {
  try {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ periodStarts, settings, lastUpdated: new Date().toISOString() })
    );
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
}

/** Map Laravel API settings response → React DEFAULT_SETTINGS shape */
function apiSettingsToReact(apiSettings) {
  if (!apiSettings) return {};
  return {
    periodDuration:          apiSettings.periodDuration          ?? DEFAULT_SETTINGS.periodDuration,
    averageCycleLength:      apiSettings.averageCycleLength      ?? DEFAULT_SETTINGS.averageCycleLength,
    useCustomAverageCycle:   apiSettings.useCustomAverageCycle   ?? DEFAULT_SETTINGS.useCustomAverageCycle,
    lutealPhaseLength:       apiSettings.lutealPhaseLength       ?? DEFAULT_SETTINGS.lutealPhaseLength,
    predictionMonths:        apiSettings.predictionMonths        ?? DEFAULT_SETTINGS.predictionMonths,
    fertileWindowDaysBefore: apiSettings.fertileWindowDaysBefore ?? DEFAULT_SETTINGS.fertileWindowDaysBefore,
    fertileWindowDaysAfter:  apiSettings.fertileWindowDaysAfter  ?? DEFAULT_SETTINGS.fertileWindowDaysAfter,
  };
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useCycleData() {
  const [periodStarts, setPeriodStarts]   = useState([]);
  const [periodEntries, setPeriodEntries] = useState([]);   // full DB entry objects: { id, period_start_date, notes }
  const [settings, setSettings]           = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded]           = useState(false);
  const [isApiMode, setIsApiMode]         = useState(false);   // true = DB is source of truth
  const [isSyncing, setIsSyncing]         = useState(false);   // API call in-flight
  const [notification, setNotification]   = useState(null);
  const [apiProfile, setApiProfile]       = useState(null);    // raw profile from API (goal, DOB, etc.)

  // ── Notification helper ──────────────────────────────────────────────────

  const notify = useCallback((text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.text === text ? null : curr));
    }, 5000);
  }, []);

  // ── Apply API response to state ──────────────────────────────────────────

  const applyApiData = useCallback((data) => {
    const starts   = (data.period_starts || []).sort(compareISODates);
    const entries  = (data.period_entries || []).sort((a, b) =>
      compareISODates(a.period_start_date, b.period_start_date)
    );
    const merged   = { ...DEFAULT_SETTINGS, ...apiSettingsToReact(data.settings) };

    setPeriodStarts(starts);
    setPeriodEntries(entries);
    setSettings(merged);
    setApiProfile(data);
    writeLocalStorage(starts, merged);
  }, []);

  // ── 1. Mount: load from API, fall back to localStorage ─────────────────

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      // Try the API first (user must be logged in)
      try {
        const res = await cycleApi.getMe();
        if (cancelled) return;

        if (res.data?.status && res.data?.data) {
          applyApiData(res.data.data);
          setIsApiMode(true);

          // If this is a new profile AND localStorage has existing data,
          // offer to sync it up automatically.
          const cached = readLocalStorage();
          if (res.data.data.is_new_profile && cached?.periodStarts?.length > 0) {
            // Sync localStorage data to the new DB profile silently
            try {
              const syncRes = await cycleApi.syncPeriodDates(cached.periodStarts);
              if (!cancelled && syncRes.data?.status) {
                applyApiData(syncRes.data.data);
                notify('Your previous local data has been synced to your account.', 'success');
              }
            } catch {
              // ignore sync failure — data already in state
            }
          }
        }
      } catch (err) {
        if (cancelled) return;
        // API failed (network issue / not logged in) — fall back to localStorage
        console.warn('Cycle API unavailable, using localStorage:', err.message);
        const cached = readLocalStorage();
        if (cached) {
          const starts = [...(cached.periodStarts || [])].sort(compareISODates);
          setPeriodStarts(starts);
          setSettings({ ...DEFAULT_SETTINGS, ...(cached.settings || {}) });
        }
        setIsApiMode(false);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    }

    loadData();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 2. localStorage persistence (always keep in sync) ───────────────────

  useEffect(() => {
    if (!isLoaded) return;
    writeLocalStorage(periodStarts, settings);
  }, [periodStarts, settings, isLoaded]);

  // ── 3. Add Period Start Date ─────────────────────────────────────────────

  const addPeriodStart = useCallback(
    async (dateStr, notes = null) => {
      const val = validatePeriodStartDate(dateStr, periodStarts);
      if (!val.isValid) { notify(val.error, 'error'); return false; }

      if (isApiMode) {
        setIsSyncing(true);
        try {
          const res = await cycleApi.addPeriodDate(dateStr, notes);
          if (res.data?.status) {
            applyApiData(res.data.data);
            notify(val.warning || `Period date ${dateStr} added.`, val.warning ? 'warning' : 'success');
            return true;
          }
          notify(res.data?.message || 'Failed to add date.', 'error');
          return false;
        } catch (err) {
          const msg = err.response?.data?.message || 'Network error. Date not saved to server.';
          notify(msg, 'error');
          return false;
        } finally {
          setIsSyncing(false);
        }
      }

      // localStorage-only mode
      const updated = [...periodStarts, dateStr].sort(compareISODates);
      setPeriodStarts(updated);
      // Also track entry locally (no id, no server round-trip)
      setPeriodEntries((prev) => [
        ...prev,
        { id: null, period_start_date: dateStr, notes: notes || null },
      ].sort((a, b) => compareISODates(a.period_start_date, b.period_start_date)));
      notify(val.warning || `Period date ${dateStr} added.`, val.warning ? 'warning' : 'success');
      return true;
    },
    [periodStarts, isApiMode, notify, applyApiData]
  );

  // ── 4. Edit Period Start Date ────────────────────────────────────────────

  const editPeriodStart = useCallback(
    async (oldDateStr, newDateStr) => {
      if (oldDateStr === newDateStr) return true;

      const otherStarts = periodStarts.filter((d) => d !== oldDateStr);
      const val = validatePeriodStartDate(newDateStr, otherStarts);
      if (!val.isValid) { notify(val.error, 'error'); return false; }

      if (isApiMode) {
        setIsSyncing(true);
        try {
          const res = await cycleApi.editPeriodDate(oldDateStr, newDateStr);
          if (res.data?.status) {
            applyApiData(res.data.data);
            notify(`Updated ${oldDateStr} to ${newDateStr}.`, 'success');
            return true;
          }
          notify(res.data?.message || 'Failed to update date.', 'error');
          return false;
        } catch (err) {
          notify(err.response?.data?.message || 'Network error.', 'error');
          return false;
        } finally {
          setIsSyncing(false);
        }
      }

      const updated = [...otherStarts, newDateStr].sort(compareISODates);
      setPeriodStarts(updated);
      notify(`Updated ${oldDateStr} to ${newDateStr}.`, 'success');
      return true;
    },
    [periodStarts, isApiMode, notify, applyApiData]
  );

  // ── 5. Delete Period Start Date ─────────────────────────────────────────

  const deletePeriodStart = useCallback(
    async (dateStr) => {
      if (isApiMode) {
        setIsSyncing(true);
        try {
          const res = await cycleApi.deletePeriodDate(dateStr);
          if (res.data?.status) {
            applyApiData(res.data.data);
            notify(`Removed ${dateStr}.`, 'info');
            return;
          }
        } catch (err) {
          notify(err.response?.data?.message || 'Network error.', 'error');
          return;
        } finally {
          setIsSyncing(false);
        }
      }

      setPeriodStarts((prev) => prev.filter((d) => d !== dateStr));
      notify(`Removed ${dateStr}.`, 'info');
    },
    [isApiMode, notify, applyApiData]
  );

  // ── 6. Clear History ─────────────────────────────────────────────────────

  const clearHistory = useCallback(async () => {
    if (isApiMode) {
      setIsSyncing(true);
      try {
        const res = await cycleApi.clearAllPeriods();
        if (res.data?.status) {
          applyApiData(res.data.data);
          notify('All period history cleared.', 'info');
          return;
        }
      } catch {
        notify('Network error — clearing locally only.', 'warning');
      } finally {
        setIsSyncing(false);
      }
    }

    setPeriodStarts([]);
    notify('All period history cleared.', 'info');
  }, [isApiMode, notify, applyApiData]);

  // ── 6b. Bulk Add Period Dates ────────────────────────────────────────────
  // Accepts an array of 'YYYY-MM-DD' strings (new dates to add).
  // Merges with existing dates, deduplicates, then syncs in one API call.
  // Returns { added: number, skipped: number } so the modal can report results.

  const bulkAddPeriodDates = useCallback(
    async (newDates) => {
      if (!newDates || newDates.length === 0) return { added: 0, skipped: 0 };

      // Deduplicate and identify which are truly new
      const uniqueNew  = [...new Set(newDates.filter(Boolean))];
      const newOnly    = uniqueNew.filter((d) => !periodStarts.includes(d));
      const skipped    = uniqueNew.length - newOnly.length;

      if (newOnly.length === 0) {
        notify(`All ${skipped} date(s) already exist — nothing added.`, 'info');
        return { added: 0, skipped };
      }

      // Merged sorted list
      const merged = [...periodStarts, ...newOnly].sort(compareISODates);

      if (isApiMode) {
        setIsSyncing(true);
        try {
          const res = await cycleApi.syncPeriodDates(merged);
          if (res.data?.status) {
            applyApiData(res.data.data);
            notify(
              `${newOnly.length} date(s) added${skipped > 0 ? `, ${skipped} skipped (duplicates)` : ''}.`,
              'success'
            );
            return { added: newOnly.length, skipped };
          }
          notify(res.data?.message || 'Bulk save failed.', 'error');
          return { added: 0, skipped };
        } catch (err) {
          notify(err.response?.data?.message || 'Network error during bulk save.', 'error');
          return { added: 0, skipped };
        } finally {
          setIsSyncing(false);
        }
      }

      // localStorage-only mode
      setPeriodStarts(merged);
      setPeriodEntries((prev) => {
        const existing = new Set(prev.map((e) => e.period_start_date));
        const newEntries = newOnly
          .filter((d) => !existing.has(d))
          .map((d) => ({ id: null, period_start_date: d, notes: null }));
        return [...prev, ...newEntries].sort((a, b) =>
          compareISODates(a.period_start_date, b.period_start_date)
        );
      });
      notify(
        `${newOnly.length} date(s) added${skipped > 0 ? `, ${skipped} skipped (duplicates)` : ''}.`,
        'success'
      );
      return { added: newOnly.length, skipped };
    },
    [periodStarts, isApiMode, notify, applyApiData]
  );



  // ── 7. Load Sample Data ──────────────────────────────────────────────────

  const loadSampleData = useCallback(async () => {
    const sorted = [...SAMPLE_PERIOD_STARTS].sort(compareISODates);

    if (isApiMode) {
      setIsSyncing(true);
      try {
        const res = await cycleApi.syncPeriodDates(sorted);
        if (res.data?.status) {
          applyApiData(res.data.data);
          notify('Sample cycle history loaded.', 'success');
          return;
        }
      } catch {
        notify('Network error — loaded sample data locally only.', 'warning');
      } finally {
        setIsSyncing(false);
      }
    }

    setPeriodStarts(sorted);
    notify('Sample cycle history loaded.', 'success');
  }, [isApiMode, notify, applyApiData]);

  // ── 8. Update Settings ───────────────────────────────────────────────────

  const updateSettings = useCallback(
    async (newSettings) => {
      const merged = { ...settings, ...newSettings };
      setSettings(merged);

      if (isApiMode) {
        setIsSyncing(true);
        try {
          const res = await cycleApi.updateProfile(newSettings);
          if (res.data?.status) {
            applyApiData(res.data.data);
            notify('Settings saved to your account.', 'success');
            return;
          }
        } catch {
          notify('Settings saved locally (network error).', 'warning');
        } finally {
          setIsSyncing(false);
        }
      } else {
        notify('Settings updated.', 'success');
      }
    },
    [settings, isApiMode, notify, applyApiData]
  );

  // ── 9. Update Health Profile ─────────────────────────────────────────────

  const updateHealthProfile = useCallback(
    async (profileData) => {
      if (isApiMode) {
        setIsSyncing(true);
        try {
          const res = await cycleApi.updateProfile(profileData);
          if (res.data?.status) {
            applyApiData(res.data.data);
            notify('Health profile saved.', 'success');
            return true;
          }
          notify(res.data?.message || 'Failed to save profile.', 'error');
          return false;
        } catch (err) {
          notify(err.response?.data?.message || 'Network error.', 'error');
          return false;
        } finally {
          setIsSyncing(false);
        }
      }

      notify('Please log in to save your health profile.', 'warning');
      return false;
    },
    [isApiMode, notify, applyApiData]
  );

  // ── 10. Sync localStorage → DB ───────────────────────────────────────────

  const syncToCloud = useCallback(async () => {
    if (!isApiMode) { notify('Not connected to server.', 'warning'); return; }
    if (periodStarts.length === 0) { notify('No data to sync.', 'info'); return; }

    setIsSyncing(true);
    try {
      const res = await cycleApi.syncPeriodDates(periodStarts);
      if (res.data?.status) {
        applyApiData(res.data.data);
        notify('Data synced to your account!', 'success');
      }
    } catch {
      notify('Sync failed. Please try again.', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, [isApiMode, periodStarts, notify, applyApiData]);

  // ── 11. Export / Import ──────────────────────────────────────────────────

  const exportData = useCallback(() => {
    const dataObj = {
      app: 'MenstrualCycleCalendar',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      periodStarts,
      settings,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataObj, null, 2))}`;
    const a = document.createElement('a');
    a.setAttribute('href', jsonString);
    a.setAttribute('download', `menstrual_cycle_data_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    notify('Cycle data exported.', 'success');
  }, [periodStarts, settings, notify]);

  const importData = useCallback(
    async (jsonContent) => {
      try {
        const parsed = JSON.parse(jsonContent);
        const val = validateImportedData(parsed);
        if (!val.isValid) { notify(val.error, 'error'); return false; }

        if (isApiMode) {
          setIsSyncing(true);
          try {
            const res = await cycleApi.syncPeriodDates(val.data.periodStarts);
            if (res.data?.status) {
              applyApiData(res.data.data);
              if (val.data.settings && Object.keys(val.data.settings).length > 0) {
                await cycleApi.updateProfile(val.data.settings);
              }
              notify('Data imported and saved to your account!', 'success');
              return true;
            }
          } catch {
            notify('Import failed on server. Saved locally.', 'warning');
          } finally {
            setIsSyncing(false);
          }
        }

        setPeriodStarts(val.data.periodStarts);
        if (val.data.settings && Object.keys(val.data.settings).length > 0) {
          setSettings((prev) => ({ ...prev, ...val.data.settings }));
        }
        notify('Data imported successfully!', 'success');
        return true;
      } catch {
        notify('Failed to parse JSON file.', 'error');
        return false;
      }
    },
    [isApiMode, notify, applyApiData]
  );

  // ── Derived calculations ─────────────────────────────────────────────────

  const cycleStats = useMemo(
    () => calculateCycleStats(periodStarts, settings),
    [periodStarts, settings]
  );

  const predictedCycles = useMemo(() => {
    if (!cycleStats.latestPeriodStart) return [];
    return generatePredictedCycles(cycleStats.latestPeriodStart, cycleStats.averageCycleLength, settings);
  }, [cycleStats, settings]);

  const dateStatusMap = useMemo(
    () => buildDateStatusMap(periodStarts, settings),
    [periodStarts, settings]
  );

  return {
    isLoaded,
    isApiMode,
    isSyncing,
    periodStarts,
    periodEntries,    // full DB entry objects: [{ id, period_start_date, notes }]
    settings,
    apiProfile,       // raw profile from server: goal, date_of_birth, weight_kg, etc.
    cycleStats,
    predictedCycles,
    dateStatusMap,
    notification,
    addPeriodStart,
    bulkAddPeriodDates,
    editPeriodStart,
    deletePeriodStart,
    clearHistory,
    loadSampleData,
    updateSettings,
    updateHealthProfile,
    syncToCloud,
    exportData,
    importData,
    dismissNotification: () => setNotification(null),
  };
}
