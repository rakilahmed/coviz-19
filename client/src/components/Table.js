import React from 'react';
import './Table.css';
import numeral from 'numeral';

function Table({ countries, states }) {
  if (countries) {
    return (
      <div className="table">
        <table>
          <tbody>
            {countries.map(({ country, cases }) => (
              <tr key={country}>
                <td>{country}</td>
                <td>
                  <strong>{numeral(cases).format('0,0')}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="table">
        <table>
          <tbody>
            {states.map(({ state, cases }) => (
              <tr key={state}>
                <td>{state}</td>
                <td>
                  <strong>{numeral(cases).format('0,0')}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
