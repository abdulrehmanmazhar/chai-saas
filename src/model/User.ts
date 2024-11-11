import mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document{
    content: string;
    createdAt: Date
}
const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    message: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/,"Please use a vaild email"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode:{
        type: String,
        required: [true, "VerifyCode is required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "VerifyCodeExpiry is required"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAcceptingMessage:{
        type: Boolean,
        default: true
    },
    message: [MessageSchema]
})



const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default userModel;