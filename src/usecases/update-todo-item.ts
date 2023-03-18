import { TodoListRepository } from "@/infrastructure/interfaces/todo-list-repository";

export class UpdateTodoItem {
  constructor(private todoListRepository: TodoListRepository) {}
  async perform(
    user_email: string,
    item_description: string,
    new_description: string
  ): Promise<void> {
    this.todoListRepository.setStatus("Updating todo item...");
    const todoList = await this.todoListRepository.findByEmail(user_email);
    if (!todoList) {
      throw new Error("User does not exist");
    }
    if(todoList.find_by_description(new_description)){
      throw new Error("Todo item already exists");
    }
    todoList.change_description(item_description, new_description);
    await this.todoListRepository.update(user_email, todoList);
    this.todoListRepository.setStatus("Ready");
  }
}