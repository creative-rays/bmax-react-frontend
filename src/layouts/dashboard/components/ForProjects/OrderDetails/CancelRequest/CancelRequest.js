import * as React from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

import SuiInput from "components/SoftInput";

import PropTypes from "prop-types";


function CancelRequest({ modalVisble, setModalVisble }) {
  //   const [modalVisble, setOpen] = React.useState(modalVisble || false);

  const [selectType, setSelectType] = React.useState("");
  const [selectOpen, setSelectOpen] = React.useState(false);

  const handleClickOpen = () => {
    setModalVisble(true);
  };

  const handleClose = () => {
    setModalVisble(false);
  };

  const handleChange = (event) => {
    console.log("handleChange:", event.target.value);
    setSelectType(event.target.value);
  };

  //   const handleCloseSelect = () => {
  //     setSelectOpen(false);
  //   };

  //   const handleOpenSelect = () => {
  //     setSelectOpen(true);
  //   };
  const [value, setValue] = React.useState(0);
  const data = ["Delivery Address", "Contrete Type", "Vehicle Type"];
  const items = data.map((item, key) => (
    <MenuItem
      onClick={() => {
        setValue(key);
      }}
    //   style={{ display: "block",height:"50px" }}
      key={key}
      value={key}
    >
      <Typography  variant="body2">{item}</Typography>

    </MenuItem>
  ));

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={modalVisble}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Provide Change Details</DialogTitle>
        <DialogContent
          style={{
            width: "460px",
          }}
        >
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}

          <InputLabel id="selectType"  variant="body1" mb={2}>Select Type</InputLabel>
          <Select
            value={value}
            fullWidth
            // onChange={handleChange}
            inputProps={{
              renderValue: (option) => data[value],
            }}
          >
            {items}
          </Select>

          <InputLabel id="demo-simple-select-label" mb={2}>Change Detail</InputLabel>
          <SuiInput placeholder="Type here..." multiline rows={5} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Send</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

CancelRequest.propTypes = { modalVisble: PropTypes.bool, setModalVisble: PropTypes.func };
export default CancelRequest;
