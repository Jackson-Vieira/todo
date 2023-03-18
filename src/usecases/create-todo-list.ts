import { TodoList } from "..//entities/todo-list";
import { User } from "../entities/user";
import { TodoListRepository } from "../infrastructure/interfaces/todo-list-repository";

export class CreateTodoList {
  constructor(private readonly todoListRepository: TodoListRepository) {}
  async perform(user: User) :  Promise<void> {
    const todoList = new TodoList(user);
    await this.todoListRepository.save(todoList);
  }
}