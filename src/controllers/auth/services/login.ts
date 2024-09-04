import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../helpers/jwtToken";
import userModel from "../../../models/user.model";

const login = async (
  email: string,
  password: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const user = await userModel.findOne({
    email: email,
  });

  if (user === null) throw "Not found your account!";

  // if (user.account.isVerified === false)
  //     return responseHandler.badRequest(
  //         res,
  //         "Please verify your account!"
  //     );

  // if ((await comparePassword(password, user.account.password)) === false)
  //     return responseHandler.notFound(res, "Wrong password!");
  const accessToken = generateAccessToken({ userId: user._id });
  const refreshToken = generateRefreshToken({ userId: user._id });

  return {
    accessToken,
    refreshToken,
  };
};
export default login;
