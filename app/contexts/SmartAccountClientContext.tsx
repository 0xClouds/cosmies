// contexts/SmartAccountClientContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// interface SmartAccountClient {
//   // Define the methods and properties of your smartAccountClient here
// }

// interface SmartAccountContextType {
//   smartAccountClient: SmartAccountClient | null;
//   setSmartAccountClient: (client: SmartAccountClient | null) => void;
// }

// Creating the context with a default null value and ascribing the type
const SmartAccountClientContext = createContext("");

// Custom hook to use the context, with proper typing
export const useSmartAccountClient = () => {
  const context = useContext(SmartAccountClientContext);
  if (context === "")
    throw new Error(
      "useSmartAccountClient must be used within a SmartAccountClientProvider"
    );
  return context;
};

// Provider component with type for props
export const SmartAccountClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [smartAccountClient, setSmartAccountClient] = useState("");

  return (
    <SmartAccountClientContext.Provider
      value={{ smartAccountClient, setSmartAccountClient }}
    >
      {children}
    </SmartAccountClientContext.Provider>
  );
};
