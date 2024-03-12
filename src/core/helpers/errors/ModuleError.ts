import { MainError } from "./MainError";


export class InvalidRequest extends MainError {
    constructor() {
        super("No request found.");
    }
}

export class InvalidParameter extends MainError {
    constructor(parameter: string, value: string) {
        super(`Invalid parameter: ${parameter}: ${value}`);
    }
}

export class MissingParameter extends MainError {
    constructor(parameter: string) {
        super(`Missing parameter: ${parameter}`);
    }
}

export class UserNotAuthenticated extends MainError {
    constructor(message?: string) {
        if (message) {
            super(message);
        } else {
            super("User not authenticated.");
        }
    }
}