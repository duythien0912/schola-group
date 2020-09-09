import React, { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    data: {},
    email: '',
    name: '',
    phone: '',
    topics: [],
    getData() {
      return {
        email: store.email,
        name: store.email,
        phone: store.email,
      };
    },
    setEmail(val) {
      store.email = val;
    },
    setName(val) {
      store.name = val;
    },
    setPhone(val) {
      store.phone = val;
    },
    // setData(val) {
    //   store.data = val;
    // },
    // cleanData() {
    //   store.data = null;
    // },
  }));

  return <userContext.Provider value={store}>{children}</userContext.Provider>;
};
