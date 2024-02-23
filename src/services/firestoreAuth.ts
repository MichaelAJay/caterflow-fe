import { auth } from '@/firebase/init'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
  type UserCredential
} from 'firebase/auth'

export const getUser = (throwOnNullUser: boolean) => {
  const user = auth.currentUser
  if (user === null && throwOnNullUser) {
    throw new Error('login_required')
  }
  return user
}

const refreshUser = async () => {
  const user = getUser(true)

  // This check is here only to make TS behave
  // getUser would throw if user was null
  if (user === null) {
    throw new Error('login_required')
  }

  await user.reload()
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

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (err.code === FirebaseErrorCode.InvalidCredential) {
        return { failed: 'Invalid username or password' }
      }
      // Include other FirebaseError handling here as needed
    }

    console.error('Unknown login error', err)
    throw err
  }
}

type FirebaseUserUpdate = {
  displayName?: string | null
  photoURL?: string | null
}
export const updateUser = async (updates: FirebaseUserUpdate) => {
  try {
    let user = getUser(true) as User;



    await updateProfile(user, updates)
    user = getUser(true) as User;
    return user
  } catch (err) {
    console.error('Update User failed', err)
    throw err
  }
}

export const resendEmailVerification = async () => {
  const user = auth.currentUser

  if (!user) {
    console.warn('No authenticated user found')
    // @TODO probably create a custom error
    throw new Error('Login required')
  }

  try {
    await sendEmailVerification(user)
  } catch (err) {
    console.error('sendEmailVerification in resendEmailVerification failed', err)
  }
}

export const getAuthToken = async (forceRefresh = false): Promise<string | null> => {
  const user = auth.currentUser
  if (!user) return null

  const token = user.getIdToken(forceRefresh)
  return token
}

export const isUserEmailVerified = async () => {
  await refreshUser()
  const user = getUser(true) as User; 
  return user.emailVerified
}

const FirebaseErrorCode = {
  InvalidCredential: 'auth/invalid-credential'
}
