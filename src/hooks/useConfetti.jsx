// useConfetti.tsx
import { useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export function useConfetti() {
  const { width, height } = useWindowSize()
  const [active, setActive] = useState(false)

  const ConfettiView = () =>
    active ? <Confetti width={width} height={height} numberOfPieces={400} /> : null

  const launch = () => {
    setActive(true)
    // apagar después de 3s
    setTimeout(() => setActive(false), 8000)
  }

  return { launch, ConfettiView }
}
