export default function TaskFilterButtons({ filter, onChange }) {
  return (
    <div>
      <button onClick={() => onChange('all')}>All</button>
      <button onClick={() => onChange('completed')}>Completed</button>
      <button onClick={() => onChange('pending')}>Pending</button>
      <p>Current filter: {filter}</p>
    </div>
  );
}
