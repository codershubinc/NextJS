import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class UserConfig {
    client = new Client()
    database
    bucket
    constructor() {
        this.client
            .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
            .setProject(process.env.APPWRITE_PROJECT_ID as string)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getUserConfigByEmail(email: string) {
        try {
            return await this.database.listDocuments(
                process.env.APPWRITE_DATABASE_ID as string,
                process.env.APPWRITE_USER_CONFIG_COLLECTION_ID as string,
                [Query.equal('userEmail', email)]
            )
        } catch (error: any) {
            console.log('appwrite getUserConfigByEmail error', error)
            throw error
        }
    }
}
const userConfig = new UserConfig()
export default userConfig
