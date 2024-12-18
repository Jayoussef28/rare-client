import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getUsers } from '../../api/userData';

export default function UserTable() {
  // const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    getUsers().then(setUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Created On</th>
          <th>Status</th>
          <th>Profile Type</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.first_name} {user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.created_on}</td>
            <td>{user.active ? 'Active' : 'Not Active'}</td>
            <td>{user.is_staff ? 'Admin' : 'Author'} </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
