import React from "react";
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const AddCardButton = () => {

    const { user } = useUser();
    const navigate = useNavigate();

    return (
        (user?.isBusiness || user?.isAdmin) && (  
          <Tooltip title="Create card" placement="top" TransitionComponent={Zoom}>
            <Fab color="primary" aria-label="add" onClick={() => { navigate(ROUTES.CREATE_CARD) }} sx={{ position: "fixed", bottom: 110, right: { xs: 30, sm: 50, md: 50, lg: 100 } }}>
              <AddIcon />
            </Fab>
          </Tooltip>)
      ); 
};


export default AddCardButton;
