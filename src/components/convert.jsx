import React from 'react';

const convData = (info) => {
  let finalData, soilMoistureObj,temperatureObj, precipitationObj, cordObj;
  
      finalData = [];
      soilMoistureObj = { id: "Soil Moisture", data: [] };
      temperatureObj = { id: "Temperature", data: [] };
      precipitationObj = { id: "Precipitation", data: [] };

      info.feeds.forEach((element) => {
        cordObj = { x: "", y: "" };
        cordObj.x = element.created_at;
        cordObj.y = element.field1;
        soilMoistureObj.data.push(cordObj);

        cordObj = { x: "", y: "" };
        cordObj.x = element.created_at;
        cordObj.y = element.field2;
        temperatureObj.data.push(cordObj);

        cordObj = { x: "", y: "" };
        cordObj.x = element.created_at;
        cordObj.y = element.field3;
        precipitationObj.data.push(cordObj);
      });
      finalData.push(soilMoistureObj, temperatureObj, precipitationObj);
      return soilMoistureObj;

};

 export default convData;