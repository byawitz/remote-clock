import sdk from 'node-appwrite';
import 'dotenv/config';


const ENDPOINT      = 'https://cloud.appwrite.io/v1';
const PROJECT_ID    = 'remote-clock';
const DB_ID         = 'clock';
const COLLECTION_ID = 'employees';
const API_KEY       = process.env.APPWRITE_API_KEY;

const _u = sdk.ID.unique;

const employees = [
    {email: 'test1@example.com', name: 'US 1', timezone: 'UTC-04:00', country: 'US'},
    {email: 'test11@example.com', name: 'US 2', timezone: 'UTC-04:00', country: 'US'},
    {email: 'test12@example.com', name: 'US 3', timezone: 'UTC-05:00', country: 'US'},
    {email: 'test13@example.com', name: 'US 4', timezone: 'UTC-05:00', country: 'US'},
    {email: 'test14@example.com', name: 'US 5', timezone: 'UTC-07:00', country: 'US'},
    {email: 'test15@example.com', name: 'US 6', timezone: 'UTC-07:00', country: 'US'},
    {email: 'test26@example.com', name: 'UK 1', timezone: 'UTC', country: 'UK'},
    {email: 'test27@example.com', name: 'UK 2', timezone: 'UTC', country: 'UK'},
    {email: 'test28@example.com', name: 'UK 3', timezone: 'UTC', country: 'UK'},
    {email: 'test39@example.com', name: 'France 1', timezone: 'UTC-01:00', country: 'FR'},
    {email: 'test30@example.com', name: 'France 2', timezone: 'UTC-01:00', country: 'FR'},
    {email: 'test31@example.com', name: 'France 3', timezone: 'UTC-01:00', country: 'FR'},
    {email: 'test32@example.com', name: 'France 4', timezone: 'UTC-01:00', country: 'FR'},
    {email: 'test42@example.com', name: 'Israel 1', timezone: 'UTC-02:00', country: 'IL'},
]

const client = new sdk.Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const users     = new sdk.Users(client);
const teams     = new sdk.Teams(client);
const databases = new sdk.Databases(client);

try {
    const team = await teams.create(_u(), 'employee');

    for (const employee of employees) {
        const single = await users.create(_u(), employee.email, undefined, undefined, employee.name);
        await teams.createMembership(team.$id, [], employee.email);

        await databases.createDocument(DB_ID, COLLECTION_ID, _u(), {
            times: JSON.stringify('{}'),
            employee_id: single.$id,
            timezone: employee.timezone
        }, [
            sdk.Permission.read(sdk.Role.any()),
            sdk.Permission.update(sdk.Role.user(single.$id)),
        ]);
    }
} catch (e) {
    console.log(e);
}