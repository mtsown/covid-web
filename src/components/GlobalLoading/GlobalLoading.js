import React from 'react';
import { useSelector } from 'react-redux';
import './GlobalLoading.css';

function GlobalLoading() {
  const isLoading = useSelector(state => state.app.isLoading);

  return (
    <div className={isLoading ? 'global-loading' : null}></div>
  );
}

export default GlobalLoading;