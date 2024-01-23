import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleDeleteItmes(id) {
    setItems((items) => items.filter((items) => items.id !== id));
  }
  function handleClear() {
    setItems([]);
  }
  function onToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleItems(item) {
    setItems((items) => [...items, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        onDeleteItmes={handleDeleteItmes}
        onToggleItem={onToggleItem}
        onClearItems={handleClear}
        items={items}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>FAR AWAY 👌</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handlerForm(e) {
    e.preventDefault();
    if (!description) return;
    const newItems = { description, quantity, id: Date.now(), packed: false };
    onAddItems(newItems);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handlerForm}>
      <h3>What do you need for your 😘 trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="button">ADD</button>
    </form>
  );
}
function PackingList({ items, onDeleteItmes, onToggleItem, onClearItems }) {
  const [sortBy, setSort] = useState("input");
  let sortedItem;
  if (sortBy === "input") sortedItem = items;
  if (sortBy === "description")
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItem = items.slice().sort((a, b) => +a.packed - +b.packed);
  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            onDeleteItmes={onDeleteItmes}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Sort By Input</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItmes, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItmes(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  const packed = items.filter((item) => item.packed).length;
  if (!items.length)
    return (
      <p className="stats">Start adding some items to your packing list</p>
    );

  return (
    <footer className="stats">
      <em>
        You have {items.length} items on your list,and you already packed{" "}
        {packed}
      </em>
    </footer>
  );
}
