import { BaseController } from "./BaseController"

export class MainController extends BaseController {

    /**
     * createView
     */
    public createView(): HTMLDivElement {

        const title = this.createElement('h2', 'Welcome to out Main Page')

        const articleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id imperdiet est. Etiam facilisis turpis id turpis bibendum facilisis. Morbi non tortor nulla. Nam eros justo, dignissim sed diam vel, condimentum pellentesque dolor.'
        const article = this.createElement('article', articleText)

        const button = this.createElement('button', 'Login', () => {
            this.router.swithToLoginView()
        })
        return this.container
    }
}