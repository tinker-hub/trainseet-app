export const BASE_URL = 'https://trainseet.tk/';
export const API_URL = `${BASE_URL}api/`;

const get = async url => {
  const response = await fetch(`${API_URL}${url}`);
  const data = await response.json();

  return data;
};

export const fetchStations = async () => {
  const url = 'stations';

  const stations = await get(url);

  return stations;
};

export const getETA = async stationId => {
  const url = `stations/${stationId}`;
  const trainsData = await get(url);
  const trains = trainsData.trains;

  const ETA = parseInt(parseInt(trains[0].destinations[0].eta) / 60);

  return ETA;
};
