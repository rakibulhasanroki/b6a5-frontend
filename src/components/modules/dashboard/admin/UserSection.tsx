"use client";

import { useEffect, useState } from "react";
import { PaginationMeta } from "@/types/api";
import { deleteUserAction } from "@/service/admin/admin.actions";
import Pagination from "@/components/shared/Pagination";
import { IUser } from "@/types/user";
import { getAllUsersAction } from "@/service/user/user.actions";
import { toast } from "sonner";

export default function UsersSection({
  users: initialUsers,
  meta: initialMeta,
}: {
  users: IUser[];
  meta: PaginationMeta;
}) {
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);
  const [page, setPage] = useState(initialMeta.page);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await getAllUsersAction({
          page,
          limit: meta.limit,
        });

        setUsers(res.data);
        setMeta(res.meta);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      const res = await deleteUserAction(id);

      if (!res?.success) {
        toast.error(res?.message || "Failed to delete user");
        return;
      }

      toast.success(res.message);

      const refreshed = await getAllUsersAction({
        page,
        limit: meta.limit,
      });

      setUsers(refreshed.data);
      setMeta(refreshed.meta);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center border rounded-md p-3"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            <button
              onClick={() => handleDelete(user.id)}
              disabled={loading || deletingId === user.id}
              className="text-destructive text-sm font-medium cursor-pointer 
 px-2 py-1 rounded 
 hover:bg-red-50 hover:text-red-600 
 transition-all duration-150 
 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deletingId === user.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={meta.totalPages}
        loading={loading}
        onPrev={() => setPage((p) => (p > 1 ? p - 1 : p))}
        onNext={() => setPage((p) => (p < meta.totalPages ? p + 1 : p))}
      />
    </div>
  );
}
