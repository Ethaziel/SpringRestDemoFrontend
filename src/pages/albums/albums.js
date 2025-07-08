// material-ui
//import fetchGetData from 'client/client';

// project import
import React, {useState} from 'react';
import {makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchGetDataWithAuth } from 'client/client';
import { CardContent, Grid, Card } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

//const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
/*const apiUrl = 'https://localhost:8080';
fetchGetData(apiUrl)
    .then(res => {
      console.log('Data: ', res.data);
    })
    .catch(error => {
      console.error('Error in .then: ', error.message);
    });*/

const brightPopColors = [
  '#FF3E4D', // red
  '#FF6B6B', // coral red
  '#FF9A00', // orange
  '#FFD700', // gold
  '#FF6347', // tomato
  '#FF1493', // deep pink
  '#FF69B4', // hot pink
  '#FF8C00', // dark orange
  '#FF00FF', // magenta
  '#FF4500', // orange red

  '#00CED1', // dark turquoise
  '#40E0D0', // turquoise
  '#00FFFF', // cyan
  '#1E90FF', // dodger blue
  '#007BFF', // bright blue
  '#00BFFF', // deep sky blue
  '#4169E1', // royal blue
  '#8A2BE2', // blue violet
  '#9932CC', // dark orchid
  '#BA55D3', // medium orchid

  '#32CD32', // lime green
  '#00FF7F', // spring green
  '#00FA9A', // medium spring green
  '#3CB371', // medium sea green
  '#2ECC71', // emerald
  '#ADFF2F', // green yellow
  '#7FFF00', // chartreuse
  '#BFFF00', // bright lime
  '#98FB98', // pale green
  '#66FF66', // bright pastel green

  '#E91E63', // rose pink
  '#9C27B0', // amethyst
  '#D500F9', // vibrant violet
  '#FF6F91', // watermelon
  '#FC5185', // bubblegum pink
  '#F15BB5', // hot magenta
  '#FFB3BA', // soft pink
  '#FA8072', // salmon
  '#F08080', // light coral
  '#FF7F50', // coral

  '#FFA500', // bright orange
  '#FFDE59', // sunflower yellow
  '#FFF700', // lemon yellow
  '#A3FF00', // neon green
  '#00FFCC', // aqua
  '#33FFFF', // electric cyan
  '#33CCFF', // bright sky blue
  '#3375FF', // vibrant blue
  '#9B30FF', // purple
  '#FF33CC'  // neon pink
];


const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * brightPopColors.length);
  return brightPopColors[randomIndex];
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: getRandomColor(),
    textAlign: 'center',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const AlbumDynamicGridPage = () => {
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login');
      window.location.reload();
    }
    fetchGetDataWithAuth('/albums/').then((res) => {
      setDataArray(res.data);
      console.log('dataArray', dataArray);
    });
  }, []);

  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {dataArray.map((data, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.card} style={{backgroundColor: getRandomColor()}}>
            <CardContent>
              <h1 style={{ fontSize: '2rem', margin: 0, color: 'white' }}>{data.name}</h1>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};


export default AlbumDynamicGridPage;
