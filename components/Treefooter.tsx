import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";


export default function GuestFooter() {
    return (
        <Paper sx={{marginTop: 'calc(10% + 60px)',
        position: 'fixed',
        bottom: 0,
        width: '100%'
        }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
          {/* <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my:1
            }}
          >
              
          </Box> */}
  
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <div>
                <Image priority src="/../public/cslogo.png" width={15} height={15} alt="Logo" />
            </div>
            <Typography variant="caption">
                Family tree data provided by <a href="https://www.iitk.ac.in/counsel/">Counselling Service IITK</a>
            </Typography>
          </Box>
        </Container>
      </Paper>
    );
  }