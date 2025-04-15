import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

// Get your Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Wrap your application with ClerkProvider
export const ClerkProviderWithRoutes = ({ children }) => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      {children}
    </ClerkProvider>
  );
};

// Export authentication components
export { SignIn, SignUp, SignedIn, SignedOut, UserButton };
