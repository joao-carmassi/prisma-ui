import './style.css';

/*
 * @author: @joao-carmassi
 * @description: Animated rainbow gradient border effect — same animation as Button's rainbow effect.
 *               Drop <RainbowBorder /> inside any Card (with `relative` on the Card).
 *               The Card itself needs the rainbow background classes applied; use the `className` on Card.
 * @version: 1.1.0
 * @date: 2026-24-03
 * @license: MIT
 */

/**
 * Helper: CSS classes to apply directly on the Card to give it the rainbow border look.
 * Pass these into the Card's `className`.
 *
 * @example
 * <Card className={cn("relative", rainbowCardClasses)}>
 *   <RainbowBorder />
 *   ...
 * </Card>
 */
export const rainbowCardClasses =
  'animate-rainbow-effect border-0 bg-[linear-gradient(var(--card),var(--card)),linear-gradient(var(--card)_50%,color-mix(in_oklch,var(--card)_60%,transparent)_80%,transparent),linear-gradient(90deg,oklch(66.2%_0.225_25.9)_0%,oklch(90.7%_0.231_133)_20%,oklch(69.6%_0.165_251)_40%,oklch(80.2%_0.134_225)_60%,oklch(60.4%_0.26_302)_80%,oklch(66.2%_0.225_25.9)_100%)] bg-size-[200%] [background-clip:padding-box,border-box,border-box] bg-origin-border [border:calc(0.125rem)_solid_transparent]';

/**
 * Decorative glow element rendered below the card. Place <RainbowBorder /> inside the Card.
 * The glow relies on `overflow-visible` (or removing `overflow-hidden`) from the Card
 * because it renders outside the card bottom edge.
 */
function RainbowBorder(): React.ReactNode {
  return (
    <div
      className='pointer-events-none absolute bottom-[-20%] left-1/2 z-0 h-1/5 w-3/5 -translate-x-1/2 animate-rainbow-effect bg-[linear-gradient(90deg,oklch(66.2%_0.225_25.9),oklch(90.7%_0.231_133),oklch(69.6%_0.165_251),oklch(80.2%_0.134_225),oklch(60.4%_0.26_302))] filter-[blur(0.75rem)]'
      aria-hidden='true'
    />
  );
}

export { RainbowBorder };
