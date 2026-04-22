import {
  Calendar,
  Ticket,
  Mail,
  CreditCard,
  Shield,
  LayoutDashboard,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Events",
    href: "/dashboard/events",
    icon: Calendar,
  },
  {
    label: "My Bookings",
    href: "/dashboard/my-bookings",
    icon: Ticket,
  },
  {
    label: "My Invitations",
    href: "/dashboard/my-invitations",
    icon: Mail,
  },
  {
    label: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },

  {
    label: "Admin",
    href: "/dashboard/admin",
    icon: Shield,
    adminOnly: true,
  },
];
