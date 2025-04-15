"use client"

import { useEffect, useState, useRef } from "react"

export default function DVDScreensaver() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [velocity, setVelocity] = useState({ x: 3, y: 3 })
  const [color, setColor] = useState("#ff0000")
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const logoRef = useRef<HTMLDivElement>(null)
  const [logoSize, setLogoSize] = useState({ width: 0, height: 0 })

  // Generate random color
  const getRandomColor = () => {
    const colors = [
      "#ff0000", // red
      "#00ff00", // green
      "#0000ff", // blue
      "#ffff00", // yellow
      "#ff00ff", // magenta
      "#00ffff", // cyan
      "#ff8000", // orange
      "#8000ff", // purple
    ]
    let newColor
    do {
      newColor = colors[Math.floor(Math.random() * colors.length)]
    } while (newColor === color)
    return newColor
  }

  // Initialize dimensions
  useEffect(() => {
    if (containerRef.current && logoRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
      setLogoSize({
        width: logoRef.current.offsetWidth,
        height: logoRef.current.offsetHeight,
      })
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animation loop
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || logoSize.width === 0) return

    let animationFrameId: number
    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const deltaTime = timestamp - lastTimestamp
      lastTimestamp = timestamp

      // Smooth animation with deltaTime
      const timeScale = deltaTime / 16.67 // Normalize to ~60fps

      setPosition((prev) => {
        // Calculate new position
        let newX = prev.x + velocity.x * timeScale
        let newY = prev.y + velocity.y * timeScale

        let newVelocityX = velocity.x
        let newVelocityY = velocity.y
        let colorChanged = false

        // Check for horizontal collision
        if (newX <= 0) {
          newX = 0
          newVelocityX = Math.abs(velocity.x)
          colorChanged = true
        } else if (newX + logoSize.width >= dimensions.width) {
          newX = dimensions.width - logoSize.width
          newVelocityX = -Math.abs(velocity.x)
          colorChanged = true
        }

        // Check for vertical collision
        if (newY <= 0) {
          newY = 0
          newVelocityY = Math.abs(velocity.y)
          colorChanged = true
        } else if (newY + logoSize.height >= dimensions.height) {
          newY = dimensions.height - logoSize.height
          newVelocityY = -Math.abs(velocity.y)
          colorChanged = true
        }

        // Update velocity and color if needed
        if (colorChanged) {
          setVelocity({ x: newVelocityX, y: newVelocityY })
          setColor(getRandomColor())
        }

        return { x: newX, y: newY }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [dimensions, velocity, logoSize])

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <div
        ref={logoRef}
        className="absolute font-bold text-2xl sm:text-4xl tracking-tight flex items-center justify-center"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          color,
          width: "100px",
          height: "60px",
          border: `2px solid ${color}`,
          borderRadius: "10px",
          padding: "8px",
          transition: "color 0.2s ease",
        }}
      >
        DVD
      </div>
    </div>
  )
}
