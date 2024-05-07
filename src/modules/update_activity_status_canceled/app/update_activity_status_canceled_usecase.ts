import { UserNotAllowed, InvalidRequest, MissingParameter, UserNotAuthenticated } from "../../../core/helpers/errors/ModuleError";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";

class UpdateActivityStatusCanceledUsecase {
  private token_auth: TokenAuth;
  private user_repo: IUserRepo;
  private activity_repo: IActivityRepo;

  constructor(user_repo: IUserRepo, activity_repo: IActivityRepo) {
    this.token_auth = new TokenAuth();
    this.user_repo = user_repo;
    this.activity_repo = activity_repo;
  }

  public async execute(headers: { [key: string]: any }, body: { [key: string]: any }) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
    if (!body) {
      throw new InvalidRequest("Body");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }
    if (!body.activity_id) {
      throw new MissingParameter("Activity ID");
    }

    const user_id = await this.token_auth
      .decode_token(headers.Authorization)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new UserNotAuthenticated("Invalid or expired token");
      });

    const user = await this.user_repo.get_user(user_id);
    if (!user) {
      throw new UserNotAuthenticated();
    }

    const user_types_allowed = [UserTypeEnum.ADMIN, UserTypeEnum.MODERATOR];
    if (!user_types_allowed.includes(user.user_type)) {
      throw new UserNotAllowed();
    }

    const activity = await this.activity_repo.get_activity(body.activity_id);
    if (!activity) {
      throw new Error("Activity not found");
    }

    activity.status_activity = ActivityStatusEnum.CANCELED;
    await this.activity_repo.update_activity(activity);

    return activity;
  }
}

export { UpdateActivityStatusCanceledUsecase };