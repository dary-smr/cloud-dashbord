import { useEffect, useState } from "react";
import { ResourceCard } from "./components/ResourceCard";
import type { Resource, Status } from "./types";

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
      try {
      setLoading(true);
  
      // запросы на сервер
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      const mappedData: Resource[] = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        status: ["running", "stopped", "pending"][
          Math.floor(Math.random() * 3)
        ] as Status,
      }));
  
      setResources(mappedData);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setLoading(false);
    }
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