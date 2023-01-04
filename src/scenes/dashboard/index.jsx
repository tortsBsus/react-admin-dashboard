import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChartz from "../../components/LineChart";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import convData from "../../components/convert";
import StackedAreaChart from "../../components/StackedAreaChart";
import BiaxialChart from "../../components/BiaxialChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [temp, setTemp] = useState("wow");

  const [hummid, setHumid] = useState("wow");
  const [rain, setRain] = useState("wow");
  const [latitude, setLatitude] = useState("12.9662976");
  const [longitude, setLongitude] = useState("77.6404992");
  const [link, setLink] = useState(
    "https://api.thingspeak.com/channels/1985902/feeds.json?api_key=KKDDQDQZP8VLRQWR&results="
  );
  const [soilData, setSoilData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [rainData, setRainData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [timeRange, setTimeRange] = useState(20);
  const [refresh, setRefresh] = useState(false);
  const [waterData, setWaterData] = useState([]);
  const [graphChoice, setGraphChoice] = useState("Temperature");
  const [lineData, setLineData] = useState(tempData);
  const [mode, setMode] =useState(1);

  useEffect(() => {
    //Obtain the user's latitude and longitude for display and api calls
    navigator.geolocation.getCurrentPosition(function (position) {
      // Get the coordinates from the browser's position object
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      setLatitude(lat);
      setLongitude(lng);
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

  const handleChange = (event) => {
    setTimeRange(event.target.value);
  };

  useEffect(() => {
    //fetches historical data from thingspeak for graphs
    fetch(link + timeRange)
      .then((response) => response.json())
      .then((info) => {
        const data = convData(info);
        setSoilData(data[0]);
        setTempData(data[1]);
        setRainData(data[2]);
        setAllData(data[3]);
      });
  }, [timeRange]);

  useEffect(() => {
    console.log("refreshed");
    //Fetch the machine learning model ressults from thingspeak
    fetch("https://api.thingspeak.com/channels/1958878/fields/3.json?minutes")
      .then((response) => response.json())
      .then((info) => {
        const data = convData(info, -1);
        setWaterData(data);
      });
  }, [refresh]);

  useEffect(() => {
    
    if (graphChoice === "Temperature") {
      setLineData(tempData);
    } else if (graphChoice === "Rain") {
      setLineData(rainData);
    } else if (graphChoice === "Soil Moisture") {
      setLineData(soilData);
    }
  }, [graphChoice]);

  const handleRadioChange = (event) => {
    setGraphChoice(event.target.value);
  };


  //To handle Bi-axial chart customisation
  const [state, setState] = useState({
    Temperature: true,
    Rain: false,
    SoilMoisture: false,
  });

  const handleBiChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { Temperature, Rain, SoilMoisture } = state;
  const error = [Temperature, Rain, SoilMoisture].filter((v) => v).length !== 2;

  useEffect(() => {
    
    if (state.Temperature&& state.Rain&&state.SoilMoisture) {
      setMode(0);
      console.log("All true is an error");
    } else if (state.Temperature&& state.Rain&&(!state.SoilMoisture)) {
      
      setMode(1);
    } else if (state.Temperature&& (!state.Rain)&&(state.SoilMoisture)) {
      
      setMode(2);
    } else if ((!state.Temperature)&& state.Rain&&state.SoilMoisture) {
      
      setMode(3);
    } else
    {
      setMode(0);
      console.log("Choose atleast 2 to get a result");
    }
  }, [state]);


  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
        margin={"1%"}
        p="1%"
      >
        <Grid
          item
          p="1%"
          xs={12}
          md={12}
          lg={12}
          
        >
          <Grid item columnSpacing={{ xs: 12, sm: 12, md: 9, lg: 9 }}>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          </Grid>
          
       
          
         <Grid item columnSpacing={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
         <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ height: "30vh" }}>
              Choose a Time Frame
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={timeRange}
              label="Time Range"
              onChange={handleChange}
            >
              <MenuItem value={7}>Last week</MenuItem>
              <MenuItem value={30}>Last Month</MenuItem>
              <MenuItem value={90}>Last 3 Months</MenuItem>
              <MenuItem value={180}>Last 6 Months</MenuItem>
              <MenuItem value={365}>Last Year</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        
        </Grid>

        <Grid item xs={12} md={12} lg={6} >
          <Box height="35vh" m="2%">
            <StackedAreaChart data={allData} />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid item xs={8} md={10} lg={10} sx={{ height: "35vh" }}>
            <LineChartz data={lineData} />
          </Grid>
          <Grid item xs={4} md={2} lg={2}>
            <FormControl m="2%">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Temperature"
                name="radio-buttons-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="Temperature"
                  control={<Radio />}
                  label="Temperature"
                />
                <FormControlLabel
                  value="Rain"
                  control={<Radio />}
                  label="Rain"
                />
                <FormControlLabel
                  value="Soil Moisture"
                  control={<Radio />}
                  label="Soil Moisture"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={6} >
          <Box height="35vh" m="2%">
            <LineChartz data={waterData} />
          </Box>
          <Box height="5vh" m="1%" sx={{display:"flex", alignItems:"center",justifyItems:"center", flexDirection:"column"}}>
            <Button 
              variant="contained"
              onClick={() => {
                setRefresh(!refresh);
              }}
            >
              Refresh
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            flexDirection: "row",
            wrap:"wrap"
          }}
        >
          <Grid item xs={9} md={10} lg={10} sx={{ height: "35vh" }}>
            <BiaxialChart data={allData} mode = {mode} />
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <FormControl
              required
              error={error}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">Pick two</FormLabel>
              <FormGroup>
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={SoilMoisture}
                      onChange={handleBiChange}
                      name="SoilMoisture"
                    />
                  }
                  label="SoilMoisture"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Temperature}
                      onChange={handleBiChange}
                      name="Temperature"
                    />
                  }
                  label="Temperature"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Rain}
                      onChange={handleBiChange}
                      name="Rain"
                    />
                  }
                  label="Rain"
                />
              
              </FormGroup>
              <FormHelperText>Need two values to generate graph</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        {
  /* 
        <Grid item  columnSpacing={{ xs: 12, sm: 12, md: 3, lg: 3, display:"flex", flexDirection:"column" }}>
         <Card
             sx={{
              backgroundColor: colors.primary[400],
              margin: "0.5%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent:"center",
            }}
            >
              <CardActionArea 
              sx={{
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
              alignItems: "center",
              justifyContent:"center",
            }}
            >
              <CardActionArea 
              sx={{
              
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
                alignItems: "center",
                justifyContent:"center",
              }}
            >
              <CardActionArea 
              sx={{
            
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
            */}

      </Grid>
    </Box>
  );
};

export default Dashboard;

