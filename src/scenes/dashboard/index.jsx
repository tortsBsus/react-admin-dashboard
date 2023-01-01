import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Grid2 from "@mui/material/Unstable_Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import OpacityIcon from "@mui/icons-material/Opacity";
import Switch from "@mui/material/Switch";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(false);

  return (
    <Box m="20px">
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
        margin={"1%"}
        p="1%"
      >
        <Grid item p="1%" xs={12} md={12} lg={12}>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <Box p="1%" backgroundColor={colors.primary[400]}>
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  $59,342.32
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>

            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Box 
          p="10%" 
          backgroundColor={colors.primary[400]} >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography>
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Box p="1%" backgroundColor={colors.primary[400]}>
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Box
            margin="7.5% 0 0 0"
            padding="10%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography 
          variant="h3" 
          fontWeight="600">
            Current Temperature
          </Typography>

          </Box>

          <Box
            margin="7.5% 0 0 0"
            padding="10%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography 
          variant="h3" 
          fontWeight="600">
            Current Humidity
          </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Box
            margin="7.5% 0 0 0"
            padding="10%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            
          >
            <Typography 
          variant="h3" 
          fontWeight="600">
            Current Precipitation
          </Typography>
          </Box>

          <Box
            margin="7.5% 0 0 0"
            padding="10%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography 
          variant="h3" 
          fontWeight="600">
            Manually water plants
          </Typography>
          <Switch />

          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;
