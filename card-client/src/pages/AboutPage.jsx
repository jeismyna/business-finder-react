import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import Box from '@mui/material/Box';

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        title="About Us"
        subtitle="A short explanation of our site"
      />
      <Grid container spacing={6}>
        <Grid item xs={12} md={8} alignSelf="top">
          <Typography align="justify" paragraph>In this website you can search for businesses, save them in your favorites to contact at your convenience and create/manage your own business cards to expose your business to potential customers.</Typography>
          <Typography variant="h5">Credits:</Typography>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <TaskAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText><a target="_blank" rel="noreferrer" href="https://icons8.com/icon/gct8dx32mnau/business-card">Business card</a> icon by <a target="_blank" rel="noreferrer" href="https://icons8.com">Icons8</a></ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <TaskAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText><a target="_blank" rel="noreferrer" href="https://www.freepik.com/free-photo/hands-stack-business-people_8897712.htm">About Us image by wavebreakmedia_micro on Freepik</a></ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <TaskAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText><a target="_blank" rel="noreferrer" href="https://www.freepik.com/free-vector/flat-construction-template_1584527.htm">Under Construction image by Freepik</a></ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <TaskAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText><a target="_blank" rel="noreferrer" href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_7967793.htm">Error image by Freepik</a></ListItemText>
            </ListItem>          
          </List>
        </Grid>
        <Grid
          item
          md={4}
          sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center" }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
            }}
            alt="about"
            src="/assets/images/about.jpg"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
