import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Check if Firebase is already initialized
      const apps = getApps();
      if (apps.length === 0) {
        // Initialize Firebase if not already initialized
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            localStorage.setItem("authUser", JSON.stringify(user));
          } else {
            localStorage.removeItem("authUser");
          }
        });
      }
    }
  }

  /**
   * Registers the user with given details
   */
  registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(
          user => {
            resolve(user.user);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Registers the user with given details
   */
  editProfileAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(
          user => {
            resolve(user.user);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Login user with given details
   */
  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(
          user => {
            resolve(user.user);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * forget Password user with given details
   */
  forgetPassword = email => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email, {
        url: window.location.protocol + "//" + window.location.host + "/login"
      })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Social Login user with given details
   */

  socialLoginUser = async (type) => {
    let provider;
    const auth = getAuth();
    if (type === "google") {
        provider = new GoogleAuthProvider();
    } else if (type === "facebook") {
        provider = new FacebookAuthProvider();
    }
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    } catch (error) {
        throw this._handleError(error);
    }
};


  addNewUserToFirestore = (user) => {
    const db = getFirestore();
    const { profile } = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name ? profile.given_name : profile.first_name,
      lastName: profile.family_name ? profile.family_name : profile.last_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: serverTimestamp(),
      lastLoginTime: serverTimestamp()
    };
    setDoc(doc(db, "users", user.user.uid), details);
    return { user, details };
  };

  setLoggeedInUser = user => {
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!localStorage.getItem("authUser")) return null;
    return JSON.parse(localStorage.getItem("authUser"));
  };

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }
}

let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = config => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };
