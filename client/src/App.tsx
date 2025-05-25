import { useState } from "react";
import "./App.css";
import SingleFileUploader from "./SingleFileUploader";
import type { Item } from "./types";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Document Reader</h1>
      </header>
      <main className="app-main">
        <SingleFileUploader
          onResponseReceived={(response: Item) =>
            setItems([...items, response])
          }
        />
        <section className="history-section">
          <h2>History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Service Used</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="history-row">
                  <td>{item.documentName}</td>
                  <td>{item.serviceUsed}</td>
                  <td>{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
