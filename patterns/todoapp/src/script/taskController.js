let taskController = (function () {
    const colors = ['#ee5253', '#feca57', '#00d2d3', '#222f3e', '#341f97', '#2e86de', '#ff9f43'];
    const COLOR_MAIN = "#70a1ff";
    let tasks = [];
    let categories = {};

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
            this.category = categories[category.name];
            this.isDone = false;
        }
    }

    function createTask(data) {
        const {
            title,
            note,
            dueTime,
            category
        } = data;

        tasks.push(new Task(title, note, dueTime, category));
    }

    function createCategory(name) {
        categories[name] = new Category(colors[(Math.floor(Math.random() * (colors.length)))], name);
    }

    function editTask(index, data) {
        Object.keys(data).forEach((key) => {
            if (key !== 'category') {
                tasks[index][key] = data[key];
            } else {
                tasks[index][key] = new Category(data[key]['color'], data[key]['name']);
            }
        });
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
							<label class="main-panel--tasks__item--circle" 
							       style="border-color: ${task.category ? task.category.color : COLOR_MAIN}" for="task${i}">&nbsp</label>
							<label class="main-panel--tasks__item--text" for="task${i}">${task.title}</label>
						</div>
						<div>
                            <span class="main-panel--tasks__item--duetime">${task.dueTime === '' ? '' : 'Due ' + task.dueTime}</span>
                            <div class="main-panel--tasks__item--category">
                                <span style="background-color: ${task.category ? task.category.color : COLOR_MAIN}">&nbsp;</span>
                                <span>${task.category ? task.category.name : 'Uncategorized'}</span>
                            </div>
                            <button class="main-panel--tasks__item--info" data-postindex="${i}">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            </button>
                            <div class="main-panel--tasks__item--dropdown">
                                <button class="main-panel--tasks__item--more" disabled>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                                </button>
                                <ul class="main-panel--tasks__item--dropdown__list">
                                    <li class="main-panel--tasks__item--dropdown__item">
                                        <button button type = "button" class="main-panel--tasks__item--dropdown__edit" data-postindex = "${i}">
                                            <svg class="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                            </svg>
                                            Edit
                                        </button>
                                    </li>
                                    <li class="main-panel--tasks__item--dropdown__item">
                                        <button type="button" class="main-panel--tasks__item--dropdown__delete" data-postindex="${i}">
                                            <svg class="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                </path>
                                            </svg>
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
					</li>
                `;

            if (task.dueTime) {
                const t = new Date(task.dueTime)

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
            'Today': today,
            'Tomorrow': tomorrow,
            'Next 7 Days': nextSevenDays,
            'Untimed': untimed
        };
    }

    function createCategoryDoms() {
        let domElements = '';

        Object.keys(categories).forEach((category) => {
            domElements += `
                <li class="side-panel--category">
                    <button class="side-panel--category__title">
                        <span style="background-color: ${categories[category].color}">&nbsp;</span>
                        ${categories[category].name}
                    </button>
                </li>
            `;
        });

        return domElements;
    }

    function listTasks() {
        console.log(tasks);
    }

    function fillInfoPanelWithData(index, panel) {
        panel.querySelector('.modal--task__title').innerText = tasks[index].title;
        panel.querySelector('.modal--task__description').innerText = tasks[index].note;
        panel.querySelector('.modal--task__bar--duetime').innerText = tasks[index].dueTime !== '' ? tasks[index].dueTime : 'No due time';
        panel.querySelector('.modal--task__bar--category').innerText = tasks[index].category ? tasks[index].category.name : 'Uncategorized';
    }

    function fillEditPanelWithData(index, panel) {
        panel.querySelector('#taskTitle').value = tasks[index]['title'];
        
        if (tasks[index]['note']) {
            panel.querySelector('#taskNote').value = tasks[index]['note'];
        }

        if (tasks[index]['dueTime']) {
            panel.querySelector('#taskTime').value = tasks[index]['dueTime'];
        }

        if (tasks[index]['category']) {
            panel.querySelector('#taskCategory').value = tasks[index]['category']['name'];
        }
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

    function deleteTaskById(id) {
        tasks.splice(id, 1);
    }

    function fillDropdownWithCategories(dropdown) {
        dropdown.innerHTML = '';

        if (Object.keys(categories).length !== 0) {
            Object.keys(categories).forEach((category) => {
                dropdown.innerHTML += `
                    <option value="${categories[category].name}">${categories[category].name}</option>
                `;
            });
        } else {
            dropdown.innerHTML = '<option value="" selected disabled>No categories available</option>';
        }
    }

    return {
        createTask,
        editTask,
        createTaskDoms,
        fillInfoPanelWithData,
        fillEditPanelWithData,
        changeTaskDoneness,
        getUncompletedTasksLength,
        getDueTasks,
        deleteTaskById,
        createCategory,
        createCategoryDoms,
        fillDropdownWithCategories
    };
}());

module.exports = {
    taskController
};