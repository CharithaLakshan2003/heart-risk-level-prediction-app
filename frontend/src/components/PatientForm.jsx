import { useState } from 'react'

const fields = [
  {
    name: 'name',
    label: 'Patient Name',
    type: 'text',
    placeholder: 'e.g. John Doe',
    hint: '',
    isString: true,
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: '', label: 'Select gender' },
      { value: '1', label: 'Male' },
      { value: '2', label: 'Female' },
    ],
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'e.g. 45',
    hint: 'years',
  },
  {
    name: 'tc',
    label: 'Total Cholesterol (TC)',
    type: 'number',
    placeholder: 'e.g. 200',
    hint: 'mg/dL',
  },
  {
    name: 'hdl',
    label: 'HDL Cholesterol',
    type: 'number',
    placeholder: 'e.g. 50',
    hint: 'mg/dL',
  },
  {
    name: 'sbp',
    label: 'Systolic Blood Pressure (SBP)',
    type: 'number',
    placeholder: 'e.g. 120',
    hint: 'mm Hg',
  },
  {
    name: 'smoke',
    label: 'Smoker',
    type: 'select',
    options: [
      { value: '', label: 'Select option' },
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
  },
  {
    name: 'bpm',
    label: 'Blood Pressure Medication',
    type: 'select',
    options: [
      { value: '', label: 'Select option' },
      { value: '1', label: 'Yes (Taking medication)' },
      { value: '2', label: 'No' },
    ],
  },
  {
    name: 'diab',
    label: 'Diabetes',
    type: 'select',
    options: [
      { value: '', label: 'Select option' },
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
  },
]

export default function PatientForm({ onResult, onLoading }) {
  const [formData, setFormData] = useState({
    name: '', gender: '', age: '', tc: '', hdl: '',
    sbp: '', smoke: '', bpm: '', diab: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    fields.forEach(f => {
      if (!formData[f.name] && formData[f.name] !== 0) {
        newErrors[f.name] = 'This field is required'
      }
    })
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    onLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      onResult(data)
    } catch (err) {
      alert('Error: ' + err.message + '\nMake sure the Flask backend is running on port 5000.')
    } finally {
      setLoading(false)
      onLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="animate-slide-up" id="patient-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.name === 'name' ? 'md:col-span-2' : ''}
          >
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-slate-300 mb-1.5 tracking-wide"
            >
              {field.label}
            </label>

            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full glass rounded-xl px-4 py-3 text-white bg-transparent
                  focus:outline-none focus:ring-2 focus:ring-violet-500/60 transition-all duration-200
                  ${errors[field.name] ? 'ring-2 ring-red-500/70' : ''}`}
              >
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full glass rounded-xl px-4 py-3 text-white placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-violet-500/60 transition-all duration-200
                    ${errors[field.name] ? 'ring-2 ring-red-500/70' : ''}
                    ${field.hint ? 'pr-20' : ''}`}
                />
                {field.hint && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium pointer-events-none">
                    {field.hint}
                  </span>
                )}
              </div>
            )}

            {errors[field.name] && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <span>⚠</span> {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        id="submit-btn"
        type="submit"
        disabled={loading}
        className="mt-8 w-full py-4 rounded-2xl font-bold text-lg
          bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
          hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
          shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50
          text-white tracking-wide"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Analyzing...
          </span>
        ) : (
          'Predict Risk Level'
        )}
      </button>
    </form>
  )
}
