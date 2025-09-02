import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { fetchGetDataWithAuth, fetchPutDataWithAuth } from "client/client";

// avatars map (same as in ViewProfile)
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

export default function ProfileEdit() {
  const [profile, setProfile] = useState({
    name: "",
    job: "",
    age: "",
    personalInfo: "",
    male: false,
    avatar: "avatar-male-1.png"
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchGetDataWithAuth("/auth/profile");
        if (response?.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchPutDataWithAuth("/auth/profile/update-profile", profile);
      navigate("/profile/view"); 
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Typography align="center">Loading profile...</Typography>;

  return (
    <Box sx={{ backgroundColor: "#f0f4f8", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardHeader
            title="Edit Profile"
            subheader="Update your information below"
            sx={{ textAlign: "center", backgroundColor: "#1976d2", color: "white" }}
            subheaderTypographyProps={{ sx: { color: "#e3f2fd" } }}
          />
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Avatar
                src={avatarMap[profile.avatar]}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={profile.name || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job"
                    name="job"
                    value={profile.job || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    name="age"
                    value={profile.age || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={profile.male}
                        onChange={handleChange}
                        name="male"
                      />
                    }
                    label="Male"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Personal Info"
                    name="personalInfo"
                    value={profile.personalInfo || ""}
                    onChange={handleChange}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>

              <Box mt={4} display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/profile/view")}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
