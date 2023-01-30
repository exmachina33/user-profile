import {
    createUserWithEmailAndPassword,
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    updateEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";

async function reAuthUser (data) {
    const { email, password } = data
    const auth = getAuth();
    const user = auth.currentUser;
    try {
        const credential = EmailAuthProvider.credential(email, password)
        await  reauthenticateWithCredential(user, credential)
    } catch (error) {
        console.log('reAuthUser err', data)
        throw error
    }
}

export async function registrationUser (data) {
    const { email, password } = data;
    try {
        const auth = await getAuth();
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user
        localStorage.setItem("userUid", JSON.stringify(user.uid));
        return user
    } catch (error) {
        throw error
    }
}

export async function authUser (data) {
    const { email, password } = data
    try {
        const auth = await getAuth();
        await setPersistence(auth, browserLocalPersistence)
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = response.user;
        if (!user) return;
        localStorage.setItem("userUid", JSON.stringify(user.uid));
        return user;
    } catch (error) {
        console.log(error.message)
    }
}

export async function resetEmail (data) {
    const { email, password, newEmail } = data;
    const auth = await getAuth();
    try {
        await reAuthUser({ password: password, email: email });
        await updateEmail(auth.currentUser, newEmail);
    } catch (error) {
        console.log('resetEmail err', data)
        throw error;
    }
}

export async function resetPassword (data) {
    const { email, password, newPassword } = data;
    const auth = await getAuth();
    try {
        await reAuthUser({ password: password, email: email });
        await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
        console.log('resetPassword err', data)
        throw error;
    }
}

export async function signOutUser () {
    localStorage.removeItem('userUid')
    const auth = getAuth();
    await signOut(auth)
}