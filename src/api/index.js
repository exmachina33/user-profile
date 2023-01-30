import {deleteImage, uploadImage} from "@/api/firebase/storage";
import {authUser, registrationUser, resetEmail, resetPassword, signOutUser} from "@/api/firebase/auth";
import {fetchProfile, resetProfile, setProfile} from "@/api/firebase/db";

export const createUser = data => registrationUser(data)
export const loginUser = data => authUser(data)
export const logoutUser = () => signOutUser()
export const saveImage = data => uploadImage(data)
export const removeImage = data => deleteImage(data)
export const createProfile = data => setProfile(data)
export const getProfile = data => fetchProfile(data)
export const updateProfile = data => resetProfile(data)
export const updateEmail = data => resetEmail(data)
export const updatePassword = data => resetPassword(data)
