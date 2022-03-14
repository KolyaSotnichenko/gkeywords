import React from 'react'
import type { FC } from 'react';
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import styles from '../../styles/Navigation.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Navigation: FC = () => {

  const router = useRouter()

  return (
    <Box sx={{paddingTop: 5}}>
      <Grid container >
        <Grid item xs={6}>
          <Box sx={{textAlign: 'center'}}>
            <Link href={'/'}>
              <Typography variant="h5" component="h2">
                <a className={router.pathname == "/" ? styles.activeLink : styles.navLink}>Statistics</a>
              </Typography>
              
            </Link>
          </Box>
          
        </Grid>
        <Grid item xs={6}>
          <Box sx={{textAlign: 'center'}}>
            <Link href={'/analytics'}>
              <Typography variant="h5" component="h2">
                  <a className={router.pathname == "/analytics" ? styles.activeLink : styles.navLink}>Analytics</a>
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
    
  )
}

export default Navigation