import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { UpdateActivityStatusCanceledUsecase } from "./update_activity_status_canceled_usecase";
import { UpdateActivityStatusCanceledPresenter } from "./update_activity_status_canceled_presenter";

class UpdateActivityStatusCanceledController {
  private usecase: UpdateActivityStatusCanceledUsecase;
  private presenter: UpdateActivityStatusCanceledPresenter;

  constructor(usecase: UpdateActivityStatusCanceledUsecase, presenter: UpdateActivityStatusCanceledPresenter) {
    this.usecase = usecase;
    this.presenter = presenter;
  }

  async execute(request: HttpRequest) {
    try {
      const activity = await this.usecase.execute(request.headers, request.body);
      return this.presenter.present(activity);
    } catch (error) {
      return this.presenter.handleError(error);
    }
  }
}

export { UpdateActivityStatusCanceledController };