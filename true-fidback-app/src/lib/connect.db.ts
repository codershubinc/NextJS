import mongoose from "mongoose";

type ConnectObject = {
    isConnected?: number
}

const connection: ConnectObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("already connected");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

        connection.isConnected = db.connections[0].readyState
        console.log("connected to MongoDB")



    } catch (error: any) {
        console.log('Error connecting to MongoDB:', error);

        process.exit(1)

    }
}

export default dbConnect