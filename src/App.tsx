import { useEffect, useState } from "react";
import { ResourceCard } from "./components/ResourceCard";

type Status = "running" | "stopped" | "pending";

type Resource = {
  id: number;
  name: string;
  status: Status;
};

function App() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");

  const filteredResources = resources.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      // имитация запроса на сервер
      const data: Resource[] = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: "Cluster A", status: "running" },
            { id: 2, name: "Cluster B", status: "stopped" },
            { id: 3, name: "Cluster C", status: "pending" },
          ]);
        }, 1000);
      });
  
      setResources(data);
      setLoading(false);
    };
  
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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