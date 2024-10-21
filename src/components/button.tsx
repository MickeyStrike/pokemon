import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const CustomButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  backgroundColor: "bg-[#E6AB09]",
  '&:hover': {
    backgroundColor: "bg-[#E6AB09]",
  },
  padding: "13px 40.5px",
  fontSize: "20px",
  borderRadius: "14px",
}));