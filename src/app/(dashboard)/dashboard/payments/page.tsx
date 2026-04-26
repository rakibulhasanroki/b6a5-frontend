import PaymentsContainer from "@/components/modules/dashboard/payments/PaymentsContainer";
import { getMyPaymentsAction } from "@/service/payment/payment.actions";
import { getOrganizerPaymentsAction } from "@/service/payment/payment.actions";

export const metadata = {
  title: " Payments",
};
export default async function PaymentsPage({}: {}) {
  const myPayments = await getMyPaymentsAction({ page: 1, limit: 5 });
  const organizerPayments = await getOrganizerPaymentsAction({
    page: 1,
    limit: 5,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Payments</h1>

      <PaymentsContainer
        initialMyPayments={myPayments}
        initialOrganizerPayments={organizerPayments}
      />
    </div>
  );
}
