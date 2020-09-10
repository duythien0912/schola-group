import React, { createContext } from 'react';
import { useLocalStore, useStaticRendering } from 'mobx-react-lite';

export const userContext = createContext();

const isServer = typeof window === 'undefined';
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer);

export const UserProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    homeTopic: [
      {
        tagId: 1,
        tagName: 'Loading 🧭',
        tagDesc: 'Loading...!',
        tagAction: 'Loading',
        image: '/static/images/loading-image.gif',
      },
    ],
    lessons: [
      {
        scheduleId: -1,
        topic: {
          topicId: -1,
          teacher: {
            teacherId: -1,
            teacherName: 'Loading',
            avatar: '/static/images/loading-image.gif',
          },
          title: '🧭 Loading',
          image: '/static/images/loading-image.gif',
          tags: [
            {
              tagId: -1,
              tagName: 'Loading',
            },
          ],
        },
        scheduleDate: '',
      },
    ],
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
    setHomeTopic(val) {
      store.homeTopic = val;
    },
    setLesson(val) {
      store.lessons = val;
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
