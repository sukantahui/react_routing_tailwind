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
} from './dateUtils.js';
import {
  DEFAULT_SETTINGS,
  CONFIDENCE_LEVELS,
  CONFIDENCE_THRESHOLDS,
  DAY_TYPES,
} from '../constants/cycleConstants.js';

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

/**
 * 10. Get Today's Detailed Phase & Daily Holistic Wellness Insights
 */
export function getDailyPhaseAndWellness(targetDateStr = formatISODate(new Date()), periodStarts = [], settings = DEFAULT_SETTINGS) {
  const sortedStarts = [...(periodStarts || [])].sort(compareISODates);
  const stats = calculateCycleStats(sortedStarts, settings);
  const cycleLen = stats.averageCycleLength || settings.averageCycleLength || 28;
  const periodDur = settings.periodDuration || DEFAULT_SETTINGS.periodDuration;
  const lutealLen = settings.lutealPhaseLength || DEFAULT_SETTINGS.lutealPhaseLength;
  const fertileBefore = settings.fertileWindowDaysBefore || DEFAULT_SETTINGS.fertileWindowDaysBefore;
  const fertileAfter = settings.fertileWindowDaysAfter || DEFAULT_SETTINGS.fertileWindowDaysAfter;

  if (sortedStarts.length === 0) {
    return {
      hasData: false,
      cycleDay: null,
      totalCycleLength: cycleLen,
      phaseKey: 'unknown',
      phaseName: 'Cycle Tracking',
      phaseSubtitle: 'Log your first period date to unlock personalized daily insights',
      pregnancyChance: 'Unknown',
      colorTheme: 'rose',
      hormoneInsight: 'Tracking your cycle reveals natural hormonal rhythms and personal energy patterns.',
      nutritionTip: 'Stay hydrated with warm water, herbal teas, and nutrient-rich whole foods.',
      movementTip: 'Gentle stretching, daily walking, or bodyweight movement supports circulation.',
      selfCareTip: 'Take a mindful 5-minute break today to check in with your body.',
      daysUntilNextPeriod: null,
      nextPeriodDate: null,
      ovulationDate: null,
      progressPercent: 0,
    };
  }

  const predictedCycles = generatePredictedCycles(stats.latestPeriodStart, cycleLen, settings);
  const nextCycle = predictedCycles[0] || null;

  const cycleDayInfo = getCycleDayInfo(targetDateStr, sortedStarts, settings);
  let cycleDay = cycleDayInfo?.cycleDay;

  // If cycleDay exceeds average length or is in a future predicted cycle, normalize it
  let normalizedCycleDay = cycleDay;
  if (!normalizedCycleDay || normalizedCycleDay < 1) {
    normalizedCycleDay = 1;
  } else if (normalizedCycleDay > cycleLen) {
    normalizedCycleDay = ((normalizedCycleDay - 1) % cycleLen) + 1;
  }

  const daysUntilNextPeriod = nextCycle ? differenceInCalendarDays(nextCycle.startDate, targetDateStr) : null;
  const estimatedOvulationDay = Math.max(periodDur + 2, cycleLen - lutealLen);
  const fertileStartDay = Math.max(periodDur + 1, estimatedOvulationDay - fertileBefore);
  const fertileEndDay = Math.min(cycleLen - 1, estimatedOvulationDay + fertileAfter);

  let phaseKey = 'follicular';
  let phaseName = 'Follicular Phase';
  let phaseSubtitle = 'Rising Energy & Creativity';
  let pregnancyChance = 'Low to Moderate';
  let colorTheme = 'emerald';
  let hormoneInsight = 'Estrogen is steadily rising as your body prepares a new follicle. You may feel sharper focus, higher energy, and a brighter mood.';
  let nutritionTip = 'Support liver and gut health with fermented foods (kimchi, kefir), colorful salads, fresh citrus, and lean proteins.';
  let movementTip = 'Great time for strength training, upbeat cardio, jogging, or trying new workout routines.';
  let selfCareTip = 'Channel rising motivation into new creative projects, social outings, or planning goals.';

  if (normalizedCycleDay <= periodDur) {
    phaseKey = 'menstrual';
    phaseName = 'Menstrual Phase';
    phaseSubtitle = 'Rest, Renewal & Inner Calm';
    pregnancyChance = 'Very Low';
    colorTheme = 'rose';
    hormoneInsight = 'Progesterone and estrogen levels are at their baseline. Your body is directing energy inward for natural shedding and renewal.';
    nutritionTip = 'Replenish iron and minerals with warm bone/veggie broths, dark leafy greens, lentils, beets, and magnesium-rich dark chocolate.';
    movementTip = 'Prioritize restorative yin yoga, gentle walks in nature, soothing stretches, and warm Epsom salt baths.';
    selfCareTip = 'Give yourself permission to slow down, rest, avoid burnout, and stay cozy.';
  } else if (normalizedCycleDay >= fertileStartDay && normalizedCycleDay <= fertileEndDay) {
    phaseKey = 'ovulatory';
    phaseName = 'Ovulatory Phase';
    phaseSubtitle = 'Peak Vitality & High Fertility';
    pregnancyChance = normalizedCycleDay === estimatedOvulationDay ? 'Peak Conception Likelihood' : 'High Conception Likelihood';
    colorTheme = 'purple';
    hormoneInsight = 'Luteinizing Hormone (LH) surges alongside peak estrogen, triggering ovulation. High confidence, magnetic vitality, and radiant skin.';
    nutritionTip = 'Eat antioxidant-rich berries, zinc-rich pumpkin seeds, avocados, leafy brassicas, and drink plenty of electrolyte water.';
    movementTip = 'Peak stamina window! Perfect for HIIT, circuit workouts, dancing, or high-energy sports.';
    selfCareTip = 'Ideal days for big presentations, meaningful conversations, connecting with loved ones, and social energy.';
  } else if (normalizedCycleDay > fertileEndDay) {
    phaseKey = 'luteal';
    phaseName = 'Luteal Phase';
    phaseSubtitle = 'Focus, Reflection & Self-Care';
    pregnancyChance = 'Low Chance';
    colorTheme = 'amber';
    hormoneInsight = 'Progesterone rises to support the uterine lining, then drops if no pregnancy occurs. Metabolism increases slightly.';
    nutritionTip = 'Stabilize blood sugar with complex carbs (sweet potatoes, oats, quinoa), magnesium (nuts, seeds), and calming chamomile tea.';
    movementTip = 'Switch to moderate pilates, swimming, resistance bands, or mindful outdoor walks.';
    selfCareTip = 'Practice gentle evening wind-down rituals, journal, reduce caffeine, and prepare for restorative sleep.';
  }

  const progressPercent = Math.min(100, Math.max(0, Math.round(((normalizedCycleDay - 1) / cycleLen) * 100)));

  return {
    hasData: true,
    cycleDay: normalizedCycleDay,
    actualCycleDay: cycleDay,
    totalCycleLength: cycleLen,
    periodDuration: periodDur,
    phaseKey,
    phaseName,
    phaseSubtitle,
    pregnancyChance,
    colorTheme,
    hormoneInsight,
    nutritionTip,
    movementTip,
    selfCareTip,
    daysUntilNextPeriod,
    nextPeriodDate: nextCycle?.startDate || null,
    ovulationDate: nextCycle?.ovulationDate || null,
    progressPercent,
    estimatedOvulationDay,
    fertileStartDay,
    fertileEndDay,
  };
}

