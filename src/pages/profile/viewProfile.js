import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { fetchGetDataWithAuth, fetchGetBlobDataWithAuth } from "client/client";

// avatars map
import avatarMale1 from 'assets/images/users/avatar-male-1.png';
import avatarMale2 from 'assets/images/users/avatar-male-2.png';
import avatarMale3 from 'assets/images/users/avatar-male-3.png';
import avatarFemale1 from 'assets/images/users/avatar-female-1.png';
import avatarFemale2 from 'assets/images/users/avatar-female-2.png';
import avatarFemale3 from 'assets/images/users/avatar-female-3.png';

const avatarMap = {
  'avatar-male-1.png': avatarMale1,
  'avatar-male-2.png': avatarMale2,
  'avatar-male-3.png': avatarMale3,
  'avatar-female-1.png': avatarFemale1,
  'avatar-female-2.png': avatarFemale2,
  'avatar-female-3.png': avatarFemale3
};

export default function ViewProfile() {

    const [profile, setProfile] = useState({});
    const [photos, setPhotos] = useState([]);

    const loadProfile = async () => {
        try {
            const response = await fetchGetDataWithAuth('/auth/profile');
            setProfile(response.data);

           // Load albums for this account
            const albumsResponse = await fetchGetDataWithAuth("/albums/");
            
            // Collect all photos across albums
            const allPhotos = albumsResponse.data.flatMap(album => album.photos || []);

            // Randomize & take up to 4
            if (allPhotos.length > 0) {
                const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 4);

                // Fetch blobs for each photo
                const photoUrls = await Promise.all(
                    selected.map(async (photo) => {
                    const res = await fetchGetBlobDataWithAuth(
                        `/albums/${photo.albumId}/photos/${photo.id}/view`
                    );
                    const blobUrl = URL.createObjectURL(res.data);
                    return {
                        ...photo,
                        blobUrl
                    };
                    })
                );

                setPhotos(photoUrls);
            } else {
                setPhotos([]);
            }
        } catch (error) {
            console.error('Failed to load profile:', error);
        }
    } 

    useEffect(() => {
        loadProfile();
      }, []);

  return (
    <Box sx={{ backgroundColor: "#9de2ff", minHeight: "100vh", py: 5 }}>
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item lg={9} xl={7}>
            <Card>
              {/* Header section with avatar and name */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  height: 200,
                  backgroundColor: "#000",
                  color: "white",
                  p: 2,
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                }}
              >
                {/* Avatar + button */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mr: 2,
                    mt: 4,
                  }}
                >
                  <Avatar
                    src={avatarMap[profile.avatar]}
                    alt="Profile"
                    sx={{
                      width: 150,
                      height: 150,
                      border: "3px solid white",
                      mb: 1,
                    }}
                  />
                  <Button variant="outlined" size="small" color="inherit">
                    Edit Profile
                  </Button>
                </Box>

                {/* Name and location */}
                <Box sx={{ ml: 2, mb: 2 }}>
                  <Typography variant="h5">{profile.name}</Typography>
                  <Typography variant="body2">{profile.email}</Typography>
                </Box>
              </Box>

              {/* Stats section */}
              <Box
                sx={{
                  backgroundColor: "#f8f9fa",
                  p: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                  textAlign: "center",
                  gap: 4,
                }}
              >
                <Box>
                  <Typography variant="h6">{profile.age}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Age
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{(profile.male === true|| profile.male === null) ? "Male" : "Female"}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Gender
                  </Typography>
                </Box>
                
              </Box>

              {/* Content section */}
              <CardContent>
                {/* About */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Box sx={{ backgroundColor: "#f8f9fa", p: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {profile.job}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {profile.personalInfo}
                    </Typography>
                    
                  </Box>
                </Box>

                {/* Recent photos */}
                <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h6">Random Photos</Typography>
                  <Typography
                    variant="body2"
                    component={Link}
                    to="/"
                    sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                    Show all
                    </Typography>
                </Box>

                {photos.length > 0 ? (
                    <Grid container spacing={2}>
                        {photos.map((photo, idx) => (
                        <Grid item xs={12} sm={6} key={idx}>
                            <Card>
                            <img
                                src={photo.blobUrl}
                                alt={photo.name}
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            />
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                    ) : (
                    <Card>
                        <CardContent>
                        <Typography variant="body1" align="center">
                            No photos uploaded yet
                        </Typography>
                        </CardContent>
                    </Card>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
