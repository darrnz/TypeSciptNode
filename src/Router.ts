import { DashboardController } from "./controllers/DashboardController";
import { LoginController } from "./controllers/LoginController";
import { MainController } from "./controllers/MainController";
import { SessionToken } from "./models/authModels";

export class Router {

    private mainElement = document.getElementById('main-container')

    /**
     * handleRequest
     */
    public handleRequest() {
        console.log('Handling request for: '+ this.getRouter())

        switch (this.getRouter()) {
            case '/login':
                this.swithToLoginView()
                break;

            case '/board':
                this.switchToDashboardView(undefined)
                break;

            default:
                if(this.mainElement) {
                    const mainController: MainController = new MainController(this)
                    this.mainElement.append(mainController.createView())
                }
                break;
        }
    }

    private getRouter():string {
        const path = window.location.pathname
        console.log(path)
        return path
    }

    /**
     * swithToLoginView
     */
    public swithToLoginView() {
        if(this.mainElement) {
            this.mainElement.innerHTML = '' 
            const loginController: LoginController = new LoginController(this)
            this.mainElement.append(loginController.createView())
        }
    }

    public switchToDashboardView(sessionToken: SessionToken| undefined) {
        if(this.mainElement) {
            this.mainElement.innerHTML = '' 
            const dashboardContoller: DashboardController = new DashboardController(this)
            if(sessionToken) {
                dashboardContoller.setSessionToken(sessionToken)
            }
            this.mainElement.append(dashboardContoller.createView())
        }
    }
}