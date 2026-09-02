import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../constants/cycleConstants';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 md:p-5 shadow-lg backdrop-blur-md">
      <div className="flex items-start gap-3.5">
        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5 border border-amber-500/30">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-300 tracking-wide uppercase text-[11px]">
            <span>Medical & Privacy Notice</span>
            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-normal normal-case border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" /> Local Browser Data Only
            </span>
          </div>
          <p className="text-amber-200/90 leading-relaxed">
            {DISCLAIMER_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
}
