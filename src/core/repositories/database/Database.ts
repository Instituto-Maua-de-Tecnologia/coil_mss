import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


export class Database {
    public DynamoDBClient: DynamoDBClient;
    public project_name: string = "ProjectTableName";

    constructor() {
        this.DynamoDBClient = new DynamoDBClient({region: process.env.AWS_REGION});
        this.project_name = process.env.PROJECT_TABLE_NAME || "ProjectTableName"
    }
}