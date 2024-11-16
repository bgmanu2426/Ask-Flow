import env from "@/env";
import { Client, Databases, Storage, Users, Avatars } from "node-appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)
    .setKey(env.appwrite.apikey);

const users = new Users(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, users, avatars, databases, storage };