import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'utils/with-i18next';

import styled from '@emotion/styled';

import { i18n } from 'utils/with-i18next';

const SelectRoot = styled('select')`
  border-radius: 4px;
  width: 100px;
  margin-top: 12px;
`;

export function SelectLanguages({ t }) {
  const [select, setSelect] = useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(select);
  }, [select]);

  const handleSelect = ev => {
    ev.preventDefault();

    setSelect(ev.target.value);
  };

  return (
    <SelectRoot name="languages" id="languages" value={select} onChange={handleSelect}>
      <option value="en">{t('en')}</option>
      <option value="vi">{t('vi')}</option>
      <option value="ja">{t('ja')}</option>
    </SelectRoot>
  );
}

SelectLanguages.propTypes = {
  t: PropTypes.func,
};

export default withTranslation('common')(SelectLanguages);

// export default SelectLanguages;
