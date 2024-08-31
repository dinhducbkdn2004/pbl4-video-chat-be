import { Request, Response, Router } from "express";
import authInputDto from "./dtos/authValidation";
import { validateHandler } from "../../handlers/validation.handler";
import responseHandler from "../../handlers/response.handler";
import authService from "./services/auth.service";
import { authenticate } from "../../middlewares/auth.middleware";
import {
    ChangePasswordBody,
    CheckOtpBody,
    LoginBody,
    LoginByGoogleBody,
    RegisterBody,
    ResetTokenBody,
} from "./dtos/auth.dto";

const authRoute: Router = Router();

authRoute.post(
    "/login",
    authInputDto.validateLogin,
    validateHandler,
    async (req: Request<{}, {}, LoginBody>, res: Response) => {
        try {
            const { email, password } = req.body;
            const data = await authService.login(email, password);
            responseHandler.ok(res, data, "Đăng nhập thành công");
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

authRoute.post(
    "/register",
    authInputDto.validateRegister,
    validateHandler,
    async (req: Request<{}, {}, RegisterBody>, res: Response) => {
        try {
            const email = await authService.register(req.body);
            responseHandler.ok(
                res,
                { email },
                `Đăng kí thành công, vui lòng sử dụng mã OTP đã gửi về email ${email} để xác thực tài khoản`
            );
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

authRoute.put(
    "/reset-token",
    async (req: Request<{}, {}, ResetTokenBody>, res: Response) => {
        try {
            const { refreshToken } = req.body;
            const newAccessToken = authService.resetToken(refreshToken);
            responseHandler.ok(
                res,
                { accessToken: newAccessToken },
                "Get new access token successfully!"
            );
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

authRoute.put(
    "/change-password",
    authenticate,
    async (req: Request<{}, {}, ChangePasswordBody>, res: Response) => {
        try {
            const { newPassword } = req.body;
            const { userId } = (req as any).user;
            await authService.changePassword(newPassword, userId);
            responseHandler.ok(res, {}, "Change password successfully!");
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

authRoute.put(
    "/forgot-password",
    async (req: Request<{}, {}, ChangePasswordBody>, res: Response) => {
        try {
            const { email } = req.body;
            await authService.forgotPassword(email);
            responseHandler.ok(
                res,
                {
                    email,
                },
                `Hệ thống đã gửi mã OTP đến tài khoản ${email}. Hãy xác thực tài khoản bằng mã OTP đó!`
            );
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);
authRoute.put(
    "/check-otp",
    async (req: Request<{}, {}, CheckOtpBody>, res: Response) => {
        try {
            const { otp, email } = req.body;
            const data = await authService.checkOtp(otp, email);
            responseHandler.ok(res, data, "Xác thực OTP thành công!");
        } catch (error) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

authRoute.post(
    "/oauth2/google",
    async (req: Request<{}, {}, LoginByGoogleBody>, res: Response) => {
        try {
            const { credential } = req.body;
            const data = await authService.loginByGoogle(credential);
            return responseHandler.ok(res, data, "Đăng nhập thành công");
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

export default authRoute;
