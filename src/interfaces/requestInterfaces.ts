import { Language } from "./languageInterfaces"
import { Level } from "./levelInterfaces"
import { UserData } from "./userInterfaces"

export interface RequestData {
    id?: string
    title: string
    description: string
    link: string
    userId?: number | string
    languageId: number | string | Language
    language?: Language
    level?: Level
    user?: UserData
    levelId: number | string | Level
    created_at?: string
}

export interface RequestGetData {
    page?: string
    limit?: string
    languageId?: string
    levelId?: string
}



