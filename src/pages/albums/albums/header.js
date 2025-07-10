import React from "react";
import {Link, useLocation } from 'react-router-dom';
import {Button, AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                    Photo Gallery
                </Typography>

                <Button component={Link} to={`/album/show?id=${id}`} 
                        color="inherit" variant="contained"
                        sx={{mr: 2, backgroundColor: '#799eff', '&:hover': {backgroundColor: '#2f6ad5'}}}
                        >
                        Edit Album
                </Button>

                <Button component={Link} to={`/album/upload?id=${id}`} 
                        color="inherit" variant="contained"
                        sx={{mr: 2, backgroundColor: '#4caf53', '&:hover': {backgroundColor: '#388e3f'}}}
                        >
                        Upload Photos
                </Button>

                <Button component={Link} to={`/album/delete?id=${id}`} 
                        color="inherit" variant="contained"
                        sx={{ backgroundColor: '#f4435a', '&:hover': {backgroundColor: '#d32f4a'}}}
                        >
                        Delete Album
                </Button>

            </Toolbar>
        </AppBar>
    );
};

export default Header;