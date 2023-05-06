import React, { useEffect, useReducer, useState, } from "react"
import StopWatch from "./components/StopWatch"


type stop_watch = { h?: number, m: number, s: number, ms: number }

const App = () => {

  type ofAction =
    | { type: "Update-ms", payload: 1 }
    | { type: "reset-Time", payload?: 0 }

  const reducer = (StopWatchState: stop_watch, action: ofAction) => {
    const { type, payload } = action
    switch (type) {
      case "Update-ms":
        if (StopWatchState.ms == 99) {
          if (StopWatchState.s == 59) {
            if (StopWatchState.h == 59) {
              return { ...StopWatchState, ms: 0, s: 0, m: 0, h: StopWatchState.h ? StopWatchState.h + 1 : StopWatchState.h }
            }
            return { ...StopWatchState, ms: 0, s: 0, m: StopWatchState.m + 1 }
          }
          return { ...StopWatchState, ms: 0, s: StopWatchState.s + 1 }
        }
        return { ...StopWatchState, ms: StopWatchState.ms + payload }
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
      return () => clearInterval(msId)
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


//Add alarm functionality to Beep after specific time

//This has some bugs