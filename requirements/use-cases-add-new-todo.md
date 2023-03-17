1. Gordon provides a description and initiates the process of creating a new ToDo with it.
2. The system sets the application status to ‘adding-todo’.
3. The system creates a new ToDo: 
{
  “dateCreated”:Date.now,
  ”description”:description,
  ”done”:false,
  ”dueDate”:null
}
4. The system adds the new ToDo to the data storage.
5. The system updates the application state.
5. The system sets the application status to ‘ready’.