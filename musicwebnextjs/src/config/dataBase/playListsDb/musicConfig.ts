import { Client, ID, Databases, Storage } from "appwrite";
import conf from "@/conf/conf"

export class MusicConfig {

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
    async createMusicConfig({
        musicName,
        musicAvatar,
        singer,
        description,
        likedId,
        like
    }: {
        musicName: string
        musicAvatar: string
        singer: any
        description: string
        likedId: any
        like: number
    }) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionMusicConfigId,
            ID.unique(),
            {
                musicName,
                musicAvatar,
                singer,
                description,
                likedId,
                like
            }
        )
    }

    async getMusicConfig(
        query: any
    ) {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionMusicConfigId,
            query
        )
    }
}
const musicConfig = new MusicConfig()
export default musicConfig
