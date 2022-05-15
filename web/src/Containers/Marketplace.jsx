import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getMintAmount,
} from '../Functions/api';

const Marketplace = ({ onPopup, walletData, players, account, tokens, onExit, myPlayers, setMyPlayers }) => {
  const [filter, setFilter] = useState('');

  const onFilter = (e) => {
		setFilter(e.target.value);
	};

  const onBuy = (amount) => {
    getMintAmount(walletData, account, amount).then((tx) => {
      onPopup('success', 'Your team has been replenished with new players');
      const count = myPlayers.length + amount;
      const myPlayersTemp = players.slice(0, count);
      setMyPlayers(myPlayersTemp);
    });
	};

  return (
    <div className="container">
      <div className="header">
        <div className="title">Marketplace</div>
        <div className="subtitle">Limited NFT Collection</div>
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
      <div className="cards_filter">
        <div className="card_title">
          <span>Showing</span>
          {` ${players && players.filter((player) => player.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1).length} players`}
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
          {[
            { name: 'Gift Box #1', count: 1 },
            { name: 'Gift Box #2', count: 3 },
            { name: 'Gift Box #3', count: 5 },
            { name: 'Gift Box #4', count: 10 },
          ].map((gift, index) => (
            <div className="card" key={gift.count}>
              <img src={`./img/players/gift${index + 1}.png`} alt="" />
              <div className="card_content">
                <div className="card_number">{`NO. ${index + 1}`}</div>
                <div className="card_title">
                  <span>Name</span>
                  {` ${gift.name}`}
                </div>
                <div className="card_title">
                  <span>Price</span>
                  {` ${gift.count * 100000} tℏ`}
                </div>
                <div
                  className="btn"
                  style={{ margin: '20px 0 0 0' }}
                  onClick={() => onBuy(gift.count)}
                >Buy</div>
              </div>
            </div>
          ))}
          <div className="p2p_subtitle" id="scroll_anchor">You can get</div>
          {players && players.map((player) => (player.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1 && (
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
        </div>
      </div>
    </div>
  );
}

export default Marketplace;