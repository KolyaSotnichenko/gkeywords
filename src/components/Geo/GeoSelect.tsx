import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  selectCountry: (value: string) => void;
}

const GeoSelect = ({selectCountry}: Props) => {

  const [country, setCountry] = useState()
  const [countries, setCountries] = useState<any[]>([])

  const handleChange = (event: any) => {
    selectCountry(event.target.value)
    setCountry(event.target.value)
  }

  useEffect(() => {
    fetchCountry()

    return () => {}
  }, [countries])

  const fetchCountry = async () => {
      const url = "http://45.76.89.147:81/api/get_all_countries"

      try {
          const response = await fetch(url)
          const json = await response.json()
          setCountries(json)
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">All Geo</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="All Geo"
            onChange={handleChange}
        >
          <MenuItem value=''>None</MenuItem>
          {countries.map((item) => {
              return (<MenuItem key={item.country} value={item.country}>{item.country}</MenuItem>)
          })}
        </Select>
    </FormControl>
  )
}

export default GeoSelect