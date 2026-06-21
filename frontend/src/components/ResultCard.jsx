export default function ResultCard({ result, onReset }) {
  const risk = result.risk
  const name = result.name

  // Determine risk category
  let category, color, bgColor, emoji, description
  if (risk < 0.40) {
    category = 'Low Risk'
    color = 'text-emerald-400'
    bgColor = 'from-emerald-500/20 to-teal-500/10'
    emoji = ''
    description = 'Your heart risk level is low. Maintain your healthy lifestyle!'
  } else if (risk < 0.65) {
    category = 'Moderate Risk'
    color = 'text-amber-400'
    bgColor = 'from-amber-500/20 to-orange-500/10'
    emoji = ''
    description = 'You have a moderate risk level. Consider lifestyle improvements.'
  } else {
    category = 'High Risk'
    color = 'text-red-400'
    bgColor = 'from-red-500/20 to-rose-500/10'
    emoji = ''
    description = 'High risk detected. Please consult a cardiologist immediately.'
  }

  // Gauge: cap at 40% for visual (most models output 0–40% range)
  const gaugePercent = Math.min((risk / 40) * 100, 100)
  const circumference = 2 * Math.PI * 60
  const strokeDashoffset = circumference - (gaugePercent / 100) * circumference

  const gaugeColor =
    risk < 0.40 ? '#34d399' : risk < 0.65 ? '#fbbf24' : '#f87171'

  return (
    <div className="animate-slide-up" id="result-card">
      {/* Header */}
      <div className={`rounded-2xl bg-gradient-to-br ${bgColor} p-6 mb-6 border border-white/10`}>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{emoji}</span>
          <div>
            <p className="text-slate-400 text-sm font-medium">Results for</p>
            <h2 className="text-2xl font-bold text-white">{name}</h2>
          </div>
        </div>
      </div>

      {/* Gauge */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80" cy="80" r="60"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="80" cy="80" r="60"
              fill="none"
              stroke={gaugeColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 80 80)"
              style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-extrabold ${color}`}>{risk}%</span>
            <span className="text-xs text-slate-400 font-medium mt-1">Risk Level</span>
          </div>
        </div>
        <span className={`mt-2 text-lg font-bold ${color}`}>{category}</span>
      </div>

      {/* Description */}
      <div className="glass rounded-2xl p-4 mb-6">
        <p className="text-slate-300 text-sm text-center leading-relaxed">{description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Risk Score', value: `${risk}%` },
          { label: 'Category', value: category.split(' ')[0] },
          { label: 'Status', value: risk < 10 ? 'Good' : risk < 20 ? 'Caution' : 'Critical' },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-xl p-3 text-center">
            <p className={`text-lg font-bold ${color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <button
        id="check-again-btn"
        onClick={onReset}
        className="w-full py-3.5 rounded-2xl font-semibold text-base
          border border-violet-500/50 text-violet-300
          hover:bg-violet-500/20 hover:border-violet-400
          transition-all duration-300 transform hover:scale-[1.02]
          active:scale-[0.98]"
      >
        ← Check Another Patient
      </button>
    </div>
  )
}
