import { Box, Heading, Text } from "@chakra-ui/react";
import { SignUp } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    navigate("/sign-in"); // Redirect to sign-in page after successful sign-up
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
        Create your account
      </Heading>
      <Box 
        width={{ base: "90%", sm: "400px" }} 
        bg="white" 
        p={8} 
        borderRadius="lg" 
        boxShadow="lg"
      >
        <SignUp onSuccess={handleSignUpSuccess} />
      </Box>
      <Text mt={4} fontSize="sm" color="gray.600">
        Already have an account? <Link to="/sign-in" style={{ color: "purple.600", fontWeight: "bold" }}>Sign in</Link>
      </Text>
    </Box>
  );
}

export default SignUpPage;
