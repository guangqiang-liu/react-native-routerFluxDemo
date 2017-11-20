import React, {
} from 'react';
import {
  Text,
} from 'react-native';

import PropTypes from 'prop-types'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  return <Text
    style={{color: props.focused ? 'red' : 'black'}}
  >{props.title}
  </Text>
};

TabIcon.propTypes = propTypes;

export default TabIcon;
