import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters"),

    email: z
        .email("Invalid email address")
        .trim(),

    mobile: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

    subject: z
        .string()
        .trim()
        .min(3, "Subject is required"),

    message: z
        .string()
        .trim()
        .min(10, "Message should be at least 10 characters")
});