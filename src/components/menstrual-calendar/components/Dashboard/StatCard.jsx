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
      border: 'border-rose-500/20 hover:border-rose-500/40',
      text: 'text-rose-400',
      iconBg: 'bg-gradient-to-tr from-rose-500/20 to-purple-500/20 text-rose-300 border-rose-500/30',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      text: 'text-purple-400',
      iconBg: 'bg-gradient-to-tr from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      text: 'text-amber-400',
      iconBg: 'bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      text: 'text-emerald-400',
      iconBg: 'bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    },
    sky: {
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20 hover:border-sky-500/40',
      text: 'text-sky-400',
      iconBg: 'bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 text-sky-300 border-sky-500/30',
    },
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20 hover:border-indigo-500/40',
      text: 'text-indigo-400',
      iconBg: 'bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30',
    },
  };

  const currentStyle = colorMap[accentColor] || colorMap.rose;

  return (
    <div
      className={`p-5 rounded-3xl bg-slate-900/90 border ${currentStyle.border} shadow-xl backdrop-blur-xl flex flex-col justify-between relative group transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          {tooltip && (
            <div className="relative group/tooltip">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-help hover:text-slate-300" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tooltip:block w-56 p-2.5 bg-slate-950 text-slate-200 text-[11px] rounded-xl border border-slate-800 shadow-2xl z-30 pointer-events-none text-center">
                {tooltip}
              </div>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-2 rounded-2xl border shadow-md ${currentStyle.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
            {value}
          </span>
          {badge && (
            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-[11px] text-slate-400 leading-normal">{subtitle}</p>}
      </div>
    </div>
  );
}
