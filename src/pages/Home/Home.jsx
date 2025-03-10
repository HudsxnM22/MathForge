import React from 'react';
import styles from './Home.module.css';
import useUserStore from '../../hooks/useUserStore';

const Home = () => {
    const toggleUserLogIn = useUserStore(state => state.toggleLogIn);
    
      return (
        <div style={styles.body}>
          <header style={styles.header}>
            <h1>Welcome to My Homepage</h1>
          </header>
    
          <section style={styles.section}>
            <h2>About Me</h2>
            <p style={styles.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis nisl eu leo interdum, nec fermentum libero fermentum. Integer euismod orci at mi malesuada, eu iaculis enim auctor. Etiam id nulla at lorem venenatis tincidunt.
            </p>
    
            <h2>My Hobbies</h2>
            <p style={styles.content}>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tristique feugiat dolor, id ullamcorper felis laoreet eget. Aenean aliquam, libero a aliquam pharetra, neque mi egestas urna, id condimentum ante leo ac purus.
            </p>
    
            <h2>Contact</h2>
            <p style={styles.content}>
              Fusce nec dui ut elit fermentum interdum. Integer nec nulla sit amet purus mollis feugiat. Donec varius bibendum arcu, sit amet dignissim elit maximus sit amet. In sed orci non erat varius fringilla ac sit amet turpis.
            </p>
            <button onClick={toggleUserLogIn}>Toggle Login</button>
    
            <div style={styles.spacer}></div>
          </section>
    
          <footer style={styles.footer}>
            <p>© 2025 My Homepage. All Rights Reserved.</p>
          </footer>
        </div>
      );
};

export default Home;