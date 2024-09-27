import { Socket } from 'socket.io'
import { getIO } from '~/configs/socket.config'
import authSocket from './authSocket'
import onlineUsersEvent from './events/online-users'
import { disconnectEvent } from './events/disconnect'

const io = getIO()
