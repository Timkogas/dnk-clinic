
import { resultName } from "../results"
import { instance } from "./instance"

interface Response {
    error: boolean
    error_text: ''
    data: any
}

class UserApi {
    public check = async (uid: string): Promise<Response | undefined> => {
        try {
            const response = await instance.post(`/user/check`, {uid: uid})
            return response.data
        } catch {
            console.log('error check')
        }
    }

    public push = async (uid: string): Promise<Response | undefined> => {
        try {
            const response = await instance.post(`/user/push`, {uid: uid})
            return response.data
        } catch {
            console.log('error push')
        }
    }

    public archetype = async (uid: string, archetype: resultName): Promise<Response | undefined> => {
        try {
            const response = await instance.post(`/user/archetype`, {uid: uid, archetype: archetype})
            return response.data
        } catch {
            console.log('error archetype')
        }
    }
}

export const userApi = new UserApi()