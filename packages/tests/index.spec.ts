import { describe, expect, it } from "vitest";
import { ErrorHandler } from "./axios";

const BACKEND_URL = "http://localhost:3000";

const USERNAME_1 = "om@gmail.com";
const PASSWORD_1 = "123456";

describe("SignUp endpoint", () => {
  it("Double sign up should fail", async () => {
    const response = await ErrorHandler.post(
      `${BACKEND_URL}/api/v1/auth/signup`,
      {
        email: USERNAME_1,
        password: PASSWORD_1,
      },
    );

    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual({
      message: "User created successfully",
    });
  });
});
