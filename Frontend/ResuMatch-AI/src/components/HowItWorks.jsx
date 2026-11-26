import { UploadCloud, FileSearch, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: '1',
    title: 'Upload Resume',
    description: 'Upload your existing resume in PDF format for clean text parsing and semantic chunking.',
    icon: UploadCloud,
  },
  {
    step: '2',
    title: 'Match Job Description',
    description: 'Paste your target job posting to benchmark your background against specific requirements.',
    icon: FileSearch,
  },
  {
    step: '3',
    title: 'Get AI Insights',
    description: 'Explore estimated match scores, detected skill gaps, semantic evidence, and bullet rewrites.',
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 border-t border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Three simple steps to evaluate and enhance your candidate profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-slate-50/70 border border-slate-200/80 rounded-xl p-6 transition-all hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    Step {item.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
