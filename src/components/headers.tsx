"use client"
import PokemonLogo from '@/assets/svg/PokemonLogo';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'

const menus = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "Pokemon Type",
    url: "/pokemon-type"
  },
]

const Headers = () => {
  const pathname = usePathname()

  const isActiveMenu = useMemo(() => (url: string) => {
    // if (pathname === "/" && pathname === url) return '#E6AB09'
    // else if (pathname.includes("/pokemon-type") && url.includes("/pokemon-type")) return '#E6AB09'
    // else return 'black'
    if (pathname === "/" && pathname === url) return true
    else if (pathname.includes("/pokemon-type") && url.includes("/pokemon-type")) return true
    else return false
  }, [pathname])

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', zIndex: 50, boxShadow: "none" }}>
      <Toolbar sx={{ maxWidth: '1160px', mx: 'auto', width: '100%', display: 'flex', padding: "0px !important" }}>
        <Link href="/" passHref>
          <Box component="span" sx={{ cursor: 'pointer' }}>
            <PokemonLogo />
          </Box>
        </Link>

        <Box sx={{ display: 'flex', gap: '40px', alignItems: 'center', marginLeft: "40px" }}>
          {menus.map((menu) => (
            <Link key={menu.url} href={menu.url} passHref style={{ textDecoration: "none !important" }}>
              <Typography
                component="span"
                sx={{
                  color: isActiveMenu(menu.url) ? "#E6AB09" : "black",
                  fontWeight: isActiveMenu(menu.url) ? "bold" : "",
                  textDecoration: 'none',
                }}
              >
                {menu.name}
              </Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Headers;
