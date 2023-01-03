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
import Header from "../../components/Header";
import LineChartz from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import ProgressCircle from "../../components/ProgressCircle";
import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import convData from "../../components/convert";
import Sunag from "../../components/Sunag";
import Ashwini from "../../components/Ashwini";
import StackedLineChart from "../../components/StackedLineChart";
import BiaxialChart from "../../components/BiaxialChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(false);
  const [temp, setTemp] = useState("wow");
  const [water, setWater] = useState("wow");
  const [hummid, setHumid] = useState("wow");
  const [rain, setRain] = useState("wow");
  const [latitude, setLatitude] = useState("12.9662976");
  const [longitude, setLongitude] = useState("77.6404992");
  const [link, setLink] = useState("https://api.thingspeak.com/channels/1985902/feeds.json?api_key=KKDDQDQZP8VLRQWR&results=20");
  const [soilData,setSoilData] = useState([]);
  const [tempData,setTempData] = useState([]);
  const [rainData,setRainData] = useState([]);
  const [allData,setAllData] = useState([]);

  useEffect(() => {

    //fetches historical data from thingspeak for graphs
    fetch(link)
    .then((response) => response.json())
    .then((info) => {
    const data = convData(info);
    setSoilData(data[0]);
    setTempData(data[1]);
    setRainData(data[2]);
    setAllData(data[3]);
    });

    //Obtain the user's latitude and longitude for display and api calls
    navigator.geolocation.getCurrentPosition(function (position) {
      // Get the coordinates from the browser's position object
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      setLatitude(lat);
      setLongitude(lng);
    });

    //Fetch the machine learning model ressults from thingspeak
    fetch("https://api.thingspeak.com/channels/1958878/feeds.json?results=1")
      .then((response) => response.json())
      .then((info) => {
        // setWater(info.feeds[0].field3);
        setWater(info.feeds[0].field4);
      });

    //fetch current weather conditions from open weather api  
    fetch(
      "https://api.openweathermap.org/data/3.0/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=hourly,daily&appid=406b154331868aa69ddc3dd64454c8c6"
    )
      .then((response) => response.json())
      .then((info) => {
        setTemp(info.current.temp);
        setHumid(info.current.humidity);
        setRain(info.minutely[0].precipitation);
      });
  }, []);

  

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
          <Box p="1.70%" backgroundColor={colors.primary[400]}>
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
                 View your temperature and Precipitation conditions
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  Environment Report
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

            <Box height="250px" m="2%">
            
              <LineChartz data = {soilData}
               />
            </Box>
            <Box height="250px" m="2%">
            
            <LineChartz data = {rainData}
             />
          </Box>
          <Box height="250px" m="2%">
            
            <LineChartz data = {tempData}
             />
          </Box>

          <Box height="250px" m="2%">
            
            <StackedLineChart data = {allData} 
             />
          </Box>

          <Box height="250px" m="2%">
            
            <BiaxialChart data = {allData} 
             />
          </Box>

          </Box>

        </Grid>
{/* 
        <Grid item xs={12} md={6} lg={4}>
          <Box p="10%" backgroundColor={colors.primary[400]}>
            <Typography variant="h5" fontWeight="600">
              Water Consumption
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
                75% of tank water is used
              </Typography>
              <Typography>
                you have to refill soon
              </Typography>
            </Box> 
            <Sunag/>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box p="3%" backgroundColor={colors.primary[400]}>
           <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Soil Moisture Graph
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box> 
            <Ashwini/>
          </Box>
        </Grid> 

        <Grid item xs={12} md={12} lg={6} container columnSpacing={2}>
          <Grid item xs={12} md={12}  lg={12}
           sx={{
              margin: "1%",
              display: "flex",
              flexDirection: "row",
              flexGrow: "1",
              alignItems: "stretch",
            }}
          >
            <Card
             sx={{
              backgroundColor: colors.primary[400],
              margin: "0.5%",
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              alignItems: "center",
              justifyContent:"center",
            }}
            >
              <CardActionArea 
              sx={{
                height:"100%",
                width:"100%",
                display:"flex",
                flexDirection:"column",
                margin:"1%",
                padding: "1%"
                
              }}
               >
                <Typography variant="h3">Current Temp</Typography>
                <Typography variant="h4" color="text.secondary">
                  {(temp - 273.15).toFixed(2)}°C
                </Typography>
              </CardActionArea>
            </Card>

            <Card
             sx={{
              backgroundColor: colors.primary[400],
              margin: "0.5%",
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              alignItems: "center",
              justifyContent:"center",
            }}
            >
              <CardActionArea 
              sx={{
                height:"100%",
                width:"100%",
                display:"flex",
                flexDirection:"column",
                margin:"1%",
                padding: "1%"
                
              }}
              >
                <Typography variant="h3">Current Rain</Typography>
                <Typography variant="h4" color="text.secondary">
                  {rain}
                </Typography>
              </CardActionArea>
            </Card>

            <Card
              sx={{
                backgroundColor: colors.primary[400],
                margin: "0.5%",
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                alignItems: "center",
                justifyContent:"center",
              }}
            >
              <CardActionArea 
              sx={{
                height:"100%",
                width:"100%",
                display:"flex",
                flexDirection:"column",
                margin:"1%",
                padding: "1%"
                
              }}
              >
                <Typography variant="h3">Current Humidity</Typography>
                <Typography variant="h4" color="text.secondary">
                  {hummid}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={12} 
          sx = {{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            alignContent:"center",
            justifyItems:"center",
            justifyContent:"stretch",
            flexGrow: "1",
          }}>
            <Paper
              sx={{
                height:"100%",
                width:"100%",
                backgroundColor: colors.primary[400],
                margin: "0 0 0 1% ",
                padding: "2%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent:"center",
                flexGrow: "1",
              }}
            >
              <Typography variant="h3" fontWeight="600">
                Manually water plant
              </Typography>
              <Switch />
            </Paper>
          </Grid>
        </Grid>
        */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
