import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Battles = ({ account, myPlayers, tokens, setTokens, onExit }) => {
  const [gamePlayers, setGamePlayers] = useState([]);
  const [start, setStart] = useState(false);

  const onScroll = () => {
    const scrollDiv = document.getElementById("scroll_anchor").offsetTop - 111;
    document.getElementsByClassName("cards_list")[0].scrollTo({ top: scrollDiv, behavior: 'smooth'});
	};

  const onSelectPlayer = (player) => {
    const gamePlayersTemp = [...gamePlayers];
    gamePlayersTemp.push(player);
    setGamePlayers(gamePlayersTemp);
	};

  const onRemovePlayer = (index) => {
    const gamePlayersTemp = [...gamePlayers];
    gamePlayersTemp.splice(index, 1)
    setGamePlayers(gamePlayersTemp);
	};

  const onStart = () => {
    setStart(true);
    setTokens({...tokens, balls: tokens.balls + 0.135 });
	};

  const onReStart = () => {
    setStart(false);
	};

  return (
    <div className="container">
      <div className="header">
        <div className="title">Matches</div>
        <div className="subtitle">Each player has his own position on the field, keep balance and win the game</div>
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
      <div className="cards_list">
        <div className="cards_list_inner">
          <div className="p2p_block">
            {!start ? (
              <>
                <div className="p2p_block_left">
                  <div className="subtitle">Your team for match</div>
                  {gamePlayers && gamePlayers.map((player, index) => (
                    <div className="p2p_position_block" key={player.id}>
                      <div className="p2p_position_name">{player.position}</div>
                      <div className="p2p_position_player">{`${player.name} (Rating: ${player.rating})`}</div>
                      <div className="p2p_position_clear">
                        <FontAwesomeIcon
                          icon={['fas', 'times']}
                          onClick={() => onRemovePlayer(index)}
                        />
                      </div>
                    </div>
                  ))}
                  {gamePlayers.length < 5 && (
                    <div
                      className="btn"
                      onClick={onScroll}
                      style={{ display: 'table', margin: '10px auto' }}
                    >Add player</div>
                  )}
                </div>
                <div className="p2p_block_right">
                  <img src="./img/map.png" alt="" />
                  <div
                    className="btn"
                    onClick={() => gamePlayers.length === 5 ? onStart() : ''}
                    style={gamePlayers.length === 5 ? {
                      margin: '10px 0 0 0'
                    } : {
                      margin: '10px 0 0 0',
                      pointerEvents: 'none',
                      opacity: 0.5,
                      cursor: 'default',
                    }}
                  >Play</div>
                </div>
              </>
            ) : (
              <div className="p2p_result">
                <div className="title">2 : 1</div>
                <div className="p2p_subtitle" style={{ width: 'unset' }}>You won</div>
                <div className="p2p_rewards">
                  <div>
                    <img src="./img/goal.png" alt="" />
                    <span>{`+ 0.135`}</span>
                  </div>
                </div>
                <div
                  className="btn"
                  onClick={onReStart}
                  style={{ display: 'table', margin: '10px auto' }}
                >Play again</div>
              </div>
            )}
          </div>
          {!start && (
            <>
              <div className="p2p_subtitle" id="scroll_anchor">Pick up players for match</div>
              {myPlayers && myPlayers.map((player) => (gamePlayers.map((item) => item.id).indexOf(player.id) === -1 && (
                <div
                  key={player.id}
                  className="card"
                >
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
                    <div
                      className="btn"
                      onClick={() => gamePlayers.length < 5 ? onSelectPlayer(player) : ''}
                      style={gamePlayers.length < 5 ? {
                        margin: '20px 0 0 0'
                      } : {
                        margin: '20px 0 0 0',
                        pointerEvents: 'none',
                        opacity: 0.5,
                        cursor: 'default',
                      }}
                    >Add</div>
                  </div>
                </div>
              )))}
              {myPlayers.length === 0 && ( 
                <div className="banner">
                  <Link
                    to="/marketplace"
                    className="btn"
                    style={{ marginTop: 10 }}
                  >Pick up the best player</Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Battles;