import { env } from "@/env";
import { buildQuery } from "./query-builder";
import { cookies } from "next/headers";

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

  const isFormData = body instanceof FormData;

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(url, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(headers || {}),
      ...(auth && cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    cache,
    next: {
      tags,
      revalidate,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string" ? data.message : "Something went wrong",
    );
  }

  return data as TResponse;
}
