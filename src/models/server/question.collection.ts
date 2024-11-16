import { IndexType, Permission, Role } from 'node-appwrite';
import { db, questionCollection } from '../name';
import { databases } from './config';

export default async function createQuestionCollection() {
    // create a new collection
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read(Role.user('any')),
        Permission.create(Role.user('user')),
        Permission.read(Role.user('user')),
        Permission.update(Role.user('user')),
        Permission.delete(Role.user('user'))
    ]);

    // create attributes
    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 100, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 100, false),
    ]);

    // create indexes
    await databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"], ['asc']);
    await databases.createIndex(db, questionCollection, "content", IndexType.Fulltext, ["content"], ['asc']);
}