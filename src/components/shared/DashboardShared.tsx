export function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border bg-background p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

export function CTA({
  text,
  action,
  href,
}: {
  text: string;
  action: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center border rounded-xl p-10 text-center space-y-3">
      <p className="text-muted-foreground">{text}</p>
      <a
        href={href}
        className="px-4 py-2 rounded-md bg-primary text-white text-sm"
      >
        {action}
      </a>
    </div>
  );
}
