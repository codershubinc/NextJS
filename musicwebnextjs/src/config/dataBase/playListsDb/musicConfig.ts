import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "@/conf/conf";
interface MusicDocument extends Document {
    name: string;
    description: string;
    musicContains: string[];
    playListSingers: string[];
    like: number;
    likeId: string[];
    musicPlayListAvatar: string;
    musicPlayListBanner: string;
    language: string;
    // Add other fields as necessary
}

export class MusicConfig {

    client = new Client()
    databases
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId) // Your project ID
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createMusicConfig({
        musicName,
        musicId,
        musicAvatar,
        singer,
        description,
        hashTags,
        likeId,
        like,
        language
    }: {
        musicName: string
        musicId: string
        musicAvatar: string
        singer: any
        description: string
        hashTags: any
        likeId: any
        like: number
        language: string
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionMusicConfigId,
                musicId,
                {
                    musicName,
                    musicId,
                    musicAvatar,
                    singer,
                    description,
                    hashTags,
                    likeId,
                    like,
                    language
                }
            )
        } catch (error) {
            throw error
        }
    }

    async getMusicConfig(queryName: string): Promise<any> {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionMusicConfigId,
                [
                    Query.equal('musicAvatar', queryName)

                ]

            )
        } catch (error) {
            console.error("Appwrite service :: getMusicConfig :: error", error);
        }
    }
    async getMusicPlayListsByIds(id: string): Promise<any> {
        try {
            const response = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionMusicPlayListId,
                id
            );

            return response;
        } catch (error) {
            console.error("Appwrite service :: getMusicPlayListsByIds :: error", error);
            return { documents: [] };
        }
    }
}

const musicConfig = new MusicConfig();
export default musicConfig;
