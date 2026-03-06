# Todo List Application

A modern Todo List application with CRUD operations built using Axios and JSON-Server.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete tasks
- ✅ **Form Validation**: Custom validation for all fields
- ✅ **Task Types**: Color-coded task categories (Office, Personal, Family, Friends, Other)
- ✅ **Status Management**: Mark tasks as Pending or Completed
- ✅ **Search Functionality**: Real-time search across tasks
- ✅ **Summary Dashboard**: View total, pending, and completed tasks
- ✅ **Responsive Design**: Works on desktop and mobile devices

## Field Validation Rules

- **Task**: Text area, minimum 3 characters required
- **Username**: Input field, cannot be blank
- **Date**: Only numbers allowed (YYYYMMDD format)
- **Status**: Checkbox (0 = Pending, 1 = Completed)
- **Task Type**: Selection with color mapping:
  - Office = Red
  - Personal = Yellow
  - Family = Green
  - Friends = Cyan
  - Other = Gray

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- Python (for local server) or any web server

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the application**:
   
   **Option 1: Development mode (both API and web server)**
   ```bash
   npm run dev
   ```
   
   **Option 2: Manual setup**
   - Terminal 1: Start JSON Server
     ```bash
     npm start
     ```
   - Terminal 2: Start web server
     ```bash
     npm run serve
     ```

3. **Access the application**:
   - Web App: http://localhost:8080
   - API Endpoint: http://localhost:3000/todos

## Usage

1. **Adding a New Task**:
   - Click the "New Task" button
   - Fill in all required fields
   - Form validation will ensure data integrity
   - Click "Save Task" to create

2. **Editing a Task**:
   - Click the "Edit" button in the actions column
   - Modify the desired fields
   - Click "Save Task" to update

3. **Deleting a Task**:
   - Click the "Delete" button
   - Confirm the deletion in the popup

4. **Searching Tasks**:
   - Use the search bar to filter tasks
   - Search works across task description, username, and task type

## Project Structure

```
todo-list-app/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # JavaScript with Axios CRUD operations
├── db.json            # JSON Server database file
├── package.json       # Node.js dependencies and scripts
└── README.md          # This file
```

## API Endpoints

- `GET /todos` - Get all tasks
- `POST /todos` - Create a new task
- `PUT /todos/:id` - Update a task
- `DELETE /todos/:id` - Delete a task

## Technologies Used

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript (ES6+)
- **HTTP Client**: Axios
- **Backend API**: JSON-Server
- **Icons**: Font Awesome
- **Build Tool**: None (vanilla JavaScript)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
