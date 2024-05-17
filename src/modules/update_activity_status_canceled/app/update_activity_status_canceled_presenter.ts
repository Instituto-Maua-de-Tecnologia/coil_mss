import { OK, Unauthorized, Forbidden, NotFound, InternalServerError, BadRequest } from "../../../core/helpers/http/http_codes";
import { UserNotAuthenticated, UserNotAllowed, InvalidRequest, MissingParameter } from "../../../core/helpers/errors/ModuleError";
import { UpdateActivityStatusCanceledUsecase } from "./update_activity_status_canceled_usecase";
import { UpdateActivityStatusCanceledController } from "./update_activity_status_canceled_controller";
import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

class UpdateActivityStatusCanceledPresenter {
  present(activity) {
    return new OK(activity.to_json(), "Activity status updated to CANCELED");
  }

  handleError(error) {
    if (error instanceof UserNotAuthenticated) {
      return new Unauthorized("User not authenticated");
    }
    if (error instanceof UserNotAllowed) {
      return new Forbidden("User not allowed");
    }
    if (error.message === "Activity not found") {
      return new NotFound("Activity not found");
    }
    if (error instanceof InvalidRequest || error instanceof MissingParameter) {
      return new BadRequest(error.message);
    }
    return new InternalServerError("An unexpected error occurred");
  }
}

const repository = new Repository({ user_repo: true, activity_repo: true });
const userRepo = repository.UserRepo;
const activityRepo = repository.ActivityRepo;

const usecase = new UpdateActivityStatusCanceledUsecase(userRepo, activityRepo);
const presenter = new UpdateActivityStatusCanceledPresenter();
const controller = new UpdateActivityStatusCanceledController(usecase, presenter);

const handler = async (event: any) => {
  const request = new HttpRequest(event);
  const response = await controller.execute(request);
  return response.to_json();
};

export { UpdateActivityStatusCanceledPresenter, handler };
