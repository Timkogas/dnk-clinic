import bridge, { UserInfo } from "@vkontakte/vk-bridge"
import { instance } from "./instance"

interface Response {
    error: boolean
    error_text: ''
    data: any
}

class UserApi {
    public check = async (vkData: UserInfo): Promise<Response | undefined> => {
        try {
            const response = await instance.post(`/user/check`, { vkData: vkData })

            // await bridge.send("VKWebAppGetLaunchParams").then(async (data) => {
            //     if (data?.vk_are_notifications_enabled !== 1) {
            //         await bridge.send('VKWebAppAllowNotifications')
            //     }
            // })
            return response.data
        } catch {
            console.log('error check')
        }
    }

    public archetype = async (answers: number[]): Promise<Response | undefined> => {
        try {
            const response = await instance.post(`/user/archetype`, { answers: answers })
            return response.data
        } catch {
            console.log('error archetype')
        }
    }
}

export const userApi = new UserApi()