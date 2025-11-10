import { createContext, useContext, useState } from "react";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <HomeContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHome = () => useContext(HomeContext);
