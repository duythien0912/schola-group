import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'utils/with-i18next';

export class ErrorPage extends React.PureComponent {
  render() {
    return <h1>404 - Page Not Found</h1>;
  }
}

ErrorPage.propTypes = {
  t: PropTypes.func,
};

ErrorPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'banner', 'features'],
});

export default withTranslation('common')(ErrorPage);
