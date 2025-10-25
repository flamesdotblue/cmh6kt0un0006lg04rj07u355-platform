import { useEffect, useRef, useState } from 'react'
import { CheckCircle, Mail, User, X } from 'lucide-react'

export default function ApplicationModal({ open, onClose, job, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', resume: '', cover: '' })
  const [submitted, setSubmitted] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (open) {
      setForm({ name: '', email: '', resume: '', cover: '' })
      setSubmitted(false)
    }
  }, [open])

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [onClose])

  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    onSubmit(form)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div ref={dialogRef} className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Apply for {job.title}</h3>
            <p className="text-sm text-slate-600">{job.company}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="grid gap-3">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Full name</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:ring-slate-200">
              <User className="h-4 w-4 text-slate-400" />
              <input
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="Your full name"
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:ring-slate-200">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Resume link</label>
            <input
              value={form.resume}
              onChange={(e) => setForm((s) => ({ ...s, resume: e.target.value }))}
              placeholder="URL to your resume (Drive, Dropbox, etc.)"
              className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Cover letter</label>
            <textarea
              value={form.cover}
              onChange={(e) => setForm((s) => ({ ...s, cover: e.target.value }))}
              rows={5}
              placeholder="Briefly explain why you're a great fit."
              className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-slate-500">Your application will be attached to this job in-session.</p>
            <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
              Submit application
            </button>
          </div>
        </form>

        {submitted && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-green-700">
            <CheckCircle className="h-5 w-5" />
            Application submitted!
          </div>
        )}
      </div>
    </div>
  )
}
