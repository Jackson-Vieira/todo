interface ITodoItem {
  description: string; // id
  completed: boolean;
  date_created: Date;
  date_completed: Date | null;
  change_description(new_description: string): void;
  mark_completed(): void;
}

// Factory
export class TodoItem implements ITodoItem {
  description: string;
  completed: boolean;
  date_created: Date;
  date_completed: Date | null;

  constructor(description: string) {
    this.description = description;
    this.completed = false;
    this.date_created = new Date();
    this.date_completed = null;
  }

  change_description(new_description: string) {
    this.description = new_description;
  }

  mark_completed() {
    this.completed = true;
    this.date_completed = new Date();
  }
}