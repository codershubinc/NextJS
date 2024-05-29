import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf"

export class TodoDBConfig {

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

    async createTodo(
        prefs: any
    ) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTodoCollectionId,
                ID.unique(),
                {
                    ...prefs
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updateTodo(
        id: string,
        prefs: any
    ) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTodoCollectionId,
                id,
                {
                    ...prefs
                }
            )
        } catch (error) {
            throw error
        }
    }
    async listAllTodos(id: string) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTodoCollectionId,
                [Query.equal("todoByUser", id)]
            )
        } catch (error) {
            throw error
        }
    }
    async getTodoById(id: string) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTodoCollectionId,
                id
            )
        } catch (error) {
            throw error
        }
    }
    async deleteTodo(id: string) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTodoCollectionId,
                id
            )
        } catch (error) {
            throw error
        }
    }


}
const todoDBConfig = new TodoDBConfig();
export default todoDBConfig