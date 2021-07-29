import { LoginService } from "../services/LoginService"
import { BaseController } from "./BaseController"
import { LinkTextValue } from "./Decorators"

export class LoginController extends BaseController {

    private loginService = new LoginService

    private title = this.createElement('h2', 'Please Login')
    private userName = this.createElement('label', 'Username')
    private userNameInput = this.createElement('input')
    private br = this.createElement('br')
    private password = this.createElement('label', 'Password')
    private passwordInput = this.createElement('input')
    private br2 = this.createElement('br')

    private loginButton = this.createElement('button', 'Login', async () => {
        if(this.userNameInput.value && this.passwordInput.value) {
            this.errorLaberText = ''
            const result = await this.loginService.login(
                this.userNameInput.value,
                this.passwordInput.value
            )
            if(result) {
                this.router.switchToDashboardView(result)
            } else {
                this.errorLaberText = 'wrong username or password'
            }
        } else {
            this.errorLaberText = 'Please fill the fields!!'
        }
    })

    private errorLabel = this.createElement('label')

    @LinkTextValue('errorLabel')
    private errorLaberText: string = ''

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
    public createView(): HTMLDivElement {
        this.errorLabel.id = 'errorLabel'
        this.passwordInput.type = 'password'
        this.errorLabel.style.color = 'red'
        return this.container
    }
}