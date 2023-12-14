import AuthForm from "../../components/Authentication Page/AuthForm";

const AuthenticationPage = () => {
  return (
    <section className="flex flex-col h-screen pt-10 gap-16">
      <h1>Welcome to PetHealthApp!</h1>
      <AuthForm />
    </section>
  );
};

export default AuthenticationPage;
