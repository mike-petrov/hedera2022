import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = ({ onPopup, myPlayers, address, onConnect }) => {
  return (
    <div className="container">
      <div className="title">Academy</div>
      <div className="subtitle">Your club has its own unique design with colours, kits and a badge</div>
      <div className="card_list">
        1
      </div>
      {myPlayers.length > 0 ? (
        <>
          1
        </>
      ) : (
        <div className="stat_block">
          <div className="stat_block_content">
            {!address ? (
              <>
                <div className="stat_block_icon">
                  <img src="./img/star.png" alt="" style={{ width: 300, marginBottom: 40 }}/>
                </div>
                <div className="stat_block_empty">To get started, connect your wallet</div>
                <div
                  className="btn"
                  style={{ background: '#3e4de5', display: 'block', marginTop: 20 }}
                  onClick={onConnect}
                >Connect wallet <FontAwesomeIcon icon={['fas', 'link']} /></div>
              </>
            ) : (
              <>
                Your Academy
                <div className="stat_block_icon">
                  <img src="./img/star.png" alt="" style={{ width: 32, marginBottom: 40 }}/>
                </div>
                <div className="stat_block_empty">Time to buy player</div>
                <Link
                  to="/map"
                  className="btn"
                  style={{ background: '#3e4de5', display: 'block', marginTop: 20 }}
                >Pick up the best player</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;