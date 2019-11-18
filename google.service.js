import axios from "axios";
const mapToken = "AIzaSyBPMYOGd1tXcpkL-pf59xmMCL9r4CfBcuA";

const apis = {
  // Google service
  findPlaceFromLatLng: `https://maps.googleapis.com/maps/api/geocode/json?latlng={{latlng}}&key=${mapToken}&language=vi`
};

export const findPlaceFromLatLng = latlng =>
  axios({
    url: apis.findPlaceFromLatLng.replace("{{latlng}}", latlng),
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
