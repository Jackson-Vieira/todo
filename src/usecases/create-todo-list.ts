import { TodoListImp } from "infrastructure/todo-list-imp";
import { TodoListRepository } from "./ports/todo-list-repository";

export class CreateTodoList {
  constructor(private todoListRepository: TodoListRepository) {}
  async perform() :  Promise<void> {
    const todoList = new TodoListImp();
    await this.todoListRepository.add(todoList);
  }
}