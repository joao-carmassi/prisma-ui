import './style.css';
import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: FlipCard wrapper that applies a 3D flip on hover. Accepts two shadcn Card components as front and back faces.
 * @version: 1.1.0
 * @date: 2026-24-03
 * @license: MIT
 * @reference: https://kokonutui.com/docs/cards/card
 */

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content rendered on the front face */
  front: React.ReactNode;
  /** Content rendered on the back face */
  back: React.ReactNode;
  /**
   * When provided, controls the flip state programmatically.
   * `true` shows the back face; `false` shows the front face.
   * When omitted, the card flips on hover.
   */
  isFlipped?: boolean;
}

/**
 * FlipCard wraps two shadcn Card components and applies a 3D Y-axis flip.
 *
 * - **Hover mode** (default): flip is triggered on hover when `isFlipped` is not provided.
 * - **Controlled mode**: pass `isFlipped` to control the flip via external state.
 *
 * The container requires an explicit height for the flip to work properly.
 * Pass it via `className`, e.g. `className="h-[320px] w-[280px]"`.
 *
 * Both `front` and `back` Card components should include `className="h-full"`.
 */
function FlipCard({
  front,
  back,
  isFlipped,
  className,
  ...props
}: FlipCardProps): React.ReactNode {
  const isControlled = isFlipped !== undefined;

  return (
    <div
      data-slot='flip-card'
      className={cn(
        'relative perspective-[2000px]',
        !isControlled && 'group',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'relative h-full w-full transform-3d transition-all duration-700',
          isControlled
            ? isFlipped && 'transform-[rotateY(180deg)]'
            : 'group-hover:transform-[rotateY(180deg)]',
        )}
      >
        {/* Front face */}
        <div className='absolute inset-0 h-full w-full backface-hidden transform-[rotateY(0deg)]'>
          {front}
        </div>
        {/* Back face */}
        <div className='absolute inset-0 h-full w-full backface-hidden transform-[rotateY(180deg)]'>
          {back}
        </div>
      </div>
    </div>
  );
}

export { FlipCard };
