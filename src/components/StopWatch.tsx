import React from 'react'

type stopWatch_prop = {
    h?: number,
    m: number,
    s: number,
    ms: number
    start: () => void,
    stop: () => void,
    reset: () => void,
    isTiming: boolean
}

const StopWatch = ({ h, m, s, ms, start, stop, reset, isTiming }: stopWatch_prop) => {

    const toTwoDigitString = (num: number) => {
        return num.toLocaleString("en-US", { minimumIntegerDigits: 2 })
    }

    const disabled = () => {
        if (h == 0 && m == 0 && s == 0 && ms == 0) return true
        return false
    }
    return (
        <main className='flex flex-col items-center gap-5 mt-[3rem] w-[100%] transition-all'>
            <div className='sm:text-[5em] text-[4em] [font-weight:5] latoFont'>
                {`${toTwoDigitString(m)}:${toTwoDigitString(s)}:${toTwoDigitString(ms)}`}
            </div>
            <div className='flex gap-[2rem]'>
                <button className={`disabled:bg-reset-dis-bg disabled:text-reset-dis-text disabled:cursor-not-allowed  bg-reset-bg text-reset-text h-[5rem] w-[5rem] text-[1.2rem] rounded-full bg-reset-Disable`}
                    disabled={disabled()}
                    onClick={reset}
                >
                    Reset
                </button>
                <button className={`${!isTiming ? "bg-start-bg text-start-text" : "bg-stop-bg text-stop-text"} h-[5rem] w-[5rem] text-[1.2rem] rounded-full bg-reset-Disable`}
                    onClick={isTiming ? stop : start}
                >
                    {isTiming ? "Stop" : "Start"}
                </button>
            </div>
        </main>
    )
}

export default StopWatch
