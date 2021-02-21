/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _script_displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script/displayController */ \"./src/script/displayController.js\");\n/* harmony import */ var _script_displayController__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_script_displayController__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _script_taskController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script/taskController */ \"./src/script/taskController.js\");\n/* harmony import */ var _script_taskController__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_script_taskController__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack://todoapp/./src/index.js?");

/***/ }),

/***/ "./src/script/displayController.js":
/*!*****************************************!*\
  !*** ./src/script/displayController.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! ./taskController */ \"./src/script/taskController.js\"),\n    taskController = _require.taskController;\n\nvar displayController = function () {\n  var headerAddTaskBtn = document.querySelector(\"#headerAddTaskBtn\");\n  var mainPanelAddTaskBtn = document.querySelector('#mainPanelAddTaskBtn');\n  var overlay = document.querySelector('.overlay');\n  var modal = document.querySelector('.modal');\n  var addTaskPanel = document.querySelector('#addTaskPanel');\n  var taskAddTimeBtn = document.querySelector('#taskAddTimeBtn');\n  var taskAddTimeBar = document.querySelector('#taskAddTimeBtn + div');\n\n  if (taskAddTimeBar) {\n    var today = new Date();\n    taskAddTimeBar.querySelector('input[type=\"date\"]').min = \"\".concat(today.getFullYear(), \"-\").concat(today.getMonth() <= 8 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1, \"-\").concat(today.getDate());\n  }\n\n  var taskAddCategoryBtn = document.querySelector('#taskAddCategoryBtn');\n  var taskAddCategoryBar = document.querySelector('#taskAddCategoryBtn + div');\n  var addTaskForm = document.querySelector('#addTaskForm');\n  var taskWrapper = document.querySelector('#taskWrapper');\n  var morePanel = document.querySelector('#morePanel');\n  var counterDots = {\n    'headerUncompleted': document.querySelector('.header--btns__uncompleted--dot'),\n    'sidePanelAllTasks': document.querySelector('#allTasksCounter'),\n    'sidePanelTodayTasks': document.querySelector('#todayTasksCounter'),\n    'sidePanelNextSevenDays': document.querySelector('#nextDaysTasksCounter')\n  };\n\n  function showAddTimeBar(e) {\n    taskAddTimeBtn.classList.add('hidden');\n    taskAddTimeBar.classList.remove('hidden');\n  }\n\n  function hideAddTimeBar(e) {\n    taskAddTimeBtn.classList.remove('hidden');\n    taskAddTimeBar.classList.add('hidden');\n  }\n\n  function showAddCategoryBar(e) {\n    taskAddCategoryBtn.classList.add('hidden');\n    taskAddCategoryBar.classList.remove('hidden');\n  }\n\n  function hideAddCategoryBar(e) {\n    taskAddCategoryBtn.classList.remove('hidden');\n    taskAddCategoryBar.classList.add('hidden');\n  }\n\n  function showAddTaskPanel(e) {\n    showPanels(e);\n    e.preventDefault();\n    addTaskPanel.classList.remove('hidden');\n    taskAddTimeBtn.addEventListener('click', showAddTimeBar);\n    taskAddCategoryBtn.addEventListener('click', showAddCategoryBar);\n    document.activeElement.blur();\n  }\n\n  function resetFormDisplay(e) {\n    addTaskForm.reset();\n  }\n\n  function hideAddTaskPanel(e) {\n    addTaskPanel.classList.add('hidden');\n    hideAddTimeBar();\n    hideAddCategoryBar();\n    resetFormDisplay();\n  }\n\n  function showPanels(e) {\n    overlay.classList.add('active');\n    modal.classList.add('active');\n  }\n\n  function hidePanels(e) {\n    if (e.type === 'click' || e.type === 'keydown' && e.key === 'Escape') {\n      overlay.classList.remove('active');\n      modal.classList.remove('active');\n      setTimeout(function () {\n        hideAddTaskPanel();\n        hideTaskMore();\n      }, 200);\n    }\n  }\n\n  function handleTaskSubmit(e) {\n    e.preventDefault();\n    var formData = this.elements;\n    taskController.createTask({\n      'title': formData[0].value,\n      'note': formData[1].value,\n      'dueTime': formData[3].value,\n      'category': {\n        'color': formData[5].value,\n        'name': formData[6].value\n      }\n    });\n    hidePanels({\n      'type': 'click'\n    });\n    populateTaskDom();\n  }\n\n  function populateTaskDom() {\n    var taskDOMs = taskController.createTaskDoms();\n    taskWrapper.innerHTML = '';\n    Object.keys(taskDOMs).forEach(function (time) {\n      if (taskDOMs[time] !== '') {\n        taskWrapper.innerHTML += \"\\n                    <section class=\\\"main-panel--days\\\">\\n                        <h2>\".concat(time, \"</h2>\\n                    </section>\\n                    <section class=\\\"main-panel--tasks\\\">\\n                        <ul class=\\\"main-panel--tasks__list\\\">\\n                            \").concat(taskDOMs[time], \"\\n                        </ul>\\n                    </section>\\n                \");\n      }\n    });\n    addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--more'), 'click', showTaskMore);\n    addListenersToElements(document.querySelectorAll('.main-panel--tasks__item--title > input[type=\"checkbox\"]'), 'change', changeTaskDoneness);\n    setCounterDots();\n  }\n\n  function setCounterDots() {\n    counterDots['headerUncompleted'].innerText = taskController.getUncompletedTasksLength();\n    var dueTasks = taskController.getDueTasks();\n    counterDots['sidePanelAllTasks'].innerText = dueTasks.today + dueTasks.tomorrow + dueTasks.nextSevenDays + dueTasks.untimed;\n    counterDots['sidePanelTodayTasks'].innerText = dueTasks.today;\n    counterDots['sidePanelNextSevenDays'].innerText = dueTasks.nextSevenDays;\n  }\n\n  function addListenersToElements(elements, event, fnHandler) {\n    elements.forEach(function (elem) {\n      elem.addEventListener(event, fnHandler);\n    });\n  }\n\n  function showTaskMore(e) {\n    taskController.fillPanelWithData(this.dataset['postindex'], morePanel);\n    showPanels(e);\n    morePanel.classList.remove('hidden');\n    document.activeElement.blur();\n  }\n\n  function hideTaskMore(e) {\n    morePanel.classList.add('hidden');\n  }\n\n  function changeTaskDoneness(e) {\n    taskController.changeTaskDoneness(this.dataset['postindex']);\n    setCounterDots();\n  }\n\n  populateTaskDom();\n  headerAddTaskBtn.addEventListener('click', showAddTaskPanel);\n  mainPanelAddTaskBtn.addEventListener('click', showAddTaskPanel);\n  addTaskForm.addEventListener('submit', handleTaskSubmit);\n  overlay.addEventListener('click', hidePanels);\n  document.addEventListener('keydown', hidePanels);\n  return {};\n}();\n\nmodule.exports = {\n  displayController: displayController\n};\n\n//# sourceURL=webpack://todoapp/./src/script/displayController.js?");

/***/ }),

/***/ "./src/script/taskController.js":
/*!**************************************!*\
  !*** ./src/script/taskController.js ***!
  \**************************************/
/***/ ((module) => {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar taskController = function () {\n  var Category = function Category(color, name) {\n    _classCallCheck(this, Category);\n\n    this.color = color;\n    this.name = name;\n  };\n\n  var Task = function Task(title, note, dueTime, category) {\n    _classCallCheck(this, Task);\n\n    this.title = title;\n    this.note = note;\n    this.dueTime = dueTime;\n    this.category = new Category(category.color, category.name);\n    this.isDone = false;\n  };\n\n  var tasks = [new Task('Tea with Jacob', 'With some notes as well.', '2021-02-25', {\n    color: '#dddddd',\n    name: 'Personal'\n  })];\n\n  function createTask(data) {\n    var title = data.title,\n        note = data.note,\n        dueTime = data.dueTime,\n        category = data.category;\n    tasks.push(new Task(title, note, dueTime, category));\n  }\n\n  function createTaskDoms() {\n    var untimed = \"\";\n    var today = \"\";\n    var tomorrow = \"\";\n    var nextSevenDays = \"\";\n    var dateToday = new Date();\n    var msPerDay = 24 * 60 * 60 * 1000;\n    tasks.forEach(function (task, i) {\n      var taskDom = \"\\n                    <li class=\\\"main-panel--tasks__item\\\">\\n\\t\\t\\t\\t\\t\\t<div div class = \\\"main-panel--tasks__item--title\\\" >\\n\\t\\t\\t\\t\\t\\t\\t<input type=\\\"checkbox\\\" data-postindex=\\\"\".concat(i, \"\\\" id=\\\"task\").concat(i, \"\\\" \").concat(task.isDone ? 'checked' : '', \">\\n\\t\\t\\t\\t\\t\\t\\t<label class=\\\"main-panel--tasks__item--circle\\\" style=\\\"border-color: \").concat(task.category.color, \"\\\" for=\\\"task\").concat(i, \"\\\">&nbsp</label>\\n\\t\\t\\t\\t\\t\\t\\t<label class=\\\"main-panel--tasks__item--text\\\" for=\\\"task\").concat(i, \"\\\">\").concat(task.title, \"</label>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t<span class=\\\"main-panel--tasks__item--duetime\\\">\").concat(task.dueTime === '' ? '' : 'Due ' + task.dueTime, \"</span>\\n\\t\\t\\t\\t\\t\\t<button class=\\\"main-panel--tasks__item--more\\\" data-postindex=\\\"\").concat(i, \"\\\">\\n\\t\\t\\t\\t\\t\\t\\t<svg class=\\\"w-6 h-6\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" viewBox=\\\"0 0 24 24\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path stroke-linecap=\\\"round\\\" stroke-linejoin=\\\"round\\\" stroke-width=\\\"2\\\" d=\\\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2\\\"></path></svg>\\n\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t<div class=\\\"main-panel--tasks__item--category\\\">\\n\\t\\t\\t\\t\\t\\t\\t<span style=\\\"background-color: \").concat(task.category.color, \"\\\">&nbsp;</span>\\n\\t\\t\\t\\t\\t\\t\\t<span>\").concat(task.category.name !== '' ? task.category.name : 'Uncategorized', \"</span>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</li>\\n                \");\n\n      if (task.dueTime) {\n        var t = new Date(task.duetime);\n\n        if ((t - dateToday) / msPerDay === 0) {\n          today += taskDom;\n        } else if ((t - dateToday) / msPerDay === 1) {\n          tomorrow += taskDom;\n        } else {\n          nextSevenDays += taskDom;\n        }\n      } else {\n        untimed += taskDom;\n      }\n    });\n    return {\n      'Today': today,\n      'Tomorrow': tomorrow,\n      'Next Seven Days': nextSevenDays,\n      'Untimed': untimed\n    };\n  }\n\n  function listTasks() {\n    console.log(tasks);\n  }\n\n  function fillPanelWithData(index, panel) {\n    panel.querySelector('.modal--task__title').innerText = tasks[index].title;\n    panel.querySelector('.modal--task__description').innerText = tasks[index].note;\n    panel.querySelector('.modal--task__bar--duetime').innerText = tasks[index].dueTime !== '' ? tasks[index].dueTime : 'No due time';\n    panel.querySelector('.modal--task__bar--category').innerText = tasks[index].category.name !== '' ? tasks[index].category.name : 'Uncategorized';\n  }\n\n  function changeTaskDoneness(index) {\n    tasks[index].isDone = !tasks[index].isDone;\n  }\n\n  function getUncompletedTasksLength() {\n    return tasks.filter(function (task) {\n      return !task.isDone;\n    }).length;\n  }\n\n  function getDueTasks() {\n    var counterObj = {\n      'today': 0,\n      'tomorrow': 0,\n      'nextSevenDays': 0,\n      'untimed': 0\n    };\n    var dateToday = new Date();\n    var msPerDay = 24 * 60 * 60 * 1000;\n    tasks.forEach(function (task) {\n      if (task.dueTime) {\n        var t = new Date(task.duetime);\n\n        if ((t - dateToday) / msPerDay === 0) {\n          counterObj.today += 1;\n        } else if ((t - dateToday) / msPerDay === 1) {\n          counterObj.tomorrow += 1;\n        } else {\n          counterObj.nextSevenDays += 1;\n        }\n      } else {\n        counterObj.untimed += 1;\n      }\n    });\n    return counterObj;\n  }\n\n  return {\n    createTask: createTask,\n    createTaskDoms: createTaskDoms,\n    fillPanelWithData: fillPanelWithData,\n    changeTaskDoneness: changeTaskDoneness,\n    getUncompletedTasksLength: getUncompletedTasksLength,\n    getDueTasks: getDueTasks\n  };\n}();\n\nmodule.exports = {\n  taskController: taskController\n};\n\n//# sourceURL=webpack://todoapp/./src/script/taskController.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;