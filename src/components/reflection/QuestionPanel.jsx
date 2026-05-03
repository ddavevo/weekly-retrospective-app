import { useState } from 'react'
import RetentionQuestion from './RetentionQuestion'
import IntentQuestion from './IntentQuestion'
import ValueSlider from './ValueSlider'
import ReflectionTextInput from './ReflectionTextInput'
import Button from '../shared/Button'

export default function QuestionPanel({ item, itemIndex, totalItems, onSubmit }) {
  const [retention, setRetention] = useState('')
  const [intent, setIntent] = useState('')
  const [value, setValue] = useState(5)
  const [reflection, setReflection] = useState('')

  const isReady = retention !== '' && intent !== ''
  const isLast = itemIndex === totalItems - 1

  function handleSubmit() {
    if (!isReady) return
    onSubmit({ retention, intent, value, reflection })
    setRetention('')
    setIntent('')
    setValue(5)
    setReflection('')
  }

  return (
    <div className="flex flex-col gap-5 h-full">
      <RetentionQuestion value={retention} onChange={setRetention} />
      <IntentQuestion value={intent} onChange={setIntent} />
      <ValueSlider value={value} onChange={setValue} />
      <ReflectionTextInput value={reflection} onChange={setReflection} />

      <div className="mt-auto">
        <Button
          onClick={handleSubmit}
          disabled={!isReady}
          className="w-full"
        >
          {isLast ? 'See My Wrapped →' : 'Next →'}
        </Button>
      </div>
    </div>
  )
}
