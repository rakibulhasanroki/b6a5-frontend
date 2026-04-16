import AuthContainer from "@/components/modules/auth/AuthContainer";
import { Suspense } from "react";

export const metadata = {
  title: "Register",
};
export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <AuthContainer mode="register" />
    </Suspense>
  );
}
