import {Account, Client, Databases, Query, Storage} from 'appwrite'

const PROJECT_ID    = 'remote-clock'
const ENDPOINT      = 'https://cloud.appwrite.io/v1'
const DB_ID         = 'clock';
const COLLECTION_ID = 'employees';

const appwrite = new Client()

appwrite.setEndpoint(ENDPOINT).setProject(PROJECT_ID)

export default function useApi() {
    return {
        client  : appwrite,
        account : new Account(appwrite),
        database: new Databases(appwrite),
        storage : new Storage(appwrite),
        DB_ID,
        COLLECTION_ID,
        query: Query,
    }
}