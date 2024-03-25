import { Project } from "../../structure/entities/Project";


export interface IProjectRepo {
    createProject(project: Project): Promise<Project>;
    getProject(id: string): Promise<Project>;
    getProjects(): Promise<Project[]>;
    updateProject(project: Project): Promise<Project>;
    deleteProject(id: number): Promise<boolean>;
}