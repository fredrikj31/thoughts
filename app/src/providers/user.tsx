import { createContext, useContext } from "react";
import { useGetLoggedInUser } from "../api/users/getLoggedInUser/useGetLoggedInUser";
import { User } from "../types/user";

type UserProviderProps = {
  children: React.ReactNode;
};

type UserProviderState = {
  user: User | undefined;
  isLoading: boolean;
};

const UserContext = createContext<UserProviderState>({
  user: undefined,
  isLoading: false,
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data, isFetching } = useGetLoggedInUser();

  return (
    <UserContext.Provider value={{ user: data, isLoading: isFetching }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
