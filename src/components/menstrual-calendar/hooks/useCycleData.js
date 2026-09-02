/**
 * Custom React Hook for Menstrual Cycle State Management & Persistence
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

const LOCAL_STORAGE_KEY = 'menstrual_cycle_app_data_v1';

export function useCycleData() {
  const [periodStarts, setPeriodStarts] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success'|'warning'|'error', text: '' }

  // Clear notification helper
  const notify = useCallback((text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.text === text ? null : curr));
    }, 5000);
  }, []);

  // 1. Load data from localStorage on mount
  useEffect(() => {
    try {
      const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (rawData) {
        const parsed = JSON.parse(rawData);
        if (Array.isArray(parsed.periodStarts)) {
          setPeriodStarts([...parsed.periodStarts].sort(compareISODates));
        }
        if (parsed.settings && typeof parsed.settings === 'object') {
          setSettings({ ...DEFAULT_SETTINGS, ...parsed.settings });
        }
      }
    } catch (e) {
      console.error('Failed to load cycle data from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Persist data to localStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const dataToSave = {
        periodStarts,
        settings,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save cycle data to localStorage:', e);
    }
  }, [periodStarts, settings, isLoaded]);

  // 3. Add Period Start Date
  const addPeriodStart = useCallback(
    (dateStr) => {
      const val = validatePeriodStartDate(dateStr, periodStarts);
      if (!val.isValid) {
        notify(val.error, 'error');
        return false;
      }

      const updated = [...periodStarts, dateStr].sort(compareISODates);
      setPeriodStarts(updated);

      if (val.warning) {
        notify(val.warning, 'warning');
      } else {
        notify(`Period start date ${dateStr} added successfully!`, 'success');
      }
      return true;
    },
    [periodStarts, notify]
  );

  // 4. Edit Period Start Date
  const editPeriodStart = useCallback(
    (oldDateStr, newDateStr) => {
      if (oldDateStr === newDateStr) return true;
      const otherStarts = periodStarts.filter((d) => d !== oldDateStr);
      const val = validatePeriodStartDate(newDateStr, otherStarts);
      if (!val.isValid) {
        notify(val.error, 'error');
        return false;
      }

      const updated = [...otherStarts, newDateStr].sort(compareISODates);
      setPeriodStarts(updated);
      notify(`Updated ${oldDateStr} to ${newDateStr}`, 'success');
      return true;
    },
    [periodStarts, notify]
  );

  // 5. Delete Period Start Date
  const deletePeriodStart = useCallback(
    (dateStr) => {
      const updated = periodStarts.filter((d) => d !== dateStr);
      setPeriodStarts(updated);
      notify(`Removed period start date ${dateStr}`, 'info');
    },
    [periodStarts, notify]
  );

  // 6. Clear History
  const clearHistory = useCallback(() => {
    setPeriodStarts([]);
    notify('All period history cleared.', 'info');
  }, [notify]);

  // 7. Load Sample Data
  const loadSampleData = useCallback(() => {
    setPeriodStarts([...SAMPLE_PERIOD_STARTS].sort(compareISODates));
    notify('Sample cycle history loaded.', 'success');
  }, [notify]);

  // 8. Update Settings
  const updateSettings = useCallback(
    (newSettings) => {
      setSettings((prev) => ({ ...prev, ...newSettings }));
      notify('Settings updated.', 'success');
    },
    [notify]
  );

  // 9. Export Data to JSON
  const exportData = useCallback(() => {
    const dataObj = {
      app: 'MenstrualCycleCalendar',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      periodStarts,
      settings,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataObj, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `menstrual_cycle_data_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    notify('Cycle data exported successfully.', 'success');
  }, [periodStarts, settings, notify]);

  // 10. Import Data from JSON string
  const importData = useCallback(
    (jsonContent) => {
      try {
        const parsed = JSON.parse(jsonContent);
        const val = validateImportedData(parsed);
        if (!val.isValid) {
          notify(val.error, 'error');
          return false;
        }

        setPeriodStarts(val.data.periodStarts);
        if (val.data.settings && Object.keys(val.data.settings).length > 0) {
          setSettings((prev) => ({ ...prev, ...val.data.settings }));
        }
        notify('Data imported successfully!', 'success');
        return true;
      } catch (err) {
        notify('Failed to parse JSON file.', 'error');
        return false;
      }
    },
    [notify]
  );

  // Derived Calculations memoized
  const cycleStats = useMemo(() => {
    return calculateCycleStats(periodStarts, settings);
  }, [periodStarts, settings]);

  const predictedCycles = useMemo(() => {
    if (!cycleStats.latestPeriodStart) return [];
    return generatePredictedCycles(
      cycleStats.latestPeriodStart,
      cycleStats.averageCycleLength,
      settings
    );
  }, [cycleStats, settings]);

  const dateStatusMap = useMemo(() => {
    return buildDateStatusMap(periodStarts, settings);
  }, [periodStarts, settings]);

  return {
    isLoaded,
    periodStarts,
    settings,
    cycleStats,
    predictedCycles,
    dateStatusMap,
    notification,
    addPeriodStart,
    editPeriodStart,
    deletePeriodStart,
    clearHistory,
    loadSampleData,
    updateSettings,
    exportData,
    importData,
    dismissNotification: () => setNotification(null),
  };
}
