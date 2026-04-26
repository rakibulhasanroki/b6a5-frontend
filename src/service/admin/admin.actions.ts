"use server";

import { CreateAdminPayload } from "@/types/admin";
import { AdminService } from "./admin.service";
import { updateTag } from "next/cache";

// CREATE ADMIN
export const createAdminAction = async (body: CreateAdminPayload) => {
  try {
    const res = await AdminService.createAdmin(body);

    updateTag("admins");

    return {
      success: true,
      message: "Admin created successfully",
      data: res.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Failed to create admin",
    };
  }
};

// DELETE USER
export const deleteUserAction = async (userId: string) => {
  try {
    await AdminService.deleteUser(userId);

    updateTag("users");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Failed to delete user",
    };
  }
};

// DELETE EVENT
export const deleteEventAction = async (eventId: string) => {
  try {
    await AdminService.deleteEvent(eventId);

    updateTag("events");

    return {
      success: true,
      message: "Event deleted successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Failed to delete event",
    };
  }
};
