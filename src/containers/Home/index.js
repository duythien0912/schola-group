import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react-lite';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
// import Link from 'next/link';
import { Link } from '../../../i18n';
// import { useRouter } from 'next/router';
import { Router } from '../../../i18n';

import SelectLanguages from 'components/Header/SelectLanguages';
import styled from '@emotion/styled';

import saga from './saga';
import reducer from './reducer';
import { getShowcases } from './actions';
import { selectShowcases } from './selectors';

import { userContext } from '../../context/user';

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

const list_topic = [
  {
    image: {
      src: 'https://i.imgur.com/jCv9yNx.gif',
    },
    title: 'Art 🎨',
    subtitle: 'Have your child make some art with the guidance of a professional artist!',
    action: 'Book Now',
  },
  {
    image: {
      src:
        'https://media2.giphy.com/media/yOxRIWzT9JZJu/giphy.gif?cid=ecf05e4750c40e18b9f2fafdb253b01e9975077e48c24188&rid=giphy.gif',
    },
    title: 'Space 🚀',
    subtitle: 'Have your child learn about how astronauts live in space!',
    action: 'Book Now',
  },
];

export function Home({ getShowcases, showcasesData, t }) {
  useInjectSaga({ key: 'showcases', saga });
  useInjectReducer({ key: 'showcases', reducer });
  // const router = useRouter();

  // const [email, setEmail] = useState('');

  // const onClickStartButton = () => {
  //   Router.push({
  //     pathname: '/register',
  //     query: { email: email },
  //   });
  // };

  const store = useContext(userContext);
  const onClickStartButton = () => {
    Router.push({
      pathname: '/register',
      query: { email: store.email },
    });
  };

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
            </div>
            <div className="oneLinerText">{t('title')}</div>
            <div className="subtitle">{t('subtitle')}</div>
            <div className="ctaContainer">
              <input
                // value={email}
                value={store.email}
                onChange={e => store.setEmail(e.target.value)}
                type="text"
                placeholder={t('email.placeholder')}
                className="emailBox"
              />
              <div className="startButton" onClick={() => onClickStartButton()}>
                <div>{t('start_button.text')}</div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <span className="cardRequired">{t('subtext')}</span>
              </div>
            </div>
          </div>
          {list_topic.map((topic, index) => (
            <div key={'topic' + index} className="fancyBoxBase marginBottom">
              <div className="sessionInfo">
                <img src={topic.image.src} className="sessionImage" />
                <div className="classInfoContainer">
                  <h3>{topic.title}</h3>
                  <p>{topic.subtitle}</p>
                  <Link href="/register">
                    <div className="learnMore">{topic.action}</div>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              textAlign: 'center',
              color: 'white',
              marginTop: 64,
              marginBottom: 32,
            }}>
            {t('makewith')}
          </div>
          <div style={{ textAlign: 'center', color: 'white', marginTop: 16 }}>
            <a href="https://schola.tv/about_us" style={{ color: 'white' }}>
              {t('about_us')}
            </a>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <a href="https://schola.tv/faq" style={{ color: 'white' }}>
              {t('terms_of_service')}
            </a>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <SelectLanguages />
          </div>
        </div>
      </div>
      {/* <Layout>
       <Features />
       <Showcases onGetShowcases={getShowcases} data={showcasesData} />
     </Layout> */}
    </>
  ));
}

const mapStateToProps = createStructuredSelector({
  showcasesData: selectShowcases(),
});

export function mapDispatchToProps(dispatch) {
  return { getShowcases: () => dispatch(getShowcases()) };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

Home.propTypes = {
  showcasesData: PropTypes.object,
  getShowcases: PropTypes.func,
  t: PropTypes.func,
};

export default compose(withConnect, memo)(Home);
