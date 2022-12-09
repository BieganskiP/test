import "./styles/main.scss";
import "./styles/normalize.css";
import uniqid from "uniqid";
import { Notify } from "notiflix/build/notiflix-notify-aio";

let counter = document.querySelector("[data-counter]");
let taskCounter = 0;
let allChecked = [];

const taskList = document.querySelector("#taskList");
const taskInput = document.querySelector("#taskAdd");

const clearCompleted = document.querySelector("#clearCompleted");
const optionsDesktop = document.querySelector("#optionsDesktop");

function updateCounter() {
  counter.innerHTML = taskCounter;
}
function createTask(task) {
  const newTaskEl = document.createElement("li");
  const taskContent = document.createElement("label");
  const taskCheckboxCustom = document.createElement("span");
  const taskCheckbox = document.createElement("input");
  const removeBtn = document.createElement("span");

  newTaskEl.classList.add("tile");
  newTaskEl.classList.add("task-tile");
  newTaskEl.classList.add("task-tile--not-completed");
  taskCheckboxCustom.classList.add("checkbox--custom");
  taskCheckbox.classList.add("checkbox");
  taskContent.classList.add("task__label");
  removeBtn.classList.add("task__remove");

  newTaskEl.setAttribute("draggable", "true");
  taskCheckbox.setAttribute("type", "checkbox");
  taskCheckbox.setAttribute("name", "Input checkmark");
  taskCheckbox.setAttribute("id", uniqid());

  taskContent.textContent = task;

  taskContent.append(taskCheckboxCustom);
  taskContent.append(taskCheckbox);
  newTaskEl.append(taskContent);
  newTaskEl.append(removeBtn);
  taskList.append(newTaskEl);

  taskCounter++;

  removeBtn.addEventListener("click", () => {
    removeBtn.parentElement.remove();
    taskCounter--;
    updateCounter();
  });
  taskCheckbox.addEventListener("change", () => {
    newTaskEl.classList.toggle("task-tile--completed");
    newTaskEl.classList.toggle("task-tile--not-completed");
  });
}

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (taskInput.value == "") {
      Notify.warning("You need to add task, you can't be doing nothing");
    } else {
      createTask(taskInput.value);
      updateCounter();
      taskInput.value = "";
    }
  }
});

clearCompleted.addEventListener("click", () => {
  allChecked = document.querySelectorAll("input[type=checkbox]:checked");
  taskCounter -= allChecked.length;
  updateCounter();
  allChecked.forEach((child) => child.parentElement.parentElement.remove());
});

// ==================================
optionsDesktop.addEventListener("click", (event) => {
  let notTarget = document.querySelectorAll("a");
  notTarget.forEach((el) => el.classList.remove("options--active"));

  let target = event.target;

  if (target.tagName != "A") return;
  target.classList.add("options--active");

  const allTasks = document.querySelectorAll(".task-tile");
  if (target.classList.contains("all")) {
    allTasks.forEach((el) => {
      el.classList.remove("hidden-tile");
    });
    return;
  } else if (target.classList.contains("active")) {
    allTasks.forEach((el) => {
      if (el.classList.contains("task-tile--completed")) {
        el.classList.add("hidden-tile");
      } else if (el.classList.contains("task-tile--not-completed")) {
        el.classList.remove("hidden-tile");
      }
    });
  } else if (target.classList.contains("completed")) {
    allTasks.forEach((el) => {
      if (el.classList.contains("task-tile--not-completed")) {
        el.classList.add("hidden-tile");
      } else if (el.classList.contains("task-tile--completed")) {
        el.classList.remove("hidden-tile");
      }
    });
  } else return;
});
