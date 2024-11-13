'use client'
import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function Message({ messages }: { messages: string[] }) {
  const bubbles = useRef<HTMLDivElement[]>([])
  const text = useRef<HTMLParagraphElement[]>([])
  const dot = useRef<HTMLSpanElement[]>([])
  const loadingSpeed = 600

  useEffect(() => {
    if (!bubbles.current?.length) return

    const timeline = anime.timeline({
      easing: 'easeInOutSine',
    })

    bubbles.current.forEach((bubble: HTMLDivElement, index: number) => {
      if (!text.current?.length || !dot.current?.length) return

      const message = text.current[index]
      const loading = dot.current[index]

      timeline
        .add({
          targets: bubble,
          easing: 'easeOutSine',
          duration: 200,
          opacity: 1,
          scale: [0, 1],
          translateX: [150, 0],
        })
        .add({
          targets: '.dot',
          opacity: [
            { value: 0.6, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 1, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 0.6, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 1, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 0.6, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 1, easing: 'easeOutSine', duration: loadingSpeed },
          ],
          scale: [
            { value: 0.7, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 1, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 0.7, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 1, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 0.7, easing: 'easeOutSine', duration: loadingSpeed },
            { value: 1, easing: 'easeOutSine', duration: loadingSpeed },
          ],
          delay: anime.stagger(300, {
            grid: [1, 3],
            from: 'first',
          }),
        })
        .add({
          targets: bubble,
          borderBottomRightRadius: ['0px', '9999px'],
          width: [loading.offsetWidth + 40, message.offsetWidth + 40],
          height: [loading.offsetHeight + 20, message.offsetHeight + 10],
          easing: 'easeOutSine',
          duration: 200,
          begin: function () {
            loading.style.display = 'none'
            message.style.color = 'black'
          },
        })
        .add({
          targets: message,
          opacity: [0, 1],
          duration: 200,
          easing: 'easeOutSine',
        })
    })
    timeline.play()
  }, [bubbles, text, dot])

  return (
    <section className="flex flex-col gap-2 justify-end items-end w-full">
      {messages.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) bubbles.current[index] = el
          }}
          className="bubble opacity-0 relative"
        >
          <p
            ref={(el) => {
              if (el) text.current[index] = el
            }}
            className="message text-white!"
          >
            {item}
          </p>
          <span
            ref={(el) => {
              if (el) dot.current[index] = el
            }}
            className="loading flex gap-1.5 sm:gap-2 absolute"
          >
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="dot w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black"
              ></span>
            ))}
          </span>
        </div>
      ))}
    </section>
  )
}
