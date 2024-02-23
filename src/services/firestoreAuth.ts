import { auth } from '@/firebase/init'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type UserCredential
} from 'firebase/auth'

const getUser = () => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('login_required')
    };
    return user;
}

export const signUpUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log('In firestoreAuth signUpUser', userCredential)
    if (userCredential.user) {
      await sendEmailVerification(userCredential.user)
    }
    return userCredential
  } catch (err) {
    console.error('ARGH! signUpUser', err)
    throw err
  }
}

type FirebaseUserUpdate = {
    displayName?: string | null;
    photoURL?: string | null;
}
export const updateUser = async (updates: FirebaseUserUpdate) => {
    try {
        let user = getUser();
        await updateProfile(user, updates);
        user = getUser();
        return user;
    } catch (err) {
        console.error('Update User failed', err);
        throw err;
    }
}

export const resendEmailVerification = async () => {
    const user = auth.currentUser;

    if (!user) {
        console.warn('No authenticated user found');
        // @TODO probably create a custom error
        throw new Error('Login required')
    };

    await sendEmailVerification(user).catch(reason => {
        console.error('sendEmailVerification in resendEmailVerification failed', reason);
    });
}

export const getAuthToken = async (forceRefresh = false): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;

    const token = user.getIdToken(forceRefresh);
    return token;
}
