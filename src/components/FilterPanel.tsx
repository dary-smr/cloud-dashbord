import type { Status } from "../types";

type FilterPanelProps = {
    currentFilter: Status | "all";
    onChangeFilter: (value: Status | "all") => void;
};

export function FilterPanel({
    currentFilter,
    onChangeFilter,
}: FilterPanelProps) {
    return (
        <div>
            <button onClick={() => onChangeFilter("all")}
                style={{
                    fontWeight:
                    currentFilter === "all" ? "bold" : "normal"
                }}
            >
                All
            </button>
            <button onClick={() => onChangeFilter("running")}
                style={{
                    fontWeight:
                    currentFilter === "running" ? "bold" : "normal"
                }}
            >
                Running
            </button>
            <button onClick={() => onChangeFilter("stopped")}
                style={{
                    fontWeight:
                    currentFilter === "stopped" ? "bold" : "normal"
                }}
            >
                Stopped
            </button>
            <button onClick={() => onChangeFilter("pending")}
                style={{
                    fontWeight:
                    currentFilter === "pending" ? "bold" : "normal"
                }}
            >
                Pending
            </button>
        </div>
    );
}