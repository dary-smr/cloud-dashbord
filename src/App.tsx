import { useState } from "react";
import { ResourceCard } from "./components/ResourceCard";

type Status = "running" | "stopped" | "pending";

function App() {
  const [filter, setFilter] = useState<Status | "all">("all");;

  const resources: { id: number; name: string; status: Status }[] = [
    { id: 1, name: "Cluster A", status: "running" },
    { id: 2, name: "Cluster B", status: "stopped" },
    { id: 3, name: "Cluster C", status: "pending" },
  ];

  const filteredResources = resources.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  return (
    <div  style={{ padding: "20px" }}>
      <h1>Cloud Dashboard</h1>

      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("running")}>Running</button>
      <button onClick={() => setFilter("stopped")}>Stopped</button>
      <button onClick={() => setFilter("pending")}>Pending</button>

      {filteredResources.map((r) => (
        <ResourceCard key={r.id} resource={r} />
      ))}
    </div>
  );
}

export default App;