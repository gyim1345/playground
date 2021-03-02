import { useRef, useEffect } from 'react'

const useCanvas = (draw, initialize, addEvents, removeEvents) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    let canvas = canvasRef.current
    const context = canvas.getContext('2d')


    let state = initialize();
    addEvents(state, canvas, canvasRef);

    let frameCount = 0
    let animationFrameId

    const render = () => {
      frameCount++
      draw(context, frameCount, state)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      removeEvents();
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return canvasRef
}
export default useCanvas