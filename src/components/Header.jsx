import { Briefcase, Plus } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-semibold tracking-tight">OpenHire</h1>
            <p className="text-xs text-slate-500">Post roles. Find talent. Apply fast.</p>
          </div>
        </div>
        <a
          href="#post"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" /> Post a job
        </a>
      </div>
    </header>
  )
}
