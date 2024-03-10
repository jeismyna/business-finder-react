import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useContext } from 'react';
import SearchbarContext from '../../../../../providers/SearchbarContext';


// #region styles
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.lighter,
  "&:hover": {
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.9) : alpha(theme.palette.common.white, 0.9),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.5) : alpha(theme.palette.common.white, 0.5),
        width: "30ch"
      },
    },
  },
}));

// #endregion

export default function SearchBar() {

  const { text, setText } = useContext(SearchbarContext);

  const handleChange = async (value) => {
    setText(value);
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Search>
  )
}