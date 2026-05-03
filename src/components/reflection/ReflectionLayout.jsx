import ContentCard from './ContentCard'
import QuestionPanel from './QuestionPanel'
import CardTransition from './CardTransition'

export default function ReflectionLayout({ item, itemIndex, totalItems, onSubmit }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <CardTransition itemIndex={itemIndex}>
        <ContentCard item={item} />
      </CardTransition>

      <div className="bg-[--color-surface-elevated] rounded-[--radius-card] shadow-[--shadow-card] border border-[--color-border] p-6">
        <QuestionPanel
          item={item}
          itemIndex={itemIndex}
          totalItems={totalItems}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}
