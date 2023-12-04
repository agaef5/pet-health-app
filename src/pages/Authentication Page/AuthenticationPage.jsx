import { useState } from "react";
import AuthForm from "../../components/Authentication Page/AuthForm";

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div>
      <AuthForm isLogin={isLogin} />
      <p onClick={toggleAuthMode}>
        {isLogin ? "Create an account" : "Already have an account? Log in"}
      </p>
    </div>
  );
};

export default AuthenticationPage;
