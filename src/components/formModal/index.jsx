import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";

export const modalStyles = {
  overlay: {},
  content: {
    display: "flex",
    justifyContent: "center",
  },
};
const FormModal = ({
  email,
  onCancel,
  onSendClick,
  onFileChange,
  onTextInputChange,
}) => {
  return (
    <>
      <form onSubmit={onSendClick} className="modal-form">
        <h1>Apply</h1>

        <div className="input-box-modal">
          <TextField
            id="email"
            label="Email"
            value={email}
            disabled
            fullWidth
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
          />
        </div>
        <div className="input-box-modal">
          <TextField
            id="subject"
            label="Subject"
            fullWidth
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            onChange={onTextInputChange}
          />
        </div>
        <div className="input-box-modal">
          <TextField
            id="body"
            label="Body"
            multiline
            fullWidth
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            onChange={onTextInputChange}
          />
        </div>
        <div className="input-box-modal">
          <input type="file" onChange={onFileChange} />
        </div>
        <div className="form-modal-buttons">
          <Button
            variant="contained"
            type="submit"
            style={{
              width: 250,
              height: 50,
              fontSize: 30,
              marginRight: ".5rem",
            }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            style={{ width: 250, height: 50, fontSize: 30 }}
          >
            Send
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormModal;
