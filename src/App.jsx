import { useMemo, useState } from 'react'
import Header from './components/Header'
import JobForm from './components/JobForm'
import JobCard from './components/JobCard'
import ApplicationModal from './components/ApplicationModal'
import { Search } from 'lucide-react'

const initialJobs = [
  {
    id: crypto.randomUUID(),
    title: 'Frontend Engineer',
    company: 'Aurora Labs',
    location: 'Remote',
    type: 'Full-time',
    salary: '100000 - 130000',
    description:
      'Build delightful web experiences using React, Tailwind, and modern tooling. Collaborate with designers and backend engineers to ship product features.',
    createdAt: new Date().toISOString(),
    applications: [],
  },
  {
    id: crypto.randomUUID(),
    title: 'Product Designer',
    company: 'Northwind Co.',
    location: 'New York, NY',
    type: 'Contract',
    salary: '70 - 90/hr',
    description:
      'Own end-to-end design from research to high-fidelity prototypes. Work closely with PM and engineering to deliver thoughtful user experiences.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    applications: [],
  },
  {
    id: crypto.randomUUID(),
    title: 'DevOps Engineer',
    company: 'Zenith Cloud',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    salary: '140000 - 160000',
    description:
      'Own CI/CD, observability, and infrastructure automation. Kubernetes and Terraform experience preferred.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    applications: [],
  },
]

export default function App() {
  const [jobs, setJobs] = useState(initialJobs)
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [isApplyOpen, setIsApplyOpen] = useState(false)

  const addJob = (job) => {
    setJobs((prev) => [{ ...job, id: crypto.randomUUID(), applications: [], createdAt: new Date().toISOString() }, ...prev])
  }

  const openApply = (job) => {
    setSelectedJob(job)
    setIsApplyOpen(true)
  }

  const closeApply = () => {
    setIsApplyOpen(false)
    setSelectedJob(null)
  }

  const submitApplication = (jobId, application) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applications: [{ ...application, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...j.applications] } : j))
    )
    closeApply()
  }

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase()
    return jobs.filter((j) => {
      const matchesQuery = !q || [j.title, j.company, j.location, j.description].some((v) => v.toLowerCase().includes(q))
      const matchesType = !typeFilter || j.type === typeFilter
      return matchesQuery && matchesType
    })
  }, [jobs, query, typeFilter])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="sticky top-6">
              <JobForm onAdd={addJob} />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-slate-200">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search roles, companies, locations..."
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
                >
                  <option value="">All types</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
                <button
                  onClick={() => {
                    setQuery('')
                    setTypeFilter('')
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredJobs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                  No jobs found. Adjust your search or post a new job.
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={() => openApply(job)} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">
          Built for posting jobs and accepting applications. Data is stored locally in this demo session.
        </div>
      </footer>

      {selectedJob && (
        <ApplicationModal
          open={isApplyOpen}
          onClose={closeApply}
          job={selectedJob}
          onSubmit={(payload) => submitApplication(selectedJob.id, payload)}
        />
      )}
    </div>
  )
}
