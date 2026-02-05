import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed } from "./user.action";

import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import { getCurrentUser } from "../../utils/firebase/firebase.utils";


export function* getSnapShotFromUserAuth(userAuth, additionalInformation) {

  try {
    const snapShot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation);
    yield put(signInSuccess({id: snapShot?.id, ...snapShot.data()}));
  } catch(error) {
    yield put(signInFailed(error));
  }
}

export function* isAuthenticatedUser() {

  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return userAuth;
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch(error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession () {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isAuthenticatedUser);
}

export function* userSagas() {
  yield all([call(onCheckUserSession)]);
} 