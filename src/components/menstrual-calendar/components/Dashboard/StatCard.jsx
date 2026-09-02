import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accentColor = 'rose', // 'rose' | 'purple' | 'amber' | 'emerald' | 'sky' | 'indigo'
  tooltip,
  badge,
}) {
  const colorMap = {
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      text: 'text-rose-400',
      iconBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      iconBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    sky: {
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20',
      text: 'text-sky-400',
      iconBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    },
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      iconBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
  };

  const currentStyle = colorMap[accentColor] || colorMap.rose;

  return (
    <div
      className={`p-5 rounded-2xl bg-slate-900/80 border ${currentStyle.border} shadow-lg backdrop-blur-md flex flex-col justify-between relative group hover:border-slate-700 transition-all duration-300`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          {tooltip && (
            <div className="relative group/tooltip">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-help hover:text-slate-300" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tooltip:block w-56 p-2.5 bg-slate-950 text-slate-200 text-xs rounded-xl border border-slate-800 shadow-2xl z-30 pointer-events-none text-center">
                {tooltip}
              </div>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-2 rounded-xl border ${currentStyle.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {value}
          </span>
          {badge && (
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-400 leading-normal">{subtitle}</p>}
      </div>
    </div>
  );
}
