// TOPIC: Event Bubbling & Stopping Propagation
// TASK: Ensure only the inner button's action triggers an alert when the button is pushed
export default function BugEventPropagation() {
  function handleOuterClick() {
    alert("RED BOX CLICKED ❌ Don't show me!");
  }

  function handleInnerClick(event) {
    event.stopPropagation();
    alert('Button Clicked ✅');
  }

  return (
    <>
      <h2>Stopping Event Propagation</h2>
      <div
        style={{ padding: 20, border: '2px solid red' }}
        onClick={handleOuterClick}
      >
        <button onClick={handleInnerClick}>Click inner button</button>
      </div>
    </>
  );
}

// When you click the button, stopPropagation() stops the click event from reaching the red box.
// This way, only the button's alert shows, and the red box's alert doesn't pop up.
