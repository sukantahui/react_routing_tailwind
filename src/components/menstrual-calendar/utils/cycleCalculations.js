/**
 * Pure Menstrual Cycle Calculation Engine
 * Completely decoupled from React UI components for testability.
 */

import {
  parseISODate,
  formatISODate,
  addDays,
  subDays,
  differenceInCalendarDays,
  compareISODates,
} from './dateUtils';
import {
  DEFAULT_SETTINGS,
  CONFIDENCE_LEVELS,
  CONFIDENCE_THRESHOLDS,
  DAY_TYPES,
} from '../constants/cycleConstants';

/**
 * 1. Calculate individual historical cycle lengths (in days)
 * @param {Array<string>} periodStarts - Array of sorted ISO date strings ["YYYY-MM-DD", ...]
 * @returns {Array<{ start: string, nextStart: string, length: number }>}
 */
export function calculateCycleLengths(periodStarts) {
  if (!Array.isArray(periodStarts) || periodStarts.length < 2) return [];

  const sorted = [...periodStarts].sort(compareISODates);
  const cycles = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const nextStart = sorted[i + 1];
    const length = differenceInCalendarDays(nextStart, start);
    cycles.push({ start, nextStart, length });
  }

  return cycles;
}

/**
 * 2. Calculate average cycle length
 * @param {Array<{ length: number }>} cycleObjects
 * @returns {number} Average cycle length in days (rounded) or 28 default
 */
export function calculateAverageCycleLength(cycleObjects) {
  if (!Array.isArray(cycleObjects) || cycleObjects.length === 0) return 28;
  const sum = cycleObjects.reduce((acc, curr) => acc + curr.length, 0);
  return Math.round(sum / cycleObjects.length);
}

/**
 * 3. Calculate full cycle statistics
 */
export function calculateCycleStats(periodStarts, settings = DEFAULT_SETTINGS) {
  const sortedStarts = [...(periodStarts || [])].sort(compareISODates);
  const cycleObjects = calculateCycleLengths(sortedStarts);
  const lengths = cycleObjects.map((c) => c.length);

  const numRecordedPeriods = sortedStarts.length;
  const numCompletedCycles = cycleObjects.length;

  const defaultAvg = settings?.averageCycleLength || 28;
  const useCustomAvg = Boolean(settings?.useCustomAverageCycle);

  if (numCompletedCycles === 0) {
    return {
      numRecordedPeriods,
      numCompletedCycles: 0,
      averageCycleLength: defaultAvg,
      isCustomAverage: useCustomAvg,
      shortestCycle: null,
      longestCycle: null,
      variability: 0,
      stdDev: 0,
      reliability: CONFIDENCE_LEVELS.LOW,
      reliabilityReason: 'Add at least one more period start date to calculate cycle statistics.',
      latestPeriodStart: sortedStarts[0] || null,
      cycleObjects: [],
    };
  }

  let averageCycleLength;
  let isCustomAverage = false;

  if (useCustomAvg && settings?.averageCycleLength) {
    averageCycleLength = parseInt(settings.averageCycleLength, 10) || 28;
    isCustomAverage = true;
  } else {
    averageCycleLength = calculateAverageCycleLength(cycleObjects);
  }

  const shortestCycle = Math.min(...lengths);
  const longestCycle = Math.max(...lengths);
  const variability = longestCycle - shortestCycle;

  // Standard Deviation calculation
  const variance =
    lengths.reduce((sum, len) => sum + Math.pow(len - averageCycleLength, 2), 0) /
    lengths.length;
  const stdDev = Math.round(Math.sqrt(variance) * 10) / 10;

  // Reliability confidence level
  const reliabilityInfo = calculatePredictionConfidence(lengths, numCompletedCycles, variability);

  return {
    numRecordedPeriods,
    numCompletedCycles,
    averageCycleLength,
    isCustomAverage,
    shortestCycle,
    longestCycle,
    variability,
    stdDev,
    reliability: reliabilityInfo.level,
    reliabilityReason: reliabilityInfo.reason,
    latestPeriodStart: sortedStarts[sortedStarts.length - 1],
    cycleObjects,
  };
}

/**
 * 4. Determine prediction reliability confidence level
 */
export function calculatePredictionConfidence(lengths, numCompletedCycles, variability) {
  if (numCompletedCycles < 2) {
    return {
      level: CONFIDENCE_LEVELS.LOW,
      reason: 'Limited history. Predictions will improve with more recorded periods.',
    };
  }

  if (
    numCompletedCycles >= CONFIDENCE_THRESHOLDS.MIN_CYCLES_FOR_HIGH &&
    variability <= CONFIDENCE_THRESHOLDS.MAX_VARIABILITY_FOR_HIGH
  ) {
    return {
      level: CONFIDENCE_LEVELS.HIGH,
      reason: 'Consistent cycle lengths recorded over multiple months.',
    };
  }

  if (variability <= CONFIDENCE_THRESHOLDS.MAX_VARIABILITY_FOR_MODERATE) {
    return {
      level: CONFIDENCE_LEVELS.MODERATE,
      reason: 'Moderate cycle length variation across recorded periods.',
    };
  }

  return {
    level: CONFIDENCE_LEVELS.LOW,
    reason: 'Your recorded cycle lengths vary considerably, so predictions may be less accurate.',
  };
}

/**
 * 5. Estimate ovulation date relative to predicted period start
 * @param {string} nextPeriodStart - "YYYY-MM-DD"
 * @param {number} lutealPhaseLength - default 14
 */
export function estimateOvulation(nextPeriodStart, lutealPhaseLength = DEFAULT_SETTINGS.lutealPhaseLength) {
  if (!nextPeriodStart) return null;
  return subDays(nextPeriodStart, lutealPhaseLength);
}

/**
 * 6. Calculate estimated fertile window
 */
export function calculateFertileWindow(
  ovulationDate,
  beforeDays = DEFAULT_SETTINGS.fertileWindowDaysBefore,
  afterDays = DEFAULT_SETTINGS.fertileWindowDaysAfter
) {
  if (!ovulationDate) return { start: null, end: null };
  return {
    start: subDays(ovulationDate, beforeDays),
    end: addDays(ovulationDate, afterDays),
  };
}

/**
 * 7. Generate recursive future predicted cycles up to predictionMonths horizon
 */
export function generatePredictedCycles(latestPeriodStart, averageCycle, settings = DEFAULT_SETTINGS) {
  if (!latestPeriodStart) return [];

  const {
    periodDuration = DEFAULT_SETTINGS.periodDuration,
    lutealPhaseLength = DEFAULT_SETTINGS.lutealPhaseLength,
    predictionMonths = DEFAULT_SETTINGS.predictionMonths,
    fertileWindowDaysBefore = DEFAULT_SETTINGS.fertileWindowDaysBefore,
    fertileWindowDaysAfter = DEFAULT_SETTINGS.fertileWindowDaysAfter,
  } = settings;

  const predictedCycles = [];
  let currentStart = latestPeriodStart;

  // Generate cycles up to predictionMonths horizon (~12 cycles max)
  const cycleCount = Math.max(3, Math.min(24, Math.ceil((predictionMonths * 30.5) / averageCycle)));

  for (let i = 0; i < cycleCount; i++) {
    const nextStart = addDays(currentStart, averageCycle);
    const predictedEnd = addDays(nextStart, periodDuration - 1);
    const estimatedOvulationDate = estimateOvulation(nextStart, lutealPhaseLength);
    const fertileWindow = calculateFertileWindow(
      estimatedOvulationDate,
      fertileWindowDaysBefore,
      fertileWindowDaysAfter
    );

    predictedCycles.push({
      cycleIndex: i + 1,
      previousStart: currentStart,
      startDate: nextStart,
      endDate: predictedEnd,
      ovulationDate: estimatedOvulationDate,
      fertileWindowStart: fertileWindow.start,
      fertileWindowEnd: fertileWindow.end,
    });

    currentStart = nextStart;
  }

  return predictedCycles;
}

/**
 * 8. Map calendar dates to their visual types & detailed cycle metadata
 */
export function buildDateStatusMap(periodStarts, settings = DEFAULT_SETTINGS) {
  const sortedStarts = [...(periodStarts || [])].sort(compareISODates);
  const statusMap = new Map();

  const periodDuration = settings.periodDuration || DEFAULT_SETTINGS.periodDuration;

  // 1. Map Actual Periods (Highest Priority)
  sortedStarts.forEach((startStr) => {
    for (let d = 0; d < periodDuration; d++) {
      const dateStr = addDays(startStr, d);
      statusMap.set(dateStr, {
        type: DAY_TYPES.ACTUAL_PERIOD,
        label: 'Actual Period',
        cycleStart: startStr,
        dayOfBleeding: d + 1,
      });
    }
  });

  if (sortedStarts.length === 0) return statusMap;

  // 2. Generate Predictions
  const stats = calculateCycleStats(sortedStarts, settings);
  const predictedCycles = generatePredictedCycles(
    stats.latestPeriodStart,
    stats.averageCycleLength,
    settings
  );

  // Map predicted items (only if not already marked as actual period)
  predictedCycles.forEach((pred) => {
    // Predicted Period days
    for (let d = 0; d < periodDuration; d++) {
      const dateStr = addDays(pred.startDate, d);
      if (!statusMap.has(dateStr)) {
        statusMap.set(dateStr, {
          type: DAY_TYPES.PREDICTED_PERIOD,
          label: 'Predicted Period',
          predictedCycleIndex: pred.cycleIndex,
          cycleStart: pred.startDate,
        });
      }
    }

    // Estimated Ovulation Day
    if (pred.ovulationDate && !statusMap.has(pred.ovulationDate)) {
      statusMap.set(pred.ovulationDate, {
        type: DAY_TYPES.ESTIMATED_OVULATION,
        label: 'Estimated Ovulation',
        ovulationForCycle: pred.startDate,
      });
    }

    // Estimated Fertile Window
    if (pred.fertileWindowStart && pred.fertileWindowEnd) {
      let fDate = pred.fertileWindowStart;
      while (fDate <= pred.fertileWindowEnd) {
        if (!statusMap.has(fDate)) {
          statusMap.set(fDate, {
            type: DAY_TYPES.ESTIMATED_FERTILE,
            label: 'Estimated Fertile Window',
            fertileForCycle: pred.startDate,
          });
        }
        fDate = addDays(fDate, 1);
      }
    }
  });

  return statusMap;
}

/**
 * 9. Get Cycle Day info for any date
 */
export function getCycleDayInfo(targetDateStr, periodStarts, settings = DEFAULT_SETTINGS) {
  if (!targetDateStr) return null;

  const sortedStarts = [...(periodStarts || [])].sort(compareISODates);
  if (sortedStarts.length === 0) return null;

  // Find latest period start on or before targetDateStr
  let activeStart = null;
  for (let i = sortedStarts.length - 1; i >= 0; i--) {
    if (sortedStarts[i] <= targetDateStr) {
      activeStart = sortedStarts[i];
      break;
    }
  }

  // If before first recorded period, check if targetDateStr belongs to a predicted cycle
  if (!activeStart) {
    const firstStart = sortedStarts[0];
    const diff = differenceInCalendarDays(firstStart, targetDateStr);
    return {
      cycleDay: null,
      cycleStart: firstStart,
      daysBeforeFirst: diff,
    };
  }

  const cycleDay = differenceInCalendarDays(targetDateStr, activeStart) + 1;
  return {
    cycleDay,
    cycleStart: activeStart,
  };
}
