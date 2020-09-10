import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SelectLanguages from 'components/Header/SelectLanguages';
// import Link from 'next/link';
import { Link } from '../../../i18n';
// import { useRouter } from 'next/router';
import { Router } from '../../../i18n';

import { userContext } from '../../context/user';
import { useObserver } from 'mobx-react-lite';
import { gtagEvent } from '../../lib/gtag';
import { PostData } from '../../lib/api';

const AWhite = styled('a')`
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

const LogoImage = styled('img')`
  height: 70px;
  cursor: pointer;
`;

const rowItem = [
  'Space',
  'Robots',
  'Magic Tricks',
  'Art',
  'Music',
  'Video Game Coding',
  'Story Writing',
  'Dancing',
  'Reading',
  'Human Body',
  'Dinosaurs',
  'Yoga',
  'History',
  'Extreme Weather',
  'Machines',
  'Animals',
];

const rowTime = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function Register({ t }) {
  // const router = useRouter();

  const store = useContext(userContext);

  const handleClickTopic = index => {
    const newselect = store.topics;
    const indexOfItem = newselect.indexOf(rowItem[index]);
    indexOfItem === -1 ? newselect.push(rowItem[index]) : newselect.splice(indexOfItem, 1);
    store.setTopics(newselect);
    gtagEvent({
      action: 'user_select_topic',
      category: 'Topics',
      label: store.email,
      value: newselect,
    });
  };

  const handleClickTime = index => {
    const newTime = store.times;
    const indexOfItem = newTime.indexOf(rowTime[index]);
    indexOfItem === -1 ? newTime.push(rowTime[index]) : newTime.splice(indexOfItem, 1);
    store.setTimes(newTime);
    gtagEvent({
      action: 'user_select_time',
      category: 'Times',
      label: store.email,
      value: newTime,
    });
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    gtagEvent({
      action: 'submit_register_form',
      category: 'Register',
      label: store.email,
      value: store.getData(),
    });
    if (!store.email) {
      store.setError('email error');
      return alert(t('error.email'));
    }

    try {
      var student = await PostData('/lg/students', {
        studentName: store.name,
        studentEmail: store.email,
        studentPhone: store.phone,
        tags: [{ tagId: 3 }, { tagId: 2 }],
        times: [store.times],
      });

      if (student.studentId) {
        store.setId(student.studentId);
        Router.push('/dashboard');
      } else {
        alert('Error unknow');
      }
    } catch (e) {}

    Router.push('/dashboard');
  };

  useEffect(() => {
    const { email } = Router.query;
    if (email) store.setEmail(email);
  }, [store]);

  return useObserver(() => (
    <>
      <div>
        <div className="purpleBackground">
          <div className="mainInfoContainer">
            <div className="nameContainer">
              {/* <div className="name">{t('name')}</div> */}
              <Link href="/">
                <LogoImage src="/static/images/logo.png" />
              </Link>
              {/* <AWhite href="https://schola.tv/app">
                <div className="loginButton">{t('login_action')}</div>

              </AWhite> */}
              <SelectLanguages />
            </div>
            <div className="registerHeader">{t('register.title')}</div>
            <div className="registerSectionTitle smallMarginTop">{t('register.subtitle_topic')}</div>
            <div className="rowContainer">
              {rowItem.map((item, index) => (
                <div
                  key={'rowItem_' + index}
                  className={`rowItem ${store.topics.includes(item) ? ' selectedRowItem' : ''}`}
                  onClick={() => handleClickTopic(index)}>
                  {item}
                </div>
              ))}
            </div>
            <div className="registerSectionTitle smallMarginTop">{t('register.subtitle_time')}</div>
            <div className="rowContainer">
              {rowTime.map((item, index) => (
                <div
                  key={'rowTime_' + index}
                  className={`rowItem ${store.times.includes(item) ? ' selectedRowItem' : ''}`}
                  onClick={() => handleClickTime(index)}>
                  {item}
                </div>
              ))}
            </div>
            <div className="smallMarginTop"></div>
            <div className="registerSectionTitle smallMarginTop">{t('register.label_name')}</div>
            <input
              value={store.name}
              onChange={e => store.setName(e.target.value)}
              type="text"
              className="fontSize18 fullWidth"
              placeholder={t('register.placeholder_name')}
            />
            <div className="registerSectionTitle smallMarginTop">{t('register.label_email')}</div>
            <input
              value={store.email}
              onChange={e => store.setEmail(e.target.value)}
              type="email"
              className="fontSize18 fullWidth"
              placeholder={t('register.placeholder_email')}
            />
            <div className="registerSectionTitle smallMarginTop">{t('register.label_phone')}</div>
            <input
              value={store.phone}
              onChange={e => store.setPhone(e.target.value)}
              type="tel"
              className="fontSize18 fullWidth"
              placeholder={t('register.placeholder_phone')}
            />
            {/* <div className="registerSectionTitle smallMarginTop">{t('register.label_password')}</div>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="fontSize18 fullWidth"
              type="password"
            /> */}
            <button type="button" onClick={handleSubmit} className="registerButton">
              {t('register.button_action')}
            </button>
            {/* <div style={{ textAlign: 'left', color: 'white' }}>
              <SelectLanguages />
            </div> */}
          </div>
        </div>
      </div>
    </>
  ));
}

Register.propTypes = {
  t: PropTypes.func,
};

export default Register;
