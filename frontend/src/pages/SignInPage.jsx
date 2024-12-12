import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    navigate("/");
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <SignIn onSuccess={handleSignInSuccess} />
    </div>
  );
}

export default SignInPage;
