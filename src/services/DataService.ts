import { User } from "../models/dataModels"

const baseUrl = 'http://localhost:8083/'
const usersUrl = baseUrl + 'users'


export class DataService {

    /**
     * getUSers
     */
    public async getUsers(auth: string, nameQuery: string): Promise<User[]> {
        const url = usersUrl + '?name=' + nameQuery
        const option = {
            method: 'GET',
            headers: {
                Authorization: auth
            }
        }
        const result = await fetch(url, option)
        const resultJson = await result.json()
        return resultJson
    }

    /**
     * async deleteUser
     */
    public async deleteUser(auth: string, user: User): Promise<void> {
        console.log(user)
        const url = usersUrl + '?id=' + user.id
        const option = {
            method: 'DELETE',
            headers: {
                Authorization: auth
            }
        }
        await fetch(url, option)
    }
}