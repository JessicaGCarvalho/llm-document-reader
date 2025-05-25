import { useState } from "react";
import "./App.css";
import SingleFileUploader from "./SingleFileUploader";
import type { Item } from "./types";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  return (
    <>
      <SingleFileUploader
        onResponseReceived={(response: Item) => setItems([...items, response])}
      ></SingleFileUploader>
      <h1>History</h1>
      <h5>{"(document name, service used)"}</h5>
      <ul>
        {items.map((item) => {
          return (
            <li>{`${item.documentName}, ${item.serviceUsed}, ${item.message}`}</li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
