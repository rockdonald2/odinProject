const {
    taskController
} = require('./taskController');

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

    const menuFilters = [document.querySelector('#todayTasksFilter'), document.querySelector('#allTasksFilter'), document.querySelector('#next7DaysTasksFilter'), document.querySelector('#archivedTasksFilter'), document.querySelector('.header--btns__uncompleted'), document.querySelector('.header--btns__archive')];
    let categoryFilters = [];
    const counterDots = [document.querySelector('.header--btns__uncompleted--dot'), document.querySelector('#allTasksCounter'), document.querySelector('#todayTasksCounter'), document.querySelector('#nextDaysTasksCounter')];

    let currentFilter = 'All&&';

    const popup = document.querySelector('.popup');
    let popupTimeoutId = null;

    const searchInput = document.querySelector('#searchInput');

    function showAddTimeBar(e) {
        hideTaskAddTimeBtn.addEventListener('click', hideAddTimeBar);
        taskAddTimeBtn.classList.add('hidden');
        taskAddTimeBar.classList.remove('hidden');
    }

    function hideAddTimeBar(e) {
        taskAddTimeBtn.classList.remove('hidden');
        taskAddTimeBar.classList.add('hidden');
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
        taskForm.querySelector('#taskCategory').value = '';
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
                'name': formElements[6].value
            }
        };

        return formData;
    }

    function populateTaskDom() {
        let taskDOMs = taskController.createTaskDoms(currentFilter);
        taskWrapper.innerHTML = '';

        Object.keys(taskDOMs).forEach((tag) => {
            if (taskDOMs[tag] !== '') {
                taskWrapper.innerHTML += `
                    <section class="main-panel--days">
                        <h2>${tag}</h2>
                    </section>
                    <section class="main-panel--tasks">
                        <ul class="main-panel--tasks__list">
                            ${taskDOMs[tag]}
                        </ul>
                    </section>
                `;
            }
        });

        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--info'), 'click', showTaskInfo);
        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--title > input[type="checkbox"]'), 'change', changeTaskDoneness);
        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--dropdown__edit'), 'click', editTask);
        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--dropdown__archive'), 'click', archiveTask);
        addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--dropdown__delete'), 'click', deleteTask);
        setCounterDots();
    }

    function setCounterDots() {
        const dueTasksCounters = taskController.getDueTasksCounters();

        counterDots.forEach((counter) => {
            counter.innerText = dueTasksCounters[counter.dataset['counter']];
        });
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

    function archiveTask(e) {
        taskController.archiveTaskById(this.dataset['postindex']);
        populateTaskDom(e);
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
        addListenersToElements(menuFilters, 'click', filterDOM);
        addListenersToElements(categoryWrapper.querySelectorAll('.side-panel--category__title'), 'click', filterDOM);
        addListenersToElements(categoryWrapper.querySelectorAll('.side-panel--category__del'), 'click', deleteCategory);
    }

    function deleteCategory() {
        taskController.deleteCategoryByName(this.dataset['category']);
        populateCategoryDom();
        populateTaskDom();
    }

    function initialLoad() {
        taskController.loadFromLocalStorage();
        populateCategoryDom();
        populateTaskDom();
    }

    function filterDOM() {
        let tmpFilter = currentFilter.split('&');

        if (this.dataset['filtertype'] === 'menu') {
            document.querySelector('.side-panel--menu').querySelector('.active').classList.remove('active');
            this.classList.add('active');

            if (this.dataset['filter'] !== currentFilter.split('&')[0]) {
                tmpFilter[0] = this.dataset['filter'];
            } else {
                tmpFilter[0] = 'All';
            }
        } else if (this.dataset['filtertype'] === 'category') {
            if (this.dataset['filter'] !== currentFilter.split('&')[1]) {
                tmpFilter[1] = this.dataset['filter'];
            } else {
                tmpFilter[1] = '';
            }
        }

        currentFilter = tmpFilter.join('&');

        if (tmpFilter[1] !== '') {
            showPopUp('Current filters: ' + tmpFilter[0] + ', ' + tmpFilter[1]);
        } else {
            showPopUp('Current filter: ' + tmpFilter[0]);
        }

        populateTaskDom();
    }

    function showPopUp(msg) {
        clearTimeout(popupTimeoutId);
        popup.querySelector('#popupMsg').innerText = msg;
        popup.classList.add('show');
        popupTimeoutId = setTimeout(() => {
            hidePopup();
        }, 3000);
    }

    function hidePopup() {
        popup.classList.remove('show');
    }

    function searchTask(e) {
        let tmpFilter = currentFilter.split('&');
        tmpFilter[2] = this.value;
        currentFilter = tmpFilter.join('&');
        populateTaskDom();
    }

    headerAddTaskBtn.addEventListener('click', addTask);
    mainPanelAddTaskBtn.addEventListener('click', addTask);

    addCategoryBtn.addEventListener('click', showAddCategoryPanel);
    hideAddCategoryBtn.addEventListener('click', hideAddCategoryPanel);
    newCategoryForm.addEventListener('submit', addCategory);

    overlay.addEventListener('click', hidePanels);
    document.addEventListener('keydown', hidePanels);

    searchInput.addEventListener('input', searchTask);

    return {
        initialLoad
    };
}());

module.exports = {
    displayController
};