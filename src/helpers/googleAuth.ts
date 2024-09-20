import { OAuth2Client } from 'google-auth-library'
import envServer from '../configs/env'

const client = new OAuth2Client(envServer.GOOGLE_OATH_CLIENT_ID)
const googleAuth = async (cridential: string) => {
    const ticket = await client.verifyIdToken({
        idToken: cridential,
        audience: envServer.GOOGLE_OATH_CLIENT_ID
    })
    const payload = ticket.getPayload()

    return payload
}
export default googleAuth
