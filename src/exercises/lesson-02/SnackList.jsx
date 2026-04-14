export default function SnackList() {
  const snacks = [
    { name: 'Chocolate', rank: 1 },
    { name: 'Nuts', rank: 2 },
    { name: 'Fruit bars', rank: 3 },
    { name: 'Granola Bars', rank: 4 },
    { name: 'Dried Fruits', rank: 5 },
    { name: 'Chips', rank: 6 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <div>
      <ol>
        {sortedSnacks.map((snack) => (
          <li key={snack.rank}>{snack.name}</li>
        ))}
      </ol>
    </div>
  );
}
