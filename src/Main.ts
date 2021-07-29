import { Router } from "./Router";

export class Main {

    //instance
    private router: Router = new Router()

    public constructor() {
        console.log('Constructed new instance of the program');
    }

    /**
     * launchApp
     */
    public launchApp() {
        this.router.handleRequest()
    }
}

new Main().launchApp()