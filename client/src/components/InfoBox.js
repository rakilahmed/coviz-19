import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

function InfoBox({
  type,
  title,
  cases,
  isGreen,
  isOrange,
  isRed,
  active,
  total,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && 'infoBox--selected'} ${
        isOrange && 'infoBox--orange'
      } ${isGreen && 'infoBox--green'} ${isRed && 'infoBox--red'}`}
    >
      <CardContent>
        <Typography className="infoBox__title">{title}</Typography>
        <h2 className={'infoBox__total'}>{total}</h2>
        <Typography className="infoBox__cases">
          {cases} New {type}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
