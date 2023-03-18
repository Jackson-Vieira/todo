import { TodoItem } from "../domain/todo-item";
import { TodoList } from "../domain/todo-list";

export class TodoListImp implements TodoList {
  todolist: TodoItem[] = [];
  id: number;

  constructor() {
    this.id = Math.floor(Math.random() * 1000);
  }

  add(todo: TodoItem) {
    this.todolist.push(todo);
  }

  complete(item_description: TodoItem["description"]) {
    const todo = this.todolist.find(todo => todo.description === item_description);
    if (todo) {
      todo.complete()
    }
  }

  find_by_description(item_description: string): TodoItem | undefined {
    return this.todolist.find(todo => todo.description === item_description);
  }

  change_description(old_description: string, new_description: string): void {
    const todo = this.todolist.find(todo => todo.description === old_description);
    if (todo) {
      todo.change_description(new_description);
    }
  }

 list() {
    return this.todolist;
  }


}