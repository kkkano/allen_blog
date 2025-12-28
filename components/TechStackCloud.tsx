const techStacks = [
  { name: 'LangChain', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  { name: 'Python', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  {
    name: 'Machine Learning',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    name: 'AI Agent',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
  {
    name: 'RPA',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  },
  { name: 'Java', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  {
    name: 'Deep Learning',
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  },
  {
    name: 'LangGraph',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  },
]

export default function TechStackCloud() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {techStacks.map((tech) => (
        <span
          key={tech.name}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${tech.color}`}
        >
          {tech.name}
        </span>
      ))}
    </div>
  )
}
