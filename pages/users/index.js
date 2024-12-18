import UserTable from '../../components/Tables/UserTable';

function Home() {
  return (
    <div
      className=""
      style={{
        height: '90vh',
        padding: '20px 10px',
      }}
    >
      <h1>Admin User List/Manager</h1>
      <UserTable />
    </div>
  );
}

export default Home;
