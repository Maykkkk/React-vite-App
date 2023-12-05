import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'userId', headerName: 'User ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'body', headerName: 'Body', width: 400 },
];

const Component1: React.FC = () => {
  const [posts, setPosts] = React.useState<PostData[]>([]);

  React.useEffect(() => {
    
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={posts} columns={columns} />
    </div>
  );
};

export default Component1;
