import LoginForm from "@/app/components/Login/LoginForm";
import SignupLink from "@/app/components/Login/SignupLink";
import Welcom from "@/app/components/Login/Welcome";

const page = () => {
  return (
    <div>
      <Welcom />
      <LoginForm />
      <SignupLink />
    </div>
  );
};

export default page;
