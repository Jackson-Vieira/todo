import { TodoList } from '../../domain/todo-list'

export interface TodoListRepository {
  update(id: number, todolist: TodoList): Promise<void>
  add(todolist: TodoList): Promise<void>
  remove(id: number): Promise<void>
  findById(id: number): Promise<TodoList>
}