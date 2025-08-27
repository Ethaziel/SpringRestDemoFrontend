import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, Button, TablePagination, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, 
  MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText,
  Box
} from '@mui/material';

import {
  fetchGetDataWithAuth,
  fetchPutDataWithAuth,
  fetchDeleteDataWithAuth,
} from '../../client/client';

const USERS_PER_PAGE = 10;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [editUser, setEditUser] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataWithAuth('/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    try {
      await fetchDeleteDataWithAuth(`/auth/users/${userId}/delete`);
      await loadUsers(); // refresh after deletion
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleEditOpen = (user) => {
    setEditUser({ ...user });
  };

  const handleEditClose = () => {
    setEditUser(null);
  };

  const handleEditSave = async () => {
    const roles = normalizeRoles(editUser.authorities); 
    try {
      await fetchPutDataWithAuth(
        `/auth/users/${editUser.id}/update-authorities`,
        { authorities: roles.join(' ') }
      );
      handleEditClose();
      loadUsers(); 
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/roles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setAvailableRoles(data))
      .catch(err => console.error("Failed to fetch roles", err));
  }, []);

  const ALL_ROLES = availableRoles;

  const normalizeRoles = (auth) =>
    Array.isArray(auth) ? auth : String(auth || '').trim().split(/\s+/).filter(Boolean);

  const paginatedUsers = users.slice(page * USERS_PER_PAGE, (page + 1) * USERS_PER_PAGE);

  if (loading) return <CircularProgress sx={{ m: 2 }} />;

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ p: 2 }}>User List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Personal Info</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.authorities}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.job}</TableCell>
                <TableCell>{(user.male === true|| user.male === null) ? "Male" : "Female"}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.personalInfo}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="small" variant="outlined" onClick={() => handleEditOpen(user)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={USERS_PER_PAGE}
          rowsPerPageOptions={[USERS_PER_PAGE]}
        />
      </TableContainer>

      {/* Edit User Modal */}
      <Dialog open={!!editUser} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editUser && (
            <>
              <TextField
                label="Email"
                fullWidth
                disabled
                margin="normal"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="roles-label">Roles</InputLabel>
                <Select
                  labelId="roles-label"
                  label="Roles"
                  multiple
                  value={editUser ? normalizeRoles(editUser.authorities) : []}
                  onChange={(e) =>
                    setEditUser(prev => ({ ...prev, authorities: e.target.value })) // e.target.value is an array
                  }
                  renderValue={(selected) => (Array.isArray(selected) ? selected.join(', ') : String(selected))}
                >
                  {ALL_ROLES.map(role => (
                    <MenuItem key={role} value={role}>
                      <Checkbox checked={normalizeRoles(editUser?.authorities).includes(role)} />
                      <ListItemText primary={role} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTable;
