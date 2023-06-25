document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // This prevents the default action of submitting the form

    const taskInput = document.getElementById("new-task-description");
    const prioritySelect = document.getElementById("priority-select");
    const userInput = document.getElementById("user-input");
    const durationInput = document.getElementById("duration-input");
    const dueDateInput = document.getElementById("due-date-input");

    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const user = userInput.value.trim();
    const duration = durationInput.value.trim();
    const dueDate = dueDateInput.value.trim();

    if (taskText !== "") {
      const taskItem = document.createElement("li");

      const taskContent = document.createElement("div");
      taskContent.textContent = taskText;

      // Set color based on priority
      switch (priority) {
        case "high":
          taskContent.style.color = "red";
          break;
        case "medium":
          taskContent.style.color = "yellow";
          break;
        case "low":
          taskContent.style.color = "green";
          break;
        default:
          taskContent.style.color = "black";
      }

      taskItem.appendChild(taskContent);

      const taskDetails = document.createElement("div");
      taskDetails.textContent = `User: ${user} | Duration: ${duration} | Due Date: ${dueDate}`;
      taskItem.appendChild(taskDetails);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        taskItem.remove();
      });
      taskItem.appendChild(deleteButton);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        // Enable editing of task content and details
        taskContent.contentEditable = true;
        taskDetails.contentEditable = true;
        taskContent.focus();
      });
      taskItem.appendChild(editButton);

      taskList.appendChild(taskItem);
      taskInput.value = ""; // Clear input field after entering the task
      prioritySelect.value = "low"; // Reset priority dropdown to default
      userInput.value = ""; // Clear user input field
      durationInput.value = ""; // Clear duration input field
      dueDateInput.value = ""; // Clear due date input field
    }
  });

  const sortTasks = (order) => {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const priorityA = a.style.color;
      const priorityB = b.style.color;
      if (order === "asc") {
        return priorityA.localeCompare(priorityB);
      } else if (order === "desc") {
        return priorityB.localeCompare(priorityA);
      }
    });
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      taskList.appendChild(task);
    });
  };

  const sortSelect = document.getElementById("sort-select");
  sortSelect.addEventListener("change", () => {
    const order = sortSelect.value;
    sortTasks(order);
  });
});