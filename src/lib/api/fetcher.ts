import { env } from "@/env";
import { buildQuery } from "./query-builder";

type FetchMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface FetchOptions<TBody = unknown> {
  method?: FetchMethod;
  body?: TBody;
  query?: Record<string, any>;

  headers?: HeadersInit;

  auth?: boolean;
  cache?: RequestCache;

  tags?: string[];
  revalidate?: number;
}

export async function fetcher<TResponse, TBody = unknown>(
  endpoint: string,
  options?: FetchOptions<TBody>,
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    query,
    headers,
    auth = false,
    cache = "no-store",
    tags,
    revalidate,
  } = options || {};

  const baseUrl = `${env.API_URL}/api/v1`;

  const url = `${baseUrl}${endpoint}${buildQuery(query)}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    credentials: auth ? "include" : "same-origin",

    cache,

    next: {
      tags,
      revalidate,
    },

    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(
      data?.message || "Something went wrong while fetching data",
    );
  }

  return data;
}
