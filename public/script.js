    // Fetch and display tasks on page load
        const taskForm = document.getElementById('taskForm');
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');

        // Fetch and display tasks
        async function fetchTasks() {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            renderTasks(tasks);
        }

        // Render tasks on the UI
        function renderTasks(tasks) {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <span>${task.title}</span>
                    <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        }

        // Add a new task
        taskForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const title = taskInput.value;

            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });

            if (response.ok) {
                taskInput.value = '';
                fetchTasks();
            }
        });

        // Toggle task completion
       /* async function toggleTask(taskId) {
            const response = await fetch(`/api/tasks/${taskId}`);
            const task = await response.json();

            await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !task.completed }),
            });

            fetchTasks();
        } */

            // Toggle task completion
        async function toggleTask(taskId) {
            // Fetch the current state of the task
            const response = await fetch(`/api/tasks`);
            const tasks = await response.json();
            const task = tasks.find(task => task.id === taskId);

            // Update the task's completion state
            await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !task.completed }),
            });

            // Re-fetch and render the updated list of tasks
            fetchTasks();
        }


        // Delete a task
        async function deleteTask(taskId) {
            await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
            fetchTasks();
        }

        // Initial fetch
        fetchTasks();
    