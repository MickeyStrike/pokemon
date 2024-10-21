"use client"
import Globe from '@/assets/svg/Globe'
import { AppBar, Box, MenuItem, Select, Toolbar } from '@mui/material'
import React from 'react'

const TopHeader = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#B3B6B8', zIndex: 50, boxShadow: "none" }}>
      <Toolbar sx={{ maxWidth: '1160px', mx: 'auto', width: '100%', display: 'flex', padding: "0px !important" }}>
        
      </Toolbar>
    </AppBar>
  )
}

export default TopHeader
