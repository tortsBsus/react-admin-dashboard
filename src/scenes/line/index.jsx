import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { useEffect } from "react";



const Line = () => {




//   useEffect(() => {
//     // navigator.geolocation.getCurrentPosition(function (position) {
//     //   // Get the coordinates from the position object
//     //   var lat = position.coords.latitude;
//     //   var lng = position.coords.longitude;
//     //   setLatitude(lat);
//     //   setLongitude(lng);

//     //   // Print the coordinates to the console
//     //   console.log("Latitude: " + lat + ", Longitude: " + lng);
//     // });

//     fetch("https://api.thingspeak.com/channels/1958878/feeds.json?results=1")
//       .then((response) => response.json())
//       .then((info) => {
//         // setWater(info.feeds[0].field3);
//         setWater(info.feeds[0].field4);
//       });

//     fetch(
//       "https://api.openweathermap.org/data/3.0/onecall?lat=" +
//         latitude +
//         "&lon=" +
//         longitude +
//         "&exclude=hourly,daily&appid=406b154331868aa69ddc3dd64454c8c6"
//     )
//       .then((response) => response.json())
//       .then((info) => {
//         setTemp(info.current.temp);
//         setHumid(info.current.humidity);
//         setRain(info.minutely[0].precipitation);
//       });
//   }, []);

// function convData(link)
//   {

//   fetch(link)
//     .then((response) => response.json())
//     .then((info) => {

//       //console.log(info.feeds[0].field1);
//        //console.log(info);
//        finalData=[]
//         soilMoistureObj={"id":"Soil Moisture","data":[]}
//        temperatureObj={"id":"Temperature","data":[]}
//        precipitationObj={"id":"Precipitation","data":[]}

//        info.feeds.forEach(element => {console.log(element)

//        cordObj={"x":"","y":""}
//           cordObj.x=element.created_at
//           cordObj.y=element.field1
//           //console.log(cordObj)
//           soilMoistureObj.data.push(cordObj)
//           // console.log(soilMoistureObj)
//           // cordObj.y=element.field2
//           // console.log(cordObj)
//           // temperatureObj.data.push(cordObj)
//           // cordObj.y = element.field3;
//           // console.log(cordObj)
//           // precipitationObj.data.push(cordObj);
//            cordObj={"x":"","y":""}
//           cordObj.x=element.created_at
//           cordObj.y=element.field2
//           //console.log(cordObj)
//           temperatureObj.data.push(cordObj)
//            cordObj={"x":"","y":""}
//           cordObj.x=element.created_at
//           cordObj.y=element.field3
//           //console.log(cordObj)
//           precipitationObj.data.push(cordObj)

//        });
//        finalData.push(soilMoistureObj,temperatureObj,precipitationObj)
//        //console.log(JSON.stringify(finalData))
//        return finalData
//     });

//   }






  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
