export const IDENTITIES = {
  Explorer: {
    color: '#f59e0b',
    bg: 'from-amber-500/20 to-orange-500/10',
    description: 'Wide-ranging curiosity across many topics. You followed what interested you.',
  },
  'Deep Diver': {
    color: '#6366f1',
    bg: 'from-indigo-500/20 to-violet-500/10',
    description: 'You went deep. Focused, intentional, and you remembered what you consumed.',
  },
  Curator: {
    color: '#10b981',
    bg: 'from-emerald-500/20 to-teal-500/10',
    description: 'High standards. You only consumed content that genuinely counted.',
  },
  Skimmer: {
    color: '#94a3b8',
    bg: 'from-slate-400/20 to-slate-300/10',
    description: 'High volume, light touch. There is room to slow down and go deeper.',
  },
  Passenger: {
    color: '#f87171',
    bg: 'from-red-400/20 to-rose-300/10',
    description: 'Habit drove most of your week. Noticing is the first step to changing.',
  },
}

export function deriveIdentity(responses, items) {
  const ids = Object.keys(responses)
  if (ids.length === 0) return { name: 'Explorer', ...IDENTITIES['Explorer'] }

  const values = ids.map((id) => responses[id].value ?? 5)
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length

  const retentionMap = { Yes: 3, Vaguely: 1.5, No: 0 }
  const retentionScore =
    ids.reduce((sum, id) => sum + (retentionMap[responses[id].retention] ?? 0), 0) /
    (ids.length * 3)

  const intentional = ids.filter(
    (id) => responses[id].intent === 'Curious' || responses[id].intent === 'Intentional'
  ).length
  const intentionality = intentional / ids.length

  const itemMap = Object.fromEntries(items.map((it) => [it.id, it]))
  const firstTags = ids.map((id) => itemMap[id]?.tags?.[0]).filter(Boolean)
  const uniqueTags = new Set(firstTags).size
  const topicDiversity = firstTags.length > 0 ? uniqueTags / firstTags.length : 0

  let name
  if (topicDiversity > 0.6 && intentionality > 0.5) name = 'Explorer'
  else if (topicDiversity < 0.4 && retentionScore > 0.6 && intentionality > 0.5) name = 'Deep Diver'
  else if (avgValue > 7 && intentionality > 0.6) name = 'Curator'
  else if (retentionScore < 0.4 && intentionality < 0.4) name = 'Skimmer'
  else name = 'Passenger'

  return { name, ...IDENTITIES[name] }
}

export function deriveInsight(responses, items) {
  const ids = Object.keys(responses)
  if (ids.length === 0) return "Complete your reflection to see your insight."

  const total = ids.length
  const intentMap = {}
  ids.forEach((id) => {
    const intent = responses[id].intent
    intentMap[intent] = (intentMap[intent] || 0) + 1
  })
  const topIntent = Object.entries(intentMap).sort((a, b) => b[1] - a[1])[0]?.[0]

  const retentionYes = ids.filter((id) => responses[id].retention === 'Yes').length
  const retentionNo = ids.filter((id) => responses[id].retention === 'No').length
  const retentionRate = retentionYes / total

  const values = ids.map((id) => responses[id].value ?? 5)
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length

  if (retentionRate > 0.6 && avgValue > 6) {
    return `You engaged ${topIntent?.toLowerCase() || 'intentionally'} and it stuck. ${retentionYes} of ${total} items left a lasting impression.`
  }
  if (retentionNo > total * 0.5) {
    return `Most content passed through without leaving much. You engaged out of ${topIntent?.toLowerCase() || 'habit'} more than intention.`
  }
  if (topIntent === 'Curious' || topIntent === 'Intentional') {
    return `Curiosity drove your week — you chose deliberately. The question is whether that intentionality translated into retention.`
  }
  return `You consumed ${total} pieces of content. ${topIntent} was your primary reason for engaging. Consider what that says about your week.`
}

export function deriveClusters(responses, items) {
  const groups = {}
  items.forEach((item) => {
    const tag = item.tags?.[0] || 'other'
    if (!groups[tag]) groups[tag] = []
    groups[tag].push({ item, response: responses[item.id] })
  })

  return Object.entries(groups).map(([topic, entries]) => {
    const answered = entries.filter((e) => e.response)
    const avgRetention = answered.length
      ? answered.reduce((sum, e) => {
          const map = { Yes: 1, Vaguely: 0.5, No: 0 }
          return sum + (map[e.response.retention] ?? 0.5)
        }, 0) / answered.length
      : 0.5
    return { topic, entries, avgRetention, count: entries.length }
  })
}
