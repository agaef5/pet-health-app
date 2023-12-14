import { Button, Card, Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../../../firebase-config";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AuthForm = () => {
  const [selected, setSelected] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMailInvalid, setMailInvalid] = useState(false);
  const [isPasswordInvalid, setPasswordInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputFocus = () => {
    // Clear error states and messages when the user starts typing
    setMailInvalid(false);
    setPasswordInvalid(false);
    setErrorMessage("");
  };

  const handleAuth = (e) => {
    e.preventDefault();

    setMailInvalid(false);
    setPasswordInvalid(false);
    setErrorMessage("");

    if (selected === "login") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem("currentUserUID", userCredential.user.uid);
          const userID = userCredential.user.uid;
          navigate(`/${userID}`);
        })
        .catch((error) => {
          handleAuthError(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          saveUser(userCredential.user.uid, email);

          localStorage.setItem("currentUserUID", userCredential.user.uid);
          const userID = userCredential.user.uid;
          navigate(`/${userID}`);
        })
        .catch((error) => {
          handleAuthError(error);
        });
    }
  };

  const handleProviderSignIn = () => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth).then((result) => {
      const user = result.user;
      const userID = user.uid;
      localStorage.setItem("currentUserUID", userID);
      navigate(`/${userID}`);
    });
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case "auth/email-already-exists":
        setMailInvalid(true);
        setErrorMessage("Email is already in use. Please choose another.");
        break;
      case "auth/invalid-email":
        setMailInvalid(true);
        setErrorMessage(
          "Invalid email format. Please enter a valid email address."
        );
        break;
      case "auth/invalid-password":
        setPasswordInvalid(true);
        setErrorMessage(
          "Invalid password. Password must have at least six characters."
        );
        break;
      case "auth/too-many-requests":
        setErrorMessage("Too many login attempts. Please try again later.");
        break;
      case "auth/user-not-found":
        setErrorMessage("User not found. Please check your credentials.");
        break;
      default:
        setErrorMessage(
          "User does not exist. Please create an account to continue."
        );
    }
  };

  async function saveUser(userID, email) {
    const userRef = doc(db, "users", userID);

    await setDoc(userRef, {
      email: email,
    });
  }

  return (
    <section>
      <Card className="flex flex-col gap-4 justify-center items-center p-5 max-w-xs mx-auto">
        <Tabs
          fullWidth
          size="lg"
          selectedKey={selected}
          onSelectionChange={(key) => {
            setSelected(key);
          }}
        >
          <Tab
            key={"login"}
            title="Login"
            aria-label="show login form"
            role="button"
          ></Tab>
          <Tab
            role="button"
            key={"createaccount"}
            title="Create Account"
            aria-label="show create account form"
          ></Tab>
        </Tabs>
        <h2>{selected === "login" ? "Log In" : "Create Account"}</h2>
        <form className="flex flex-col gap-4 w-full">
          <Input
            type="email"
            label="Email"
            id="email"
            onFocus={handleInputFocus}
            isInvalid={isMailInvalid}
            errorMessage={isMailInvalid && errorMessage}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            id="password"
            required
            onFocus={handleInputFocus}
            isInvalid={isPasswordInvalid}
            errorMessage={isPasswordInvalid && errorMessage}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button
                aria-label="Toggle password visibility"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />

          {errorMessage && !isMailInvalid && !isPasswordInvalid ? (
            <h3 className="text-danger-500">{errorMessage}</h3>
          ) : null}
          <Button
            size="lg"
            color="primary"
            className="font-semibold"
            onClick={handleAuth}
          >
            {selected === "login" ? "Log In" : "Create Account"}
          </Button>
        </form>

        <p>or</p>

        <Button
          size="lg"
          className="w-full bg-slate-100 text-zinc-800 font-semibold"
          onClick={handleProviderSignIn}
        >
          Continue with Google
        </Button>
      </Card>
    </section>
  );
};

export default AuthForm;
