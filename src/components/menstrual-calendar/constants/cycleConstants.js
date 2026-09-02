/**
 * Cycle Calculation Constants & Configurable Thresholds
 */

export const DEFAULT_SETTINGS = {
  periodDuration: 5,           // Default period bleeding length (days)
  averageCycleLength: 28,       // User configurable average cycle length (days)
  useCustomAverageCycle: false, // false = auto-calculate from history, true = manual override
  lutealPhaseLength: 14,        // Default estimated luteal phase length (days)
  predictionMonths: 12,         // Default future prediction horizon (months)
  fertileWindowDaysBefore: 5,   // Days before ovulation in fertile window
  fertileWindowDaysAfter: 1,    // Days after ovulation in fertile window
};

export const CONFIDENCE_LEVELS = {
  HIGH: 'Higher',
  MODERATE: 'Moderate',
  LOW: 'Lower',
};

export const CONFIDENCE_THRESHOLDS = {
  MIN_CYCLES_FOR_HIGH: 3,
  MAX_VARIABILITY_FOR_HIGH: 4,   // <= 4 days variability for High confidence
  MAX_VARIABILITY_FOR_MODERATE: 7, // <= 7 days variability for Moderate confidence
};

export const DISCLAIMER_TEXT =
  "Cycle predictions are estimates based on previously entered dates. Ovulation and fertile days can vary from cycle to cycle. This application should not be used as a contraceptive method or as a substitute for professional medical advice.";

export const DAY_TYPES = {
  ACTUAL_PERIOD: 'actual-period',
  PREDICTED_PERIOD: 'predicted-period',
  ESTIMATED_OVULATION: 'estimated-ovulation',
  ESTIMATED_FERTILE: 'estimated-fertile',
  LOWER_FERTILITY: 'lower-fertility',
  TODAY: 'today',
  NORMAL: 'normal',
};

export const SAMPLE_PERIOD_STARTS = [
  '2026-01-02',
  '2026-01-30',
  '2026-02-27',
  '2026-03-28',
  '2026-04-26',
];
