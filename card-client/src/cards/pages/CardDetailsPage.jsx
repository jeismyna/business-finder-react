import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import { Container, Box, Grid, Paper, Typography, Avatar, Link } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';


const Iframe = ({ ...props }) => {
  return (
    <div>
      <iframe src={props.src} height={props.height} width={props.width} style={props.style} title="googleMap" loading="lazy" allowFullScreen />
    </div>
  )
}

export default function CardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { value: { card }, handleGetCard } = useCards();

  useEffect(() => {
    handleGetCard(id);
  }, [handleGetCard, id]);

  if (card) {
    return (
      <Container>
        <PageHeader
          title={`${card.title} - Info`}
          subtitle={`This page contains all of the information about the business - ${card.title}`}
        />
        <Tooltip title="Back" placement="top" TransitionComponent={Zoom}>
          <Fab className="BackButton" color="primary" aria-label="back" onClick={() => { navigate(-1) }} sx={{ position: "fixed", left: { xs: 30, sm: 80, md: 120, lg: 200 } }}>
            <ArrowBackIosNewIcon sx={{ marginRight: "5px" }} />
          </Fab>
        </Tooltip>
        <Grid sx={{ flexGrow: 1, p: 3 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={5}>
              <Grid key={1} item>
                <Paper
                  sx={{
                    p: 4,
                    height: "auto",
                    minHeight: 600,
                    width: "auto",
                    minWidth: { xs: 400, sm: 400, md: 500, lg: 400 },
                    maxWidth: { xs: 400, sm: 400, md: 500, lg: 400 },
                    display: "flex", flexDirection: "column", alignItems: "center",
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
                  }}
                >
                  <Avatar alt={card.image.alt} src={card.image.url}
                    sx={{
                      width: 220, height: 220, mb: 5, border: 5, borderStyle: "double",
                      borderColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.action.disabled : theme.palette.action.selected,
                    }} />
                  <Box className="BusinessDetailsBox" sx={{ mb: 3, textAlign: "center" }}>
                    <Typography variant="h4">{card.title}</Typography>
                    <Typography variant="h5">{card.subtitle}</Typography>
                    <Typography paragraph sx={{ mt: 3 }} >{card.description}</Typography>
                  </Box>
                  <Container sx={{ display: "flex", flexDirection: "column", gap: 1 }}  >
                    <Box sx={{ display: "inline-flex", gap: 1 }} >
                      <LocationCityIcon />
                      <Typography>{`${card.address.street} ${card.address.houseNumber} ${card.address.city} ${card.address.state} ${card.address.country} ${card.address.zip} `}</Typography>
                    </Box>
                    <Box sx={{ display: "inline-flex", gap: 1 }} >
                      <PhoneIcon />
                      <Typography>{card.phone}</Typography>
                    </Box>
                    <Box sx={{ display: "inline-flex", gap: 1 }} >
                      <AlternateEmailIcon />
                      <Link href={"mailto:"+ card.email} color="inherit" underline="hover"><Typography>{card.email}</Typography></Link>
                    </Box>
                    <Box sx={{ display: "inline-flex", gap: 1 }} >
                      <LanguageIcon />
                      <Link href={card.web} target="_blank" rel="noreferrer" color="inherit" underline="hover"><Typography>{card.web}</Typography></Link>
                    </Box>
                  </Container>

                </Paper>
              </Grid>
              <Grid key={2} item>
                <Paper
                  sx={{
                    height: "auto",
                    minHeight: 600,
                    width: "auto",
                    minWidth: { xs: 400, sm: 400, md: 500, lg: 600 },
                    maxWidth: { xs: 400, sm: 400, md: 500, lg: 600 },
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
                  }}
                >
                  <Iframe width="100%" height="600" style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?q=${card.address.street} ${card.address.houseNumber}
                     ${card.address.city} ${card.address.state} ${card.address.country}&key=AIzaSyD4vZ2CZtapB_wtuarx7VbltwXIoYo9yWM`} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>


      </Container>
    );
  }

}
