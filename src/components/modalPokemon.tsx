import { Button, Chip, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';
import Grid from '@mui/material/Grid2';
import { ResponseDetailPokemon } from '@/types';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/helper';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface IModalPokemonProps {
  visible: boolean,
  handleClose: () => void;
  data: ResponseDetailPokemon
}

const colorTypes: Record<"0" | "1" | "2" | "3", string> = {
  "0": "#4CAF50",
  "1": "#E91E63",
  "2": "#FF9800",
  "3": "#E34C88"
}

const ModalPokemon:FC<IModalPokemonProps> = ({
  visible,
  handleClose,
  data
}) => {

  const { t } = useTranslation("common");

  const selectColor = (idx: number): string => {
    if (idx > 3) return colorTypes["3"];
    return colorTypes[String(idx) as "0" | "1" | "2" | "3"];
  }

  if (!data) return;

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxWidth: '1160px',
        },
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid component="div" size={{ xs: 12, md: 5 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '16px' }}>
              <Image
                src={data?.sprites?.front_default ?? ""}
                alt={data.name}
                width={300}
                height={300}
              />
            </div>
          </Grid>

          <Grid component="div" size={{ xs: 12, md: 7 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#42494D', fontSize: "2.5rem" }}>
              {capitalizeFirstLetter(data.name)}
            </Typography>
            <Grid direction="row" container spacing={1}>
              <Grid display="flex" alignItems="center" gap={4} direction="row" mt={3} size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: "1.25rem" }}>{t("lbl_weight")}:</Typography>
                <Typography>{data.weight}</Typography>
              </Grid>
              <Grid display="flex" alignItems="center" gap={4} direction="row" mt={3} size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: "1.25rem" }}>{t("lbl_height")}:</Typography>
                <Typography>{data.height}</Typography>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={6} mt={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, fontSize: "1.25rem" }}>{t("lbl_abilities")}:</Typography>
              <ul>
                {
                  data.abilities.map((x) => (
                    <li key={x.ability.name}>{x.ability.name} {x.is_hidden ? "(hidden)" : ""}</li>
                  ))
                }
              </ul>
            </Stack>
            <Grid direction="row" container spacing={1} alignItems="center" gap={{ xs: 0, md: 8 }}>
              <Stack direction="row" spacing={1} mt={1}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, fontSize: "1.25rem" }}>{t("lbl_type")}:</Typography>
              </Stack>
              <Grid display="flex" alignItems="center" gap={2} direction="row" mt={3} size={{ xs: 12, md: 6 }}>
                {
                  data.types.map((x, idx) => (
                    <Chip key={x.type.name} label={x.type.name} sx={{ backgroundColor: selectColor(idx), color: 'white', padding: "7px 25px", fontWeight: "bold", fontSize: "1.25rem" }} />
                  ))
                }
              </Grid>
            </Grid>
            <Link href={`/${data.name}`}>
              <Button
                variant="contained"
                sx={{ mt: 4, backgroundColor: '#E6AB09', color: 'white', fontWeight: 'bold', borderRadius: "14px", boxShadow: "none" }}
              >
                {t("lbl_more_detail")}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPokemon;
