import React, { useEffect, useState } from 'react';
import {
	Route, Routes, Link, useLocation,
} from 'react-router-dom';
import {
  walletConnect,
  getMints,
  getStakedPlayers,
  getClaimableView,
} from './Functions/api';

import Home from './Containers/Home.jsx';
import Battles from './Containers/Battles.jsx';
import Marketplace from './Containers/Marketplace.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTimes,
    faSpinner,
    faLink,
    faRightFromBracket,
    faCheck,
    faRotate,
} from '@fortawesome/free-solid-svg-icons';
import {
    faHeart,
} from '@fortawesome/free-regular-svg-icons';
import './App.css';

library.add(
	faTimes,
  faHeart,
  faSpinner,
  faRightFromBracket,
  faLink,
  faCheck,
  faRotate,
);

const App = () => {
  const location = useLocation();

  const [account, setAccount] = useState(null);
  const [walletData, setWalletData] = useState();
  const [claimedBalls, setClaimedBalls] = useState(0);
  const [tokens, setTokens] = useState();
  const [myPlayers, setMyPlayers] = useState([]);
  const [players, setPlayers] = useState([{
    id: '0001',
    name: 'Timothy Daniels',
    position: 'DM',
    rating: 88,
    src: './img/players/1.png',
  }, {
    id: '0002',
    name: 'Joe Smith',
    position: 'LB',
    rating: 57,
    src: './img/players/2.png',
  }, {
    id: '0003',
    name: 'John Neal',
    position: 'RB',
    rating: 60,
    src: './img/players/3.png',
  }, {
    id: '0004',
    name: 'Oscar Jones',
    position: 'GK',
    rating: 94,
    src: './img/players/4.png',
  }, {
    id: '0005',
    name: 'Philip Ray',
    position: 'LW',
    rating: 40,
    src: './img/players/5.png',
  }, {
    id: '0006',
    name: 'William Wilson',
    position: 'RW',
    rating: 44,
    src: './img/players/6.png',
  }, {
    id: '0007',
    name: 'Bradley Padilla',
    position: 'CF',
    rating: 79,
    src: './img/players/7.png',
  }, {
    id: '0008',
    name: 'Jeffrey Lamb',
    position: 'RB',
    rating: 82,
    src: './img/players/8.png',
  }, {
    id: '0009',
    name: 'Wesley Brown',
    position: 'DM',
    rating: 85,
    src: './img/players/9.png',
  }, {
    id: '0010',
    name: 'Steven White',
    position: 'LM',
    rating: 38,
    src: './img/players/10.png',
  }, {
    id: '0011',
    name: 'Stanley Horton',
    position: 'RM',
    rating: 20,
    src: './img/players/11.png',
  }, {
    id: '0012',
    name: 'Dale Vega',
    position: 'CF',
    rating: 16,
    src: './img/players/12.png',
  }]);
  const [popup, setPopup] = useState({ current: null, item: null });

  useEffect(() => {
    setTokens({
      balls: 0.02,
      goals: 0.0124
    });

    if (!account && document.location.pathname !== '/') {
      // document.location.href = '/';
    }
  }, []);

  const onPopup = (current = null, item = null) => {
		setPopup({ current, item });
	};

  const onConnect = async () => {
    const walletDataTemp = await walletConnect();
    walletDataTemp[0].pairingEvent.once((pairingData) => {
      pairingData.accountIds.forEach((accountTemp) => {
        setAccount(accountTemp);
        getMints().then((amountTemp) => {
          // onGetClaimedBalles(walletDataTemp, accountTemp);
          getStakedPlayers().then((stakedPlayersTemp) => {
            const amount = Number(amountTemp.toString().replace(/,/g, ''));
            const myPlayersTemp = players.slice(0, amount);
            for (let i = 0; i < myPlayersTemp.length; i += 1) {
              myPlayersTemp[i].isStake = false;
              if (myPlayersTemp[i] === stakedPlayersTemp) {
                myPlayersTemp[i].isStake = true;
              }
            }
            setMyPlayers(myPlayersTemp);
          });
        });
      });
    });
    setWalletData(walletDataTemp);
	};

  const onExit = () => {
    setMyPlayers([]);
    setAccount(null);
    document.location.href = '/';
	};

  const onGetClaimedBalles = (walletDataTemp = walletData, accountTemp = account) => {
    getClaimableView(walletDataTemp, accountTemp).then((claimedBallsTemp) => {
      setClaimedBalls(claimedBallsTemp);
    });
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
            <div className="popup_icon">
              <FontAwesomeIcon
                icon={['fas', 'check']}
              />
            </div>
            {popup.item && (
              <div className="popup_subtitle popup_wrap">{popup.item}</div>
            )}
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
            style={!account ? { color: '#c4c4c4' } : {}}
            onClick={(e)=> {
              if (!account) {
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
            style={!account ? { color: '#c4c4c4' } : {}}
            onClick={(e)=> {
              if (!account) {
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
        <Routes>
          <Route
            path="/"
            exact
            element={<Home
              onPopup={onPopup}
              account={account}
              onExit={onExit}
              onGetClaimedBalles={onGetClaimedBalles}
              claimedBalls={claimedBalls}
              onConnect={onConnect}
              tokens={tokens}
              walletData={walletData}
              myPlayers={myPlayers}
              setMyPlayers={setMyPlayers}
            />}
          />
          <Route
            path="/battles"
            exact
            element={<Battles
              onPopup={onPopup}
              account={account}
              myPlayers={myPlayers}
              tokens={tokens}
              walletData={walletData}
              onExit={onExit}
            />}
          />
          <Route
            path="/marketplace"
            exact
            element={<Marketplace
              onPopup={onPopup}
              account={account}
              onExit={onExit}
              players={players}
              tokens={tokens}
              walletData={walletData}
              setMyPlayers={setMyPlayers}
              myPlayers={myPlayers}
            />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
