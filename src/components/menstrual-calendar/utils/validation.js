/**
 * Validation utilities for Menstrual Cycle Calendar
 */

import { parseISODate, formatISODate, differenceInCalendarDays } from './dateUtils';

/**
 * Validate a new period start date input
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {Array<string>} existingStarts - List of existing start dates
 * @returns {{ isValid: boolean, error?: string, warning?: string }}
 */
export function validatePeriodStartDate(dateStr, existingStarts = []) {
  if (!dateStr || typeof dateStr !== 'string') {
    return { isValid: false, error: 'Please enter a valid date.' };
  }

  const parsed = parseISODate(dateStr);
  if (!parsed) {
    return { isValid: false, error: 'Invalid date format. Use YYYY-MM-DD.' };
  }

  // Prevent duplicate dates
  if (existingStarts.includes(dateStr)) {
    return { isValid: false, error: 'This period start date has already been entered.' };
  }

  // Check for future dates (warning rather than hard error)
  const todayStr = formatISODate(new Date());
  let warning = null;
  if (dateStr > todayStr) {
    warning = 'This date is in the future. Please confirm if this is intentional.';
  }

  // Check for unusually short interval (< 15 days from closest date)
  if (existingStarts.length > 0) {
    const closestDiff = existingStarts.reduce((minDiff, existing) => {
      const diff = Math.abs(differenceInCalendarDays(dateStr, existing));
      return diff < minDiff ? diff : minDiff;
    }, Infinity);

    if (closestDiff < 15) {
      warning = warning
        ? `${warning} Also, this date is only ${closestDiff} days from an existing entry.`
        : `This start date is only ${closestDiff} days from an existing entry. Please verify this date.`;
    } else if (closestDiff > 60 && existingStarts.length > 1) {
      warning = warning
        ? `${warning} Also, this date is ${closestDiff} days apart.`
        : `This start date creates a long interval of ${closestDiff} days. Please verify this date.`;
    }
  }

  return { isValid: true, warning };
}

/**
 * Validate imported JSON payload
 */
export function validateImportedData(data) {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Invalid JSON file content.' };
  }

  if (!Array.isArray(data.periodStarts)) {
    return { isValid: false, error: 'Imported data must contain a "periodStarts" array.' };
  }

  // Validate dates in periodStarts
  const validStarts = data.periodStarts.filter((dateStr) => {
    return typeof dateStr === 'string' && parseISODate(dateStr) !== null;
  });

  if (validStarts.length !== data.periodStarts.length) {
    return { isValid: false, error: 'Some dates in the imported file are invalid.' };
  }

  // Validate settings if present
  let settings = {};
  if (data.settings && typeof data.settings === 'object') {
    const periodDuration = parseInt(data.settings.periodDuration, 10);
    const averageCycleLength = parseInt(data.settings.averageCycleLength, 10);
    const lutealPhaseLength = parseInt(data.settings.lutealPhaseLength, 10);
    const predictionMonths = parseInt(data.settings.predictionMonths, 10);

    settings = {
      periodDuration: !isNaN(periodDuration) && periodDuration >= 1 && periodDuration <= 15 ? periodDuration : 5,
      averageCycleLength: !isNaN(averageCycleLength) && averageCycleLength >= 15 && averageCycleLength <= 60 ? averageCycleLength : 28,
      useCustomAverageCycle: Boolean(data.settings.useCustomAverageCycle),
      lutealPhaseLength: !isNaN(lutealPhaseLength) && lutealPhaseLength >= 7 && lutealPhaseLength <= 20 ? lutealPhaseLength : 14,
      predictionMonths: !isNaN(predictionMonths) && [3, 6, 12].includes(predictionMonths) ? predictionMonths : 12,
    };
  }

  return {
    isValid: true,
    data: {
      periodStarts: Array.from(new Set(validStarts)).sort(),
      settings,
    },
  };
}
