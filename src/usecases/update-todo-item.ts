import { TodoListRepository } from "@/infrastructure/interfaces/todo-list-repository";

export class UpdateTodoItem {
  constructor(private todoListRepository: TodoListRepository) {}
  async perform(
    user_email: string,
    item_description: string,
    new_description: string
  ): Promise<void> {
    const todoList = await this.todoListRepository.findByEmail(user_email);
    if (!todoList) {
      throw new Error("User does not exist");
    }
    todoList.change_description(item_description, new_description);
    await this.todoListRepository.update(user_email, todoList);
  }
}