
import axios, { AxiosResponse } from 'axios'
import { GroupRisk, Person, PersonToSave, UBS } from '../models/models'
require('dotenv').config()

export interface GroupRiskAndUBSsResponse {
    grupo_de_risco: GroupRisk[];
    UBSs: UBS[];
}

export interface PeopleResponse {
    data: Person[];
    pagination: {
        total: number;
        lastPage: number;
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
    baseURL: process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : process.env.REACT_APP_API,
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

        const response = error.response
        return {
            status: response ? response.status :  500
        }
    }
}

async function getUBSs(includesADM: boolean): Promise<RequestResponse<UBS[]>> {
    try {
        const { data, status } = await request.get<UBS[]>('/getUBSs', {
            params: {
                includesADM
            }
        })

        return {
            data,
            status
        }
    } catch (error: any) {
        console.log('API ERR', error)

        const response = error.response
        return {
            status: response ? response.status :  500
        }
    }
}

async function login(id_ubs: string, password: string): Promise<RequestResponse<UBS>> {
    try {
        const { data, status }: AxiosResponse<UBS> = await request.post('/login', {
            id_ubs,
            password
        })

        return {
            data,
            status
        }
    } catch(error: any) {
        console.log('API ERR', error)

        const response = error.response
        return {
            status: response ? response.status :  500
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

        const response = error.response
        return {
            status: response ? response.status :  500
        }
    }
}


async function getPeople(max: number, current_page: number, search?: string, UBSs?: string[], gruposRisco?: string[], generos?: string[]): Promise<RequestResponse<PeopleResponse>> {
    try {
        const { status, data }: RequestResponse<PeopleResponse> = await request.get('/people', {
            params: {
                max,
                current_page,
                nomeOuCPF: search,
                UBSs: UBSs ? UBSs?.join(',') : undefined,
                grupos_risco: gruposRisco ? gruposRisco?.join(',') : undefined,
                generos: generos ? generos?.join(',') : undefined,
            },
        })

        return {
            data,
            status
        }
    } catch (error: any) {
        console.log('API ERR', error)

        const response = error.response
        return {
            status: response ? response.status :  500
        }
    }
}


export {
    getGroupRiskAndUBSs,
    savePerson,
    getPeople,
    getUBSs,
    login
}