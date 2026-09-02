import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarLegend from './CalendarLegend';
import CalendarDay from './CalendarDay';
import DayDetailModal from './DayDetailModal';
import { getCalendarGrid } from '../../utils/dateUtils';
import { getCycleDayInfo } from '../../utils/cycleCalculations';

export default function MenstrualCalendar({ periodStarts, dateStatusMap, cycleStats, settings }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed

  // Selected date modal state
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  // Day click handler
  const handleDayClick = (dateStr, statusInfo, cycleDayInfo) => {
    setSelectedDateInfo({
      dateStr,
      statusInfo,
      cycleDayInfo,
      cycleStats,
    });
    setIsModalOpen(true);
  };

  // Generate 35 or 42 grid cells
  const gridCells = getCalendarGrid(currentYear, currentMonth);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <CalendarHeader
        currentYear={currentYear}
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      {/* Calendar Grid Container */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 md:p-5 rounded-3xl shadow-xl backdrop-blur-xl space-y-3">
        {/* Days of Week Header Row */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-slate-400 uppercase tracking-wider py-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className={idx === 0 || idx === 6 ? 'text-rose-400/80' : ''}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {gridCells.map((cell) => {
            const statusInfo = dateStatusMap.get(cell.dateStr) || null;
            const cycleDayInfo = getCycleDayInfo(cell.dateStr, periodStarts, settings);

            return (
              <CalendarDay
                key={cell.dateStr}
                cellData={cell}
                statusInfo={statusInfo}
                cycleDayInfo={cycleDayInfo}
                onClick={handleDayClick}
              />
            );
          })}
        </div>
      </div>

      {/* Calendar Visual Legend */}
      <CalendarLegend />

      {/* Day Details Popup Modal */}
      <DayDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDateInfo={selectedDateInfo}
      />
    </div>
  );
}
