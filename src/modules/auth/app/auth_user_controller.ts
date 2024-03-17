import { AuthUserUsecase } from './auth_user_usecase';

import { EntityError } from '../../../core/helpers/errors/EntityError';
import { Created, HttpRequest, HttpResponse, OK } from '../../../core/helpers/http/http_codes';
import { InvalidParameter, InvalidRequest } from '../../../core/helpers/errors/ModuleError';
import { BadRequest, ParameterError, InternalServerError } from '../../../core/helpers/http/http_codes';


export class AuthUserController {
    usecase: AuthUserUsecase;

    constructor(usecase: AuthUserUsecase) {
        this.usecase = usecase;
    }
    async execute(request: HttpRequest): Promise<HttpResponse>  {
        try {
            if (!request) {
                throw new InvalidRequest();
            }
            if (!request.headers) {
                throw new InvalidRequest();
            }

            let response =  await this.usecase.execute(request.headers)

            if (response.created_user) {
                return new Created(response, "User created successfully");
            }
            return new OK(response, "User authenticated successfully");     

        } catch (error) {
            if (error instanceof EntityError) {
                return new BadRequest(error.message);
            }
            if (error instanceof InvalidRequest) {
                return new BadRequest(error.message);
            }
            if (error instanceof InvalidParameter) {
                return new ParameterError(error.message);
            }
            return new InternalServerError(error.message);
        }
    }
}