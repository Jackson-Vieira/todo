import { TodoItem } from "domain/todo-item";
import { TodoListRepository } from "./ports/todo-list-repository";

import { TodoItemImp } from "infrastructure/todo-item-imp";

export class CreateTodoItem {
  constructor(private todoListRepository: TodoListRepository) {}
  async perform(
    id: number,
    item_description: TodoItem["description"]
  ): Promise<void> {
    const todoList = await this.todoListRepository.findById(id);
    const todoItem = new TodoItemImp(item_description);
    todoList.add(todoItem);
    this.todoListRepository.add(todoList);
  }
}
