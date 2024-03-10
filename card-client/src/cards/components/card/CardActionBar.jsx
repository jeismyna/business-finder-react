import { Box, CardActions, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { func, string } from "prop-types";
import { useUser } from "../../../users/providers/UserProvider";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { pink } from "@mui/material/colors";

export default function CardActionBar({
  handleDelete,
  handleCall,
  handleLike,
  handleUpdateFavsPage,
  id,
  user_id,
  likes
}) {
  const { user } = useUser();
  const [isDialogOpen, setDialog] = useState(false);
  const [isLiked, setLiked] = useState(user ? likes.includes(user.id ? user.id : user.user_id) : false);

  const navigate = useNavigate();
  const handleDeleteCard = () => {
    handleDelete(id);
    setDialog(false);
  };

  const handleUpdateFavs = () => {
    setLiked(!isLiked);
    handleUpdateFavsPage(user.id);
  };

  return (
    <React.Fragment>
      <CardActions sx={{justifyContent: "space-between"}}>
        <Box>
          {user?.isAdmin || user?.id === user_id ? (
            <React.Fragment>
              <IconButton
                aria-label="Delete Card"
                onClick={() => setDialog(true)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="Edit Card"
                onClick={() => navigate(`${ROUTES.EDIT_CARD}/${id}`)}
              >
                <ModeEditIcon />
              </IconButton>
            </React.Fragment>
          ) : null}
        </Box>

        <Box>
          <IconButton
            aria-label="Call"
            onClick={() => handleCall(id)}
          >
            <CallIcon />
          </IconButton>
          {user && (
            <IconButton
              aria-label="Add to favorite"
              onClick={() => { handleLike(id); handleUpdateFavs() }}
            >
              <FavoriteIcon sx={{ color: isLiked ? pink[400] : "secondary" }} />
            </IconButton>
          )}
        </Box>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={() => setDialog(false)}
        onDelete={handleDeleteCard}
      />
    </React.Fragment>
  );
}

CardActionBar.propTypes = {
  handleDelete: func.isRequired,
  handleLike: func.isRequired,
  id: string.isRequired,
  handleUpdateFavsPage: func,
};
