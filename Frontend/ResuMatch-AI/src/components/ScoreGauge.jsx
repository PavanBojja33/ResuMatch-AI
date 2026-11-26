import { Info } from 'lucide-react';

export default function ScoreGauge({ score }) {
  if (score === undefined || score === null || isNaN(Number(score))) {
    return null;
  }

  const numericScore = Math.max(0, Math.min(100, Math.round(Number(score))));

  // Circumference for r = 42: 2 * PI * 42 ≈ 263.89
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (numericScore / 100) * circumference;

  let strokeColor = '#2563eb'; // blue-600
  let badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
  let label = 'Moderate Match';

  if (numericScore >= 80) {
    strokeColor = '#059669'; // emerald-600
    badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    label = 'High Match';
  } else if (numericScore < 60) {
    strokeColor = '#d97706'; // amber-600
    badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
    label = 'Needs Optimization';
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/70 rounded-xl border border-slate-200/80 text-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-slate-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            stroke={strokeColor}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {numericScore}%
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Match Score
          </span>
        </div>
      </div>

      <div className="mt-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
          {label}
        </span>
      </div>

      <p className="mt-3 text-[11px] text-slate-500 leading-tight max-w-[210px] flex items-start gap-1 justify-center">
        <Info className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
        <span>Estimated semantic fit score, not an official ATS score.</span>
      </p>
    </div>
  );
}
