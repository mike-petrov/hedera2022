import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Marketplace = ({ players, address, onExit }) => {
  const [filter, setFilter] = useState('');

  const onFilter = (e) => {
		setFilter(e.target.value);
	};

  return (
    <div className="container">
      <div className="header">
        <div className="title">Marketplace</div>
        <div className="subtitle">Build a football team</div>
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
          {players && players.map((player) => (player.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1 && (
            <div className="card" key={player.id}>
              <img src={player.src} />
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