
import { instance } from "./instance"

interface Response {
    error: boolean
    error_text: ''
    data: any
}

class DoctorsApi {
    public getAll = async (): Promise<Response | undefined> => {
        try {
            const response = await instance.get(`/doctor/all`)
            return response.data
        } catch {
            console.log('error check')
        }
    }

    public getOne = async (id: string): Promise<Response | undefined> => {
        try {
            const response = await instance.post(`/doctor/one`, {id: id})
            return response.data
        } catch {
            console.log('error archetype')
        }
    }
}

export const doctorsApi = new DoctorsApi()