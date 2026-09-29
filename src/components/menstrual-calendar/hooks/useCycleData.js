/**
 * Custom React Hook — Menstrual Cycle State Management
 *
 * Strategy:
 *  - STRICT DATABASE PERSISTENCE via cnat_api (Laravel + MySQL backend).
 *  - ZERO LOCAL BROWSER STORAGE: No cycle dates, settings, or health records are
 *    saved in localStorage or browser cookies.
 *  - On mount: GET /api/cycle/me fetches the authenticated user's records from DB.
 *  - All mutations (add, edit, delete, bulk sync, settings update, health profile)
 *    send atomic API calls directly to the cnat_api backend and update React state
 *    from the fresh database response.
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

const LEGACY_LOCAL_STORAGE_KEY = 'menstrual_cycle_app_data_v1';

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

export function useCycleData() {
  const [periodStarts, setPeriodStarts]   = useState([]);
  const [periodEntries, setPeriodEntries] = useState([]);   // full DB entry objects: [{ id, period_start_date, notes }]
  const [settings, setSettings]           = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded]           = useState(false);
  const [isApiMode, setIsApiMode]         = useState(false);   // true = connected to cnat_api database
  const [isSyncing, setIsSyncing]         = useState(false);   // API call in-flight
  const [notification, setNotification]   = useState(null);
  const [apiProfile, setApiProfile]       = useState(null);    // raw profile from API (goal, DOB, etc.)
  const [apiError, setApiError]           = useState(null);

  // ── Notification helper ──────────────────────────────────────────────────

  const notify = useCallback((text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.text === text ? null : curr));
    }, 5000);
  }, []);

  // ── Apply API response to state ──────────────────────────────────────────

  const applyApiData = useCallback((data) => {
    if (!data) return;
    const rawStarts = data.periodStarts || data.period_starts || [];
    const starts = [...rawStarts].sort(compareISODates);

    const rawEntries = data.periodEntries || data.period_entries || [];
    const entries = rawEntries.map((e) => ({
      id: e.id ?? null,
      period_start_date: e.periodStartDate || e.period_start_date,
      periodStartDate: e.periodStartDate || e.period_start_date,
      notes: e.notes || null,
    })).sort((a, b) =>
      compareISODates(a.periodStartDate || a.period_start_date, b.periodStartDate || b.period_start_date)
    );

    const mergedSettings = { ...DEFAULT_SETTINGS, ...apiSettingsToReact(data.settings) };

    setPeriodStarts(starts);
    setPeriodEntries(entries);
    setSettings(mergedSettings);
    setApiProfile(data);
    setIsApiMode(true);
    setApiError(null);
  }, []);

  // ── 1. Mount & Database Load: Fetch directly from cnat_api ─────────────────

  const loadData = useCallback(async () => {
    // Purge any legacy localStorage cache to guarantee no local browser storage
    try {
      localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }

    const token = localStorage.getItem('token');
    const rawUser = localStorage.getItem('user');
    const isAuth = !!token && token !== 'null' && token !== 'undefined' && token.trim() !== '' && !!rawUser;

    if (!isAuth) {
      setIsApiMode(false);
      setIsLoaded(true);
      return;
    }

    try {
      setIsSyncing(true);
      const res = await cycleApi.getMe();
      if (res.data?.status && res.data?.data) {
        applyApiData(res.data.data);
      } else {
        setIsApiMode(false);
        setApiError('Unable to load data from database.');
      }
    } catch (err) {
      console.error('Cycle API fetch error:', err);
      setIsApiMode(false);
      const msg = err.response?.data?.message || 'Failed to connect to cnat_api database. Please ensure WAMP is running.';
      setApiError(msg);
      notify(msg, 'error');
    } finally {
      setIsSyncing(false);
      setIsLoaded(true);
    }
  }, [applyApiData, notify]);

  useEffect(() => {
    let active = true;
    loadData();

    const handleAuthChange = () => {
      if (active) loadData();
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChanged', handleAuthChange);

    return () => {
      active = false;
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, [loadData]);

  // ── 2. Add Period Start Date (Direct to Database via API) ────────────────

  const addPeriodStart = useCallback(
    async (dateStr, notes = null) => {
      const val = validatePeriodStartDate(dateStr, periodStarts);
      if (!val.isValid) {
        notify(val.error, 'error');
        return false;
      }

      setIsSyncing(true);
      try {
        const res = await cycleApi.addPeriodDate(dateStr, notes);
        if (res.data?.status && res.data?.data) {
          applyApiData(res.data.data);
          notify(val.warning || `Period date ${dateStr} saved to database.`, val.warning ? 'warning' : 'success');
          return true;
        }
        notify(res.data?.message || 'Failed to save date to database.', 'error');
        return false;
      } catch (err) {
        const msg = err.response?.data?.message || 'Network error. Date not saved to database.';
        notify(msg, 'error');
        return false;
      } finally {
        setIsSyncing(false);
      }
    },
    [periodStarts, notify, applyApiData]
  );

  // ── 3. Edit Period Start Date (Direct to Database via API) ───────────────

  const editPeriodStart = useCallback(
    async (oldDateStr, newDateStr, notes = null) => {
      if (oldDateStr === newDateStr) return true;

      const otherStarts = periodStarts.filter((d) => d !== oldDateStr);
      const val = validatePeriodStartDate(newDateStr, otherStarts);
      if (!val.isValid) {
        notify(val.error, 'error');
        return false;
      }

      setIsSyncing(true);
      try {
        const res = await cycleApi.editPeriodDate(oldDateStr, newDateStr, notes);
        if (res.data?.status && res.data?.data) {
          applyApiData(res.data.data);
          notify(`Updated ${oldDateStr} to ${newDateStr} in database.`, 'success');
          return true;
        }
        notify(res.data?.message || 'Failed to update date in database.', 'error');
        return false;
      } catch (err) {
        const msg = err.response?.data?.message || 'Network error while updating date in database.';
        notify(msg, 'error');
        return false;
      } finally {
        setIsSyncing(false);
      }
    },
    [periodStarts, notify, applyApiData]
  );

  // ── 4. Delete Period Start Date (Direct from Database via API) ───────────

  const deletePeriodStart = useCallback(
    async (dateStr) => {
      setIsSyncing(true);
      try {
        const res = await cycleApi.deletePeriodDate(dateStr);
        if (res.data?.status && res.data?.data) {
          applyApiData(res.data.data);
          notify(`Removed ${dateStr} from database.`, 'info');
          return true;
        }
        notify(res.data?.message || 'Failed to delete date from database.', 'error');
        return false;
      } catch (err) {
        const msg = err.response?.data?.message || 'Network error while deleting date.';
        notify(msg, 'error');
        return false;
      } finally {
        setIsSyncing(false);
      }
    },
    [notify, applyApiData]
  );

  // ── 5. Clear History (Direct from Database via API) ──────────────────────

  const clearHistory = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await cycleApi.clearAllPeriods();
      if (res.data?.status && res.data?.data) {
        applyApiData(res.data.data);
        notify('All period history deleted from database.', 'info');
        return true;
      }
      notify(res.data?.message || 'Failed to clear history from database.', 'error');
      return false;
    } catch (err) {
      const msg = err.response?.data?.message || 'Network error while clearing period history.';
      notify(msg, 'error');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [notify, applyApiData]);

  // ── 6. Bulk Add Period Dates (Direct to Database via API) ────────────────

  const bulkAddPeriodDates = useCallback(
    async (newDates) => {
      if (!newDates || newDates.length === 0) return { added: 0, skipped: 0 };

      const uniqueNew = [...new Set(newDates.filter(Boolean))];
      const newOnly = uniqueNew.filter((d) => !periodStarts.includes(d));
      const skipped = uniqueNew.length - newOnly.length;

      if (newOnly.length === 0) {
        notify(`All ${skipped} date(s) already exist in database — nothing added.`, 'info');
        return { added: 0, skipped };
      }

      const merged = [...periodStarts, ...newOnly].sort(compareISODates);

      setIsSyncing(true);
      try {
        const res = await cycleApi.syncPeriodDates(merged);
        if (res.data?.status && res.data?.data) {
          applyApiData(res.data.data);
          notify(
            `${newOnly.length} date(s) saved to database${skipped > 0 ? `, ${skipped} skipped (duplicates)` : ''}.`,
            'success'
          );
          return { added: newOnly.length, skipped };
        }
        notify(res.data?.message || 'Bulk save to database failed.', 'error');
        return { added: 0, skipped };
      } catch (err) {
        const msg = err.response?.data?.message || 'Network error during bulk database save.';
        notify(msg, 'error');
        return { added: 0, skipped };
      } finally {
        setIsSyncing(false);
      }
    },
    [periodStarts, notify, applyApiData]
  );

  // ── 7. Load Sample Data (Direct to Database via API) ─────────────────────

  const loadSampleData = useCallback(async () => {
    const sorted = [...SAMPLE_PERIOD_STARTS].sort(compareISODates);
    setIsSyncing(true);
    try {
      const res = await cycleApi.syncPeriodDates(sorted);
      if (res.data?.status && res.data?.data) {
        applyApiData(res.data.data);
        notify('Sample cycle history saved to database successfully.', 'success');
        return true;
      }
      notify(res.data?.message || 'Failed to save sample data to database.', 'error');
      return false;
    } catch (err) {
      const msg = err.response?.data?.message || 'Network error while loading sample data.';
      notify(msg, 'error');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [notify, applyApiData]);

  // ── 8. Update Settings (Direct to Database via API) ──────────────────────

  const updateSettings = useCallback(
    async (newSettings) => {
      setIsSyncing(true);
      try {
        const res = await cycleApi.updateProfile(newSettings);
        if (res.data?.status && res.data?.data) {
          applyApiData(res.data.data);
          notify('Settings saved to database successfully.', 'success');
          return true;
        }
        notify(res.data?.message || 'Failed to save settings to database.', 'error');
        return false;
      } catch (err) {
        const msg = err.response?.data?.message || 'Network error while saving settings.';
        notify(msg, 'error');
        return false;
      } finally {
        setIsSyncing(false);
      }
    },
    [notify, applyApiData]
  );

  // ── 9. Update Health Profile (Direct to Database via API) ────────────────

  const updateHealthProfile = useCallback(
    async (profileData) => {
      setIsSyncing(true);
      try {
        const res = await cycleApi.updateProfile(profileData);
        if (res.data?.status && res.data?.data) {
          applyApiData(res.data.data);
          notify('Health profile saved to database successfully.', 'success');
          return true;
        }
        notify(res.data?.message || 'Failed to save health profile to database.', 'error');
        return false;
      } catch (err) {
        const msg = err.response?.data?.message || 'Network error while saving health profile.';
        notify(msg, 'error');
        return false;
      } finally {
        setIsSyncing(false);
      }
    },
    [notify, applyApiData]
  );

  // ── 10. Refresh from Database ────────────────────────────────────────────

  const refreshFromDatabase = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await cycleApi.getMe();
      if (res.data?.status && res.data?.data) {
        applyApiData(res.data.data);
        notify('Data refreshed from cnat_api database.', 'success');
        return true;
      }
      notify(res.data?.message || 'Refresh failed.', 'error');
      return false;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to refresh from database.';
      notify(msg, 'error');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [notify, applyApiData]);

  // ── 11. Export / Import ──────────────────────────────────────────────────

  const exportData = useCallback(() => {
    const dataObj = {
      app: 'MenstrualCycleCalendar',
      version: '1.0.0',
      source: 'cnat_api database',
      exportDate: new Date().toISOString(),
      periodStarts,
      settings,
      healthProfile: apiProfile ? {
        goal: apiProfile.goal,
        date_of_birth: apiProfile.date_of_birth,
        weight_kg: apiProfile.weight_kg,
        height_cm: apiProfile.height_cm,
        blood_group: apiProfile.blood_group,
        medical_notes: apiProfile.medical_notes,
      } : null,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataObj, null, 2))}`;
    const a = document.createElement('a');
    a.setAttribute('href', jsonString);
    a.setAttribute('download', `menstrual_cycle_database_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    notify('Cycle database data exported as JSON.', 'success');
  }, [periodStarts, settings, apiProfile, notify]);

  const importData = useCallback(
    async (jsonContent) => {
      try {
        const parsed = JSON.parse(jsonContent);
        const val = validateImportedData(parsed);
        if (!val.isValid) {
          notify(val.error, 'error');
          return false;
        }

        setIsSyncing(true);
        try {
          const res = await cycleApi.syncPeriodDates(val.data.periodStarts);
          if (res.data?.status && res.data?.data) {
            applyApiData(res.data.data);
            if (val.data.settings && Object.keys(val.data.settings).length > 0) {
              await cycleApi.updateProfile(val.data.settings);
            }
            notify('Data imported and saved to database successfully!', 'success');
            return true;
          }
          notify(res.data?.message || 'Import failed on server.', 'error');
          return false;
        } catch (err) {
          const msg = err.response?.data?.message || 'Failed to save imported data to database.';
          notify(msg, 'error');
          return false;
        } finally {
          setIsSyncing(false);
        }
      } catch {
        notify('Failed to parse JSON file.', 'error');
        return false;
      }
    },
    [notify, applyApiData]
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
    apiError,
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
    refreshFromDatabase,
    exportData,
    importData,
    dismissNotification: () => setNotification(null),
  };
}
