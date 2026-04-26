import AdminPageContent from "@/components/modules/dashboard/admin/AdminPageContent";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminPageContent />
    </Suspense>
  );
}
