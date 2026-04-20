import type {
    ApiUser,
    Resource,
    Status
} from "./types";

export async function fetchResourses() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data: ApiUser[] = await response.json();
    const mappedData: Resource[] = data.map(user => ({
      id: user.id,
      name: user.name,
      status: ["running", "stopped", "pending"][
        Math.floor(Math.random() * 3)
      ] as Status,
    }));

    return mappedData;
}