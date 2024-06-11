import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export interface User {
  username: string;
  tokens: Tokens;
  sub: string;
  session: string;
  name?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false); // Tracks if hydration is done

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    setUser(storedUserData ? JSON.parse(storedUserData) : null);
    setIsHydrated(true); // Set hydration done after user is loaded
  }, []);

  if (!isHydrated) {
    return null; // or a loading spinner, or however you want to handle this case
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// export const UserProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     if (typeof window !== 'undefined') {
//       const storedUserData = localStorage.getItem('userData');
//       return storedUserData ? JSON.parse(storedUserData) : null;
//     }
//     return null;
//   });

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       if (user === null) {
//         localStorage.removeItem('userData');
//       } else {
//         localStorage.setItem('userData', JSON.stringify(user));
//       }
//     }
//   }, [user]);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

export const createUser = (username: string, fetchData: any): User => {
  const tokens = {
    accessToken: fetchData?.accessToken,
    refreshToken: fetchData?.refreshToken,
    idToken: fetchData?.idToken,
  };
  const name = fetchData?.name;
  const sub = fetchData?.sub;
  const session = fetchData?.session;
  return { username, tokens, sub, name, session };
};
