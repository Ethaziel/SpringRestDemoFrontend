import React, {useEffect, useState} from "react";
import { Card, CardContent, CardMedia, Grid, Typography, Tooltip } from '@mui/material';
//import {  Grid } from '@mui/material';
import { fetchGetDataWithAuth, fetchGetDataWithAuthArrayBuffer, fetchGetBlobDataWithAuth, fetchDeleteDataWithAuth } from "client/client";
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
    const [albumInfo, setAlbumInfo] = useState({});

    const handleView = () => {
      console.log("View clicked")
    }

    const handleDownload = (download_link) => {
      fetchGetBlobDataWithAuth(download_link).then(
        response => {
          const disposition = response.headers.get('Content-Disposition');
          const match = /filename="(.*)"/.exec(disposition);
          const filename = match ? match[1] : 'downloadedFile';
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
        }
      ).catch (error => {
        console.error('Error downloading photo: ', error);
      })
    }
    
    const handleDelete = (photo_id) => {
      const isConfirmed = window.confirm('Are you sure you want to delete the photo?')
      if (isConfirmed){
        fetchDeleteDataWithAuth('/albums/' + album_id + '/photos/' + photo_id + '/delete')
          .then(res => {
            console.log(res);
            window.location.reload();
          })
      } else {
        console.log('Delete canceled');
      }
    }

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
            setAlbumInfo(res.data);
            const photoList = res.data.photos; // extract list of photos from album

            photoList.forEach(photo => {



                fetchGetDataWithAuthArrayBuffer(photo.downloadLink).then(response => {
                    
                    const albumPhotoID = 'album_' + album_id + '_photo' + photo.id;
                    const buffer = Buffer.from(response.data, 'binary').toString('base64');
                    
                    const temp = {
                        'album_id': album_id,
                        'photo_id': photo.id,
                        'name': photo.name,
                        'description': photo.description,
                        'content': buffer,
                        'download_link': photo.downloadLink
                    }
                    setPhotos(prevPhotos => ({ ...prevPhotos, [albumPhotoID]: temp}));
                });
            });
        });
    }, [album_id] );

  return (
    <div>
      <Typography variant="h4" gutterBottom>{albumInfo.name}</Typography>
      <Typography variant="subtitle1" gutterBottom>{albumInfo.description}</Typography>
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
                    <CardMedia component="img" height="200" image={'data:image/jpeg;base64,' + photos[key]['content']} alt={photos[key]['description']} />
                </Tooltip>
                <CardContent>
                    <Tooltip title={photos[key]['description']}>
                        <Typography variant="subtitle1">{photos[key]['name']}</Typography>
                    </Tooltip>
                    <a href="#" onClick={handleView}> View </a> |
                    <a href={`/photo/edit?album_id=${album_id}&photo_id=${photos[key]['photo_id']}&photo_name=${photos[key]['name']}&photo_desc=${photos[key]['description']}`}> Edit </a> |
                    <a href="#" onClick={() => handleDownload(photos[key]['download_link'])}> Download </a> |
                    <a href="#" onClick={() => handleDelete(photos[key]['photo_id'])}> Delete </a>
                </CardContent>
            </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default PhotoGrid;