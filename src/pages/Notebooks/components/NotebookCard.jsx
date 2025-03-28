import React from 'react'
import styles from './NotebookCard.module.css'
import styled from 'styled-components';

//this is the clickable card css is borrowed from a css designer far greater than myself
//to do: edit feature, with POST request to change notebook name along with DELETE feature within each notebook loading feature for each card

//this is the card that will be displayed for each notebook
//the user can click on the card to view the notebook
//**this is from https://uiverse.io/eslam-hany/selfish-bobcat-73
const NotebookCard = ({NotebookData}) => {
    const NotebookName = NotebookData.name
    const NotebookSubtopic = NotebookData.subtopic


    return (
        <StyledWrapper>
          <div className="book">
            <p>{NotebookSubtopic}</p>
            <button>✏️</button>
            <div className="cover">
              <p>{NotebookName}</p>
            </div>
          </div>
        </StyledWrapper>
      );
}

const StyledWrapper = styled.div`
  .book {
    position: relative;
    border-radius: 10px;
    width: 14vw;
    height: 23vh;
    background-color: whitesmoke;
    -webkit-box-shadow: 1px 1px 12px #000;
    box-shadow: 1px 1px 12px #000;
    -webkit-transform: preserve-3d;
    -ms-transform: preserve-3d;
    transform: preserve-3d;
    -webkit-perspective: 2000px;
    perspective: 2000px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #000;
    cursor: pointer;
  }

  .cover {
    top: 0;
    position: absolute;
    background: #CE5937;
    background: -moz-linear-gradient(-45deg, #CE5937 0%, var(--bg-secondary) 0%, #F8F8F8 100%);
    background: -webkit-linear-gradient(-45deg, #CE5937 0%, var(--bg-secondary) 0%, #F8F8F8 100%);
    background: linear-gradient(135deg, #CE5937 0%, var(--bg-secondary) 0%, #F8F8F8 100%);  
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform-origin: 0;
    -ms-transform-origin: 0;
    transform-origin: 0;
    -webkit-box-shadow: 1px 1px 12px #000;
    box-shadow: 1px 1px 12px #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .book:hover .cover {
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform: rotatey(-80deg);
    -ms-transform: rotatey(-80deg);
    transform: rotatey(-80deg);
  }

  button {
    position: absolute;
    top: 1%;
    right: 1%;
    background-color: transparent;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    border: none;
    padding: 5px;
    border-radius: 35px;
    font-size: clamp(5px, 1.0vw ,35px);
    cursor: pointer;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }

    button:hover {
        -webkit-transform: scale(0.9);
        -ms-transform: scale(0.9);
        transform: scale(0.9);
        background-color: rgb(220, 220, 220);
    }

  p {
    font-size: clamp(5px, 0.8vw ,25px);
    font-weight: 550;
  }`;

export default NotebookCard;