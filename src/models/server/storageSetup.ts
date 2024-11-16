import { Permission, Role } from "node-appwrite";
import { questionAttachmentsBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentsBucket);
    } catch {
        try {
            await storage.createBucket(questionAttachmentsBucket, questionAttachmentsBucket, [
                Permission.read(Role.user('any')),
                Permission.create(Role.user('user')),
                Permission.read(Role.user('user')),
                Permission.update(Role.user('user')),
                Permission.delete(Role.user('user'))
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