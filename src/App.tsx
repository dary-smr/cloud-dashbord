import { useEffect, useState } from "react";
import { ResourceCard } from "./components/ResourceCard";
import type { Resource, Status} from "./types";
import { FilterPanel } from "./components/FilterPanel";
import { fetchResourses } from "./api";

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

    const data = await fetchResourses();

    setResources(data);

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

      <FilterPanel
        currentFilter={filter}
        onChangeFilter={setFilter}      
      />

      {filteredResources.map((r) => (
        <ResourceCard key={r.id} resource={r} />
      ))}
    </div>
  );
}

export default App;