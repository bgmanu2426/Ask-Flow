import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createQuestionCollection from "./question.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.create(db, db);
        await Promise.all([
            createAnswerCollection(),
            createQuestionCollection(),
            createCommentCollection(),
            createVoteCollection()
        ])
        console.log("Collections created sucessfully");
    } catch (error) {
        console.log("Error creating the database", error);
    }
    return databases;
}