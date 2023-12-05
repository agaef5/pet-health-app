import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../../../firebase-config";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import PropTypes from "prop-types";
import { doc, setDoc } from "firebase/firestore";

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleAuth = (e) => {
    e.preventDefault();

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          navigate("/home");
          localStorage.setItem("currentUserUID", userCredential.user.uid);
        }
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          saveUser(userCredential.user.uid, email);
          navigate("/home");
          localStorage.setItem("currentUserUID", userCredential.user.uid);
        }
      );
    }
  };

  const handleProviderSignIn = () => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth).then(() => {
      navigate("/home");
    });
  };

  async function saveUser(userID, email) {
    const userRef = doc(db, "users", userID);

    await setDoc(userRef, {
      email: email,
    });
  }

  return (
    <section>
      <div>
        <h2>{isLogin ? "Log In" : "Create Account"}</h2>
        <form>
          <Input
            type="email"
            label="Email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {/* Toggle visibility icon */}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <Button onClick={handleAuth}>
            {isLogin ? "Log In" : "Create Account"}
          </Button>
        </form>
        <>
          <p>or</p>
          <p>{isLogin ? "Log In with" : "Create Account with"}</p>
        </>
        <Button onClick={handleProviderSignIn}>Google</Button>
      </div>
    </section>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default AuthForm;
