import axios from 'axios'
import { GroupRisk, Person, PersonToSave, UBS } from '../models/models'

export interface GroupRiskAndUBSsResponse {
    grupo_de_risco: GroupRisk[];
    UBSs: UBS[];
}

export interface PeopleResponse {
    data: Person[];
    pagination: {
        total: number;
        lasPage: number;
        perPage: number;
        currentPage: number;
        from: number;
        to: number
    };
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

async function savePerson(person: PersonToSave): Promise<RequestResponse<string>> {
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


async function getPeople(max: number, current_page: number): Promise<RequestResponse<PeopleResponse>> {
    try {
        console.log("Teste", max, current_page)
        const { status, data }: RequestResponse<PeopleResponse> = await request.get('/people', {
            data: {
                max,
                current_page
            }
        })

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


export {
    getGroupRiskAndUBSs,
    savePerson,
    getPeople
}