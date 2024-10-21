"use client"
import PokemonLogo from '@/assets/svg/PokemonLogo';
import { AppBar, Box, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Globe from '@/assets/svg/Globe';
import { useTranslation } from 'react-i18next';
import { useMinimizedState } from '@/helper';

const menus = [
  {
    name: "lbl_home",
    url: "/"
  },
  {
    name: "lbl_pokemon_type",
    url: "/pokemon-type"
  },
]

interface IState {
  lang: string
}

const Headers = () => {
  const pathname = usePathname();
  const { i18n, t } = useTranslation("common");
  const [state, dispatch] = useMinimizedState<IState>({
    lang: "en"
  })

  const isActiveMenu = useMemo(() => (url: string) => {
    if (pathname === "/" && pathname === url) return true
    else if (pathname.includes("/pokemon-type") && url.includes("/pokemon-type")) return true
    else return false
  }, [pathname])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', zIndex: 50, boxShadow: "none" }}>
      <div style={{ background: "#F7F8F8" }}>
        <Box sx={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: "flex-end", marginLeft: "40px", maxWidth: "1160px" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Globe />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.lang}
              className='select-top-header'
              label="Age"
              sx={{
                '&:hover': {
                  'fieldset': {
                    border: 'none',
                  },
                },
                '&.Mui-focused': {
                  'fieldset': {
                    border: 'none',
                  },
                },
              }}
              onChange={(e) => {
                changeLanguage(e.target.value as string)
                dispatch({ lang: e.target.value })
              }}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"id"}>Indonesia</MenuItem>
            </Select>

          </div>
        </Box>
      </div>
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
                {t(menu.name)}
              </Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Headers;
