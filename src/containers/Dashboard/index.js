import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
// import Link from 'next/link';
import { Link } from '../../../i18n';
// import { useRouter } from 'next/router';
import { userContext } from '../../context/user';
import { useObserver } from 'mobx-react-lite';
import { SelectLanguages } from '../../components/Header/SelectLanguages';
import { gtagEvent } from '../../lib/gtag';
import { Router } from '../../../i18n';

const LogoImage = styled('img')`
  height: 70px;
  cursor: pointer;
`;

const ImgSuccess = styled('img')``;
//   animation: ${bounce} 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

const EmojiDiv = styled('div')`
  margin-top: 35px;
  margin-bottom: 20px;
`;

const SuccessText = styled('h1')`
  font-size: 42px;
  margin-top: 25px;
  color: #34cc34;
  letter-spacing: 0.1rem;
`;

const TextAlignCenter = styled('div')`
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;
// padding: 0px 24px;

const groupClass = [
  {
    title: '🌧️ Meteorologist Training: What Are Thunderstorms?',
    tags: [
      {
        name: 'Weather',
        type: 1,
      },
      {
        name: 'Ages 4-9',
        type: 1,
      },
      {
        name: 'Wednesday, September 9, 11:00 PM GMT+7',
        type: 0,
      },
    ],
    image: {
      src:
        'https://media4.giphy.com/media/iN6lLmUb8exMI/giphy.gif?cid=ecf05e4716eb2e74bf3e9844674d0ebd9ac0ee6ce5e816a9&rid=giphy.gif',
    },
    teacher: {
      teacherName: 'Taught by Mr. Ashton',
      teacherImage: {
        src: 'https://i.imgur.com/DAECJVu.png',
      },
    },
    action: {
      title: 'Book Now',
    },
  },
  {
    title: '🧜‍♀️ Drawing Mythical Creatures: Mermaids',
    tags: [
      {
        name: 'Art',
        type: 1,
      },
      {
        name: 'Ages 4-9',
        type: 1,
      },
      {
        name: 'Sunday, September 13, 12:00 AM GMT+7',
        type: 0,
      },
    ],
    image: {
      src:
        'https://media1.giphy.com/media/26BRqD0tT2qKVg4h2/giphy.gif?cid=ecf05e472kz21l3dsndor0skelyq5kem8s6jlui4f2qfzc7p&rid=giphy.gif',
    },
    teacher: {
      teacherName: 'Taught by Mr. Daniel',
      teacherImage: {
        src: 'https://i.imgur.com/IXeGulJ.png',
      },
    },
    action: {
      title: 'Book Now',
    },
  },
];

export function Dashboard({ t }) {
  const [modelOpen, setModelOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipBoard = async (copyMe, from) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true);
      alert('Copy Success');
      console.log(copyMe);
      gtagEvent({
        action: `user_copy_clipboard_${from}`,
        category: 'Times',
        label: store.email,
        value: copyMe,
      });
    } catch (err) {
      setCopySuccess(false);
    }
  };

  const openInNewTab = url => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const store = useContext(userContext);

  useEffect(() => {
    console.log(store.getData());
    if (!store.email) {
      Router.push({
        pathname: '/register',
        query: { email: store.email },
      });
    }
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
              <SelectLanguages t={t} />
            </div>
            <div className="exploreClassesTitle">{t('dashboard.title')}</div>
            <div className="welcomeText">{t('dashboard.subtitle', { name: store.name || store.email })}</div>
            <div className="allClassesContainer">
              {groupClass.map((item, index) => (
                <div key={`classContainer_${index}`} className="classContainer">
                  <div className="classTitle">{item.title}</div>
                  <div className="tagsContainer">
                    {item.tags.map((tag, index2) => (
                      <div
                        key={`tag_${index}_${index2}`}
                        className={`tag`}
                        style={{ background: tag.type == 0 ? 'rgb(227, 204, 255)' : '#ffd8fc' }}>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  <div className="classText" style={{ marginTop: 16, marginBottom: 16 }} />
                  <img className="classImg" src={item.image.src} />
                  <div className="teacherContainer">
                    <img src={item.teacher.teacherImage.src} className="teacherImg" />
                    <div className="teacherName">{item.teacher.teacherName}</div>
                  </div>
                  <button
                    type="button"
                    onClick={e => {
                      gtagEvent({
                        action: 'user_book_class',
                        category: 'Book',
                        label: store.email,
                        value: item,
                      });
                      setModelOpen(true);
                    }}
                    className="bookNowButton "
                    style={{ opacity: 1 }}>
                    {item.action.title}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <div id="open-modal" className={`modal-window model-window_${modelOpen}`}>
                <div className="fancyBoxBase">
                  <button type="button" title="Close" className="modal-close" onClick={e => setModelOpen(false)}>
                    {t('success.close_action')}
                  </button>
                  <EmojiDiv className="emoji">
                    <ImgSuccess className={`model_${modelOpen}`} src="/static/images/tada.svg" width={120} />
                  </EmojiDiv>
                  <SuccessText>{t('success.title')}</SuccessText>
                  <TextAlignCenter>
                    {t('success.subtitle', { email: store.email, time: 'Thursday, September 10, 2:00 AM GMT+7' })}

                    <div
                      className="referralButton"
                      style={{ marginTop: '15px' }}
                      onClick={() =>
                        copyToClipBoard(
                          'https://' + window.location.hostname + `?utm_source=referral&utm_content=${store.email}`,
                          'model'
                        )
                      }>
                      {t('success.share_acion')}
                    </div>
                    <div
                      onClick={() => openInNewTab('https://www.facebook.com/groups/2924060617821426')}
                      className="referralText">
                      {t('dashboard.promote_group_action')}
                    </div>
                  </TextAlignCenter>
                </div>
              </div>
            </div>
            <div className="fancyBoxBase" style={{ marginTop: 24, marginBottom: 24 }}>
              {/* <span style={{ marginRight: 8 }}>👍</span>Want to join ZipSchool's Facebook Group where you can get
              <b> bonus material, chat with teachers, and join smaller classes?</b> */}
              {t('dashboard.promote_group')}
              <ul>
                <li>{t('dashboard.promote_group_li.0')}</li>
                <li>{t('dashboard.promote_group_li.1')}</li>
                <li>{t('dashboard.promote_group_li.2')}</li>
              </ul>
              <div
                onClick={() => openInNewTab('https://www.facebook.com/groups/2924060617821426')}
                className="referralButton">
                {t('dashboard.promote_group_action')}
              </div>
            </div>
            <div className="fancyBoxBase" style={{ marginTop: 24, marginBottom: 64 }}>
              {t('dashboard.promote_share')}
              <div
                className="referralButton"
                onClick={() =>
                  copyToClipBoard(
                    'https://' + window.location.hostname + `?utm_source=referral&utm_content=${store.email}`,
                    'fotter'
                  )
                }>
                {t('dashboard.promote_group_share')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ));
}

Dashboard.propTypes = {
  t: PropTypes.func,
};

export default Dashboard;
