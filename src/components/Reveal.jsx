import { useReveal } from '../useReveal'

// غلاف بسيط: يضيف حركة ظهور تدريجي للمحتوى عند وصوله أثناء التمرير
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag ref={ref} className={`reveal${visible ? ' in' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
