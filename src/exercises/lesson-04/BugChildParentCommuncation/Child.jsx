export default function Child({ onIncrement }) {
  return <button onClick={onIncrement}>Increment Counter</button>;
}

// We call the function from props when the button is clicked to increment the parent's counter.
