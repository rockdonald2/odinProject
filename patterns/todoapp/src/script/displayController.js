const { taskController } = require('./taskController'); 

let displayController = (function () {
    const headerAddTaskBtn = document.querySelector("#headerAddTaskBtn");
    const mainPanelAddTaskBtn = document.querySelector('#mainPanelAddTaskBtn');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    const addTaskPanel = document.querySelector('#addTaskPanel');
    const taskAddTimeBtn = document.querySelector('#taskAddTimeBtn');
    const taskAddTimeBar = document.querySelector('#taskAddTimeBtn + div');

    if (taskAddTimeBar) {
        const today = new Date();
        taskAddTimeBar.querySelector('input[type="date"]').min = 
            `${today.getFullYear()}-${today.getMonth() <= 8 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)}-${today.getDate()}`;
    }

    const taskAddCategoryBtn = document.querySelector('#taskAddCategoryBtn');
    const taskAddCategoryBar = document.querySelector('#taskAddCategoryBtn + div');
    const addTaskForm = document.querySelector('#addTaskForm');
    const taskWrapper = document.querySelector('#taskWrapper');

    const morePanel = document.querySelector('#morePanel');

    const counterDots = {
        'headerUncompleted': document.querySelector('.header--btns__uncompleted--dot'),
        'sidePanelAllTasks': document.querySelector('#allTasksCounter'),
        'sidePanelTodayTasks': document.querySelector('#todayTasksCounter'),
        'sidePanelNextSevenDays': document.querySelector('#nextDaysTasksCounter')
    }

    function showAddTimeBar(e) {
        taskAddTimeBtn.classList.add('hidden');
        taskAddTimeBar.classList.remove('hidden');
    }

    function hideAddTimeBar(e) {
        taskAddTimeBtn.classList.remove('hidden');
        taskAddTimeBar.classList.add('hidden');
    }

    function showAddCategoryBar(e) {
        taskAddCategoryBtn.classList.add('hidden');
        taskAddCategoryBar.classList.remove('hidden');
    }

    function hideAddCategoryBar(e) {
        taskAddCategoryBtn.classList.remove('hidden');
        taskAddCategoryBar.classList.add('hidden');
    }

    function showAddTaskPanel(e) {
        showPanels(e);
        e.preventDefault();

        addTaskPanel.classList.remove('hidden');
        taskAddTimeBtn.addEventListener('click', showAddTimeBar);
        taskAddCategoryBtn.addEventListener('click', showAddCategoryBar);

        document.activeElement.blur();
    }

    function resetFormDisplay(e) {
        addTaskForm.reset();
    }   

    function hideAddTaskPanel(e) {
        addTaskPanel.classList.add('hidden');
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
                hideAddTaskPanel();
                hideTaskMore();
            }, 200);
        }
    }

    function handleTaskSubmit(e) {
        e.preventDefault();

        const formData = this.elements;
        taskController.createTask(
            {'title': formData[0].value, 'note': formData[1].value, 
            'dueTime': formData[3].value, 'category': {'color': formData[5].value, 'name': formData[6].value}}
        );

        hidePanels({'type': 'click'});
        populateTaskDom();
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

        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--more'), 'click', showTaskMore);
        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--title > input[type="checkbox"]'), 'change', changeTaskDoneness);
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

    function showTaskMore(e) {
        taskController.fillPanelWithData(this.dataset['postindex'], morePanel);
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

    populateTaskDom();

    headerAddTaskBtn.addEventListener('click', showAddTaskPanel);
    mainPanelAddTaskBtn.addEventListener('click', showAddTaskPanel);
    addTaskForm.addEventListener('submit', handleTaskSubmit);

    overlay.addEventListener('click', hidePanels);
    document.addEventListener('keydown', hidePanels);

    return {};
}());

module.exports = {displayController};