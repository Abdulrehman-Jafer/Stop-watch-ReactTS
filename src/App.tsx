import React, { useEffect, useReducer, useState, } from "react"
import StopWatch from "./components/StopWatch"


type stop_watch = { h?: number, m: number, s: number, ms: number }

const App = () => {

  type ofAction =
    | { type: "Update-ms", payload: 1 }
    | { type: "Update-s", payload: 1 }
    | { type: "Update-m", payload: 1 }
    | { type: "Update-h", payload: 1 }
    | { type: "reset-Time", payload?: 0 }

  const reducer = (StopWatchState: stop_watch, action: ofAction) => {
    const { type, payload } = action
    switch (type) {
      case "Update-ms":
        return { ...StopWatchState, ms: StopWatchState.ms == 99 ? 0 : StopWatchState.ms + payload }
      case "Update-s":
        return { ...StopWatchState, s: StopWatchState.s == 59 ? 0 : StopWatchState.s + payload }
      case "Update-m":
        return { ...StopWatchState, m: StopWatchState.m == 59 ? 0 : StopWatchState.m + payload }
      case "Update-h":
        return { ...StopWatchState, h: StopWatchState.h == 24 ? 0 : StopWatchState.h ? StopWatchState.h + payload : 0 }
      case "reset-Time":
        return { h: 0, m: 0, s: 0, ms: 0 }
      default:
        return StopWatchState
    }

  }

  const [stopWatch, dispatch] = useReducer(reducer, { ms: 0, s: 0, m: 0, h: 0 })
  const [isTiming, setIsTiming] = useState(false)


  useEffect(() => {
    if (isTiming) {
      const msId = setInterval(() => dispatch({ type: "Update-ms", payload: 1 }), 10)
      const sId = setInterval(() => dispatch({ type: "Update-s", payload: 1 }), 1000)
      const mId = setInterval(() => dispatch({ type: "Update-m", payload: 1 }), 60000)
      const hId = setInterval(() => dispatch({ type: "Update-h", payload: 1 }), 3600000)

      return () => {
        clearInterval(msId)
        clearInterval(sId)
        clearInterval(mId)
        clearInterval(hId)
      }
    }
  }, [isTiming])

  const reset = () => {
    dispatch({ type: "reset-Time" })
    if (isTiming) stop()
  }

  const start = () => {
    setIsTiming(true)
  }

  const stop = () => {
    setIsTiming(false)
  }


  return (
    <main className="text-white">
      <nav className="text-center text-white heading">Stopwatch</nav>
      <StopWatch h={stopWatch.h} m={stopWatch.m} s={stopWatch.s} ms={stopWatch.ms} start={start} stop={stop} reset={reset} isTiming={isTiming} />
    </main>
  )
}

export default App
