import { OK, Unauthorized, Forbidden, NotFound, InternalServerError } from "../../../core/helpers/http/http_codes";
import { UserNotAuthenticated, UserNotAllowed } from "../../../core/helpers/errors/ModuleError";

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
    return new InternalServerError("An unexpected error occurred");
  }
}

export { UpdateActivityStatusCanceledPresenter };