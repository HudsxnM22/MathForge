import React from 'react';
import styles from './Home.module.css';
import useUserStore from '../../hooks/useUserStore';

const Home = () => {
    const toggleUserLogIn = useUserStore(state => state.toggleLogIn);
    
      return (
        <div className={styles.mainContent}>
          <span className={styles.HomeContent}>
            <div className={styles.homeBannerImageHolder}></div>
            <div className={styles.textHolder}>
              <h1 className={styles.welcomeText}>Create Math Practice Problems Effortlessly</h1>
              <button className={styles.createButton} onClick={toggleUserLogIn}>Start Creating</button>
            </div>
          </span>
          <span className={styles.HowContent}>
            <div className={styles.howtoTextHolder}>
              <h2 className={styles.howToText}>How it works</h2>
              <p className={styles.description}>Mathforge uses the latest AI models to generate endless unique math practice problems. Math practice sets are stored in "Notebooks" these notebooks hold 5 practice problems each. To create a notebook first log-in or create an account, this will then give you access to the "Notebook creator". From there its simple, all you do is select from the drop down the math topic and subtopic and then your done. Each notebook will show you both the problem then upon request will display the answer powered by Wolfram Alpha.</p>
              <p className={styles.disclaimer}>Disclaimer regarding notebooks usage monthly: Currently Mathforge is limited by strict usage policies by the AI models we use, if you would like to donate to support Mathforge's development effort, your donation will be greatly appreciated.</p>
            </div>
            <div className={styles.notebookHowToImage}></div>
          </span>
        </div>
      );
};

export default Home;