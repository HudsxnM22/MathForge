import React, { useState } from 'react';
import styled from 'styled-components';

const Flashcard = ({ question }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <StyledWrapper onClick={() => setFlipped(!flipped)} flipped={flipped}>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <p>Front side</p>
          </div>
          <div className="card-back">
            <p>Back Side</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: 200px;
    perspective: 1000px;
    cursor: pointer;
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .card-front {
    background-color: #6A2C70;
    color: #fff;
    display: flex;
    align-items: center;
    border: 10px solid #6A2C70;
    border-radius: 10px;
    justify-content: center;
    font-size: 24px;
    transform: rotateY(0deg);
  }

  .card-back {
    background-color: #F08A5D;
    color: #fff;
    display: flex;
    align-items: center;
    border: 10px solid #F08A5D;
    border-radius: 10px;
    justify-content: center;
    font-size: 24px;
    transform: rotateY(180deg);
  }
`;

export default Flashcard;
