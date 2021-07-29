import { AccessRight, SessionToken } from "../models/authModels";
import { User } from "../models/dataModels";
import { DataService } from "../services/DataService";
import { BaseController } from "./BaseController";

export class DashboardController extends BaseController {

    private sessionToken: SessionToken | undefined
    private searchArea: HTMLInputElement | undefined
    private searchResultArea: HTMLDivElement | undefined
    private dataService: DataService = new DataService()
    private selectedUser: User | undefined
    private selectedLabel: HTMLLabelElement | undefined

    /**
     * setSessionToken
     */
    public setSessionToken(sessionToken: SessionToken) {
        this.sessionToken = sessionToken
    }

    /**
     * createView
     */
    public createView(): HTMLDivElement {
        const title = this.createElement('h2', 'Dashboard controller')
        if(this.sessionToken){
            this.createElement('label',
                `welcome ${this.sessionToken.username}`)
            this.insertBreak()
            this.generateButtons()
        } else {
            this.createElement('label',
                'please go to the public parts of the app!')
        }
        return this.container
    }

    private async generateButtons() {
        if(this.sessionToken) {
            console.log(this.sessionToken)
            await this.sessionToken['accessRights'].forEach(access => 
                this.createElement('button', AccessRight[access], async() => {
                    await this.triggerAction(access)
                })) 
            if(this.sessionToken.accessRights.includes(AccessRight.READ)) {
                this.insertBreak()
                this.createElement('label', 'search:')
                this.searchArea = this.createElement('input')
                this.searchResultArea = this.createElement('div')
            }
        }

    }

    private async triggerAction(access: AccessRight) {
        console.log(`clicked ${access}`);
        switch (access) {
            case AccessRight.READ:
                const users = await this.dataService.getUsers(
                    this.sessionToken!.tokenId,
                    this.searchArea!.value
                )
                users.map((user) => {
                    const label = this.createElement('label', JSON.stringify(user))
                    label.onclick = () => {
                        label.classList.toggle('selectedLabel')
                        this.selectedUser = user
                        this.selectedLabel = label
                    }
                    this.searchResultArea!.append(label)
                    this.searchResultArea!.append(
                        document.createElement('br')
                    )
                })
                break;
            case AccessRight.DELETE:
                if(this.selectedUser) {
                    this.dataService.deleteUser(
                    this.sessionToken!.tokenId,
                    this.selectedUser!
                    )
                    this.selectedLabel!.innerHTML=''
                }
                break;
            default:
                break;
        }
    }
}