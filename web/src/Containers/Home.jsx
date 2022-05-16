import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  stakePlayer,
  unstakePlayer,
  upgradePlayer,
  claimBalls,
} from '../Functions/api';

const Home = ({
  onPopup,
  myPlayers,
  claimedBalls,
  onGetClaimedBalles,
  setMyPlayers,
  account,
  tokens,
  onConnect,
  walletData,
  onExit,
  setTokens,
  setClaimedBalls,
}) => {
  const [filter, setFilter] = useState('');

  const onFilter = (e) => {
		setFilter(e.target.value);
	};

  const onStake = (id) => {
		stakePlayer(walletData, account, Number(id)).then(() => {
      for (let i = 0; i < myPlayers.length; i += 1) {
        if (myPlayers[i].id === id) {
          myPlayers[i].isStake = true;
          break;
        }
      }
      setMyPlayers(myPlayers);
      onPopup('success', 'This player is staking');
    });
	};

  const onUnstake = (id) => {
		unstakePlayer(walletData, account, Number(id)).then(() => {
      for (let i = 0; i < myPlayers.length; i += 1) {
        if (myPlayers[i].id === id) {
          myPlayers[i].isStake = false;
          break;
        }
      }
      setMyPlayers(myPlayers);
      onPopup('success', 'This player was unstaked');
    });
	};

  const onUpgrade = (id) => {
    if (tokens.goals > 0) {
      upgradePlayer(walletData, account, Number(id)).then(() => {
        onPopup('success', 'This player was upgraded');
      });
    } else {
      onPopup('error', 'Not enough Goals');
    }
	};

  const onClaim = () => {
    claimBalls(walletData, account).then(() => {
      onPopup('success', 'Claimed success');
      setTokens({...tokens, balls: tokens.balls + claimedBalls });
      setClaimedBalls(0);
    });
	};

  return (
    <div className="container">
      <div className="header">
        <div className="title">Academy</div>
        <div className="subtitle">Your own football team</div>
        {account && (
            <div className="header_block">
              <span style={{ background: '#3e4de5', display: 'flex', alignItems: 'center' }}>
                <img src="./img/ball.png" alt="" />
                <span>{tokens.balls}</span>
              </span>
              <span style={{ background: '#3e4de5', display: 'flex', alignItems: 'center' }}>
                <img src="./img/goal.png" alt="" />
                <span>{tokens.goals}</span>
              </span>
              <span>{account}</span>
              <FontAwesomeIcon
                icon={['fas', 'right-from-bracket']}
                style={{ cursor: 'pointer' }}
                onClick={onExit}
              />
            </div>
          )}
      </div>
      {account ? (
        <>
          <div className="cards_filter">
            <div className="card_title">
              <span>Showing</span>
              {` ${myPlayers && myPlayers.filter((player) => player.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1).length} players`}
            </div>
            <input
              placeholder="Search for players"
              type="text"
              value={filter}
              onChange={onFilter}
              style={{ width: 'calc(50% - 40px)' }}
            />
          </div>
          <div className="cards_list">
          <div className="banner">
            <div className="banner_title">{`You stake ${myPlayers.filter((item) => item.isStake).length} players`}</div>
            {(myPlayers.filter((item) => item.isStake).length !== 0 || claimedBalls !== 0) && (
              <>
                <div className="banner_subtitle">
                  {`Claimed Balls: ${claimedBalls}`}
                  <FontAwesomeIcon
                    icon={['fas', 'rotate']}
                    style={{ cursor: 'pointer', marginLeft: 10 }}
                    onClick={() => onGetClaimedBalles()}
                  />
                </div>
                {claimedBalls !== 0 && (
                  <div
                    className="btn"
                    onClick={onClaim}
                  >Claim</div>
                )}
              </>
            )}
          </div>
            <div className="cards_list_inner">
              {myPlayers && myPlayers.map((player, index) => (player.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1 && (
                <div className="card" key={player.id}>
                  <img src={player.src} alt="" />
                  <div className="card_content">
                    <div className="card_number">{`NO. ${player.id}`}</div>
                    <div className="card_title">
                      <span>Name</span>
                      {` ${player.name}`}
                    </div>
                    <div className="card_title">
                      <span>Position</span>
                      {` ${player.position}`}
                    </div>
                    <div className="card_title">
                      <span>Rating</span>
                      {` ${player.rating}`}
                    </div>
                    {player.isStake ? (
                      <div
                        className="btn"
                        style={{ margin: '20px 0 0 0' }}
                        onClick={() => onUnstake(player.id)}
                      >Unstake</div>
                    ) : (
                      <div
                        className="btn"
                        style={{ margin: '20px 0 0 0' }}
                        onClick={() => onStake(player.id)}
                      >Stake</div>
                    )}
                    <div
                      className="btn"
                      style={{ margin: '10px 0 0 0' }}
                      onClick={() => onUpgrade(player.id)}
                    >Upgrade</div>
                  </div>
                </div>
              )))}
              {myPlayers && myPlayers.length < 5 && (
                <div className="card">
                  <img src="./img/players/0.png" alt=""/>
                  <div className="card_content">
                    <div className="card_title">
                      <span>Buy 5 players to assemble a team </span>
                    </div>
                  </div>
                  <Link
                    to="/marketplace"
                    className="btn"
                    style={{ margin: '0 20px 20px 20px' }}
                  >Buy players</Link>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="banner">
          <img src="./img/star.png" alt="" />
          <div className="banner_title">Let's play</div>
          <div className="banner_subtitle">To get started, connect your wallet</div>
          <div
            className="btn"
            style={{ marginTop: 20 }}
            onClick={onConnect}
          >Connect wallet <FontAwesomeIcon icon={['fas', 'link']} /></div>
        </div>
      )}
    </div>
  );
}

export default Home;