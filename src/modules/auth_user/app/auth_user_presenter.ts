import { AuthUserUsecase } from './auth_user_usecase';
import { AuthUserController } from './auth_user_controller';

import { Repository } from '../../../core/repositories/Repository';
import { HttpRequest } from '../../../core/helpers/http/http_codes';

const repository = new Repository({user_repo: true, project_repo: false});

const usecase = new AuthUserUsecase(repository.UserRepo);
const controller = new AuthUserController(usecase);

export const handler = async (event: any, context: any) => {
    let request = new HttpRequest(event);
    let response  = await controller.execute(request);
    return response.to_json();
}