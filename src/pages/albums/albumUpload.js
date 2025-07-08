import React, { useState } from 'react';
import axios from 'axios';
import Header from './albums/header';
import { Box, Button, CircularProgress, Container, Grid, Paper, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  dropzoneContainer: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer'
  },
  uploadedFile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.spacing(1)
  }
}));

const FileUploadPage = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
      setProcessing(true);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const token = localStorage.getItem('token');
      const response = await axios.post('/albums/' + id + '/upload-photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Upload successful:', response.data);
      setFiles([]);
      navigate('/album/show?id=' + id);
    } catch (error) {
      console.error('Error uploading files:', error.message);
    } finally {
      setProcessing(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Photo Upload
              </Typography>
            </Grid>
            <Grid item xs={12} {...getRootProps()}>
              <input {...getInputProps()} />
              <Paper elevation={3} className={classes.dropzoneContainer}>
                <AddCircleOutline fontSize="large" color="primary" />
                <Typography variant="h6">Drag and drop photos or click to select files</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {files.map((file, index) => (
                  <Paper key={index} elevation={3} className={classes.uploadedFile}>
                    <Typography>{file.name}</Typography>
                    <IconButton onClick={() => removeFile(index)} color="secondary">
                      <Close />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              {processing ? (
                <Box textAlign="center">
                  <CircularProgress />
                  <Typography variant="body2" color="textSecondary" marginTop="10px">
                    Uploading...
                  </Typography>
                </Box>
              ) : (
                <Button variant="contained" color="primary" onClick={handleUpload} disabled={files.length === 0}>
                  Upload Photos
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default FileUploadPage;
