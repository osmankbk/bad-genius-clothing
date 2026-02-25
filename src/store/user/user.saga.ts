import { takeLatest, put, all, call } from "typed-redux-saga";

import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed, signUpFailed, signUpSuccess, signOutFailed, signOutSuccess, EmailSignInStart, SignUpStart, SignUpSuccess } from "./user.action";

import { createUserDocumentFromAuth, signAuthUserWithEmailAndPassword, signInWithGooglePopUp, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";

import { getCurrentUser, AdditionalInformation } from "../../utils/firebase/firebase.utils";

import { User } from "firebase/auth";


export function* getSnapShotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) {

  try {
    const snapShot = yield* call(createUserDocumentFromAuth, userAuth, additionalInformation);
    if (snapShot) yield* put(signInSuccess({id: snapShot.id, ...snapShot.data()}));
  } catch(error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isAuthenticatedUser() {

  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return userAuth;
    yield* call(getSnapShotFromUserAuth, userAuth);
  } catch(error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* onSignAuthUserWithEmailAndPassword({ payload: { email, password }}: EmailSignInStart) {
  try {
    const userCredentials = yield* call(signAuthUserWithEmailAndPassword, 
      email, 
      password
    );
    if (userCredentials) {
      const { user } = userCredentials;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle () {
  try {
    const { user } = yield* call(signInWithGooglePopUp);
    yield* call(getSnapShotFromUserAuth, user);
  } catch(error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUpWithEmail({payload: { email, password, displayName }}: SignUpStart) {
  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch(error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signinAfterSignUp({ payload: { user, additionalDetails }}: SignUpSuccess ) {
  yield* call(getSnapShotFromUserAuth, user, additionalDetails); 
}


export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch(error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail)
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signinAfterSignUp);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailAndPasswordSigninStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, onSignAuthUserWithEmailAndPassword);
}

export function* onSignOutStart () {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession () {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isAuthenticatedUser);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession), 
    call(onGoogleSignInStart), 
    call(onEmailAndPasswordSigninStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ]);
} 