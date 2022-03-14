import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  selectProject: (value: string) => void;
}

const ProjectsSelect = ({selectProject}: Props) => {

  const [project, setProject] = useState()
  const [projects, setProjects] = useState<any[]>([])

  const handleChange = (event: any) => {
    selectProject(event.target.value)
    setProject(event.target.value)
  }

  useEffect(() => {
    fetchProjects()

    return () => {}
  }, [projects])

  const fetchProjects = async () => {
      const url = "http://45.76.89.147:81/api/get_all_projects"

      try {
          const response = await fetch(url)
          const json = await response.json()
          setProjects(json)
      } catch (error) {
          console.log(error)
      }
  }


  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">All Projects</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            label="All Projects"
            onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          {projects.map((item) => {
            return (<MenuItem key={item.project} value={item.project}>{item.project}</MenuItem>)
          })}
        </Select>
    </FormControl>
  )
}

export default ProjectsSelect