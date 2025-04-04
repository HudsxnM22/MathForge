import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactSketchCanvas } from "react-sketch-canvas";


const Flashcard = ({ question }) => {
  const [flipped, setFlipped] = useState(false);
  const [answers, setAnswers] = useState([])
  const canvasRef = useRef(null)
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#000000");

  //canvas eraser
  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  //canvas pen
  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleStrokeColorChange = (event) => {
    setStrokeColor(event.target.value);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  //react sketch functions above here ^^^^^^^^^^^^^

  //display could fetch reliable answer and then a disclaimer regarding AI capabilties
  useEffect(() => {
    if(question[1].success === false){
      return;
    }

    //these are called pods from wolfram alpha API send from backend
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
    <StyledWrapper flipped={flipped}>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <p>{"\\(" + question[0] + "\\)"}</p>
            <ReactSketchCanvas
              width="100%"
              height="100%"
              canvasColor="transparent"
              strokeColor={strokeColor}
              eraserWidth={15}
              ref={canvasRef}
            />
            <svg onClick={handlePenClick} style={{background: eraseMode ? '' : 'rgb(247, 245, 134)'}} className='penButton' width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.90499 13.475C8.94031 13.2985 8.95796 13.2102 8.99025 13.1279C9.01891 13.0548 9.05608 12.9853 9.10098 12.921C9.15157 12.8484 9.21523 12.7848 9.34255 12.6574L13.5 8.5C14.0523 7.94772 14.9477 7.94772 15.5 8.5C16.0523 9.05228 16.0523 9.94772 15.5 10.5L11.3426 14.6574C11.2152 14.7848 11.1516 14.8484 11.079 14.899C11.0147 14.9439 10.9452 14.9811 10.8721 15.0097C10.7898 15.042 10.7015 15.0597 10.525 15.095L8.5 15.5L8.90499 13.475Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <svg onClick={handleEraserClick} style={{background: !eraseMode ? '' : 'rgb(247, 245, 134)'}} className='eraserButton' width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.67004 11.6064L8.20037 12.1367L7.67004 11.6064ZM6 13.9682H5.25H6ZM10.0318 18V18.75V18ZM11.6064 7.67004L11.076 7.13971L11.6064 7.67004ZM12.6506 16.073C12.9435 16.3659 13.4183 16.3659 13.7112 16.073C14.0041 15.7801 14.0041 15.3053 13.7112 15.0124L12.6506 16.073ZM8.98764 10.2888C8.69474 9.99588 8.21987 9.99588 7.92698 10.2888C7.63408 10.5817 7.63408 11.0565 7.92698 11.3494L8.98764 10.2888ZM15.7996 11.8633L11.8633 15.7996L12.924 16.8603L16.8603 12.924L15.7996 11.8633ZM8.20037 12.1367L12.1367 8.20037L11.076 7.13971L7.13971 11.076L8.20037 12.1367ZM8.20037 15.7996C7.6287 15.228 7.25442 14.8514 7.01378 14.536C6.78634 14.2379 6.75 14.0841 6.75 13.9682H5.25C5.25 14.544 5.492 15.0144 5.82124 15.4459C6.13728 15.8601 6.59802 16.3186 7.13971 16.8603L8.20037 15.7996ZM7.13971 11.076C6.59802 11.6177 6.13728 12.0762 5.82124 12.4904C5.492 12.922 5.25 13.3924 5.25 13.9682H6.75C6.75 13.8522 6.78634 13.6984 7.01378 13.4003C7.25442 13.0849 7.6287 12.7084 8.20037 12.1367L7.13971 11.076ZM11.8633 15.7996C11.2916 16.3713 10.9151 16.7456 10.5997 16.9862C10.3016 17.2137 10.1478 17.25 10.0318 17.25V18.75C10.6076 18.75 11.078 18.508 11.5096 18.1788C11.9238 17.8627 12.3823 17.402 12.924 16.8603L11.8633 15.7996ZM7.13971 16.8603C7.6814 17.402 8.13989 17.8627 8.55411 18.1788C8.98563 18.508 9.45604 18.75 10.0318 18.75V17.25C9.91588 17.25 9.76207 17.2137 9.46398 16.9862C9.14858 16.7456 8.77204 16.3713 8.20037 15.7996L7.13971 16.8603ZM15.7996 8.20037C16.3713 8.77204 16.7456 9.14858 16.9862 9.46398C17.2137 9.76207 17.25 9.91588 17.25 10.0318H18.75C18.75 9.45604 18.508 8.98563 18.1788 8.55411C17.8627 8.13989 17.402 7.6814 16.8603 7.13971L15.7996 8.20037ZM16.8603 12.924C17.402 12.3823 17.8627 11.9238 18.1788 11.5096C18.508 11.078 18.75 10.6076 18.75 10.0318H17.25C17.25 10.1478 17.2137 10.3016 16.9862 10.5997C16.7456 10.9151 16.3713 11.2916 15.7996 11.8633L16.8603 12.924ZM16.8603 7.13971C16.3186 6.59802 15.8601 6.13728 15.4459 5.82124C15.0144 5.492 14.544 5.25 13.9682 5.25V6.75C14.0841 6.75 14.2379 6.78634 14.536 7.01378C14.8514 7.25442 15.228 7.6287 15.7996 8.20037L16.8603 7.13971ZM12.1367 8.20037C12.7084 7.6287 13.0849 7.25442 13.4003 7.01378C13.6984 6.78634 13.8522 6.75 13.9682 6.75V5.25C13.3924 5.25 12.922 5.492 12.4904 5.82124C12.0762 6.13728 11.6177 6.59802 11.076 7.13971L12.1367 8.20037ZM13.7112 15.0124L8.98764 10.2888L7.92698 11.3494L12.6506 16.073L13.7112 15.0124Z" fill="#000000"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            <input className='colorPicker' type="color" defaultValue="#000000" value={strokeColor} onChange={handleStrokeColorChange} />
            <svg onClick={handleUndoClick} className='undoButton' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 13C16.5367 11.9961 15.7497 11.1655 14.7576 10.6333C13.7655 10.1011 12.622 9.89624 11.4994 10.0495C9.66479 10.3 8.38607 11.6116 7 12.8186M7 10V13H10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <button className='flipButton' onClick={() => setFlipped(!flipped)}><svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#004aad"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.096"></g><g id="SVGRepo_iconCarrier"> <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="#004aad" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> Show Answer</button>
          </div>
          <div className="card-back">
            <div className='answersContainer'>
              {populateAnswers()}
              <button className='flipButton' onClick={() => setFlipped(!flipped)}><svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#004aad"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.096"></g><g id="SVGRepo_iconCarrier"> <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="#004aad" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> Show Question</button>
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
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s;
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
    border-radius: 15px;
    justify-content: center;
    font-size: clamp(10px,1.9vw,60px);
    transform: rotateY(0deg);
    color: black;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .card-front p {
    position: absolute;
  }

  .card-back {
    background-color: white;
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 15px;
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

  .flipButton {
    background-color: rgb(128, 145, 219);
    border: var(--bg-secondary);
    border-radius: clamp(5px, 0.4vw,30px);
    color: var(--bg-secondary);
    font-size: clamp(5px, 1.0vw,70px);
    padding: clamp(5px, 0.5vw, 20px) clamp(5px, 1.0vw,70px) ;
    cursor: pointer;
    bottom: 5%;
    right: 5%;
    font-weight: 550;
    display: flex;
    position: absolute;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    user-select: none;
    transition: all 500ms ease;
  }

  .flipButton svg {
    width: clamp(5px, 1.5vw, 50px);
    height: clamp(5px, 1.5vw, 50px);
    margin-right: 5px;
  }

  .flipButton:hover {
    transform: scale(0.97);
  }

  .penButton {
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: clamp(5px, 1.9vw, 50px);
    height: clamp(5px, 1.9vw, 50px);
    cursor: pointer;
    background-color: rgb(128, 145, 219);
    border-radius: 50%;
  }

  .eraserButton {
    position: absolute;
    bottom: 5%;
    left: 10%;
    width: clamp(5px, 1.9vw, 50px);
    height: clamp(5px, 1.9vw, 50px);
    cursor: pointer;
    background-color: rgb(128, 145, 219);
    border-radius: 50%;
  }

  .eraserButton:hover {
    transform: scale(0.97);
  }

  .penButton:hover {
    transform: scale(0.97);
  }

  .colorPicker {
    position: absolute;
    bottom: 5%;
    left: 15%;
    width: clamp(5px, 1.9vw, 50px);
    height: clamp(5px, 1.9vw, 50px);
    cursor: pointer;
    border-radius: 50%;
    border: solid 4px black;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 0;
    background-color: ${({ strokeColor }) => strokeColor || '#000000'};
  }

  .colorPicker::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  .colorPicker::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }

  .colorPicker::-moz-color-swatch {
    border: none;
    border-radius: 50%;
  }
  
  .undoButton {
    position: absolute;
    bottom: 5%;
    left: 20%;
    width: clamp(5px, 1.9vw, 50px);
    height: clamp(5px, 1.9vw, 50px);
    cursor: pointer;
    background-color: rgb(128, 145, 219);
    border-radius: 50%;
  }

  .undoButton:hover {
    transform: scale(0.97);
  }

  .undoButton:active {
    background-color: rgb(247, 245, 134);
  }
`;

export default Flashcard;
