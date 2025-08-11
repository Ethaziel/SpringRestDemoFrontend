import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, Button, TablePagination, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField
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
      await fetchDeleteDataWithAuth(`/auth/users/${userId}`);
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
    try {
      await fetchPutDataWithAuth(`/auth/users/${editUser.id}`, editUser);
      await loadUsers(); // refresh after save
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      handleEditClose();
    }
  };

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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.authorities}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined" onClick={() => handleEditOpen(user)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
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
                margin="normal"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              <TextField
                label="Roles (comma-separated)"
                fullWidth
                margin="normal"
                value={editUser.authorities}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    authorities: e.target.value.split(',').map(role => role.trim())
                  })
                }
              />
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
