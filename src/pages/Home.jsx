import React from 'react';
import styles from './Home.module.css';
import useUserStore from '../hooks/useUserStore';

const Home = () => {
    const toggleUserLogIn = useUserStore(state => state.toggleLogIn);

    return (
        <div>
            <h1>Welcome to MathForge</h1>
            <p>Your one-stop solution for all your math needs.</p>
            <button onClick={toggleUserLogIn}>Test Login UI</button>
        </div>
    );
};

export default Home;