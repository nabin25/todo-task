## Project Setup

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/nabin25/todo-task.git
cd todo-task
```

### 2. Setup Environment

- Rename `.env.example` on root of the project to `.env`

- Browse to <a href="https://mockapi.io">Mock api</a> and create resources **users**, **todos** with the types mentioned under `types` folder.


### 3. Install Dependencies

```bash
npm i
```

or if you are using `pnpm` then

```bash
pnpm install
```

### 3. Run the development server

```bash
npm run dev
```

or if you are using `pnpm` then

```bash
pnpm dev
```

Your server will be live on <a href="http://localhost:5173">http://localhost:5173</a>


## Improvements made

- Implemented authentication to show user-wise todos.

- Used MockAPI instead of jsonplaceholder to reflect the changes of mutations on query.

- Added Signup page with password meter for creating new accounts.

- Added due date and priority field in todos for more details about the todo.


## Bonus features implemented

- Added Dark / Light mode toggle with system theme as default and persisted theme on localstorage

- Added spinners and skeletons on API calls pending state. 