import { z } from 'zod';

export const bookingValdidationSchema = z.object({
    customer_name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters"),

    email: z
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),

    mobile: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

    address: z
        .string()
        .trim()
        .min(10, "Address must be at least 10 characters"),

    // city: z
    //     .string()
    //     .trim()
    //     .min(2, "City is required"),

    // state: z
    //     .string()
    //     .trim()
    //     .min(2, "State is required"),

    pincode: z
        .string()
        .regex(/^\d{6}$/, "Invalid pincode"),

    service_id: z
        .number()
        .int()
        .positive("Invalid service"),

    service_type_id: z
        .number()
        .int()
        .positive("Invalid service type"),

    issue_id: z
        .number()
        .int()
        .positive("Invalid issue"),

    preferred_date: z
        .string()
        .optional()
        .or(z.literal("")),

    preferred_time: z
        .string()
        .optional()
        .or(z.literal("")),

    remarks: z
        .string()
        .trim()
        .max(1000, "Remarks cannot exceed 1000 characters")
        .optional()
        .or(z.literal(""))
});