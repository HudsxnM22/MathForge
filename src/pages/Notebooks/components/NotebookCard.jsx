import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useState } from 'react'
import NotebookPage from './notebookOpenUI/NotebookPage';
import { Navigate } from 'react-router-dom';
import notebooksApi from '../../../api/notebooks.api.js';

//this is the clickable card css is borrowed from a css designer far greater than myself
//to do: edit feature, with POST request to change notebook name along with DELETE feature within each notebook loading feature for each card

//this is the card that will be displayed for each notebook
//the user can click on the card to view the notebook
//**this is from https://uiverse.io/JohnnyCSilva/jolly-elephant-67
const NotebookCard = ({NotebookData, setNotebookPage, setNotebookCard}) => {

    const NotebookName = NotebookData.notebookName
    const NotebookSubtopic = NotebookData.subTopic
    const NotebookDifficulty = NotebookData.difficulty
    const NotebookSample = '\\(' + NotebookData.q1Sample + '\\)'

    const fetchNotebookData = () => {
        setNotebookPage({loading: true})
        notebooksApi.getDataNotebookAPI({ id: NotebookData.notebookId })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    setNotebookPage(response.data)
                } else {
                    console.error('Error fetching notebook data:', response.status);
                }
            })
            .catch((error) => {
                console.error('Error fetching notebook data:', error);
            });
    }

    const difficultyMap = {
        0: "Basic",
        1: "Medium",
        2: "Hard",
        3: "Very Hard"
    }

    const colorMap = {
      0: "rgb(99, 220, 164)",  // Lighter green
      1: "rgb(132, 219, 132)", // Lighter muted green
      2: "rgb(237, 214, 110)", // Lighter yellow
      3: "rgb(237, 135, 110)"  // Lighter red
    }

    const textColorMap = {
      0: "rgb(34, 125, 79)",  // Darker green
      1: "rgb(60, 140, 60)",  // Darker muted green
      2: "rgb(140, 124, 50)", // Darker yellow
      3: "rgb(140, 60, 50)"   // Darker red
    }


      return (
        <StyledWrapper>
          <div className="card" onClick={fetchNotebookData}>
            <div className="img" style={{background: `linear-gradient(180deg, ${colorMap[NotebookDifficulty]} 0%, white 100%`}}>
              <h4 className="math">{NotebookSample}</h4>
              <div className="save" onClick={(e) => {
                e.stopPropagation()
                setNotebookCard(NotebookData)
              }}>✏️</div>
            </div>
            <div className="text">
              <p className="h3"> {NotebookName} </p>
              <p className="p"> {NotebookSubtopic} </p>
              <div className="icon-box" style={{backgroundColor: colorMap[NotebookDifficulty]}}>
                <p className="span" style={{color: textColorMap[NotebookDifficulty]}}>{difficultyMap[NotebookDifficulty]}</p>
              </div>
            </div>
          </div>
        </StyledWrapper>
      );
    }
    
    const StyledWrapper = styled.div`
      .card {
        width: 11vw;
        height: 11vw;
        background: var(--bg-main);
        border-radius: clamp(5px, 1.5vw,20px);
        box-shadow: 0px 1px 27px 2px rgba(0,0,0,0.47);
        -webkit-box-shadow: 0px 1px 27px 2px rgba(0,0,0,0.47);
        -moz-box-shadow: 0px 1px 27px 2px rgba(0,0,0,0.47);
        z-index: 15;
        transition: all 50ms ease;
      }
    
      .img {
        position: relative;
        width: 100%;
        height: 50%;
        border-top-left-radius: clamp(5px, 1.5vw,20px);
        border-top-right-radius: clamp(5px, 1.5vw,20px);
        display: flex;
        align-items: top;
        justify-content: right;
        z-index: 1;
        overflow: hidden;
      }
    
      .math {
        font-family: 'Lucida Sans' sans-serif;
        font-size: clamp(5px, 0.65vw,18px);
        margin-top: 20%;
        font-weight: 470;
        text-align: center;
        position: absolute;
        width: 100%;
        z-index: 1;
        color: black;
      }

      .save {
        transition: 0.2s ease-in-out;
        border-radius: clamp(1px, 0.3vw,10px);
        margin: clamp(5px, 0.8vw,20px);
        width: 1vw;
        height: 1vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-main);
        z-index: 10;
        font-size: clamp(5px, 0.55vw,15px);
      }
    
      .text {
        margin: 6%;
        display: flex;
        flex-direction: column;
        align-items: space-around;
        z-index: 10;
      }
    
      .icon-box {
        margin-top: 5%;
        width: fit-content;
        padding: 5%;
        border-radius: clamp(5px, 0.5vw,20px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    
    
      .text .h3 {
        font-family: 'Lucida Sans' sans-serif;
        font-size: clamp(5px, 0.65vw,18px);
        font-weight: 600;
        color: var(--text-main);
      }
    
      .text .p {
        font-family: 'Lucida Sans' sans-serif;
        color: #999999;
        font-size: clamp(5px, 0.5vw,18px);
      }
    
      .icon-box .span {
        font-family: 'Lucida Sans' sans-serif;
        font-size: clamp(5px, 0.55vw,18px);
        font-weight: 520;
      }
    
      .card:hover {
        cursor: pointer;
        transform: scale(1.03);
      }
    
      .save:hover {
        transform: scale(1.1) rotate(10deg);
      }

      }
      @media (max-width: 1024px) {
        .card {
          width: 280px !important;
          height: 210px !important;
          flex-shrink: 0;
          scroll-snap-align: center;
          border-radius: 15px !important;
          -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3) !important;
          -moz-box-shadow:    0px 1px 5px 0px rgba(0, 0, 0, 0.3) !important;
          box-shadow:         0px 1px 5px 0px rgba(0, 0, 0, 0.3) !important;
          padding-bottom: 10px !important;
        }
  
        .math {
            font-size: clamp(12px, 3vw, 24px) !important;
        }

        .img {
          border-top-left-radius: 15px !important;
          border-top-right-radius: 15px !important;
        }
    
        .save {
            width: 30px !important;
            height: 30px !important;
            font-size: clamp(16px, 4vw, 20px) !important;
            border-radius: 10px !important;
        }
    
        .text .h3 {
            font-size: clamp(14px, 3.5vw, 22px) !important;
        }
    
        .text .p {
            font-size: clamp(12px, 3vw, 18px) !important;
        }
    
        .icon-box .span {
            font-size: clamp(12px, 3vw, 18px) !important;
        }
      }
      `;
    
    export default NotebookCard;
    