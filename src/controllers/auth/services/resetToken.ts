import {
    generateAccessToken,
    verifyRefreshToken,
} from "../../../helpers/jwtToken";

export default function resetToken(refreshToken: string) {
    const decodeToken = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(
        typeof decodeToken === "string" ? decodeToken : decodeToken.data
    );

    return newAccessToken;
}
