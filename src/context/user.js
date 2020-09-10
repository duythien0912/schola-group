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
    times: [],
    error: '',
    getData() {
      return {
        email: store.email,
        name: store.name,
        phone: store.phone,
        topics: store.topics,
        times: store.times,
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
    setTopics(val) {
      store.topics = val;
    },
    setTimes(val) {
      store.times = val;
    },
    setError(val) {
      store.error = val;
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
