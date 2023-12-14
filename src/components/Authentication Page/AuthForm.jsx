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
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleAuth = (e) => {
    e.preventDefault();

    if (selected === "login") {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          localStorage.setItem("currentUserUID", userCredential.user.uid);
          const userID = userCredential.user.uid;
          navigate(`/${userID}`);
        }
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          saveUser(userCredential.user.uid, email);

          localStorage.setItem("currentUserUID", userCredential.user.uid);
          const userID = userCredential.user.uid;
          navigate(`/${userID}`);
        }
      );
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
          <Tab key={"login"} title="Login"></Tab>
          <Tab key={"createaccount"} title="Create Account"></Tab>
        </Tabs>
        <h2>{selected === "login" ? "Log In" : "Create Account"}</h2>
        <form className="flex flex-col gap-4 w-full">
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
                {isVisible ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
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
