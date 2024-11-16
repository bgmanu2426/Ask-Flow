import { Permission } from "node-appwrite";
import { databases } from "./config";
import { answerCollection, db } from "../name";

export default async function createAnswerCollection() {
    // creating collection
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.read("any"),
        Permission.create("user"),
        Permission.read("user"),
        Permission.update("user"),
        Permission.delete("user")
    ]);
    console.log("Answer collection created");

    // creating attributes
    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "questionId", 100, true),
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 100, true)
    ]);
    console.log("answer attributes created");
}