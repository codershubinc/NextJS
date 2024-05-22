const conf = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
  appwriteAvatarBucketId: String(
    process.env.NEXT_PUBLIC_APPWRITE_AVATAR_BUCKET_ID
  )
};

export default conf;
