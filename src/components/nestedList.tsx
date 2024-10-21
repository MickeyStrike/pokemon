"use client"
import React, { FC } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import { Typography } from '@mui/material';
import { Result } from '@/types';
import { useTranslation } from 'react-i18next';

interface INestedListProps {
  data: Result[],
  selectedType: string,
  color: string,
  changeType: (type: string) => void
}

const NestedList:FC<INestedListProps> = ({ data, selectedType, color, changeType }) => {
  const [open, setOpen] = React.useState(true);
  const { t } = useTranslation("common")

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(255 255 255 / 85%)' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>{t("lbl_pokemon_type")}</Typography>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            data.map((x) => (
              <ListItemButton key={x.name} sx={{ pl: 4 }} onClick={() => changeType(x.name)}>
                <ListItemIcon sx={{ minWidth: "35px" }}>
                  <FiberManualRecord sx={{ width: "15px", height: "15px", color: selectedType === x.name ? color : "black" }} />
                </ListItemIcon>
                <Typography sx={{ fontWeight: "bold", fontSize: "0.875rem", color: selectedType === x.name ? color : "black" }}>{x.name}</Typography>
              </ListItemButton>
            ))
          }
        </List>
      </Collapse>
    </List>
  );
}

export default NestedList
