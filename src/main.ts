import "./style.css";

interface Tasks {
  task: string;
  id: number;
  strikethru?: boolean;
}
let tasksArr: Tasks[] = [];

const btnSubmit = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;

const remove = (id: number): void => {
  tasksArr = tasksArr.filter((el) => el.id !== id);
  appendFunc(tasksArr);
};

const strike = (id: number): void => {
  tasksArr = tasksArr.map((el) => {
    if (el.id === id) {
      return { ...el, strikethru: !el.strikethru };
    }
    return el;
  });
  appendFunc(tasksArr);
};

const appendFunc = (tasksArr: Tasks[]): void => {
  const taskdiv = document.querySelector(".taskdiv") as HTMLDivElement;
  if (taskdiv) {
    taskdiv.innerHTML = "";
    tasksArr.forEach((t) => {
      const tdiv = document.createElement("div");
      tdiv.setAttribute("id", `${t.id}`);
      tdiv.setAttribute("class", "tdiv");
      const h3 = document.createElement("h3");
      const btn = document.createElement("button");
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      btn.innerText = "X";
      h3.innerText = t.task;
      taskdiv.appendChild(tdiv);
      tdiv.appendChild(input);
      tdiv.appendChild(h3);
      tdiv.appendChild(btn);
      btn.addEventListener("click", () => {
        remove(t.id);
      });
      input.addEventListener("click", () => {
        h3.style.textDecoration = "line-through";
        strike(t.id);
      });
      if (t.strikethru) {
        h3.style.textDecoration = "line-through";
        input.checked = true;
      } else {
        h3.style.textDecoration = "none";
        input.checked = false;
      }
    });
  }
};

btnSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  tasksArr.push({
    task: input.value,
    id: Math.floor(Math.random() * 1000 + 1),
    strikethru: false,
  });
  appendFunc(tasksArr);
  input.value = "";
});
