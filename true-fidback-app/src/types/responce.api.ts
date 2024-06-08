import { Message } from "@/model/user.model"

export interface ApiResponce {
    success: boolean
    message: string
    isAcceptingMessages?: boolean
    messages?: Array<Message>
}