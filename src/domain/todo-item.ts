export interface TodoItem {
  description: string;
  completed: boolean;
  change_description(new_description: string): void;
  complete(): void;
}