import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {getAuth} from "firebase/auth";


export async function uploadImage(data) {
    const { image, uid } = data;
    if(!uid) return
    const storage = getStorage();
    const storageRef = ref(storage, `${uid}/images/${image.name}`);
    const uploadTask = await uploadBytes(storageRef, image)
    const taskUrl = await getDownloadURL(uploadTask.ref)
    return {name: image.name, url: taskUrl}
}

export async function deleteImage(file) {
    const auth = await getAuth();
    const uid = auth.currentUser.uid;
    if(!uid) return
    const storage = getStorage();
    const storageRef = ref(storage, `${uid}/images/${file.name}`);
    await deleteObject(storageRef)
}