import { Typography } from '@mui/material';
import React, { FC } from 'react'

interface IStatsProps {
  value?: string | number
  stat?: string,
  color?: string
}

const Stats:FC<IStatsProps> = ({
  color,
  stat,
  value
}) => {
  return (
    <div style={{ width: '169px', height: '169px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `25px solid ${color}`, borderRadius: "100%", flexDirection: "column" }}>
      <Typography sx={{ fontSize: "50px", color: color, fontWeight: "bold" }}>{value}</Typography>
      <Typography sx={{ fontSize: "20px", color: "black" }}>{stat}</Typography>
    </div>
  )
}

export default Stats;
