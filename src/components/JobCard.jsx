import { Clock, DollarSign, MapPin } from 'lucide-react'

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? '1 month ago' : `${months} months ago`
}

export default function JobCard({ job, onApply }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{job.title}</h3>
          <p className="text-sm text-slate-600">{job.company}</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
          {job.type}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
        {job.location && (
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
        )}
        {job.salary && (
          <span className="inline-flex items-center gap-1.5"><DollarSign className="h-4 w-4" /> {job.salary}</span>
        )}
        <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {timeAgo(job.createdAt)}</span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm text-slate-700">{job.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-slate-500">{job.applications.length} application{job.applications.length === 1 ? '' : 's'}</p>
        <div className="flex gap-2">
          <button
            onClick={onApply}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Apply now
          </button>
        </div>
      </div>
    </article>
  )
}
