import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarLegend from './CalendarLegend';
import CalendarDay from './CalendarDay';
import DayDetailModal from './DayDetailModal';
import { getCalendarGrid } from '../../utils/dateUtils';
import { getCycleDayInfo } from '../../utils/cycleCalculations';

export default function MenstrualCalendar({
  periodStarts,
  dateStatusMap,
  cycleStats,
  settings,
  onMarkPeriodStart,
  onOpenSymptomLogger,
}) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'horizon'

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
      isPeriodStart: periodStarts.includes(dateStr),
    });
    setIsModalOpen(true);
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // For 3-Month Horizon view, compute 3 months: [current, current+1, current+2]
  const horizonMonths = [
    { year: currentYear, month: currentMonth },
    {
      year: currentMonth === 11 ? currentYear + 1 : currentYear,
      month: currentMonth === 11 ? 0 : currentMonth + 1,
    },
    {
      year: currentMonth >= 10 ? currentYear + 1 : currentYear,
      month: (currentMonth + 2) % 12,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <CalendarHeader
        currentYear={currentYear}
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* View Mode 1: Single Month View */}
      {viewMode === 'month' ? (
        <div className="bg-slate-900/90 border border-slate-800 p-4 md:p-6 rounded-3xl shadow-xl backdrop-blur-xl space-y-3">
          {/* Days of Week Header Row */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-slate-400 uppercase tracking-wider py-2.5 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className={idx === 0 || idx === 6 ? 'text-rose-400/80' : ''}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {getCalendarGrid(currentYear, currentMonth).map((cell) => {
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
      ) : (
        /* View Mode 2: 3-Month Multi-Horizon View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {horizonMonths.map((mObj, mIdx) => (
            <div
              key={`${mObj.year}-${mObj.month}`}
              className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl shadow-xl backdrop-blur-xl space-y-3 flex flex-col justify-between"
            >
              <div>
                {/* Month Name */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
                  <span className="font-extrabold text-sm text-white">
                    {monthNames[mObj.month]} {mObj.year}
                  </span>
                  {mIdx > 0 && (
                    <span className="text-[10px] font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-full">
                      Forecast #{mIdx}
                    </span>
                  )}
                </div>

                {/* Days of Week Header Row */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-slate-400 uppercase py-1.5 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <div key={idx} className={idx === 0 || idx === 6 ? 'text-rose-400/80' : ''}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Compact Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {getCalendarGrid(mObj.year, mObj.month).map((cell) => {
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
            </div>
          ))}
        </div>
      )}

      {/* Calendar Visual Legend */}
      <CalendarLegend />

      {/* Day Details Popup Modal */}
      <DayDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDateInfo={selectedDateInfo}
        onMarkPeriodStart={onMarkPeriodStart}
        onOpenSymptomLogger={onOpenSymptomLogger}
      />
    </div>
  );
}
