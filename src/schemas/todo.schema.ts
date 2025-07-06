import z from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  due_date: z.date({ required_error: "Due date is required" }).refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: "Due date cannot be earlier than today",
    }
  ),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
});
