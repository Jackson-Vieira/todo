import { TodoList } from "..//entities/todo-list";
import { User } from "../entities/user";
import { TodoListRepository } from "../infrastructure/interfaces/todo-list-repository";

export class CreateTodoList {
  constructor(private readonly todoListRepository: TodoListRepository) {}
  async perform(user: User) :  Promise<void> {
    const todoList = new TodoList(user);
    this.todoListRepository.setStatus('creating todo list...');
    await this.todoListRepository.save(todoList);
    this.todoListRepository.setStatus('ready');
  }
}