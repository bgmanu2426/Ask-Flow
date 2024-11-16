import { Permission } from "node-appwrite";
import { questionAttachmentsBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentsBucket);
    } catch (error) {
        console.log(error);

        try {
            await storage.createBucket(questionAttachmentsBucket, questionAttachmentsBucket, [
                Permission.read("any"),
                Permission.create("user"),
                Permission.read("user"),
                Permission.update("user"),
                Permission.delete("user")
            ],
                false,
                undefined,
                undefined,
                ["jpg", "png", "gif", "jpeg", "webp", "img", "heic"]);
            console.log("Storage bucket created");
        } catch (error) {
            console.error(error);
        }
    }
}