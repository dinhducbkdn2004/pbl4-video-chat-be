import { IPagination } from '~/common/pagination.interface'
import { GroupRequestStatus } from './groupRequest.model'

export interface getAllRequestDto extends IPagination {
    chatRoomId: string
}
export interface createRequestDto {
    chatRoomId: string

    message: string
}
export interface updateRequestDto {
    status: GroupRequestStatus
}
