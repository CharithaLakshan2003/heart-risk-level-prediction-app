import { useState } from 'react'
import PatientForm from './components/PatientForm'
import ResultCard from './components/ResultCard'
import './index.css'
import logo from './assets/logo.png'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 relative overflow-hidden">

      {/* Ambient background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
            bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/40 mb-4 overflow-hidden">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">
            Heart Risk Predictor
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto">
            AI-powered cardiovascular risk assessment using clinical indicators
          </p>
        </div>

        {/* Card */}
        <div className="w-full max-w-2xl glass rounded-3xl p-8 shadow-2xl shadow-black/40">
          {!result ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600" />
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest whitespace-nowrap">
                  Patient Details
                </h2>
                <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600" />
              </div>
              <PatientForm onResult={setResult} onLoading={setLoading} />
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600" />
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest whitespace-nowrap">
                  Risk Analysis
                </h2>
                <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600" />
              </div>
              <ResultCard result={result} onReset={() => setResult(null)} />
            </>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-slate-600 text-xs text-center">
          For educational purposes only · Always consult a qualified physician
        </p>
      </div>
    </div>
  )
}
