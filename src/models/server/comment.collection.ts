import { Permission, Role } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
    // creating collection
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read(Role.user('any')),
        Permission.create(Role.user('user')),
        Permission.read(Role.user('user')),
        Permission.update(Role.user('user')),
        Permission.delete(Role.user('user'))
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