"use client";

import { useEffect, useState, useRef } from "react";
import PageContainer from "@/components/custom/PageContainer";
import Section from "@/components/custom/Section";
import EventsHeader from "@/components/modules/events/EventsHeader";
import EventsSearch from "@/components/modules/events/EventsSearch";
import EventsFilters from "@/components/modules/events/EventsFilters";
import EventsGrid from "@/components/modules/events/EventsGrid";
import { getEventsAction } from "@/service/event/event.actions";
import { Event } from "@/types/event";
import { PaginationMeta } from "@/types/api";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState(() => {
    return searchParams.get("filter") || "ALL";
  });
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const cacheRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const buildQuery = () => {
    if (filter === "ALL") return {};

    if (filter === "PUBLIC_FREE")
      return { visibility: "PUBLIC", feeType: "FREE" };

    if (filter === "PUBLIC_PAID")
      return { visibility: "PUBLIC", feeType: "PAID" };

    if (filter === "PRIVATE_FREE")
      return { visibility: "PRIVATE", feeType: "FREE" };

    if (filter === "PRIVATE_PAID")
      return { visibility: "PRIVATE", feeType: "PAID" };

    return {};
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const query = {
        page,
        limit,
        search: debouncedSearch || undefined,
        ...buildQuery(),
      };

      const key = JSON.stringify(query);

      if (cacheRef.current.has(key)) {
        const cached = cacheRef.current.get(key);
        setData(cached.data);
        setMeta(cached.meta);
        return;
      }

      setLoading(true);

      try {
        const res = await getEventsAction(query);

        setData(res.data);
        setMeta(res.meta);

        cacheRef.current.set(key, res);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page, debouncedSearch, filter]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (filter && filter !== "ALL") params.set("filter", filter);
    if (page > 1) params.set("page", String(page));

    const next = `?${params.toString()}`;
    const current = `?${searchParams.toString()}`;

    if (next !== current) {
      router.replace(next);
    }
  }, [debouncedSearch, filter, page]);

  useEffect(() => {
    const sp = new URLSearchParams(searchParams.toString());

    const urlSearch = sp.get("search") || "";
    const urlFilter = sp.get("filter") || "ALL";
    const urlPage = Number(sp.get("page") || 1);

    if (urlSearch !== search) {
      setSearch(urlSearch);
      setDebouncedSearch(urlSearch);
    }

    if (urlFilter !== filter) {
      setFilter(urlFilter);
    }

    if (urlPage !== page) {
      setPage(urlPage);
    }
  }, [searchParams]);

  return (
    <PageContainer>
      <Section>
        <EventsHeader />
      </Section>

      <Section className="space-y-4">
        <EventsSearch value={search} onChange={setSearch} />
        <EventsFilters active={filter} onChange={setFilter} />
      </Section>

      <Section>
        <div className={loading ? "opacity-60 transition" : "opacity-100"}>
          <EventsGrid events={data} />
        </div>

        {meta && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <Button
              variant="outline"
              disabled={page === 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="cursor-pointer"
            >
              Prev
            </Button>

            <span className="text-sm">
              Page {meta.page} of {meta.totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page === meta.totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        )}
      </Section>
    </PageContainer>
  );
}
