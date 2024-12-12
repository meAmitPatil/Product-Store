import { Box, useColorModeValue, Spinner } from "@chakra-ui/react"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import SignInPage from "./pages/SignInPage"
import SignupPage from "./pages/SignupPage"
import Navbar from "./components/Navbar"
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const location = useLocation();

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  // Check if current route is sign-in or sign-up
  const isAuthPage = ['/sign-in', '/sign-up'].includes(location.pathname);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box minH={"100vh"} bg={bgColor}>
      {!isAuthPage && <Navbar />}  {/* Only show Navbar if not on auth pages */}
      
      {!isAuthPage && (
        <header style={{ padding: '1rem', textAlign: 'right' }}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      )}

      <Routes>
        <Route path="/" element={isSignedIn ? <HomePage /> : <Navigate to="/sign-up" />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in/sso-callback" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  )
}

export default App
