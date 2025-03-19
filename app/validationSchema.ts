import { z } from "zod";

// Define the shape of the request body
export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Cannot excced 255 characters"),
    description: z.string().min(1, "Description is required").max(255, "Cannot excced 255 characters")
});
