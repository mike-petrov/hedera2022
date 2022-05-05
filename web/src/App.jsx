import React, { useEffect, useState } from 'react';
import {
	Route, Routes, Link, useLocation,
} from 'react-router-dom';
import {
  connectWallet,
  createMap,
} from './Functions/api';

import Home from './Containers/Home.jsx';
import Battles from './Containers/Battles.jsx';
import Marketplace from './Containers/Marketplace.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTimes,
    faSpinner,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import {
    faHeart,
} from '@fortawesome/free-regular-svg-icons';
// import {
//     faTelegram,
// } from '@fortawesome/free-brands-svg-icons';
import './App.css';

library.add(
	faTimes,
  faHeart,
  faSpinner,
  faRightFromBracket,
);

const App = () => {
  const location = useLocation();

  const [address, setAddress] = useState([]);
  const [myPlayers, setMyPlayers] = useState([]);
  const [popup, setPopup] = useState({ current: null, item: null });

  const onPopup = (current = null, item = null) => {
		setPopup({ current, item });
	};

  const onConnect = () => {
    connectWallet().then((address) => {
      setAddress(address['_address']);
    });
	};

  // const onClaim = (playerId) => {
  //   console.log(playerId)
  //   onPopup('loading');
	// 	claimResources(playerId, address).then((e) => {
  //     setTimeout(() => {
  //       const hash = e.inMessage.hash;
  //       onPopup('success', hash);
  //     }, 1000);
  //   });
	// };

  const onExit = () => {
    setMyPlayers([]);
    setAddress(null);
	};

  return (
    <>
      <div className="mobile_block">Best use from desktop version</div>
      {popup.current === 'success' && (
        <div className="popup">
          <div
            className="popup_close_panel"
            onClick={() => onPopup()}
          />
          <div className="popup_content">
            <div className="popup_title">Успешно</div>
            {popup.item && (
              <div className="popup_subtitle popup_wrap">{popup.item}</div>
            )}
            <div className="popup_icon">
              <FontAwesomeIcon icon={['far', 'circle-check']} />
            </div>
          </div>
        </div>
      )}
      <div className="sidebar">
        <div className="sidebar_block">
          <img src="./img/logo.png" alt="" />
        </div>
        <div className="sidebar_block sidebar_block_menu">
          <Link to="/" className={location.pathname === '/' ? "sidebar_item active" : "sidebar_item"}>
            <img src="./img/grad-cap.png" alt="" />
            <span>Academy</span>
          </Link>
          <Link
            to="/battles"
            className={location.pathname === '/battles' ? "sidebar_item active" : "sidebar_item"}
            onClick={(e)=> {
              if (!address) {
                onPopup('auth');
                e.preventDefault();
              }
            }}
          >
            <img src="./img/star.png" alt="" />
            <span>P2P</span>
          </Link>
          <Link
            to="/marketplace"
            className={location.pathname === '/marketplace' ? "sidebar_item active" : "sidebar_item"}
            onClick={(e)=> {
              if (!address) {
                onPopup('auth');
                e.preventDefault();
              }
            }}
          >
            <img src="./img/football.png" alt="" />
            <span>Marketplace</span>
          </Link>
        </div>
        <div className="sidebar_block sidebar_block_bottom">
          <div className="subtitle" style={{ fontSize: 12 }}>Made for Hedera2022</div>
        </div>
      </div>
      <div className="content">
        <div className="header">
          {address && (
            <div className="header_block header_block_user">
              <span>{address}</span>
              <FontAwesomeIcon
                icon={['fas', 'right-from-bracket']}
                style={{ cursor: 'pointer' }}
                onClick={onExit}
              />
            </div>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home
              onPopup={onPopup}
              myPlayers={myPlayers}
              address={address}
              onConnect={onConnect}
            />}
          />
          <Route
            path="/battles"
            exact
            element={<Battles
              onPopup={onPopup}
              myPlayers={myPlayers}
            />}
          />
          <Route
            path="/marketplace"
            exact
            element={<Marketplace
              onPopup={onPopup}
              myPlayers={myPlayers}
            />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
