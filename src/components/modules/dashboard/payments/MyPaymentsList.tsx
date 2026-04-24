"use client";

import { useState, useTransition } from "react";
import { getMyPaymentsAction } from "@/service/payment/payment.actions";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { MyPaymentsResponse } from "@/types/payment";

export default function MyPaymentsList({
  initialData,
}: {
  initialData: MyPaymentsResponse;
}) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(initialData.meta.page);
  const [pending, startTransition] = useTransition();

  const fetchPage = (newPage: number) => {
    startTransition(async () => {
      const res = await getMyPaymentsAction({ page: newPage, limit: 5 });
      setData(res);
      setPage(newPage);
    });
  };

  return (
    <div className="space-y-4">
      {data.data.length === 0 && (
        <p className="text-sm text-muted-foreground">No payments found</p>
      )}

      {data.data.map((p: any) => (
        <div
          key={p.paymentId}
          className="border rounded-xl p-4 flex justify-between items-center"
        >
          <div className="space-y-1">
            <p className="font-medium text-sm">{p.eventTitle}</p>

            <p className="text-xs text-muted-foreground">
              {new Date(p.eventDate).toLocaleString()}
            </p>

            <p className="text-xs text-muted-foreground">
              TXN: {p.transactionId}
            </p>
          </div>

          <div className="text-right space-y-2">
            <p className="font-semibold">৳ {p.amount}</p>

            {p.invoiceUrl && (
              <a href={p.invoiceUrl} target="_blank">
                <Button size="sm" variant="outline">
                  Invoice
                </Button>
              </a>
            )}
          </div>
        </div>
      ))}

      <Pagination
        page={page}
        totalPages={data.meta.totalPages}
        loading={pending}
        onPrev={() => fetchPage(page - 1)}
        onNext={() => fetchPage(page + 1)}
      />
    </div>
  );
}
