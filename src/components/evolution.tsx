import ArrowRight from '@/assets/svg/ArrowRight'
import { Typography } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'

interface IEvolutionProps {
  imgSrc: string
  color?: string
  title?: string,
  isLast?: boolean
}

const Evolution:FC<IEvolutionProps> = ({
  color,
  imgSrc,
  title,
  isLast
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
        <div style={{ width: '169px', height: '169px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `10px solid ${color}`, borderRadius: "100%", flexDirection: "column" }}>
          <Image
            src={imgSrc ?? ""}
            alt='not found'
            style={{ borderRadius: "100%" }}
            width={159}
            height={159}
          />
        </div>
        <Typography sx={{ fontSize: "1rem", color: "#42494D", fontWeight: "bold", marginTop: "20px", maxWidth: "169px", textWrap: "wrap" }}>
          Pokemon Evolution <br/> {title}
        </Typography>
      </div>
      {
        !isLast &&
        <div style={{ marginTop: "70px" }}>
          <ArrowRight />
        </div>
      }
    </div>
  )
}

export default Evolution
