import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Flashcard = ({ question }) => {
  const [flipped, setFlipped] = useState(false);
  const [answers, setAnswers] = useState([])
  //these are called pods from wolfram alpha

  useEffect(() => {
    if(question[1].success === false){
      return;
    }

    const questionAnswers = question[1].pods.flatMap((pod) => 
        pod.subpods.map((subpod) => {
          return {src: subpod.img.src}
        })
      )
    setAnswers(questionAnswers);
  }, [question])

  useEffect(() => {
    try {
      window.MathJax.typeset();
    } catch (e) {
      console.error('MathJax error:', e);
    }
  }, [question])

  useEffect(() => {
    if (flipped) {
      setFlipped(false)
    }
  }, [question])

  const populateAnswers = () => {
    return answers.map((answer, index) => 
      <div key={index} className='answerImageContainer'>
        <img src={answer.src} className='answerImage'/>
      </div>
    )
  }
    
  



  return (
    <StyledWrapper onClick={() => setFlipped(!flipped)} flipped={flipped}>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <p>{"\\(" + question[0] + "\\)"}</p>
          </div>
          <div className="card-back">
            <div className='answersContainer'>
              {populateAnswers()}
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 50vw;
    height: 30vw;
    perspective: 1000px;
    cursor: pointer;
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.4s;
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
    background-color: white;
    color: var(--text-main);
    display: flex;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    font-size: clamp(10px,1.9vw,60px);
    transform: rotateY(0deg);
    color: black;
    overflow-y: auto;
    overflow-x: auto;
  }

  .card-back {
    background-color: white;
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    font-size: 24px;
    transform: rotateY(180deg);
    height: 100%;
    overflow-y: hidden;
  }

  .answersContainer{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    overflow-y: auto;
    overflow-x: auto;
    height: 95%;
    padding: 10px;
  }

  .answerImageContainer{
    margin-left: 5%;
    min-width: fit-content;
    height: fit-content;
    padding-top: 5%;
    padding-bottom: 5%;
    padding-left: 3%;
    border-bottom: solid 3px black;
  }

  .answerImageContainer:first-child {
    border-top: solid 3px black;
  }

  .answerImage {
    image-rendering: high-quality
  }
`;

export default Flashcard;
