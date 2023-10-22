# Tasks Management

Tasks Management is a project for managing tasks and tracking user actions. It provides features for changing task status, assigning responsibility to other users, and updating task properties such as title and description while keeping track of the changes.

### Technologies

The project is built using the following technologies:

- Node.js
- NestJS
- TypeScript
- MySQL with TypeORM
- React

### Features

- Node.js application based on a layered architecture with MySQL database.
- Applied validation on user requests using class validator.
- Applied the command pattern with transactional database operations to ensure separation of concerns.
- Implemented a pipe state transition to validate task transitions using the state pattern.
- Error handling using interceptors.
- Added Swagger documentation for API endpoints.

### Database Schema

The project uses the following database schema:

#### Task Table

- id
- title
- description
- status
- assignedTo (user: one-to-many relation)
- createdBy (user: one-to-many relation)
- history (history: one-to-many relation)
- createdAt (date)
- updatedAt (date)

#### History Table

- id
- changedBy (user)
- createdAt (date)
- updatedAt (date)
- current (taskHistory: one-to-one relation)
- previous (taskHistory: one-to-one relation)

#### TaskHistory Table

- id
- title
- description
- assignedTo (user)

#### User Table

- id
- username

### Endpoints

The project exposes the following endpoints:

#### Tasks

- `GET /task/{id}` - Get a specific task by ID.
- `GET /tasks/list` - Get a list of all tasks.
- `PATCH /tasks/status/{id}` - Update the status of a task by ID.
- `PATCH /tasks/responsibility/{id}` - Update the responsibility of a task by ID.
- `POST /task` - Create a new task.

#### Task History

- `GET /history/task/{taskId}` - Get the history of changes for a specific task.

#### Users

- `POST /user` - Create a new user.

Feel free to explore and use these endpoints to interact with the Tasks Management system.

## Getting Started

To get started with the project, follow these steps:

1. Install the necessary dependencies by running `npm install` or `yarn install`.
2. Set up the MySQL database and update the database configuration in the project.
3. Run the project using `npm run start` or `yarn start`.
4. Access the API endpoints using a tool like Postman or through the provided Swagger documentation.

## Conclusion

The Tasks Management project provides a robust system for managing tasks and tracking user actions. With its layered architecture, validation, command pattern, and state pattern, it offers a scalable and maintainable solution for task management.
