import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Battles = ({ address, onExit }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="title">Battles</div>
        <div className="subtitle">Play Daily Against Real Opponents</div>
        {address && (
            <div className="header_block">
              <span>{address}</span>
              <FontAwesomeIcon
                icon={['fas', 'right-from-bracket']}
                style={{ cursor: 'pointer' }}
                onClick={onExit}
              />
            </div>
          )}
      </div>
      <div className="banner">
        <img src="./img/star.png" alt="" />
        <div className="banner_title">Win games, earn and get promoted</div>
        <div className="banner_subtitle">Buy 5 players to assemble a team</div>
        <Link
          to="/marketplace"
          className="btn"
          style={{ marginTop: 10 }}
        >Pick up the best player</Link>
      </div>
    </div>
  );
}

export default Battles;