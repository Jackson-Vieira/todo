import { TodoItem } from "./todo-item";
import { User } from "./user";

interface ITodoList {
  user: User;
  todolist: TodoItem[];
  add(todo: TodoItem): boolean;
  complete(item_description: string): boolean;
  list(): TodoItem[];
  find_by_description(item_description: string): TodoItem | undefined;
  change_description(old_description: string, new_description: string): boolean;
}

// Factory
export class TodoList implements ITodoList {
  user: User;
  todolist: TodoItem[];

  constructor(user: User) {
    this.user = user;
    this.todolist = [];
  }

  add(todo: TodoItem): boolean {
    this.todolist.push(todo);
    return true;
  }

  complete(item_description: string): boolean {
    const todo = this.find_by_description(item_description);
    if (todo) {
      todo.mark_completed();
      return true;
    }
    return false;
  }

  list(): TodoItem[] {
    return this.todolist;
  }

  find_by_description(item_description: string): TodoItem | undefined {
    return this.todolist.find((todo) => todo.description === item_description);
  }

  change_description(old_description: string, new_description: string): boolean {
    const todo = this.find_by_description(old_description);
    if (todo) {
      todo.change_description(new_description);
      return true;
    }
    return false;
  }
}