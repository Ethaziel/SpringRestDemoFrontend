import React, {useEffect, useState} from "react";
import { Card, CardContent, CardMedia, Grid, Typography, Tooltip } from '@mui/material';
//import {  Grid } from '@mui/material';
import { fetchGetDataWithAuth, fetchGetDataWithAuthArrayBuffer } from "client/client";
import { useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';

//const samplePhotoUrl = "https://picsum.photos/300/200";

/* const generatePicsumUrls = (count = 10, width = 300, height = 200) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${Math.random()}/${
      width
    }/${height}`,
    title: `Random Image ${i + 1}`
  }));
}; */

const PhotoGrid = () => {
 // const photos = generatePicsumUrls();

    //const [photos, setPhotos] = useState(new Set ());
    
    const [photos, setPhotos] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const album_id = queryParams.get('id');

    useEffect(() => {
        /* const addPhotoAsync = async (link) => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setPhotos(prevPhotos => new Set([...prevPhotos, link]));
        };

        const loadPhotos = async () => {
            for (const link of photoUrls){
                await addPhotoAsync(link);
            }
        };
        loadPhotos(); */

        fetchGetDataWithAuth('/albums/' + album_id).then(res => {
            console.log('res', res.data);
            const photoList = res.data.photos; // extract list of photos from album

            photoList.forEach(photo => {



                fetchGetDataWithAuthArrayBuffer(photo.downloadLink).then(response => {
                    
                    const albumPhotoID = 'album_' + album_id + '_photo' + photo.id;
                    const buffer = Buffer.from(response.data, 'binary').toString('base64');
                    
                    console.log('Binary response length:', response.data?.byteLength);

                    const temp = {
                        'album_id': album_id,
                        'photo_id': photo.id,
                        'name': photo.name,
                        'description': photo.description,
                        'content': buffer,
                    }
                    setPhotos(prevPhotos => ({ ...prevPhotos, [albumPhotoID]: temp}));
                });
            });
        });
    }, [album_id] );

  return (
    <Grid container spacing={2}>
      {/* {[...photos].map((photo) => (
        <Grid item xs={8} sm={4} md={4} lg={2} key={photo.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={photo.url}
              alt={photo.title}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {photo.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))} */}
      {Object.keys(photos).map(key => (
        <Grid item key={key} xs={8} sm={4} md={4} lg={2}>
            <Card>
                <Tooltip title={photos[key]['description']}>
                    <CardMedia component="img" height="200" image={'data:image/jpeg;base64,' + photos[key]['content']} alt={photos[key]['description']} title={photos[key]['description']}/>
                </Tooltip>
                <CardContent>
                    <Tooltip title={photos[key]['description']}>
                        <Typography variant="subtitle1">{photos[key]['name']}</Typography>
                    </Tooltip>
                </CardContent>
            </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PhotoGrid;