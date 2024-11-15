import { SignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

function SignInPage() {
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    navigate("/"); // Redirect to the homepage after successful sign-in
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh" 
      bg="gray.50" 
      p={4}
    >
      <Heading as="h1" size="lg" color="purple.600" mb={2}>
        Product Store
      </Heading>
      <Heading as="h2" size="md" color="gray.700" mb={6}>
        Welcome back! Please sign in to continue.
      </Heading>
      <Box 
        width={{ base: "90%", sm: "400px" }} 
        bg="white" 
        p={8} 
        borderRadius="lg" 
        boxShadow="lg"
      >
        <SignIn onSuccess={handleSignInSuccess} />
      </Box>
      <Text mt={4} fontSize="sm" color="gray.600">
        Don’t have an account? <Link to="/sign-up" style={{ color: "purple.600", fontWeight: "bold" }}>Sign up</Link>
      </Text>
    </Box>
  );
}

export default SignInPage;
