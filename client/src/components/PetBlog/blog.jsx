import React from 'react';
import './blog.css'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const useStyles = makesStyles((theme) => ({
    appBar: {
        backgroundColor: '#fff'
    },
hero: {
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url https://www.shutterstock.com/shutterstock/photos/2189352293/display_1500/stock-photo-handicapped-dog-in-wheelchair-at-a-park-2189352293.jpg'
}
}));


function Blog() {
 const classes = useStyles();

    return (
        <div className='Blog'>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    
                    <Typography variant="h6" color='primary' >
                        Blog
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box class Name={classes.hero}>
                <Box>Pet Blog</Box>
            </Box>
        </div>
    );
}

export default App;