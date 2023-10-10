import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faGooglePlus,
  faGithub,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';

const FooterToolbar = () => (
  <div className="flex flex-col justify-center text-gray-700 py-8">
    <div className="footer-toolbar flex justify-center space-x-4 text-gray-700">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        <FontAwesomeIcon icon={faTwitter} className="text-gray-700 text-sm" />
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        <FontAwesomeIcon icon={faFacebook} className="text-gray-700 text-sm" />
      </a>
      <a
        href="https://plus.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        <FontAwesomeIcon
          icon={faGooglePlus}
          className="text-gray-700 text-sm"
        />
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        <FontAwesomeIcon icon={faGithub} className="text-gray-700 text-sm" />
      </a>
      <a
        href="https://pinterest.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        <FontAwesomeIcon
          icon={faPinterest}
          className="text-gray-700 text-sm"
        />
      </a>
    </div>
    <p className="text-center text-sm text-gray-700 pt-2">
      &copy; 2023 by HandyHome
    </p>
  </div>
);

export default FooterToolbar;
