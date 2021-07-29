/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Router.ts":
/*!***********************!*\
  !*** ./src/Router.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var _controllers_DashboardController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/DashboardController */ "./src/controllers/DashboardController.ts");
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/LoginController */ "./src/controllers/LoginController.ts");
/* harmony import */ var _controllers_MainController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/MainController */ "./src/controllers/MainController.ts");



class Router {
    constructor() {
        this.mainElement = document.getElementById('main-container');
    }
    /**
     * handleRequest
     */
    handleRequest() {
        console.log('Handling request for: ' + this.getRouter());
        switch (this.getRouter()) {
            case '/login':
                this.swithToLoginView();
                break;
            case '/board':
                this.switchToDashboardView(undefined);
                break;
            default:
                if (this.mainElement) {
                    const mainController = new _controllers_MainController__WEBPACK_IMPORTED_MODULE_2__.MainController(this);
                    this.mainElement.append(mainController.createView());
                }
                break;
        }
    }
    getRouter() {
        const path = window.location.pathname;
        console.log(path);
        return path;
    }
    /**
     * swithToLoginView
     */
    swithToLoginView() {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const loginController = new _controllers_LoginController__WEBPACK_IMPORTED_MODULE_1__.LoginController(this);
            this.mainElement.append(loginController.createView());
        }
    }
    switchToDashboardView(sessionToken) {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const dashboardContoller = new _controllers_DashboardController__WEBPACK_IMPORTED_MODULE_0__.DashboardController(this);
            if (sessionToken) {
                dashboardContoller.setSessionToken(sessionToken);
            }
            this.mainElement.append(dashboardContoller.createView());
        }
    }
}


/***/ }),

/***/ "./src/controllers/BaseController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/BaseController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseController": () => (/* binding */ BaseController)
/* harmony export */ });
class BaseController {
    constructor(router) {
        this.container = document.createElement('div');
        this.router = router;
    }
    createElement(elementType, innerText, action) {
        const element = document.createElement(elementType);
        if (innerText) {
            element.innerText = innerText;
        }
        if (action) {
            element.onclick = action;
        }
        this.container.append(element);
        return element;
    }
    insertBreak() {
        this.createElement('br');
    }
}


/***/ }),

/***/ "./src/controllers/DashboardController.ts":
/*!************************************************!*\
  !*** ./src/controllers/DashboardController.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardController": () => (/* binding */ DashboardController)
/* harmony export */ });
/* harmony import */ var _models_authModels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/authModels */ "./src/models/authModels.ts");
/* harmony import */ var _services_DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/DataService */ "./src/services/DataService.ts");
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class DashboardController extends _BaseController__WEBPACK_IMPORTED_MODULE_2__.BaseController {
    constructor() {
        super(...arguments);
        this.dataService = new _services_DataService__WEBPACK_IMPORTED_MODULE_1__.DataService();
    }
    /**
     * setSessionToken
     */
    setSessionToken(sessionToken) {
        this.sessionToken = sessionToken;
    }
    /**
     * createView
     */
    createView() {
        const title = this.createElement('h2', 'Dashboard controller');
        if (this.sessionToken) {
            this.createElement('label', `welcome ${this.sessionToken.username}`);
            this.insertBreak();
            this.generateButtons();
        }
        else {
            this.createElement('label', 'please go to the public parts of the app!');
        }
        return this.container;
    }
    generateButtons() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sessionToken) {
                console.log(this.sessionToken);
                yield this.sessionToken['accessRights'].forEach(access => this.createElement('button', _models_authModels__WEBPACK_IMPORTED_MODULE_0__.AccessRight[access], () => __awaiter(this, void 0, void 0, function* () {
                    yield this.triggerAction(access);
                })));
                if (this.sessionToken.accessRights.includes(_models_authModels__WEBPACK_IMPORTED_MODULE_0__.AccessRight.READ)) {
                    this.insertBreak();
                    this.createElement('label', 'search:');
                    this.searchArea = this.createElement('input');
                    this.searchResultArea = this.createElement('div');
                }
            }
        });
    }
    triggerAction(access) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`clicked ${access}`);
            switch (access) {
                case _models_authModels__WEBPACK_IMPORTED_MODULE_0__.AccessRight.READ:
                    const users = yield this.dataService.getUsers(this.sessionToken.tokenId, this.searchArea.value);
                    users.map((user) => {
                        const label = this.createElement('label', JSON.stringify(user));
                        label.onclick = () => {
                            label.classList.toggle('selectedLabel');
                            this.selectedUser = user;
                            this.selectedLabel = label;
                        };
                        this.searchResultArea.append(label);
                        this.searchResultArea.append(document.createElement('br'));
                    });
                    break;
                case _models_authModels__WEBPACK_IMPORTED_MODULE_0__.AccessRight.DELETE:
                    if (this.selectedUser) {
                        this.dataService.deleteUser(this.sessionToken.tokenId, this.selectedUser);
                        this.selectedLabel.innerHTML = '';
                    }
                    break;
                default:
                    break;
            }
        });
    }
}


/***/ }),

/***/ "./src/controllers/Decorators.ts":
/*!***************************************!*\
  !*** ./src/controllers/Decorators.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkTextValue": () => (/* binding */ LinkTextValue)
/* harmony export */ });
function LinkTextValue(elementId) {
    return function (target, key) {
        let property = target[key];
        const getter = () => {
            return property;
        };
        const setter = (newValue) => {
            const element = document.getElementById('elementId');
            property = newValue;
            if (element) {
                element.innerText = newValue;
                if (!newValue) {
                    element.style.visibility = 'visible';
                }
                else {
                    element.style.visibility = 'hidden';
                }
            }
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            configurable: true
        });
    };
}


/***/ }),

/***/ "./src/controllers/LoginController.ts":
/*!********************************************!*\
  !*** ./src/controllers/LoginController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginController": () => (/* binding */ LoginController)
/* harmony export */ });
/* harmony import */ var _services_LoginService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/LoginService */ "./src/services/LoginService.ts");
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");
/* harmony import */ var _Decorators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Decorators */ "./src/controllers/Decorators.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class LoginController extends _BaseController__WEBPACK_IMPORTED_MODULE_1__.BaseController {
    constructor() {
        super(...arguments);
        this.loginService = new _services_LoginService__WEBPACK_IMPORTED_MODULE_0__.LoginService;
        this.title = this.createElement('h2', 'Please Login');
        this.userName = this.createElement('label', 'Username');
        this.userNameInput = this.createElement('input');
        this.br = this.createElement('br');
        this.password = this.createElement('label', 'Password');
        this.passwordInput = this.createElement('input');
        this.br2 = this.createElement('br');
        this.loginButton = this.createElement('button', 'Login', () => __awaiter(this, void 0, void 0, function* () {
            if (this.userNameInput.value && this.passwordInput.value) {
                this.errorLaberText = '';
                const result = yield this.loginService.login(this.userNameInput.value, this.passwordInput.value);
                if (result) {
                    this.router.switchToDashboardView(result);
                }
                else {
                    this.errorLaberText = 'wrong username or password';
                }
            }
            else {
                this.errorLaberText = 'Please fill the fields!!';
            }
        }));
        this.errorLabel = this.createElement('label');
        this.errorLaberText = '';
    }
    /* ----sustituidos por el decorator LinkTextValue
    private resetErrorLabel() {
            this.errorLabel.style.color = 'red'
            this.errorLabel.style.visibility = 'hidden'
        }
    
        private showErrorLabel(errorMessage: string) {
            this.errorLabel.style.color = 'red'
            this.errorLabel.innerText = errorMessage
            this.errorLabel.style.visibility = 'visible'
        } */
    /**
     * createView
     */
    createView() {
        this.errorLabel.id = 'errorLabel';
        this.passwordInput.type = 'password';
        this.errorLabel.style.color = 'red';
        return this.container;
    }
}
__decorate([
    (0,_Decorators__WEBPACK_IMPORTED_MODULE_2__.LinkTextValue)('errorLabel')
], LoginController.prototype, "errorLaberText", void 0);


/***/ }),

/***/ "./src/controllers/MainController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/MainController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainController": () => (/* binding */ MainController)
/* harmony export */ });
/* harmony import */ var _BaseController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseController */ "./src/controllers/BaseController.ts");

class MainController extends _BaseController__WEBPACK_IMPORTED_MODULE_0__.BaseController {
    /**
     * createView
     */
    createView() {
        const title = this.createElement('h2', 'Welcome to out Main Page');
        const articleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id imperdiet est. Etiam facilisis turpis id turpis bibendum facilisis. Morbi non tortor nulla. Nam eros justo, dignissim sed diam vel, condimentum pellentesque dolor.';
        const article = this.createElement('article', articleText);
        const button = this.createElement('button', 'Login', () => {
            this.router.swithToLoginView();
        });
        return this.container;
    }
}


/***/ }),

/***/ "./src/models/authModels.ts":
/*!**********************************!*\
  !*** ./src/models/authModels.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessRight": () => (/* binding */ AccessRight)
/* harmony export */ });
var AccessRight;
(function (AccessRight) {
    AccessRight[AccessRight["CREATE"] = 0] = "CREATE";
    AccessRight[AccessRight["READ"] = 1] = "READ";
    AccessRight[AccessRight["DELETE"] = 2] = "DELETE";
    AccessRight[AccessRight["UPDATE"] = 3] = "UPDATE";
})(AccessRight || (AccessRight = {}));


/***/ }),

/***/ "./src/services/DataService.ts":
/*!*************************************!*\
  !*** ./src/services/DataService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataService": () => (/* binding */ DataService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'http://localhost:8083/';
const usersUrl = baseUrl + 'users';
class DataService {
    /**
     * getUSers
     */
    getUsers(auth, nameQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = usersUrl + '?name=' + nameQuery;
            const option = {
                method: 'GET',
                headers: {
                    Authorization: auth
                }
            };
            const result = yield fetch(url, option);
            const resultJson = yield result.json();
            return resultJson;
        });
    }
    /**
     * async deleteUser
     */
    deleteUser(auth, user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user);
            const url = usersUrl + '?id=' + user.id;
            const option = {
                method: 'DELETE',
                headers: {
                    Authorization: auth
                }
            };
            yield fetch(url, option);
        });
    }
}


/***/ }),

/***/ "./src/services/LoginService.ts":
/*!**************************************!*\
  !*** ./src/services/LoginService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginService": () => (/* binding */ LoginService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'http://localhost:8083/';
const loginUrl = baseUrl + 'login';
class LoginService {
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            };
            const result = yield fetch(loginUrl, options);
            if (result.status === 201) {
                return yield result.json();
            }
            else {
                return undefined;
            }
        });
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Main": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router */ "./src/Router.ts");

class Main {
    constructor() {
        //instance
        this.router = new _Router__WEBPACK_IMPORTED_MODULE_0__.Router();
        console.log('Constructed new instance of the program');
    }
    /**
     * launchApp
     */
    launchApp() {
        this.router.handleRequest();
    }
}
new Main().launchApp();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3RCLE9BQU8sTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFO2FBQzdCO2lCQUFNO2dCQUNILE9BQU8sU0FBUzthQUNuQjtRQUNMLENBQUM7S0FBQTtDQUNKOzs7Ozs7O1VDeEJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTmtDO0FBRTNCLE1BQU0sSUFBSTtJQUtiO1FBSEEsVUFBVTtRQUNGLFdBQU0sR0FBVyxJQUFJLDJDQUFNLEVBQUU7UUFHakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7T0FFRztJQUNJLFNBQVM7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtJQUMvQixDQUFDO0NBQ0o7QUFFRCxJQUFJLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9Sb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vbWFuYWdlcnVpLy4vc3JjL2NvbnRyb2xsZXJzL0Jhc2VDb250cm9sbGVyLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9jb250cm9sbGVycy9EYXNoYm9hcmRDb250cm9sbGVyLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9jb250cm9sbGVycy9EZWNvcmF0b3JzLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9jb250cm9sbGVycy9Mb2dpbkNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vbWFuYWdlcnVpLy4vc3JjL2NvbnRyb2xsZXJzL01haW5Db250cm9sbGVyLnRzIiwid2VicGFjazovL21hbmFnZXJ1aS8uL3NyYy9tb2RlbHMvYXV0aE1vZGVscy50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvc2VydmljZXMvRGF0YVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vbWFuYWdlcnVpLy4vc3JjL3NlcnZpY2VzL0xvZ2luU2VydmljZS50cyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFuYWdlcnVpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYW5hZ2VydWkvLi9zcmMvTWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXNoYm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlcnMvRGFzaGJvYXJkQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBMb2dpbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9Mb2dpbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBTZXNzaW9uVG9rZW4gfSBmcm9tIFwiLi9tb2RlbHMvYXV0aE1vZGVsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBtYWluRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLWNvbnRhaW5lcicpXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVSZXF1ZXN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVSZXF1ZXN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdIYW5kbGluZyByZXF1ZXN0IGZvcjogJysgdGhpcy5nZXRSb3V0ZXIoKSlcclxuXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmdldFJvdXRlcigpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJy9sb2dpbic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXRoVG9Mb2dpblZpZXcoKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICcvYm9hcmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hUb0Rhc2hib2FyZFZpZXcodW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYWluRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1haW5Db250cm9sbGVyOiBNYWluQ29udHJvbGxlciA9IG5ldyBNYWluQ29udHJvbGxlcih0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbkVsZW1lbnQuYXBwZW5kKG1haW5Db250cm9sbGVyLmNyZWF0ZVZpZXcoKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJvdXRlcigpOnN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhdGgpXHJcbiAgICAgICAgcmV0dXJuIHBhdGhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN3aXRoVG9Mb2dpblZpZXdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN3aXRoVG9Mb2dpblZpZXcoKSB7XHJcbiAgICAgICAgaWYodGhpcy5tYWluRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5FbGVtZW50LmlubmVySFRNTCA9ICcnIFxyXG4gICAgICAgICAgICBjb25zdCBsb2dpbkNvbnRyb2xsZXI6IExvZ2luQ29udHJvbGxlciA9IG5ldyBMb2dpbkNvbnRyb2xsZXIodGhpcylcclxuICAgICAgICAgICAgdGhpcy5tYWluRWxlbWVudC5hcHBlbmQobG9naW5Db250cm9sbGVyLmNyZWF0ZVZpZXcoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN3aXRjaFRvRGFzaGJvYXJkVmlldyhzZXNzaW9uVG9rZW46IFNlc3Npb25Ub2tlbnwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYodGhpcy5tYWluRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5FbGVtZW50LmlubmVySFRNTCA9ICcnIFxyXG4gICAgICAgICAgICBjb25zdCBkYXNoYm9hcmRDb250b2xsZXI6IERhc2hib2FyZENvbnRyb2xsZXIgPSBuZXcgRGFzaGJvYXJkQ29udHJvbGxlcih0aGlzKVxyXG4gICAgICAgICAgICBpZihzZXNzaW9uVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgIGRhc2hib2FyZENvbnRvbGxlci5zZXRTZXNzaW9uVG9rZW4oc2Vzc2lvblRva2VuKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkVsZW1lbnQuYXBwZW5kKGRhc2hib2FyZENvbnRvbGxlci5jcmVhdGVWaWV3KCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4uL1JvdXRlclwiXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUNvbnRyb2xsZXIge1xyXG5cclxuICAgIHByb3RlY3RlZCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZVZpZXcgLT4gTWVodG9kIHRvIGNyZWF0ZSBIVE1MIHZpZXdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGVWaWV3KCk6IEhUTUxEaXZFbGVtZW50XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUVsZW1lbnQ8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4oXHJcbiAgICAgICAgZWxlbWVudFR5cGU6IEssXHJcbiAgICAgICAgaW5uZXJUZXh0Pzogc3RyaW5nLFxyXG4gICAgICAgIGFjdGlvbj86IGFueVxyXG4gICAgKTogSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSlcclxuICAgICAgICBpZihpbm5lclRleHQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBpbm5lclRleHRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQub25jbGljayA9IGFjdGlvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGVsZW1lbnQpXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5zZXJ0QnJlYWsoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVFbGVtZW50KCdicicpXHJcbiAgICB9XHJcbiAgICBcclxufSIsImltcG9ydCB7IEFjY2Vzc1JpZ2h0LCBTZXNzaW9uVG9rZW4gfSBmcm9tIFwiLi4vbW9kZWxzL2F1dGhNb2RlbHNcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9EYXRhU2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL0Jhc2VDb250cm9sbGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHNlc3Npb25Ub2tlbjogU2Vzc2lvblRva2VuIHwgdW5kZWZpbmVkXHJcbiAgICBwcml2YXRlIHNlYXJjaEFyZWE6IEhUTUxJbnB1dEVsZW1lbnQgfCB1bmRlZmluZWRcclxuICAgIHByaXZhdGUgc2VhcmNoUmVzdWx0QXJlYTogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWRcclxuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlID0gbmV3IERhdGFTZXJ2aWNlKClcclxuICAgIHByaXZhdGUgc2VsZWN0ZWRVc2VyOiBVc2VyIHwgdW5kZWZpbmVkXHJcbiAgICBwcml2YXRlIHNlbGVjdGVkTGFiZWw6IEhUTUxMYWJlbEVsZW1lbnQgfCB1bmRlZmluZWRcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldFNlc3Npb25Ub2tlblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2Vzc2lvblRva2VuKHNlc3Npb25Ub2tlbjogU2Vzc2lvblRva2VuKSB7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uVG9rZW4gPSBzZXNzaW9uVG9rZW5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZVZpZXdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZVZpZXcoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMicsICdEYXNoYm9hcmQgY29udHJvbGxlcicpXHJcbiAgICAgICAgaWYodGhpcy5zZXNzaW9uVG9rZW4pe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyxcclxuICAgICAgICAgICAgICAgIGB3ZWxjb21lICR7dGhpcy5zZXNzaW9uVG9rZW4udXNlcm5hbWV9YClcclxuICAgICAgICAgICAgdGhpcy5pbnNlcnRCcmVhaygpXHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVCdXR0b25zKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyxcclxuICAgICAgICAgICAgICAgICdwbGVhc2UgZ28gdG8gdGhlIHB1YmxpYyBwYXJ0cyBvZiB0aGUgYXBwIScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lclxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2VuZXJhdGVCdXR0b25zKCkge1xyXG4gICAgICAgIGlmKHRoaXMuc2Vzc2lvblRva2VuKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2Vzc2lvblRva2VuKVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNlc3Npb25Ub2tlblsnYWNjZXNzUmlnaHRzJ10uZm9yRWFjaChhY2Nlc3MgPT4gXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIEFjY2Vzc1JpZ2h0W2FjY2Vzc10sIGFzeW5jKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudHJpZ2dlckFjdGlvbihhY2Nlc3MpXHJcbiAgICAgICAgICAgICAgICB9KSkgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2Vzc2lvblRva2VuLmFjY2Vzc1JpZ2h0cy5pbmNsdWRlcyhBY2Nlc3NSaWdodC5SRUFEKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRCcmVhaygpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgJ3NlYXJjaDonKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hBcmVhID0gdGhpcy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdEFyZWEgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgdHJpZ2dlckFjdGlvbihhY2Nlc3M6IEFjY2Vzc1JpZ2h0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGNsaWNrZWQgJHthY2Nlc3N9YCk7XHJcbiAgICAgICAgc3dpdGNoIChhY2Nlc3MpIHtcclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NSaWdodC5SRUFEOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJzKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuIS50b2tlbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQXJlYSEudmFsdWVcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIHVzZXJzLm1hcCgodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5jcmVhdGVFbGVtZW50KCdsYWJlbCcsIEpTT04uc3RyaW5naWZ5KHVzZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkTGFiZWwnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVXNlciA9IHVzZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZExhYmVsID0gbGFiZWxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRBcmVhIS5hcHBlbmQobGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRBcmVhIS5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzUmlnaHQuREVMRVRFOlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZFVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZVVzZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uVG9rZW4hLnRva2VuSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXIhXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMYWJlbCEuaW5uZXJIVE1MPScnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEJhc2VDb250cm9sbGVyIH0gZnJvbSBcIi4vQmFzZUNvbnRyb2xsZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBMaW5rVGV4dFZhbHVlKGVsZW1lbnRJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBCYXNlQ29udHJvbGxlciwga2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcHJvcGVydHkgPSAodGFyZ2V0IGFzIGFueSlba2V5XVxyXG5cclxuICAgICAgICBjb25zdCBnZXR0ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2V0dGVyID0gKG5ld1ZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbGVtZW50SWQnKVxyXG4gICAgICAgICAgICBwcm9wZXJ0eSA9IG5ld1ZhbHVlXHJcblxyXG4gICAgICAgICAgICBpZihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IG5ld1ZhbHVlXHJcbiAgICAgICAgICAgICAgICBpZighbmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsa2V5LCB7XHJcbiAgICAgICAgICAgIGdldDogZ2V0dGVyLFxyXG4gICAgICAgICAgICBzZXQ6IHNldHRlcixcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSIsImltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9Mb2dpblNlcnZpY2VcIlxyXG5pbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL0Jhc2VDb250cm9sbGVyXCJcclxuaW1wb3J0IHsgTGlua1RleHRWYWx1ZSB9IGZyb20gXCIuL0RlY29yYXRvcnNcIlxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGxvZ2luU2VydmljZSA9IG5ldyBMb2dpblNlcnZpY2VcclxuXHJcbiAgICBwcml2YXRlIHRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdoMicsICdQbGVhc2UgTG9naW4nKVxyXG4gICAgcHJpdmF0ZSB1c2VyTmFtZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnbGFiZWwnLCAnVXNlcm5hbWUnKVxyXG4gICAgcHJpdmF0ZSB1c2VyTmFtZUlucHV0ID0gdGhpcy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXHJcbiAgICBwcml2YXRlIGJyID0gdGhpcy5jcmVhdGVFbGVtZW50KCdicicpXHJcbiAgICBwcml2YXRlIHBhc3N3b3JkID0gdGhpcy5jcmVhdGVFbGVtZW50KCdsYWJlbCcsICdQYXNzd29yZCcpXHJcbiAgICBwcml2YXRlIHBhc3N3b3JkSW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuICAgIHByaXZhdGUgYnIyID0gdGhpcy5jcmVhdGVFbGVtZW50KCdicicpXHJcblxyXG4gICAgcHJpdmF0ZSBsb2dpbkJ1dHRvbiA9IHRoaXMuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJ0xvZ2luJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMudXNlck5hbWVJbnB1dC52YWx1ZSAmJiB0aGlzLnBhc3N3b3JkSW5wdXQudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvckxhYmVyVGV4dCA9ICcnXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMubG9naW5TZXJ2aWNlLmxvZ2luKFxyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZElucHV0LnZhbHVlXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaWYocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5zd2l0Y2hUb0Rhc2hib2FyZFZpZXcocmVzdWx0KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckxhYmVyVGV4dCA9ICd3cm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JMYWJlclRleHQgPSAnUGxlYXNlIGZpbGwgdGhlIGZpZWxkcyEhJ1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgcHJpdmF0ZSBlcnJvckxhYmVsID0gdGhpcy5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXHJcblxyXG4gICAgQExpbmtUZXh0VmFsdWUoJ2Vycm9yTGFiZWwnKVxyXG4gICAgcHJpdmF0ZSBlcnJvckxhYmVyVGV4dDogc3RyaW5nID0gJydcclxuXHJcbi8qIC0tLS1zdXN0aXR1aWRvcyBwb3IgZWwgZGVjb3JhdG9yIExpbmtUZXh0VmFsdWUgICAgIFxyXG5wcml2YXRlIHJlc2V0RXJyb3JMYWJlbCgpIHtcclxuICAgICAgICB0aGlzLmVycm9yTGFiZWwuc3R5bGUuY29sb3IgPSAncmVkJ1xyXG4gICAgICAgIHRoaXMuZXJyb3JMYWJlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dFcnJvckxhYmVsKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvckxhYmVsLnN0eWxlLmNvbG9yID0gJ3JlZCdcclxuICAgICAgICB0aGlzLmVycm9yTGFiZWwuaW5uZXJUZXh0ID0gZXJyb3JNZXNzYWdlXHJcbiAgICAgICAgdGhpcy5lcnJvckxhYmVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSdcclxuICAgIH0gKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZVZpZXdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZVZpZXcoKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIHRoaXMuZXJyb3JMYWJlbC5pZCA9ICdlcnJvckxhYmVsJ1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmRJbnB1dC50eXBlID0gJ3Bhc3N3b3JkJ1xyXG4gICAgICAgIHRoaXMuZXJyb3JMYWJlbC5zdHlsZS5jb2xvciA9ICdyZWQnXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL0Jhc2VDb250cm9sbGVyXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZVZpZXdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZVZpZXcoKTogSFRNTERpdkVsZW1lbnQge1xyXG5cclxuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuY3JlYXRlRWxlbWVudCgnaDInLCAnV2VsY29tZSB0byBvdXQgTWFpbiBQYWdlJylcclxuXHJcbiAgICAgICAgY29uc3QgYXJ0aWNsZVRleHQgPSAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gTW9yYmkgaWQgaW1wZXJkaWV0IGVzdC4gRXRpYW0gZmFjaWxpc2lzIHR1cnBpcyBpZCB0dXJwaXMgYmliZW5kdW0gZmFjaWxpc2lzLiBNb3JiaSBub24gdG9ydG9yIG51bGxhLiBOYW0gZXJvcyBqdXN0bywgZGlnbmlzc2ltIHNlZCBkaWFtIHZlbCwgY29uZGltZW50dW0gcGVsbGVudGVzcXVlIGRvbG9yLidcclxuICAgICAgICBjb25zdCBhcnRpY2xlID0gdGhpcy5jcmVhdGVFbGVtZW50KCdhcnRpY2xlJywgYXJ0aWNsZVRleHQpXHJcblxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJ0xvZ2luJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5zd2l0aFRvTG9naW5WaWV3KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lclxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uVG9rZW4ge1xyXG4gICAgdG9rZW5JZDogc3RyaW5nLFxyXG4gICAgdXNlcm5hbWU6IHN0cmluZywgXHJcbiAgICB2YWxpZDogYm9vbGVhbixcclxuICAgIGV4cGlyYXRpb25UaW1lOiBEYXRlLCBcclxuICAgIGFjY2Vzc1JpZ2h0czogQWNjZXNzUmlnaHRbXVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBBY2Nlc3NSaWdodCB7XHJcbiAgICBDUkVBVEUsIFxyXG4gICAgUkVBRCxcclxuICAgIERFTEVURSxcclxuICAgIFVQREFURSxcclxufSIsImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL2RhdGFNb2RlbHNcIlxyXG5cclxuY29uc3QgYmFzZVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwODMvJ1xyXG5jb25zdCB1c2Vyc1VybCA9IGJhc2VVcmwgKyAndXNlcnMnXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldFVTZXJzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRVc2VycyhhdXRoOiBzdHJpbmcsIG5hbWVRdWVyeTogc3RyaW5nKTogUHJvbWlzZTxVc2VyW10+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB1c2Vyc1VybCArICc/bmFtZT0nICsgbmFtZVF1ZXJ5XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBhdXRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb24pXHJcbiAgICAgICAgY29uc3QgcmVzdWx0SnNvbiA9IGF3YWl0IHJlc3VsdC5qc29uKClcclxuICAgICAgICByZXR1cm4gcmVzdWx0SnNvblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYXN5bmMgZGVsZXRlVXNlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVsZXRlVXNlcihhdXRoOiBzdHJpbmcsIHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyh1c2VyKVxyXG4gICAgICAgIGNvbnN0IHVybCA9IHVzZXJzVXJsICsgJz9pZD0nICsgdXNlci5pZFxyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYXV0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IGZldGNoKHVybCwgb3B0aW9uKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2Vzc2lvblRva2VuIH0gZnJvbSBcIi4uL21vZGVscy9hdXRoTW9kZWxzXCI7XHJcbmNvbnN0IGJhc2VVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgzLydcclxuY29uc3QgbG9naW5VcmwgPSBiYXNlVXJsICsgJ2xvZ2luJ1xyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvZ2luKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPFNlc3Npb25Ub2tlbiB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKGxvZ2luVXJsLCBvcHRpb25zKVxyXG4gICAgICAgIGlmKHJlc3VsdC5zdGF0dXMgPT09IDIwMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzdWx0Lmpzb24oKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCIuL1JvdXRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1haW4ge1xyXG5cclxuICAgIC8vaW5zdGFuY2VcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIgPSBuZXcgUm91dGVyKClcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbnN0cnVjdGVkIG5ldyBpbnN0YW5jZSBvZiB0aGUgcHJvZ3JhbScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbGF1bmNoQXBwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsYXVuY2hBcHAoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuaGFuZGxlUmVxdWVzdCgpXHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBNYWluKCkubGF1bmNoQXBwKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=