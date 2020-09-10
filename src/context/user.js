import React, { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    data: {},
    id: '',
    email: '',
    name: '',
    phone: '',
    topics: [],
    times: [],
    error: '',
    getData() {
      return {
        id: store.id,
        email: store.email,
        name: store.name,
        phone: store.phone,
        topics: store.topics,
        times: store.times,
      };
    },
    setId(val) {
      store.id = val;
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
