import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card"; // shadcn card

interface CardWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function CardWrapper({
  children,
  className = "",
}: CardWrapperProps) {
  return (
    <Card
      className={`shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
