import axios from 'axios'
import { GroupRisk, Person, UBS } from '../models/models'

export interface GroupRiskAndUBSsResponse {
    grupo_de_risco: GroupRisk[];
    UBSs: UBS[];
}

export interface RequestResponse<T> {
    data?: T;
    status: number
}

const request = axios.create({
    baseURL: "http://192.168.1.2:5000",
    timeout: 5000,
})

async function getGroupRiskAndUBSs(): Promise<RequestResponse<GroupRiskAndUBSsResponse>> {
    try {
        const { data, status } = await request.get<GroupRiskAndUBSsResponse>('/groupRiskAndUBS')

        return {
            data,
            status
        }
    } catch (error: any) {
        console.log('API ERR', error)

        return {
            status: error.response.status
        }
    }
}

async function savePerson(person: Person): Promise<RequestResponse<string>> {
    console.log("person", person)
    try {
        const { status } = await request.post('/register', { ...person })


        return {
            status
        }
    } catch (error: any) {
        console.log('API ERR', error)

        return {
            status: error.response.status
        }
    }
}


export {
    getGroupRiskAndUBSs,
    savePerson
}