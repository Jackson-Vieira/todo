import { TodoItem } from "./todo-item";
import { User } from "./user";

export interface TodoList {
  todolist: TodoItem[];
  owner: User;
  add(todo: TodoItem): void;
  complete(id: number): void;
  list(): TodoItem[];
  change_description(old_description: string, new_description: string): void;
}
