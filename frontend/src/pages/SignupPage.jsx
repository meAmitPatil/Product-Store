import { SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    navigate("/sign-in");
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <SignUp onSuccess={handleSignUpSuccess} />
    </div>
  );
}

export default SignUpPage;
