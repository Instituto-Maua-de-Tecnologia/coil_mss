import { User } from '../structure/entities/User';
import { UserMock } from '../structure/mocks/UserMock';
import { DatabaseInterface } from './Interfaces/DatabaseInterface';

export class MockRepo implements DatabaseInterface {
    public user_mock: UserMock;

    constructor(user_mock: UserMock) {
        this.user_mock = user_mock;
    }
    
    public get_user(id: string): Promise<User | null>{
        return new Promise((resolve, reject) => {
            const user = this.user_mock.users.find(user => user.id === id);
            resolve(user || null);
        });
    }

    public create_user(user: User): Promise<boolean> {
        this.user_mock.users.push(user);
        return Promise.resolve(true);
    }

    public update_user(user: User): Promise<User> {
        this.user_mock.users.forEach((user) => {
            if (user.id == user.id) {
                user = user;
            }
        });
        return Promise.resolve(user);
    }

    public get_user_by_email(email: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const user = this.user_mock.users.find(user => user.email === email);
            resolve(user || null);
        });
    }
}