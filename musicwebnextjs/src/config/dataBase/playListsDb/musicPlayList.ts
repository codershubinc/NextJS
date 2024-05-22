import { Client, ID, Databases, Storage } from "appwrite";
import conf from "@/conf/conf"

export class MusicPlayList {

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
    async createMusicPlayList({
        name,
        musicContains,
        playListSingers,
        like,
        likedId,
        musicPlayListAvatar,
        musicPlayListBanner
    }: {
        name: string
        musicContains: any
        playListSingers: any
        like: number
        likedId: any
        musicPlayListAvatar: string
        musicPlayListBanner: string
    }) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionMusicPlayListId,
            ID.unique(),
            {
                name,
                musicContains,
                playListSingers,
                like,
                likedId,
                musicPlayListAvatar,
                musicPlayListBanner
            }
        )
    }

    async getMusicPlayList(
        query: any
    ) {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionMusicPlayListId,
            query
        )
    }
    async updateMusicPlayList({
        id,
        prefs
    }: {
        id: string
        prefs: any
    }) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionMusicPlayListId,
            id,
            {
                ...prefs
            }
        )
    }
}
const musicPlayList = new MusicPlayList()
export default musicPlayList