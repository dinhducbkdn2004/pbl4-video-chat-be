import googleAuth from '../../../../helpers/googleAuth'
import { generateAccessToken, generateRefreshToken } from '../../../../helpers/jwtToken'
import userModel from '../../user/user.model'

const loginByGoogle = async (credential: string) => {
    const data = await googleAuth(credential)
    if (!data) throw 'Không thể đăng nhập bằng google'
    const user = await userModel.findOne({ email: data.email })
    if (user)
        return {
            accessToken: generateAccessToken({ userId: user._id }),
            refreshToken: generateRefreshToken({ userId: user._id })
        }

    const newUser = await userModel.create({
        email: data.email,
        name: data.name,
        avatar: data.picture,
        account: {
            loginType: 'GOOGLE',
            isVerified: true
        }
    })
    return {
        accessToken: generateAccessToken({ userId: newUser._id }),
        refreshToken: generateRefreshToken({ userId: newUser._id })
    }
}

export default loginByGoogle
