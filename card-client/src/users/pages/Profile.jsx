import React, { useEffect } from "react";
import useUsers from "../hooks/useUsers"
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import PageHeader from "../../components/PageHeader";
import { Container, Box, Grid, Paper, Typography, Avatar } from "@mui/material";
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export default function Profile({user}) {

  const { value, valueResolvedUser, handleGetUser } = useUsers();
  const { isLoading, error } = value;
  const { userFull } = valueResolvedUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    } else {
      handleGetUser(user.id);
    }
  }, [user.id]);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error.toString()} />;
  if (userFull) {
    return (
      <Container>
        <PageHeader
          title="Profile"
          subtitle="This page contains your profile details"
        />
        <Tooltip title="Back" placement="top" TransitionComponent={Zoom}>
          <Fab className="BackButton" color="primary" aria-label="back" onClick={() => { navigate(-1) }} sx={{ position: "fixed", left: { xs: 30, sm: 80, md: 120, lg: 200 } }}>
            <ArrowBackIosNewIcon sx={{ marginRight: "5px" }} />
          </Fab>
        </Tooltip>
        <Grid sx={{ flexGrow: 1, p: 3 }} container spacing={2}>
          <Grid item md={12}>
            <Grid container justifyContent="center" spacing={5}>
              <Grid key={1} item>
                <Paper
                  sx={{
                    p: 4,
                    height: "auto",
                    minHeight: 550,
                    width: "auto",
                    minWidth: { xs: 400, sm: 400, md: 500, lg: 400 },
                    maxWidth: { xs: 400, sm: 400, md: 500, lg: 400 },
                    display: "flex", flexDirection: "column", alignItems: "center",
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
                  }}
                >
                  <Avatar alt={userFull.image.alt} src={userFull.image.url}
                    sx={{
                      width: 220, height: 220, mb: 5, border: 5, borderStyle: "double",
                      borderColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.action.disabled : theme.palette.action.selected,
                    }} />
                  <Box className="BusinessDetailsBox" sx={{ mb: 3, textAlign: "center" }}>
                    <Typography variant="h4">{`${userFull.name.first} ${userFull.name.last}`}</Typography>
                  </Box>
                  <Container sx={{ display: "flex", flexDirection: "column", gap: 1 }}  >
                    <Box sx={{ display: "inline-flex", gap: 1 }} >
                      <Typography>{`Full Name: ${userFull.name.first} ${userFull.name.middle} ${userFull.name.last}`}</Typography>
                    </Box>
                    <Box sx={{ display: "inline-flex", gap: 1 }} >
                      <Typography>{`Phone: ${userFull.phone}`}</Typography>
                    </Box>
                    <Box sx={{ display: "inline-flex", gap: 1 }} >
                      <Typography>{`Email: ${userFull.email}`}</Typography>
                    </Box>
                    <Box sx={{ display: "inline-flex", gap: 1 }} >
                      <Typography>{`Address: ${userFull.address.street} ${userFull.address.houseNumber} ${userFull.address.city} ${userFull.address.state} ${userFull.address.country} ${userFull.address.zip} `}</Typography>
                    </Box>
                  </Container>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }

}
