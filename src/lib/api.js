import { request } from 'utils/request';
import { useContext } from 'react';
import { I18nContext } from 'next-i18next'

const BASE_URL = 'http://18.138.215.174:8086';

const FetchData = async url => {
  return await request(BASE_URL + url);
};

const PostData = async (url, body) => {
  return await request(BASE_URL + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

export { FetchData, PostData };
