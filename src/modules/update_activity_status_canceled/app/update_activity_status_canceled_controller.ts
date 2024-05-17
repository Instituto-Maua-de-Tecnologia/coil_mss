import {
  InvalidRequest,
  MissingParameter,
  UserNotAllowed,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import {
  BadRequest,
  Forbidden,
  HttpRequest,
  InternalServerError,
  NotFound,
  OK,
  Unauthorized,
  ParameterError,
} from "../../../core/helpers/http/http_codes";
import { UpdateActivityStatusCanceledUsecase } from "./update_activity_status_canceled_usecase";

class UpdateActivityStatusCanceledController {
  private usecase: UpdateActivityStatusCanceledUsecase;

  constructor(usecase: UpdateActivityStatusCanceledUsecase) {
    this.usecase = usecase;
  }

  public async execute(request: HttpRequest) {
    try {
      if (!request) {
        throw new InvalidRequest();
      }

      if (!request.headers) {
        throw new InvalidRequest("Headers");
      }

      if (!request.body) {
        throw new InvalidRequest("Body");
      }

      const updatedActivity = await this.usecase.execute(request.headers, request.body.body);
      return new OK(updatedActivity.to_json(), "Activity status updated to CANCELED");
    } catch (error) {
      console.error('Error executing UpdateActivityStatusCanceledController:', error);
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message);
      }
      if (error instanceof UserNotAuthenticated) {
        return new Unauthorized(error.message);
      }
      if (error instanceof UserNotAllowed) {
        return new Forbidden(error.message);
      }
      if (error.message === "Activity not found") {
        return new NotFound(error.message);
      }
      if (error instanceof MissingParameter) {
        return new ParameterError(error.message);
      }
      return new InternalServerError(error.message);
    }
  }
}


export { UpdateActivityStatusCanceledController };
