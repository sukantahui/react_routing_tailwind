/**
 * Pure Date Utilities for Menstrual Cycle Calculations
 * Ensures consistent YYYY-MM-DD handling without UTC/local timezone shifts.
 */

// Parse "YYYY-MM-DD" string into local Date object set to 00:00:00
export function parseISODate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.trim().split('-');
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  const date = new Date(year, month, day, 0, 0, 0, 0);
  return isNaN(date.getTime()) ? null : date;
}

// Format Date object to "YYYY-MM-DD" string
export function formatISODate(date) {
  if (!date || isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Add days to ISO date string or Date object
export function addDays(dateInput, days) {
  const date = typeof dateInput === 'string' ? parseISODate(dateInput) : new Date(dateInput);
  if (!date) return null;
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return typeof dateInput === 'string' ? formatISODate(result) : result;
}

// Subtract days from ISO date string or Date object
export function subDays(dateInput, days) {
  return addDays(dateInput, -days);
}

// Calculate absolute difference in calendar days between two dates (date2 - date1)
export function differenceInCalendarDays(date2Input, date1Input) {
  const d1 = typeof date1Input === 'string' ? parseISODate(date1Input) : date1Input;
  const d2 = typeof date2Input === 'string' ? parseISODate(date2Input) : date2Input;
  if (!d1 || !d2) return 0;
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.round((utc2 - utc1) / MS_PER_DAY);
}

// Friendly display format: "May 14, 2026" or "May 14"
export function formatDateDisplay(dateInput, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  const date = typeof dateInput === 'string' ? parseISODate(dateInput) : dateInput;
  if (!date) return 'Invalid Date';
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Check if date is today
export function isToday(dateInput) {
  const todayStr = formatISODate(new Date());
  const checkStr = typeof dateInput === 'string' ? dateInput : formatISODate(dateInput);
  return todayStr === checkStr;
}

// Compare two ISO dates: -1 if d1 < d2, 0 if equal, 1 if d1 > d2
export function compareISODates(d1, d2) {
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

// Get number of days in a specific year & month (month is 0-indexed)
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Generate calendar grid array for a given year & month
export function getCalendarGrid(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun
  const totalDays = getDaysInMonth(year, month);

  const prevMonthYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

  const grid = [];

  // Previous month padding days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const dateStr = formatISODate(new Date(prevMonthYear, prevMonth, dayNum));
    grid.push({
      dateStr,
      dayNum,
      isCurrentMonth: false,
      year: prevMonthYear,
      month: prevMonth,
    });
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = formatISODate(new Date(year, month, d));
    grid.push({
      dateStr,
      dayNum: d,
      isCurrentMonth: true,
      year,
      month,
    });
  }

  // Next month padding days to complete 35 or 42 grid cells
  const nextMonthYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const remainingCells = (7 - (grid.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const dateStr = formatISODate(new Date(nextMonthYear, nextMonth, d));
    grid.push({
      dateStr,
      dayNum: d,
      isCurrentMonth: false,
      year: nextMonthYear,
      month: nextMonth,
    });
  }

  return grid;
}
