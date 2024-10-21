import styled from '@emotion/styled';
import { Select } from '@mui/material';

export const CustomSelect = styled(Select)(() => ({
  // width: 300,
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white"
    },
    "&:hover fieldset": {
      borderColor: "white"
    },
    "&.Mui-focused fieldset": {
      borderColor: "white"
    }
  }
}));