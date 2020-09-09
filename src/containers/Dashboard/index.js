import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import SelectLanguages from 'components/Header/SelectLanguages';
import Link from 'next/link';
import { useRouter } from 'next/router';

const bounce = keyframes`
0% {transform: scale(1);} 
10%, 20% {transform: scale(0.9) rotate(-3deg);} 
30%, 50%, 70%, 90% {transform: scale(1.1) rotate(3deg);} 
40%, 60%, 80% {transform: scale(1.1) rotate(-3deg);} 
100% {transform: scale(1) rotate(0);} 
`;

const AWhite = styled('a')`
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

const LogoImage = styled('img')`
  height: 70px;
`;

const ImgSuccess = styled('img')`
  animation: ${bounce} 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

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
  padding: 0px 24px;
`;

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

  return (
    <>
      <div>
        <div className="purpleBackground">
          <div className="mainInfoContainer">
            <div className="nameContainer">
              {/* <div className="name">{t('name')}</div> */}
              <Link href="/">
                <LogoImage src="/static/images/logo.png" />
              </Link>
              <AWhite href="https://schola.tv/app">
                <div className="loginButton">{t('login_action')}</div>
              </AWhite>
            </div>
            <div className="exploreClassesTitle">Upcoming Live Classes 🔍</div>
            <div className="welcomeText">
              Hi there, asdsad. Hope you're having an awesome day. Go ahead and book some classes!
            </div>
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
                    onClick={e => setModelOpen(true)}
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
                  <a href="#" title="Close" className="modal-close" onClick={e => setModelOpen(false)}>
                    Close
                  </a>
                  <EmojiDiv className="emoji">
                    <ImgSuccess className={`model_${modelOpen}`} src="/static/images/tada.svg" width={250} />
                  </EmojiDiv>
                  <SuccessText>Success!</SuccessText>
                  <TextAlignCenter>
                    Yay! You're all set. We sent an email to asdas@asds.asdasd with more info. See you on Thursday,
                    September 10, 2:00 AM GMT+7
                  </TextAlignCenter>
                </div>
              </div>
            </div>

            <div className="fancyBoxBase" style={{ marginTop: 24, marginBottom: 24 }}>
              <span style={{ marginRight: 8 }}>👍</span>Want to join ZipSchool's Facebook Group where you can get
              <b>bonus material, chat with teachers, and join smaller classes?</b>
              <div className="referralButton">Join Facebook Group</div>
            </div>
            <div className="fancyBoxBase" style={{ marginTop: 24, marginBottom: 64 }}>
              <span style={{ marginRight: 8 }}>❤️</span>Do you have friends with kids? Click the button below to copy
              the link you can share with them to get them some free classes!
              <div className="referralButton">Copy Link</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  t: PropTypes.func,
};

export default Dashboard;
