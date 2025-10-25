import { useState } from 'react'
import { Building2, DollarSign, MapPin, Send } from 'lucide-react'

export default function JobForm({ onAdd }) {
  const [open, setOpen] = useState(true)
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
  })

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title || !form.company || !form.description) return
    onAdd(form)
    setForm({ title: '', company: '', location: '', type: 'Full-time', salary: '', description: '' })
  }

  return (
    <div id="post" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Post a new job</h2>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          {open ? 'Hide' : 'Show'}
        </button>
      </div>
      {open && (
        <form onSubmit={submit} className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Job title</label>
              <input
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Company</label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:ring-slate-200">
                <Building2 className="h-4 w-4 text-slate-400" />
                <input
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                  placeholder="e.g. Northwind Co."
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Location</label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:ring-slate-200">
                <MapPin className="h-4 w-4 text-slate-400" />
                <input
                  value={form.location}
                  onChange={(e) => update('location', e.target.value)}
                  placeholder="Remote, City, etc."
                  className="w-full outline-none"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Type</label>
              <select
                value={form.type}
                onChange={(e) => update('type', e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Salary</label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:ring-slate-200">
                <DollarSign className="h-4 w-4 text-slate-400" />
                <input
                  value={form.salary}
                  onChange={(e) => update('salary', e.target.value)}
                  placeholder="e.g. 120000 - 150000 or 60/hr"
                  className="w-full outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="What will this role do? Key skills? Benefits?"
              rows={6}
              className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-slate-500">Keep it clear and concise. You can edit by reposting.</p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              <Send className="h-4 w-4" /> Publish job
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
