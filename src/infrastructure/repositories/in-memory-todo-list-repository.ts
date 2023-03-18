import { TodoListRepository } from "usecases/ports/todo-list-repository";
import { TodoList } from "domain/todo-list";

export class InMemoryTodoListRepository implements TodoListRepository {
  private todoLists: TodoList[] = [];

  async add(todoList: TodoList): Promise<void> {
    this.todoLists.push(todoList);
  }

  async update(id: number, todoList: TodoList): Promise<void> {
    const index = this.todoLists.findIndex((tl) => tl.id === id);
    if (index === -1) {
      throw new Error("TodoList not found");
    }
    this.todoLists[index] = todoList;
  }

  async remove(id: number): Promise<void> {
    this.todoLists = this.todoLists.filter((tl) => tl.id !== id );
  }

  findById(id: number): Promise<TodoList> {
    const todoList = this.todoLists.find((tl) => tl.id === id);
    if (!todoList) {
      throw new Error("TodoList not found");
    }
    return Promise.resolve(todoList);
  }
}