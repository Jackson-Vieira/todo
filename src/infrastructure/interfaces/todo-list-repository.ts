import { TodoList } from '@/entities/todo-list'

export interface TodoListRepository {
  save(todolist: TodoList): Promise<void>
  update(user_email: string, todolist: TodoList): Promise<void>
  remove(user_email: string): Promise<void>
  findByEmail(user_email: string): Promise<TodoList | undefined>
}