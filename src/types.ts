export type Status = "running" | "stopped" | "pending";

export type Resource = {
  id: number;
  name: string;
  status: Status;
};