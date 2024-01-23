import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "food", quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);
  function handleDeleteItmes(id) {
    setItems((items) => items.filter((items) => items.id !== id));
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
        items={items}
      />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>FAR AWAY 👌</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [newItems, setNewItems] = useState({});

  function handlerForm(e) {
    e.preventDefault();
    if (!description) return;
    const newItems = { description, quantity, id: Date.now(), packed: false };
    onAddItems(newItems);
    setDescription("");
    setQuantity(1);
    // const [id, description] = e.target.value;
    // initialItems.push(newItems);
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
      {/* <input type="range" placeholder="range..." /> */}
      <button className="button">ADD</button>
    </form>
  );
}
function PackingList({ items, onDeleteItmes, onToggleItem }) {
  // console.log(newItems);
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItmes={onDeleteItmes}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
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
      {/* <button>sdjkfnd</button> */}
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>hey footer</em>
    </footer>
  );
}
