import * as React from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SimpleSnackbar({openToast, ToastMessage}) {
  return (
    <div>
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={openToast} autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: "100%" }}> {ToastMessage} </Alert>
            </Snackbar>
        </Stack>
    </div>
  );
}