import { createSignalAction } from "./utils"

export const getUserInfo = createSignalAction("USER_INFORMATION", "GET_USER_INFO")
export const getUserById = createSignalAction("USER_INFORMATION", "GET_USER_BY_ID")
export const updateUserDetails = createSignalAction("BANNER_INFORMATION", "UPDATE_USER_INFO")
