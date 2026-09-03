/**
 * Menstrual Cycle Calendar — API Service
 *
 * Uses the shared api.js Axios instance which automatically injects
 * the Sanctum Bearer token from localStorage. All endpoints are
 * protected by auth:sanctum on the Laravel side.
 *
 * Base: /api/cycle/...
 */

import api from '../../../api/api';

const BASE = '/cycle';

export const cycleApi = {
  /**
   * GET /api/cycle/me
   * Load the authenticated user's cycle profile + all period dates.
   * Auto-creates a new empty profile on first visit.
   */
  getMe: () => api.get(`${BASE}/me`),

  /**
   * PUT /api/cycle/me
   * Update the user's health profile and/or cycle settings.
   *
   * Send keys in camelCase (React style) — the Laravel BaseRequest automatically
   * converts them to snake_case before validation, so no manual mapping needed.
   *
   * Accepted cycle setting keys (camelCase):
   *   periodDuration, averageCycleLength, useCustomAverageCycle,
   *   lutealPhaseLength, predictionMonths, fertileWindowDaysBefore, fertileWindowDaysAfter
   *
   * Accepted health profile keys (already snake_case):
   *   goal, date_of_birth, weight_kg, height_cm, blood_group, medical_notes
   *
   * @param {object} data - profile or settings fields to update
   */
  updateProfile: (data) => api.put(`${BASE}/me`, data),

  /**
   * POST /api/cycle/period
   * Add a single period start date.
   * @param {string} periodStartDate - 'YYYY-MM-DD'
   * @param {string|null} notes - optional note
   */
  addPeriodDate: (periodStartDate, notes = null) =>
    api.post(`${BASE}/period`, { period_start_date: periodStartDate, notes }),

  /**
   * PUT /api/cycle/period/{oldDate}
   * Edit an existing period start date.
   * @param {string} oldDate - existing date 'YYYY-MM-DD'
   * @param {string} newDate - replacement date 'YYYY-MM-DD'
   * @param {string|null} notes - optional updated note
   */
  editPeriodDate: (oldDate, newDate, notes = null) =>
    api.put(`${BASE}/period/${oldDate}`, { period_start_date: newDate, notes }),

  /**
   * DELETE /api/cycle/period/{date}
   * Delete a single period start date.
   * @param {string} date - 'YYYY-MM-DD'
   */
  deletePeriodDate: (date) => api.delete(`${BASE}/period/${date}`),

  /**
   * POST /api/cycle/periods/sync
   * Bulk replace all period dates. Used for syncing localStorage data to DB.
   * @param {string[]} periodStarts - array of 'YYYY-MM-DD' strings
   */
  syncPeriodDates: (periodStarts) =>
    api.post(`${BASE}/periods/sync`, { period_starts: periodStarts }),

  /**
   * DELETE /api/cycle/periods
   * Clear all period dates for the user (keeps the profile).
   */
  clearAllPeriods: () => api.delete(`${BASE}/periods`),
};
