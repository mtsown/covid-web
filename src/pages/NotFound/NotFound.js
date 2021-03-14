import React from 'react';
import { WiCloud } from 'react-icons/wi';
import './NotFound.css';
import { notFound } from '../../assets/images';

function NotFound() {
  return (
    <div className="not-found">
      <div id="cloud-logo">
        <WiCloud />
      </div>
      <div className="not-found-card">
        <div>
          <img src={notFound} alt="404 Not Found"></img>
        </div>
        <div>Oops! Page not found</div>
        <div>
          The page you're looking for doesn't exist. If you think something is
          broken, please report a problem.
        </div>
      </div>
    </div>
  );
}

export default NotFound;
