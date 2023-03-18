import { TodoItem } from "./todo-item";

export interface TodoList {
  todolist: TodoItem[];
  id: number;
  add(todo: TodoItem): void;
  complete(item_description: TodoItem["description"]): void;
  list(): TodoItem[];
  find_by_description(item_description: TodoItem["description"]): TodoItem | undefined;
  change_description(old_description: string, new_description: string): void;
}
