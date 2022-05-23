import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import './App.css';

const columns = [
  {
    field: 'id', headerName: 'ID', width: 70
  },
  {
    field: 'userId', headerName: 'User ID', width: 70
  },
  {
    field: 'title', headerName: 'Title', width: 200
  },
  {
    field: 'body', headerName: 'Body', flex: 1
  },
]

function App() {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10
  })

  useEffect(() => {
    const fetchData = async () => {
      console.log('ON')
      setPageState(old => ({ ...old, isLoading: true }))
      const response = await fetch(`http://localhost:4000?page=${pageState.page}&limit=${pageState.pageSize}`)
      const json = await response.json()
      setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize])


  return <Box>
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          Server-side Pagination demo
        </Typography>
      </Toolbar>
    </AppBar>
    <Container style={{ marginTop: 100, marginBottom: 100 }}>
      <DataGrid
        autoHeight
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={[10, 30, 50, 70, 100]}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPageState(old => ({ ...old, page: newPage + 1 }))
        }}
        onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
        columns={columns}
      />
    </Container>
  </Box>
}

export default App;
