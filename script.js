// API Configuration
const API_BASE_URL = 'http://localhost:3000';
const API_ENDPOINT = `${API_BASE_URL}/todos`;

// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = [];
        this.filteredTasks = [];
        this.currentEditId = null;
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.init();
    }

    init() {
        this.bindEvents();
        this.fetchTasks();
    }

    bindEvents() {
        // Save task button
        document.getElementById('saveTaskBtn').addEventListener('click', () => this.saveTask());
        
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => this.searchTasks(e.target.value));
        
        // Form validation on input
        document.getElementById('task').addEventListener('input', () => this.validateField('task'));
        document.getElementById('username').addEventListener('input', () => this.validateField('username'));
        document.getElementById('date').addEventListener('input', () => this.validateField('date'));
        document.getElementById('task_type').addEventListener('change', () => this.validateField('task_type'));
        
        // Reset form when modal is hidden
        document.getElementById('taskModal').addEventListener('hidden.bs.modal', () => this.resetForm());
    }

    // CRUD Operations
    async fetchTasks() {
        try {
            const response = await axios.get(API_ENDPOINT);
            this.tasks = response.data;
            this.filteredTasks = [...this.tasks];
            this.renderTasks();
            this.updateSummary();
        } catch (error) {
            console.error('Error fetching tasks:', error);
            this.showError('Failed to fetch tasks. Please make sure JSON Server is running.');
        }
    }

    async createTask(taskData) {
        try {
            const response = await axios.post(API_ENDPOINT, taskData);
            this.tasks.push(response.data);
            this.filteredTasks = [...this.tasks];
            this.renderTasks();
            this.updateSummary();
            this.showSuccess('Task created successfully!');
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            this.showError('Failed to create task.');
            throw error;
        }
    }

    async updateTask(id, taskData) {
        try {
            const response = await axios.put(`${API_ENDPOINT}/${id}`, taskData);
            const index = this.tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                this.tasks[index] = response.data;
                this.filteredTasks = [...this.tasks];
                this.renderTasks();
                this.updateSummary();
                this.showSuccess('Task updated successfully!');
            }
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            this.showError('Failed to update task.');
            throw error;
        }
    }

    async deleteTask(id) {
        try {
            await axios.delete(`${API_ENDPOINT}/${id}`);
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.filteredTasks = [...this.tasks];
            this.renderTasks();
            this.updateSummary();
            this.showSuccess('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
            this.showError('Failed to delete task.');
        }
    }

    // Form Validation
    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const value = field.value.trim();
        let isValid = true;

        switch(fieldName) {
            case 'task':
                isValid = value.length >= 3;
                break;
            case 'username':
                isValid = value.length > 0;
                break;
            case 'date':
                isValid = /^\d+$/.test(value) && value.length === 8;
                break;
            case 'task_type':
                isValid = value !== '';
                break;
        }

        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }

        return isValid;
    }

    validateForm() {
        const fields = ['task', 'username', 'date', 'task_type'];
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Save Task (Create or Update)
    async saveTask() {
        if (!this.validateForm()) {
            this.showError('Please fix the validation errors.');
            return;
        }

        const taskData = {
            task: document.getElementById('task').value.trim(),
            username: document.getElementById('username').value.trim(),
            date: document.getElementById('date').value.trim(),
            task_type: document.getElementById('task_type').value,
            status: document.getElementById('status').checked ? 1 : 0
        };

        try {
            if (this.currentEditId) {
                await this.updateTask(this.currentEditId, taskData);
            } else {
                await this.createTask(taskData);
            }
            
            // Close modal and reset form
            const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
            modal.hide();
            this.resetForm();
        } catch (error) {
            // Error is already handled in the CRUD methods
        }
    }

    // Edit Task
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        this.currentEditId = id;
        document.getElementById('modalTitle').textContent = 'Edit Task';
        document.getElementById('taskId').value = task.id;
        document.getElementById('task').value = task.task;
        document.getElementById('username').value = task.username;
        document.getElementById('date').value = task.date;
        document.getElementById('task_type').value = task.task_type;
        document.getElementById('status').checked = task.status === 1;

        // Clear validation states
        document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
    }

    // Delete Task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.deleteTask(id);
        }
    }

    // Search Tasks
    searchTasks(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredTasks = [...this.tasks];
        } else {
            this.filteredTasks = this.tasks.filter(task => 
                task.task.toLowerCase().includes(searchTerm) ||
                task.username.toLowerCase().includes(searchTerm) ||
                task.task_type.toLowerCase().includes(searchTerm)
            );
        }
        
        this.currentPage = 1; // Reset to first page on search
        this.renderTasks();
    }

    // Render Tasks Table
    renderTasks() {
        const tbody = document.getElementById('tasksTableBody');
        const paginatedTasks = this.getPaginatedTasks();
        
        if (this.filteredTasks.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center empty-state">
                        <i class="fas fa-tasks"></i>
                        <p>No tasks found. Create your first task!</p>
                    </td>
                </tr>
            `;
            this.updatePaginationInfo();
            return;
        }

        tbody.innerHTML = paginatedTasks.map((task, index) => {
            const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index + 1;
            return `
                <tr>
                    <td>${globalIndex}</td>
                    <td>${this.escapeHtml(task.task)}</td>
                    <td>${this.escapeHtml(task.username)}</td>
                    <td>${this.formatDate(task.date)}</td>
                    <td><span class="task-type-${task.task_type.toLowerCase()}">${task.task_type}</span></td>
                    <td><span class="${task.status === 1 ? 'status-completed' : 'status-pending'}">${task.status === 1 ? 'Completed' : 'Pending'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-edit me-1" onclick="taskManager.editTask(${task.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-delete" onclick="taskManager.deleteTask(${task.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        this.updatePaginationInfo();
        this.renderPaginationControls();
    }

    // Update Summary Cards
    updateSummary() {
        const total = this.tasks.length;
        const pending = this.tasks.filter(task => task.status === 0).length;
        const done = this.tasks.filter(task => task.status === 1).length;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('doneCount').textContent = done;
    }

    // Reset Form
    resetForm() {
        document.getElementById('taskForm').reset();
        document.getElementById('taskId').value = '';
        document.getElementById('modalTitle').textContent = 'New Task';
        this.currentEditId = null;
        
        // Clear validation states
        document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });
    }

    // Utility Functions
    formatDate(dateString) {
        if (dateString.length === 8) {
            const year = dateString.substring(0, 4);
            const month = dateString.substring(4, 6);
            const day = dateString.substring(6, 8);
            return `${year}-${month}-${day}`;
        }
        return dateString;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Notification Functions
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'danger');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Pagination Methods
    getPaginatedTasks() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredTasks.slice(startIndex, endIndex);
    }

    getTotalPages() {
        return Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    }

    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderTasks();
        }
    }

    nextPage() {
        this.goToPage(this.currentPage + 1);
    }

    previousPage() {
        this.goToPage(this.currentPage - 1);
    }

    updatePaginationInfo() {
        const totalRecords = this.filteredTasks.length;
        const startRecord = totalRecords === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
        const endRecord = Math.min(this.currentPage * this.itemsPerPage, totalRecords);

        document.getElementById('startRecord').textContent = startRecord;
        document.getElementById('endRecord').textContent = endRecord;
        document.getElementById('totalRecords').textContent = totalRecords;
    }

    renderPaginationControls() {
        const paginationControls = document.getElementById('paginationControls');
        const totalPages = this.getTotalPages();
        
        if (totalPages <= 1) {
            paginationControls.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="taskManager.previousPage(); return false;">
                    <i class="fas fa-chevron-left"></i> Previous
                </a>
            </li>
        `;

        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="taskManager.goToPage(1); return false;">1</a>
                </li>
            `;
            if (startPage > 2) {
                paginationHTML += `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="taskManager.goToPage(${i}); return false;">${i}</a>
                </li>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
            }
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="taskManager.goToPage(${totalPages}); return false;">${totalPages}</a>
                </li>
            `;
        }

        // Next button
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="taskManager.nextPage(); return false;">
                    Next <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        `;

        paginationControls.innerHTML = paginationHTML;
    }
}

// Initialize the application
let taskManager;

document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});

// Export for global access
window.taskManager = taskManager;
