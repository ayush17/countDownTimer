import React, { useState, Fragment, useRef } from "react";
import "./App.css";
var interval = setInterval(() => {}, 0);
function App() {
  const [time, setTimer] = useState("00:00");
  const minutesInput = useRef(null);
  const secondsInput = useRef(null);
  const setValue = () => {
    let minutes = minutesInput.current.value;
    let seconds = secondsInput.current.value;
    interval = setInterval(() => {
      console.log("called after every seconds", seconds);
      if (seconds > 0 && minutes >= 0) {
        setTimer(
          (minutes > 9 ? minutes : "0" + minutes) +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
        seconds--;
      } else if (seconds == 0 && minutes >= 0) {
        seconds = 59;
        minutes--;
        if (minutes >= 0) {
          setTimer((minutes > 9 ? minutes : "0" + minutes) + ":" + "60");
        } else {
          setTimer("00:00");
        }
      } else if (minutes < 0) {
        console.log("minutes is less than 0");
        //stops the clock
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <Fragment>
      <label>
        <input type="number" ref={minutesInput} name="minutes" />
        Minutes
      </label>
      <label>
        <input type="number" ref={secondsInput} />
        Seconds
      </label>

      <button
        onClick={() => {
          window.clearInterval(interval);
          setValue();
        }}
      >
        START
      </button>
      <button>PAUSE / RESUME</button>
      <button>RESET</button>
      <h1 data-testid="running-clock">{time}</h1>
    </Fragment>
  );
}

export default App;
