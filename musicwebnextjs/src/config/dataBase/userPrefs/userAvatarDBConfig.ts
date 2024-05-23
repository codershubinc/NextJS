import { Client, ID, Databases, Storage } from "appwrite";
import conf from "@/conf/conf"

export class UserAvatarDBConfig {

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

    async uploadUserAvatar(userAvatar: any) {
        return await this.bucket.createFile(
            conf.appwriteAvatarBucketId,
            ID.unique(),
            userAvatar
        )
    }
    async deleteUserAvatar(avatarId: string) {
        return await this.bucket.deleteFile(
            conf.appwriteAvatarBucketId,
            avatarId
        )
    }
    getUserAvatarPreview(avatarId: string) {
        return this.bucket.getFilePreview(
            conf.appwriteAvatarBucketId,
            avatarId
        )
    }
}
const userAvatarDBConfig = new UserAvatarDBConfig();
export default userAvatarDBConfig