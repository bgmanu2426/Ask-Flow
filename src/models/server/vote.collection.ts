import { Permission, Role } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    //create collection
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read(Role.user('any')),
        Permission.create(Role.user('user')),
        Permission.read(Role.user('user')),
        Permission.update(Role.user('user')),
        Permission.delete(Role.user('user'))
    ]);
    console.log("vote collection created");

    // create attributes
    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 100, true),
        databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
        databases.createStringAttribute(db, voteCollection, "voteById", 50, true)
    ]);
    console.log("vote attributes created");
}