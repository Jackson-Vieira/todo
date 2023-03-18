export interface TodoItem {
  id: number;
  description: string;
  completed: boolean;
  change_description(new_description: string): void;
  complete(): void;
}