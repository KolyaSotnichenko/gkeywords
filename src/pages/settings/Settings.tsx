import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { DataGrid, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'
import Geo from '../../components/Geo'
import Navigation from '../../components/Navigation'
import Projects from '../../components/Projects'
import styles from '../../styles/Statistics.module.css'

const Settings = () => {

  const [tableData, setTableData] = useState<[]>([])
  const [keysArray, setKeysArray] = useState<[]>([])
  const [keysString, setKeysString] = useState<String>('')
  const [selectedProject, setSelectedProject] = useState<String>('')
  const [selectedCountry, setSelectedCountry] = useState<String>('')

  const selectProject = (value: string) => {
    setSelectedProject(value)
}

const selectCountry = (value: string) => {
    setSelectedCountry(value)
}

const columns: GridColDef[] = [
  {
    field: 'country',
    headerName: 'COUNTRIES',
    headerClassName: styles.headerColumn,
    flex: 0.5,
    renderHeader: (params: GridColumnHeaderParams) => {
      return(
          <div>
              <strong style={{color: '#8d98a9'}}>
                  {'COUNTRIES'}
              </strong>
          </div>
      )
    }
  },
  {
    field: 'project',
    headerName: 'PROJECT',
    headerClassName: styles.headerColumn,
    flex: 0.5,
    renderHeader: (params: GridColumnHeaderParams) => {
      return(
          <div>
              <strong style={{color: '#8d98a9'}}>
                  {'PROJECT'}
              </strong>
          </div>
      )
    }
  },
  {
    field: 'keyword',
    headerName: 'KEY',
    headerClassName: styles.headerColumn,
    flex: 0.5,
    renderHeader: (params: GridColumnHeaderParams) => {
      return(
          <div>
              <strong style={{color: '#8d98a9'}}>
                  {'KEY'}
              </strong>
          </div>
      )
    }
  },
  {
    field: 'action',
    headerName: 'ACTION',
    headerClassName: styles.headerColumn,
    headerAlign: 'center',
    sortable: false,
    align:'center',
    flex: 1,
    renderHeader: (params: GridColumnHeaderParams) => {
      return(
          <div>
              <strong style={{color: '#8d98a9'}}>
                  {'ACTION'}
              </strong>
          </div>
      )
    },
    renderCell: (params) => {
      const onClick = async (e: { stopPropagation: () => void }) => {
        e.stopPropagation();

        const rowId = params.id

        const url = `http://45.76.89.147:81/api/delete_task?id=${rowId}`

        console.log(rowId)

        await fetch(url, {method: "POST"}).then(response => response.json()).then(json => console.log(json))

        params.api.updateRows([{ id: rowId, _action: 'delete' }])
        
      };

      return <Button variant="contained" onClick={onClick}>Delete</Button>;
    }
  }
]

useEffect(() => {
  fetchData()

  return () => {}
}, [tableData])

const fetchData = async () => {

  let url = "http://45.76.89.147:81/api/get_all_results"

  try {
      const response = await fetch(url)
      const json = await response.json()
      setTableData(json)
  } catch (error) {
      console.log(error)
  }
}

const addTask = async () => {

  setKeysArray(keysString.split(', ') as [])

  const url = `http://45.76.89.147:81/api/add_task?project=${selectedProject}&key=${keysArray.join('')}&country=${selectedCountry}`

  await fetch(url, {
    method: "POST"
  })

  setKeysString('')
  setSelectedCountry('')
  setSelectedProject('')
  setKeysArray([])

}

  return (
    <>
        <Navigation/>
        <Container maxWidth="lg">
          <Box sx={{marginTop: 10}}>
            <Typography variant="h5" component="h2">
              Add task
            </Typography>
          </Box>
          <Box sx={{marginTop: 10}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4} sm={3} md={3} lg={3}>
                <Geo selectCountry={selectCountry} />
              </Grid>
              <Grid item xs={4} sm={3} md={3} lg={3}>
                <Projects selectProject={selectProject} />
              </Grid>
              <Grid item xs={3} sm={6} md={6} lg={6}>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  <Button onClick={addTask} variant="outlined">Add</Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{marginTop: 10}}>
            <Typography variant="h5" component="h2">
              Keys:
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{display: 'flex', justifyContent: 'start'}}>
                <TextField
                  id="keys-filed"
                  multiline
                  rows={4}
                  variant="filled"
                  sx={{width: '100%'}}
                  value={keysString}
                  onChange={(event) => setKeysString(event.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{marginTop: 10}}>
            <Typography variant="h5" component="h2">
              Tasks List:
            </Typography>
          </Box>
          <Box sx={{marginTop: 10}}>
            <DataGrid
                autoHeight               
                // rowHeight={120} 
                rows={tableData} 
                pageSize={5} 
                columns={[
                  ...columns,
                  {field: 'action', sortable: false, disableColumnMenu: true},
                  {field: 'country', sortable: false, disableColumnMenu: true}
                ]}
                sx={{
                  backgroundColor: 'background.default'
                }}
            />
          </Box>
        </Container>
    </>
  )
}

export default Settings