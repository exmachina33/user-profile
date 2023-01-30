import {getDatabase, push, ref, set,child, get} from "firebase/database";

export async function setProfile(data) {
    const { profile, uid } = data
    const db = getDatabase()
    const result = await push(ref(db,`profiles/${uid}`), profile)
}

export async function resetProfile(data) {
    const { profile, uid, key } = data
    const db = getDatabase()
    await set(ref(db,`profiles/${uid}/${key}`), profile)
}

export async function fetchProfile(uid) {
    const dbRef = ref(getDatabase());
    const res = await get(child(dbRef, `profiles/${uid}`))
    const data = await res.val()
    const key = Object.keys(data)[0]
    const userData = {
        profile: data[key],
        key: key
    }
    return userData
}