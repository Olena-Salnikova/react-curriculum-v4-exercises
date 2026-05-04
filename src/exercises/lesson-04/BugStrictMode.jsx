// TOPIC: StrictMode Effects and Cleanup
// TASK: Notice how the count increments incorrectly based on the `setInterval` logic. Fix the useEffect so that the counter increments correctly.
import { useEffect, useState } from 'react';

export default function BugStrictMode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(timerId); // Cleanup the interval on unmount
  }, []);

  return (
    <div>
      <h2>StrictMode Timer Bug</h2>
      <p>Count: {count}</p>
    </div>
  );
}

// Write your explanation of how StrictMode helps us catch this bug

// StrictMode runs this effect twice in development to help you spot bugs.
// If you don't clear the interval, you get two timers and the count goes up too fast.
// The cleanup stops extra timers from running.
