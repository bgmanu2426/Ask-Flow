import { Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
    // creating collection
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read("any"),
        Permission.create("user"),
        Permission.read("user"),
        Permission.update("user"),
        Permission.delete("user")
    ]);
    console.log("comment collection created");

    // creating attributes
    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createEnumAttribute(db, commentCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, commentCollection, "typeId", 100, false),
        databases.createStringAttribute(db, commentCollection, "authorId", 100, true),
    ]);
    console.log("Comment attributes created");
}