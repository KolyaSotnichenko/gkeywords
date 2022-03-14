import React, { useEffect, useState } from 'react'
import type { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Autocomplete, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRowsProp } from '@mui/x-data-grid';
import Geo from '../../components/Geo';
import Projects from '../../components/Projects';
import TextField from '@mui/material/TextField';
import styles from '../../styles/Statistics.module.css'


const Statistics: FC = () => {

  const [tableData, setTableData] = useState<[]>([])
  const [key, setKey] = useState<String>('')
  const [keywords, setKeywords] = useState<[]>([])
  const [selectedProject, setSelectedProject] = useState<String>('')
  const [selectedCountry, setSelectedCountry] = useState<String>('')
  const [loading, setLoading] = useState<boolean>(false)

  const selectProject = (value: string) => {
      setSelectedProject(value)
  }

  const selectCountry = (value: string) => {
      setSelectedCountry(value)
  }

  const columns: GridColDef[] = [
    { 
        field: 'date',
        headerClassName: styles.headerColumn,
        headerName: 'DATA',
        width: 270,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (cellValues) => {
            return(
                <div style={{
                    color: '#65748b', 
                    fontWeight: 600,
                    fontSize: 18, 
                    backgroundColor: '#202938', 
                    padding: 12, 
                    paddingRight: 8,
                    paddingLeft: 8,
                    borderRadius: 20,
                    marginTop: 10,
                    marginBottom: 10
                    }}>
                    {cellValues.value}
                </div>
            )
        },
        renderHeader: (params: GridColumnHeaderParams) => {
            return(
                <div>
                    <strong style={{color: '#8d98a9'}}>
                        {'DATA'}
                    </strong>
                </div>
            )
        },
        
    },
    { 
        field: 'project',
        headerClassName: styles.headerColumn, 
        headerName: 'BRAND NAME', 
        width: 270, 
        headerAlign: 'center', 
        align: 'center',
        sortable: false,
        renderHeader: (params: GridColumnHeaderParams) => {
            return(
                <div>
                    <strong style={{color: '#8d98a9'}}>
                        {'BRAND NAME'}
                    </strong>
                </div>
            )
        }
    },
    { 
        field: 'domain', 
        headerClassName: styles.headerColumn, 
        headerName: 'WEBSITE', 
        width: 270, 
        headerAlign: 'center', 
        align: 'center',
        sortable: false, 
        renderHeader: (params: GridColumnHeaderParams) => {
            return(
                <div>
                    <strong style={{color: '#8d98a9'}}>
                        {'WEBSITE'}
                    </strong>
                </div>
            )
        }
    },
    { 
        field: 'country', 
        headerClassName: styles.headerColumn, 
        headerName: 'LOCATION', 
        width: 270, 
        headerAlign: 'center', 
        align: 'center',
        sortable: false,
        renderHeader: (params: GridColumnHeaderParams) => {
            return(
                <div>
                    <strong style={{color: '#8d98a9'}}>
                        {'LOCATION'}
                    </strong>
                </div>
            )
        } 
    },
    { 
        field: 'id', 
        headerClassName: styles.headerColumn, 
        headerName: 'REFERRAL ID', 
        width: 270, 
        headerAlign: 'center', 
        align: 'center',
        sortable: false,
        renderHeader: (params: GridColumnHeaderParams) => {
            return(
                <div>
                    <strong style={{color: '#8d98a9'}}>
                        {'REFERRAL ID'}
                    </strong>
                </div>
            )
        } 
    },
    { 
        field: 'keyword', 
        headerClassName: styles.headerColumn, 
        headerName: 'KEYWORDS', 
        width: 270, 
        headerAlign: 'center', 
        align: 'center',
        sortable: false,
        renderHeader: (params: GridColumnHeaderParams) => {
            return(
                <div>
                    <strong style={{color: '#8d98a9'}}>
                        {'KEYWORDS'}
                    </strong>
                </div>
            )
        } 
    },
    { 
        field: 'Rating', 
        headerClassName: styles.headerColumn, 
        headerName: 'RATING', 
        width: 270, 
        headerAlign: 'center', 
        align: 'center',
        sortable: false,
        renderHeader: (params: GridColumnHeaderParams) => {
            return(
                <div>
                    <strong style={{color: '#8d98a9'}}>
                        {'RATING'}
                    </strong>
                </div>
            )
        } 
    },
  ];

  useEffect(() => {
    setLoading(true)  
    fetchData()

    return () => {setLoading(false)}
  }, [key, selectedProject, selectedCountry])

  const fetchData = async () => {

    let url = "http://45.76.89.147:81/api/get_all_results"

    if(key !== "" || selectedProject !== "" || selectedCountry !== ""){
        url = `http://45.76.89.147:81/api/get_by_params?country=${selectedCountry}&project=${selectedProject}&key=${key}&limit=100&skip=0`
    }

    try {
        const response = await fetch(url)
        const json = await response.json()
        setTableData(json)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchKeys()

    return () => {}
  }, [])

  const fetchKeys = async () => {
    const url = "http://45.76.89.147:81/api/get_all_keys"

    try {
        const response = await fetch(url)
        const json = await response.json()

        setKeywords(json)
    } catch (error) {
        console.log
    }
  }

  return (
      <>
        <Box sx={{marginTop: 10}}>
            <Grid 
                container
                spacing={2} 
                xs={12}
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
            
            >
                <Grid item>
                    <Autocomplete
                        // disablePortal
                        id="combo-box-demo"
                        options={keywords}
                        getOptionLabel={(keywords) => `${keywords.name}`}
                        isOptionEqualToValue={(option: any, value: any) =>{
                            option.name === value.name
                            setKey(value.name)
                            return true
                        }}
                        noOptionsText={"NO KEYS"}
                        sx={{ width: 300 }} 
                        renderInput={(params) => <TextField {...params} onChange={(event) => setKey(event.target.value)} id="standard-basic" label="Key" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={8} md={2}>
                    <Projects selectProject={selectProject} />
                </Grid>
                <Grid item xs={8} md={2}>
                    <Geo selectCountry={selectCountry} />
                </Grid>
            </Grid>
        </Box>
        <Box sx={{marginTop: 10}}>
            <DataGrid
                disableSelectionOnClick 
                disableColumnMenu
                autoHeight 
                rowHeight={120} 
                rows={tableData} 
                pageSize={10} 
                columns={columns}
                components={{
                    LoadingOverlay: LinearProgress,
                }}
                loading={loading}
                sx={{
                    borderTop: 'none',
                    backgroundColor: 'background.default'
                }} 
            />
        </Box>
      </>
    
  )
}

export default Statistics