const {
    taskController
} = require('./taskController');

/*
    TODO: 1. sanitize input fields;
          2. markdown input;
 */

let displayController = (function () {
    const headerAddTaskBtn = document.querySelector("#headerAddTaskBtn");
    const mainPanelAddTaskBtn = document.querySelector('#mainPanelAddTaskBtn');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    const taskPanel = document.querySelector('#taskPanel');
    const taskAddTimeBtn = document.querySelector('#taskAddTimeBtn');
    const hideTaskAddTimeBtn = document.querySelector('#hideTaskAddTimeBtn');
    const taskAddTimeBar = document.querySelector('#taskAddTimeBtn + div');

    if (taskAddTimeBar) {
        const today = new Date();
        taskAddTimeBar.querySelector('input[type="date"]').min =
            `${today.getFullYear()}-${today.getMonth() <= 8 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)}-${today.getDate()}`;
    }

    const taskAddCategoryBtn = document.querySelector('#taskAddCategoryBtn');
    const hideTaskAddCategoryBtn = document.querySelector('#hideTaskAddCategoryBtn');
    const taskAddCategoryBar = document.querySelector('#taskAddCategoryBtn + div');
    const taskForm = document.querySelector('#taskForm');
    const taskWrapper = document.querySelector('#taskWrapper');

    const morePanel = document.querySelector('#morePanel');

    const addCategoryBtn = document.querySelector('#addCategoryBtn');
    const addCategoryPanel = document.querySelector('#addCategoryBtn + div');
    const hideAddCategoryBtn = document.querySelector('#hideAddCategoryBtn');
    const newCategoryForm = document.querySelector('#newCategoryForm');
    const newCategoryLabel = document.querySelector('#newCategoryLabel');
    const categoryWrapper = document.querySelector('#categoryWrapper');

    const counterDots = {
        'headerUncompleted': document.querySelector('.header--btns__uncompleted--dot'),
        'sidePanelAllTasks': document.querySelector('#allTasksCounter'),
        'sidePanelTodayTasks': document.querySelector('#todayTasksCounter'),
        'sidePanelNextSevenDays': document.querySelector('#nextDaysTasksCounter')
    }

    function showAddTimeBar(e) {
        hideTaskAddTimeBtn.addEventListener('click', hideAddTimeBar);
        taskAddTimeBtn.classList.add('hidden');
        taskAddTimeBar.classList.remove('hidden');
    }

    function hideAddTimeBar(e) {
        taskAddTimeBtn.classList.remove('hidden');
        taskAddTimeBar.classList.add('hidden');
        taskForm.querySelector('#taskCategory').value = '';
        taskForm.querySelector('#taskTime').value = '';
    }

    function showAddCategoryBar(e) {
        hideTaskAddCategoryBtn.addEventListener('click', hideAddCategoryBar);
        taskController.fillDropdownWithCategories(taskForm.querySelector('#taskCategory'));
        taskAddCategoryBtn.classList.add('hidden');
        taskAddCategoryBar.classList.remove('hidden');
    }

    function hideAddCategoryBar(e) {
        taskAddCategoryBtn.classList.remove('hidden');
        taskAddCategoryBar.classList.add('hidden');
    }

    function showTaskPanel(e, title, btnText, handleFn, index) {
        showPanels(e);
        e.preventDefault();

        taskPanel.classList.remove('hidden');
        taskPanel.querySelector('.modal--title').innerText = title;
        taskPanel.querySelector('#taskSubmitBtn').innerText = btnText;

        taskForm.removeEventListener('submit', handleAddTask);
        taskForm.removeEventListener('submit', handleEditTask);
        taskForm.addEventListener('submit', handleFn);
        taskForm.dataset['postindex'] = index;
        document.activeElement.blur();
    }

    function resetFormDisplay(e) {
        taskForm.reset();
        taskForm.querySelector('.modal--form__title--error').classList.add('hidden');
    }

    function hideTaskPanel(e) {
        taskPanel.classList.add('hidden');
        hideAddTimeBar();
        hideAddCategoryBar();
        resetFormDisplay();
    }

    function showPanels(e) {
        overlay.classList.add('active');
        modal.classList.add('active');
    }

    function hidePanels(e) {
        if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Escape')) {
            overlay.classList.remove('active');
            modal.classList.remove('active');
            setTimeout(() => {
                hideTaskPanel();
                hideTaskMore();
            }, 200);
        }
    }

    function getFormData(form) {
        const formElements = form.elements;
        const formData = {
            'title': formElements[0].value,
            'note': formElements[1].value,
            'dueTime': formElements[3].value,
            'category': {
                'name': formElements[5].value
            }
        };

        return formData;
    }

    function populateTaskDom() {
        const taskDOMs = taskController.createTaskDoms();
        taskWrapper.innerHTML = '';

        Object.keys(taskDOMs).forEach((time) => {
            if (taskDOMs[time] !== '') {
                taskWrapper.innerHTML += `
                    <section class="main-panel--days">
                        <h2>${time}</h2>
                    </section>
                    <section class="main-panel--tasks">
                        <ul class="main-panel--tasks__list">
                            ${taskDOMs[time]}
                        </ul>
                    </section>
                `;
            }
        });

        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--info'), 'click', showTaskInfo);
        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--title > input[type="checkbox"]'), 'change', changeTaskDoneness);
        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--dropdown__edit'), 'click', editTask);
        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--dropdown__delete'), 'click', deleteTask);
        setCounterDots();
    }

    function setCounterDots() {
        counterDots['headerUncompleted'].innerText = taskController.getUncompletedTasksLength();

        const dueTasks = taskController.getDueTasks();
        counterDots['sidePanelAllTasks'].innerText = (dueTasks.today + dueTasks.tomorrow + dueTasks.nextSevenDays + dueTasks.untimed);
        counterDots['sidePanelTodayTasks'].innerText = dueTasks.today;
        counterDots['sidePanelNextSevenDays'].innerText = dueTasks.nextSevenDays;
    }

    function addListenersToElements(elements, event, fnHandler) {
        elements.forEach((elem) => {
            elem.addEventListener(event, fnHandler);
        });
    }

    function showTaskInfo(e) {
        taskController.fillInfoPanelWithData(this.dataset['postindex'], morePanel);
        showPanels(e);

        morePanel.classList.remove('hidden');

        document.activeElement.blur();
    }

    function hideTaskMore(e) {
        morePanel.classList.add('hidden');
    }

    function changeTaskDoneness(e) {
        taskController.changeTaskDoneness(this.dataset['postindex']);
        setCounterDots();
    }

    function deleteTask(e) {
        taskController.deleteTaskById(this.dataset['postindex']);
        populateTaskDom(e);
    }

    function addTask(e) {
        taskAddTimeBtn.addEventListener('click', showAddTimeBar);
        taskAddCategoryBtn.addEventListener('click', showAddCategoryBar);
        showTaskPanel(e, 'Add a task', 'Create task', handleAddTask, -1);
    }

    function handleAddTask(e) {
        e.preventDefault();
        const data = getFormData(this);

        if (isFormValid(this, data)) {
            taskController.createTask(data);
            hidePanels({
                'type': 'click'
            });
            populateTaskDom();
        }

        document.activeElement.blur();
    }

    function editTask(e) {
        taskController.fillEditPanelWithData(this.dataset['postindex'], taskPanel);

        if (taskPanel.querySelector('#taskCategory').value) {
            showAddCategoryBar(e);
        } else {
            taskAddCategoryBtn.addEventListener('click', showAddCategoryBar);
        }

        if (taskPanel.querySelector('#taskTime').value) {
            showAddTimeBar(e);
        } else {
            taskAddTimeBtn.addEventListener('click', showAddTimeBar);
        }

        showTaskPanel(e, 'Edit a task', 'Finalize task', handleEditTask, this.dataset['postindex']);
    }

    function handleEditTask(e) {
        e.preventDefault();
        const data = getFormData(this);

        if (isFormValid(this, data)) {
            taskController.editTask(this.dataset['postindex'], data);

            hidePanels({
                'type': 'click'
            });
            populateTaskDom();
        }

        document.activeElement.blur();
    }

    function isFormValid(form, data) {
        if (!data['title']) {
            form.querySelector('.modal--form__title--error').classList.remove('hidden');
            return false;
        }

        return true;
    }

    function addCategory(e) {
        e.preventDefault();

        if (newCategoryLabel.value) {
            taskController.createCategory(newCategoryLabel.value);
        }

        hideAddCategoryPanel();
        populateCategoryDom();
    }

    function showAddCategoryPanel(e) {
        document.activeElement.blur();
        addCategoryPanel.classList.remove('hidden');
    }

    function hideAddCategoryPanel(e) {
        addCategoryPanel.classList.add('hidden');
        newCategoryLabel.value = '';
    }

    function populateCategoryDom() {
        categoryWrapper.innerHTML = taskController.createCategoryDoms();
    }

    populateTaskDom();
    populateCategoryDom();

    headerAddTaskBtn.addEventListener('click', addTask);
    mainPanelAddTaskBtn.addEventListener('click', addTask);

    addCategoryBtn.addEventListener('click', showAddCategoryPanel);
    hideAddCategoryBtn.addEventListener('click', hideAddCategoryPanel);
    newCategoryForm.addEventListener('submit', addCategory);

    overlay.addEventListener('click', hidePanels);
    document.addEventListener('keydown', hidePanels);

    return {};
}());

module.exports = {
    displayController
};