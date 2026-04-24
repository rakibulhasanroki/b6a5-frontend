"use client";

import { useState, useTransition } from "react";
import { getOrganizerPaymentsAction } from "@/service/payment/payment.actions";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { OrganizerPaymentsResponse } from "@/types/payment";

export default function OrganizerPaymentsList({
  initialData,
}: {
  initialData: OrganizerPaymentsResponse;
}) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(initialData.meta.page);
  const [pending, startTransition] = useTransition();

  const fetchPage = (newPage: number) => {
    startTransition(async () => {
      const res = await getOrganizerPaymentsAction({
        page: newPage,
        limit: 5,
      });
      setData(res);
      setPage(newPage);
    });
  };

  return (
    <div className="space-y-6">
      {data.data.length === 0 && (
        <p className="text-sm text-muted-foreground">No organizer payments</p>
      )}

      {data.data.map((group: any) => (
        <div key={group.eventId} className="border rounded-xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{group.eventTitle}</p>

            <div className="text-right text-sm">
              <p className="font-medium">৳ {group.totalRevenue}</p>
              <p className="text-xs text-muted-foreground">
                {group.totalPayments} payments
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {group.payments.map((p: any) => (
              <div
                key={p.paymentId}
                className="flex justify-between items-center border rounded-md p-3"
              >
                <div>
                  <p className="text-sm">{p.participant.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.participant.email}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">৳ {p.amount}</p>

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
