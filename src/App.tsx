import { useEffect, useState } from "react";
import { ResourceCard } from "./components/ResourceCard";
import type { Resource, Status, ApiUser} from "./types";

function App() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [error, setError] = useState<string | null>(null);

  const filteredResources = resources.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const fetchData = async () => {
    try {
    setError(null);
    setLoading(true);

    // запросы на сервер
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data: ApiUser[] = await response.json();
    const mappedData: Resource[] = data.map(user => ({
      id: user.id,
      name: user.name,
      status: ["running", "stopped", "pending"][
        Math.floor(Math.random() * 3)
      ] as Status,
    }));

    setResources(mappedData);
  } catch (err) {
    setError("Не удалось загрузить данные");
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchData}>Try again</button>
      </div>
    );
  }

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