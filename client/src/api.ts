import type { GenerateNamesResponse } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function generateNames(
  description: string,
  styles: string[]
): Promise<GenerateNamesResponse> {
  const res = await fetch(`${API_BASE_URL}/api/names`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, styles }),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = (await res.json()) as GenerateNamesResponse;
  return data;
}
