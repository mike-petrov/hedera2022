import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = ({ onPopup, myPlayers, address, tokens, onConnect, onExit }) => {
  const [filter, setFilter] = useState('');

  const onFilter = (e) => {
		setFilter(e.target.value);
	};

  return (
    <div className="container">
      <div className="header">
        <div className="title">Academy</div>
        <div className="subtitle">Your own football team</div>
        {address && (
            <div className="header_block">
              <span style={{ background: '#3e4de5', display: 'flex', alignItems: 'center' }}>
                <img src="./img/ball.png" alt="" />
                <span>{tokens.balls}</span>
              </span>
              <span style={{ background: '#3e4de5', display: 'flex', alignItems: 'center' }}>
                <img src="./img/goal.png" alt="" />
                <span>{tokens.goals}</span>
              </span>
              <span>{address}</span>
              <FontAwesomeIcon
                icon={['fas', 'right-from-bracket']}
                style={{ cursor: 'pointer' }}
                onClick={onExit}
              />
            </div>
          )}
      </div>
      {address ? (
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
            <div className="cards_list_inner">
              {myPlayers && myPlayers.map((player) => (player.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1 && (
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