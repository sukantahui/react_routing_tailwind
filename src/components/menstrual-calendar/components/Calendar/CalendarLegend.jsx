import React from 'react';
import { Sparkles, Calendar, Heart, Shield, HelpCircle } from 'lucide-react';

export default function CalendarLegend() {
  const items = [
    {
      label: 'Actual Period',
      style: 'bg-rose-600 text-white border-rose-400 font-bold',
      icon: Calendar,
      desc: 'Recorded start of menstrual bleeding.',
    },
    {
      label: 'Predicted Period',
      style: 'bg-rose-950/80 text-rose-300 border-rose-500/50 border-dashed font-semibold',
      icon: Calendar,
      desc: 'Future estimated bleeding days.',
    },
    {
      label: 'Estimated Ovulation',
      style: 'bg-purple-600 text-white border-purple-300 font-bold shadow-purple-500/30',
      icon: Sparkles,
      desc: 'Approximate date of egg release (~14 days before next period).',
    },
    {
      label: 'Estimated Fertile Window',
      style: 'bg-sky-900/60 text-sky-200 border-sky-400/60 font-medium',
      icon: Heart,
      desc: 'Approximate 6-day window of higher conception likelihood.',
    },
    {
      label: 'Lower Fertility Estimate',
      style: 'bg-slate-900/40 text-slate-400 border-slate-800',
      icon: Shield,
      desc: 'Days outside estimated fertile window. Conception may still occur.',
    },
    {
      label: 'Today',
      style: 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 text-white font-bold',
      icon: null,
      desc: 'Current calendar day.',
    },
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Calendar Legend &amp; Visual Guide
        </span>
        <div className="relative group">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-help" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-slate-950 text-slate-200 text-xs rounded-xl border border-slate-800 shadow-2xl z-30 pointer-events-none text-left">
            Visual indicators use distinct shapes, badges, and borders to ensure accessibility beyond color alone.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex flex-col gap-1 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 text-[9px] ${item.style}`}>
                  {Icon && <Icon className="w-2.5 h-2.5" />}
                </span>
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {item.label}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 line-clamp-1 leading-tight">
                {item.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
