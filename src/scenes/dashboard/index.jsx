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
import { useState, useEffect } from "react";
import OpacityIcon from "@mui/icons-material/Opacity";
import Switch from "@mui/material/Switch";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

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

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   // Get the coordinates from the position object
    //   var lat = position.coords.latitude;
    //   var lng = position.coords.longitude;
    //   setLatitude(lat);
    //   setLongitude(lng);

    //   // Print the coordinates to the console
    //   console.log("Latitude: " + lat + ", Longitude: " + lng);
    // });

    fetch("https://api.thingspeak.com/channels/1958878/feeds.json?results=1")
      .then((response) => response.json())
      .then((info) => {
        // setWater(info.feeds[0].field3);
        setWater(info.feeds[0].field4);
      });

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

  // function convData(link)
  // {

  // fetch(link)
  //   .then((response) => response.json())
  //   .then((info) => {

  //     //console.log(info.feeds[0].field1);
  //      //console.log(info);
  //      finalData=[]
  //       soilMoistureObj={"id":"Soil Moisture","data":[]}
  //      temperatureObj={"id":"Temperature","data":[]}
  //      precipitationObj={"id":"Precipitation","data":[]}

  //      info.feeds.forEach(element => {console.log(element)

  //      cordObj={"x":"","y":""}
  //         cordObj.x=element.created_at
  //         cordObj.y=element.field1
  //         //console.log(cordObj)
  //         soilMoistureObj.data.push(cordObj)
  //         // console.log(soilMoistureObj)
  //         // cordObj.y=element.field2
  //         // console.log(cordObj)
  //         // temperatureObj.data.push(cordObj)
  //         // cordObj.y = element.field3;
  //         // console.log(cordObj)
  //         // precipitationObj.data.push(cordObj);
  //          cordObj={"x":"","y":""}
  //         cordObj.x=element.created_at
  //         cordObj.y=element.field2
  //         //console.log(cordObj)
  //         temperatureObj.data.push(cordObj)
  //          cordObj={"x":"","y":""}
  //         cordObj.x=element.created_at
  //         cordObj.y=element.field3
  //         //console.log(cordObj)
  //         precipitationObj.data.push(cordObj)

  //      });
  //      finalData.push(soilMoistureObj,temperatureObj,precipitationObj)
  //      //console.log(JSON.stringify(finalData))
  //      return finalData
  //   });

  // }

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
          <Box p="10%" backgroundColor={colors.primary[400]}>
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
          <Box p="3%" backgroundColor={colors.primary[400]}>
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
                Manually water plantz
              </Typography>
              <Switch />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
