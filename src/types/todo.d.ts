type priorityType = "HIGH" | "MEDIUM" | "LOW";

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  priority: priorityType;
  due_date: Date;
}
