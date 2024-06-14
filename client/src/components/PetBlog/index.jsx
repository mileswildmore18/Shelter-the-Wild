import react from 'react';
import logo from './logo.svg';
import'./blog.css'; 

function Blog () {
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo'/>
                <p>
                    Edit <code>src/App.js</code> and save to load.
                </p>
                <a
                className='App-link'
                href='https://reactjs.org
                target='_blank'
                rel='nooopener noreferrence'
                >
                    Trying to learn react
                    </a>
            </header>
        </div>
    );
}
export default Blog;