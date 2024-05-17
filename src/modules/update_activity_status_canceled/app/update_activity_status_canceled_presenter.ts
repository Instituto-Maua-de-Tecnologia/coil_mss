import { UpdateActivityStatusCanceledUsecase } from "./update_activity_status_canceled_usecase";
import { UpdateActivityStatusCanceledController } from "./update_activity_status_canceled_controller";
import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({ user_repo: true, activity_repo: true });

const usecase = new UpdateActivityStatusCanceledUsecase(repository.UserRepo, repository.ActivityRepo);
const controller = new UpdateActivityStatusCanceledController(usecase);

export const handler = async (event: any, context: any) => {
  const request = new HttpRequest(event);
  const response = await controller.execute(request);

  return response.to_json();
};
