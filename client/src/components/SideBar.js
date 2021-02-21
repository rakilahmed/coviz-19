import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import './SideBar.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="list">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="CDCgov"
          theme="dark"
          options={{ height: 430, width: 450 }}
        />
      </List>
      <Divider />
      <List className="list">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="COVID19Tracking"
          theme="dark"
          options={{ height: 430, width: 450 }}
        />
      </List>
    </div>
  );

  return (
    <div>
      <Button className="side-bar" onClick={toggleDrawer('left', true)}>
        news
      </Button>
      <Drawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}
