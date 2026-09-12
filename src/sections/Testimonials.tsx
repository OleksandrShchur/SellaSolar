import { Star } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { testimonials } from '../content/site'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/layout/SectionHeading'

function wrapLoop(el: HTMLDivElement) {
  const half = el.scrollWidth / 2
  if (half <= 0) return
  if (el.scrollLeft >= half) el.scrollLeft -= half
  else if (el.scrollLeft <= 0) el.scrollLeft += half
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const draggingRef = useRef(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (!pausedRef.current) {
        el.scrollLeft += dt * 0.035
        wrapLoop(el)
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let lastX = 0
    let moved = false

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch' && e.button !== 0) return
      draggingRef.current = true
      moved = false
      lastX = e.clientX
      pausedRef.current = true
      el.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const dx = e.clientX - lastX
      if (dx === 0) return
      if (Math.abs(dx) > 2) moved = true
      lastX = e.clientX
      el.scrollLeft -= dx
      wrapLoop(el)
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!draggingRef.current) return
      draggingRef.current = false
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
      if (e.pointerType === 'touch' || !el.matches(':hover')) pausedRef.current = false
    }

    const onClickCapture = (e: MouseEvent) => {
      if (!moved) return
      e.preventDefault()
      e.stopPropagation()
      moved = false
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)
    el.addEventListener('click', onClickCapture, true)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [])

  const items = [...testimonials.items, ...testimonials.items]

  return (
    <section id="reviews" className="overflow-hidden bg-surface py-16 sm:py-20 md:py-24">
      <Container>
        <SectionHeading title={testimonials.title} subtitle={testimonials.subtitle} />
      </Container>

      <div className="marquee-fade">
        <div
          ref={trackRef}
          className="flex cursor-grab gap-5 overflow-x-hidden px-4 pb-4 active:cursor-grabbing sm:px-6"
          style={{ touchAction: 'pan-y' }}
          onMouseEnter={() => {
            pausedRef.current = true
          }}
          onMouseLeave={() => {
            if (!draggingRef.current) pausedRef.current = false
          }}
        >
          {items.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="w-72 max-w-[calc(100vw-2.5rem)] shrink-0 select-none rounded-2xl border border-white/70 bg-cream/90 p-6 shadow-soft"
            >
              <div className="flex gap-0.5" aria-label={`${item.rating} з 5`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">«{item.quote}»</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-heading text-sm font-bold text-slate-ink"
                  aria-hidden
                >
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-ink">{item.name}</p>
                  <p className="text-xs text-stone-500">{item.city}</p>
                </div>
                <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-secondary">
                  {item.savings}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
