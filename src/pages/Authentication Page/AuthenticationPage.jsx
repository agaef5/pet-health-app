import { useEffect, useState } from "react";
import AuthForm from "../../components/Authentication Page/AuthForm";
import WideScreenOverride from "../../components/Wide Screen/WideScreenOverride";

const AuthenticationPage = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 500);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 500);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      {isWideScreen ? (
        <WideScreenOverride />
      ) : (
        // Render the Outlet and NavigationBar for narrow screens
        <section className="flex flex-col h-screen pt-10 gap-16">
          <h1>Welcome to PetHealthApp!</h1>
          <AuthForm />
        </section>
      )}
    </section>
  );
};

export default AuthenticationPage;
