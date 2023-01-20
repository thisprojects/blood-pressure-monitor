import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { SingleBpRecord } from "../models/bloodPressureModels";

interface IUserContext {
  userId: string;
  token: string;
  date: string;
  bloodPressureRecords: Array<SingleBpRecord>;
  userDetails: {
    fname: string;
    lname: string;
    date: string;
    dateRange: {
      startDate: Date;
      endDate: Date;
    };
  };
}

const context = createContext({
  userCredentials: {
    userId: "",
    token: "",
    date: "",
    bloodPressureRecords: [] as Array<SingleBpRecord>,
    userDetails: {
      date: "",
      fname: "",
      lname: "",
      dateRange: { startDate: new Date(), endDate: new Date() },
    },
  },
  setUserCredentials: (() => {}) as Dispatch<SetStateAction<IUserContext>>,
});

export const UserContext = () => useContext(context);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userCredentials, setUserCredentials] = useState<IUserContext>({
    userId: "",
    token: "",
    date: "",
    bloodPressureRecords: [],
    userDetails: {
      date: "",
      fname: "",
      lname: "",
      dateRange: { startDate: new Date(), endDate: new Date() },
    },
  });

  return (
    <context.Provider value={{ userCredentials, setUserCredentials }}>
      {children}
    </context.Provider>
  );
};

export default UserContextProvider;
