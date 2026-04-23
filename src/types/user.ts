export type UserRole = "USER" | "ADMIN";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneNumber?: string | null;
  bio?: string | null;
  createdAt: string;
}

export interface IUserStats {
  participant: {
    eventsJoined: number;
    bookings: {
      total: number;
      confirmed: number;
      pending: number;
    };
    invitations: {
      pending: number;
    };
    payments: {
      totalPaid: number;
      totalAmount: number;
    };
    reviews: {
      total: number;
    };
  };

  organizer: {
    eventsCreated: number;
    participants: {
      total: number;
      confirmed: number;
      pending: number;
      banned: number;
    };
    revenue: {
      totalAmount: number;
    };
  };

  admin?: {
    users: { total: number };
    platform: {
      totalEvents: number;
      totalBookings: number;
      totalRevenue: number;
    };
  };
}
