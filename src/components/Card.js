import React from 'react'
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import DeleteIcon from '@mui/icons-material/Delete';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BoltIcon from '@mui/icons-material/Bolt';
import { Box } from '@mui/material';

const Card = (props) => {
    let { title, description, jobURL, minExp, location } = props;
    return (

        <Grid md={4} xs={12} sm={6} mobile={12}>
            <Paper elevation={3} sx={{ padding: "25px 25px", display: "flex", flexDirection: "column", height: "100%" }}>
                
                <Button variant="outlined" size="small" style={{ borderRadius: '25px', width: "150px", fontSize: "10px", color: "#bbb", borderColor: "#bbb" }} startIcon={<HourglassTopIcon />}>
                    Posted 10 days ago
                </Button>
                <Typography variant="subtitle">{title}</Typography>
                <Typography variant="h6" gutterBottom>
                    About Company
                </Typography>
                <Typography variant="h6" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="subtitle2">{description}</Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" gutterBottom>Minimum Experience</Typography>
                    <Typography variant="h6" gutterBottom>
                        {minExp}
                    </Typography>
                </Box>

                <Button variant="contained" color="primary" size="large" style={{ borderRadius: "10px", marginBottom: "10px" }} href={jobURL} target="_blank" startIcon={<BoltIcon />}>Apply</Button>
                <Button variant="contained" color="primary" size="large" style={{ borderRadius: "10px" }} href={jobURL} target="_blank">Unlock Referral Ask</Button>
            </Paper>
        </Grid>

    )
}

export default Card