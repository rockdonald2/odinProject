let taskController = (function () {
    class Category {
        constructor(color, name) {
            this.color = color;
            this.name = name;
        }
    }

    class Task {
        constructor(title, note, dueTime, category) {
            this.title = title;
            this.note = note;
            this.dueTime = dueTime;
            this.category = new Category(category.color, category.name);
            this.isDone = false;
        }
    }

    let tasks = [new Task('Tea with Jacob', 'With some notes as well.', '2021-02-25', {color: '#dddddd', name: 'Personal'})]; 

    function createTask(data) {
        const {
            title,
            note,
            dueTime,
            category
        } = data;

        tasks.push(new Task(title, note, dueTime, category));
    }

    function createTaskDoms() {
        let untimed = "";
        let today = "";
        let tomorrow = "";
        let nextSevenDays = "";

        const dateToday = new Date;
        const msPerDay = 24 * 60 * 60 * 1000;

        tasks.forEach((task, i) => {
            const taskDom = `
                    <li class="main-panel--tasks__item">
						<div div class = "main-panel--tasks__item--title" >
							<input type="checkbox" data-postindex="${i}" id="task${i}" ${task.isDone ? 'checked' : ''}>
							<label class="main-panel--tasks__item--circle" style="border-color: ${task.category.color}" for="task${i}">&nbsp</label>
							<label class="main-panel--tasks__item--text" for="task${i}">${task.title}</label>
						</div>
						<span class="main-panel--tasks__item--duetime">${task.dueTime === '' ? '' : 'Due ' + task.dueTime}</span>
						<button class="main-panel--tasks__item--more" data-postindex="${i}">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
						</button>
						<div class="main-panel--tasks__item--category">
							<span style="background-color: ${task.category.color}">&nbsp;</span>
							<span>${task.category.name !== '' ? task.category.name : 'Uncategorized'}</span>
						</div>
					</li>
                `;

            if (task.dueTime) {
                const t = new Date(task.duetime)

                if ((t - dateToday) / msPerDay === 0) {
                    today += taskDom;
                } else if ((t - dateToday) / msPerDay === 1) {
                    tomorrow += taskDom;
                } else {
                    nextSevenDays += taskDom;
                }
            } else {
                untimed += taskDom;
            }
        });

        return {
            'Today': today, 'Tomorrow': tomorrow, 'Next Seven Days': nextSevenDays, 'Untimed': untimed
        };
    }

    function listTasks() {
        console.log(tasks);
    }

    function fillPanelWithData(index, panel) {
        panel.querySelector('.modal--task__title').innerText = tasks[index].title;
        panel.querySelector('.modal--task__description').innerText = tasks[index].note;
        panel.querySelector('.modal--task__bar--duetime').innerText = tasks[index].dueTime !== '' ? tasks[index].dueTime : 'No due time';
        panel.querySelector('.modal--task__bar--category').innerText = tasks[index].category.name !== '' ? tasks[index].category.name : 'Uncategorized';
    }

    function changeTaskDoneness(index) {
        tasks[index].isDone = !tasks[index].isDone;
    }

    function getUncompletedTasksLength() {
        return tasks.filter((task) => !task.isDone).length;
    }

    function getDueTasks() {
        let counterObj = {
            'today': 0,
            'tomorrow': 0,
            'nextSevenDays': 0,
            'untimed': 0
        };

        const dateToday = new Date;
        const msPerDay = 24 * 60 * 60 * 1000;

        tasks.forEach((task) => {
            if (task.dueTime) {
                const t = new Date(task.duetime)

                if ((t - dateToday) / msPerDay === 0) {
                    counterObj.today += 1;
                } else if ((t - dateToday) / msPerDay === 1) {
                    counterObj.tomorrow += 1;
                } else {
                    counterObj.nextSevenDays += 1;
                }
            } else {
                counterObj.untimed += 1;
            }
        });

        return counterObj;
    }

    return {
        createTask, createTaskDoms, fillPanelWithData, changeTaskDoneness, getUncompletedTasksLength, getDueTasks
    };
}());

module.exports = {taskController};