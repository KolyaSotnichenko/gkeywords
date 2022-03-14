import React, { useEffect, useState } from 'react'
import type { FC } from 'react';
import Navigation from '../../components/Navigation';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridColumnHeaderParams} from '@mui/x-data-grid';
import SettingsButton from '../../components/SettingsButton';
import styles from '../../styles/Statistics.module.css'


const Analytics: FC = () => {

  const [domains, setDomains] = useState<any[]>([])
  const [countReports, setCountReports] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const columnsOverview: GridColDef[] = [
    {
      field: 'domain',
      headerName: 'DOMAIN',
      headerClassName: styles.headerColumn,
      headerAlign: 'center',
      sortable: false,
      flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => {
        return(
            <div>
                <strong style={{color: '#8d98a9'}}>
                    {'DOMAIN'}
                </strong>
            </div>
        )
      },
    },
    {
      field: 'count',
      headerName: 'COUNT REPORTS',
      headerClassName: styles.headerColumn,
      headerAlign: 'center', 
      align: 'center',
      sortable: false,
      flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => {
        return(
            <div>
                <strong style={{color: '#8d98a9'}}>
                    {'COUNT REPORTS'}
                </strong>
            </div>
        )
      }, 
    }
  ]


  const columnsHistory: GridColDef[] = [
    {
      field: 'domain',
      headerName: 'DOMAIN',
      headerClassName: styles.headerColumn,
      headerAlign: 'center',
      sortable: false,
      flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => {
        return(
            <div>
                <strong style={{color: '#8d98a9'}}>
                    {'DOMAIN'}
                </strong>
            </div>
        )
      },
    },
    {
      field: 'project',
      headerName: 'PROJECT',
      headerClassName: styles.headerColumn,
      headerAlign: 'center', 
      align: 'center',
      flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => {
        return(
            <div>
                <strong style={{color: '#8d98a9'}}>
                    {'PROJECT'}
                </strong>
            </div>
        )
      }, 
    },
    {
      field: 'keyword',
      headerName: 'KEY',
      headerClassName: styles.headerColumn,
      headerAlign: 'center', 
      align: 'center',
      flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => {
        return(
            <div>
                <strong style={{color: '#8d98a9'}}>
                    {'KEY'}
                </strong>
            </div>
        )
      }, 
    },
    {
      field: 'date',
      headerName: 'DATE',
      headerClassName: styles.headerColumn,
      headerAlign: 'center', 
      align: 'center',
      flex: 1,
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
      field: 'country',
      headerName: 'COUNTRY',
      headerClassName: styles.headerColumn,
      headerAlign: 'center', 
      align: 'center',
      flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => {
        return(
            <div>
                <strong style={{color: '#8d98a9'}}>
                    {'COUNTRY'}
                </strong>
            </div>
        )
      }, 
    }
  ]

  useEffect(() => {

    setLoading(true)

    fetchDomains()
    fetchReports(domains)

    setLoading(false)

    return () => {}
  }, [countReports])

  const fetchDomains = async () => {
    
    const url = 'http://45.76.89.147:81/api/get_all_results?limit=100&skip=0'

    try {
      setLoading(true)
      const response = await fetch(url)
      const json = await response.json()
      setDomains(json)
      setLoading(false)
    } catch (error) {
        console.log(error)
    }
    
  }

  const fetchReports = async (domains: any[]) => {
    setLoading(true)
    let countReports = []

    for(let i = 0; i < domains.length; i++) {
      let url = `http://45.76.89.147:81/api/get_count_records_by_domain?domain=${domains[i].domain}`
      
      try {
        const response = await fetch(url)
        const json = await response.json()
        countReports.push(json)
      } catch (error) {
          console.log(error)
      }     
    }

    setCountReports(countReports as [])
    setLoading(false)
  }

  const result = domains.map((item, index) => ({...item, ...(countReports[index] as object)}))

  return (
    <>
      <Navigation />
      <Container maxWidth="lg">
        <Box sx={{marginTop: 10}}>
          <Typography variant="h5" component="h2">
            Reports overview
          </Typography>
        </Box>
        <Box sx={{marginTop: 10}}>
          <DataGrid
            disableSelectionOnClick 
            disableColumnMenu
            autoHeight  
            pageSize={10} 
            columns={columnsOverview}
            components={{
              LoadingOverlay: LinearProgress,
            }}
            loading={loading}
            rows={result}
            sx={{
              backgroundColor: 'background.default'
            }} 
          />
        </Box>
        <Box sx={{marginTop: 10}}>
          <Typography variant="h5" component="h2">
            Reports history
          </Typography>
        </Box>
        <Box sx={{marginTop: 10}}>
          <DataGrid
            disableSelectionOnClick 
            disableColumnMenu
            autoHeight  
            pageSize={10} 
            columns={columnsHistory}
            components={{
              LoadingOverlay: LinearProgress,
            }}
            loading={loading}
            rows={domains}
            sx={{
              backgroundColor: 'background.default'
            }} 
          />
        </Box>
      </Container>
      <SettingsButton />
    </>
    
  )
}

export default Analytics