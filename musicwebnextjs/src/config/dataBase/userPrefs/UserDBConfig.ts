import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "@/conf/conf"

export class DbConfig {

    clint = new Client()
    databases
    bucket

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId) // Your project ID
        this.databases = new Databases(this.clint)
        this.bucket = new Storage(this.clint)
    }
    async createDocument({
        id,
        avatar,
        userName,
        name,
        email,
        playList,
    }: {
        id: string
        avatar: string
        userName: string
        name: string
        email: string
        playList: any
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUserPrefsId,
                id,
                {
                    avatar,
                    userName,
                    name,
                    email,
                    playList,

                }
            )

        } catch (error) {
            throw error
        }
    }
    async updateDocument({
        prefs,
        id
    }: {
        prefs: any,
        id: string
    }) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionUserPrefsId,
            id,
            {
                ...prefs
            }
        )
    }
}
const dbConfig = new DbConfig()
export default dbConfig