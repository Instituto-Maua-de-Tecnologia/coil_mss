import { Database } from './Database';
import { marshall } from '@aws-sdk/util-dynamodb';
import { PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { IProjectRepo } from '../interfaces/IProjectRepo';
import { Project } from '../../structure/entities/Project';



export class ProjectRepo implements IProjectRepo {
    database: Database;

    constructor() {
        this.database = new Database();
    }

    async createProject(project: Project): Promise<Project> {
        throw new Error('Method not implemented.');
    }

    async getProject(id: string): Promise<Project> {
        throw new Error('Method not implemented.');
    }

    async getProjects(): Promise<Project[]> {
        throw new Error('Method not implemented.');
    }

    async updateProject(project: Project): Promise<Project> {
        throw new Error('Method not implemented.');
    }

    async deleteProject(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}