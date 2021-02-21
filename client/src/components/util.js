import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: '#FFA500',
  },
  recovered: {
    hex: '#7dd71d',
  },
  deaths: {
    hex: '#fb4443',
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `${numeral(stat).format('0,0')}` : '0';

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      key={country.country}
      center={[country.lat, country.long]}
      fillOpacity={0.4}
      color="white"
      fillColor={casesTypeColors[casesType].hex}
      radius={Math.sqrt(country[casesType]) * 500}
    >
      <Popup>
        <div className="info-container">
          <div className="info-name">
            {country.country} | {country.continent}
          </div>
          <div className="info-confirmed">
            Population: {numeral(country.population).format('0,0')}
          </div>
          <div className="info-deaths">
            Total Tests: {numeral(country.tests).format('0,0')}
          </div>
          <div className="info-confirmed">
            Active Cases: {numeral(country.active).format('0,0')}
          </div>
          <div className="info-recovered">
            Critical Cases: {numeral(country.critical).format('0,0')}
          </div>
          <div>---------------------------------------------</div>
          <div className="info-recovered">
            Active / 1 Million:{' '}
            {numeral(country.activePerOneMillion).format('0,0')}
          </div>
          <div className="info-recovered">
            Recovered / 1 Million:{' '}
            {numeral(country.recoveredPerOneMillion).format('0,0')}
          </div>
          <div className="info-recovered">
            Critical / 1 Million:{' '}
            {numeral(country.criticalPerOneMillion).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
