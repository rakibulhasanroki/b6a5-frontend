import AuthContainer from "@/components/modules/auth/AuthContainer";
import { Suspense } from "react";

export const metadata = {
  title: "Login",
};
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthContainer mode="login" />
    </Suspense>
  );
}
