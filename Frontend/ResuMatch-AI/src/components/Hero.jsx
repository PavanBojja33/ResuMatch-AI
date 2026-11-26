import { Sparkles, Target, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6">
      {/* Top micro badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/80 mb-6 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        <span>Intelligent Semantic Job-Fit Analysis</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
        Your Resume, Matched to Your{' '}
        <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2 underline-offset-8">
          Dream Job.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Analyze your resume against any job description, discover missing skills, and get AI-powered recommendations to improve your chances.
      </p>

      {/* Trust & Feature highlights */}
      <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-sm text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Sparkles className="w-3 h-3" />
          </div>
          <span>AI-Powered Insights</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Target className="w-3 h-3" />
          </div>
          <span>Skill Gap Detection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Zap className="w-3 h-3" />
          </div>
          <span>Resume Improvement Suggestions</span>
        </div>
      </div>
    </section>
  );
}
