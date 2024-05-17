import { it, describe, expect } from 'vitest';
import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';
import { handler } from '../../../../src/modules/update_activity_status_canceled/app/update_activity_status_canceled_presenter';
import { ActivityMock } from '../../../../src/core/structure/mocks/ActivityMock';

describe("Update Activity Status Canceled Presenter", () => {
  const user_admin = new UserMock().users[0];
  const user_student = new UserMock().users[1];
  const user_moderator = new UserMock().users[2];

  it("Should return a success message", async () => {
    let activities = new ActivityMock().activities;
    let activity = activities[0];
    let token = (await new TokenAuth().generate_token(user_admin.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        activity_id: activity.id,
      }),
    };
    const response = await handler(event);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Activity status updated to CANCELED");
  });

  it("Should return a not found error", async () => {
    let token = (await new TokenAuth().generate_token(user_admin.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        activity_id: "invalid_id",
      }),
    };
    const response = await handler(event);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body).message).toBe("Activity not found");
  });

  it("Shouldn't update activity status if user is not an admin", async () => {
    let activities = new ActivityMock().activities;
    let activity = activities[0];
    let token = (await new TokenAuth().generate_token(user_student.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        activity_id: activity.id,
      }),
    };
    const response = await handler(event);
    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body).message).toBe("User not allowed");
  });
});
