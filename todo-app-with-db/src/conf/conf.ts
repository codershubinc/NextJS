const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteUserCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_USER_CONFIG_COLLECTION_ID),
    appwriteTodoCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_TODO_CONFIG_COLLECTION_ID),
}
export default conf