// import * as React from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import { DefaultTheme } from '@react-navigation/native';
// // Change from DarkTheme to DefaultTheme

// export default function TabBarIcon(props) {
//   return (
//     <Ionicons
//       name={props.name}
//       size={30}
//       style={{ marginBottom: -3 }}
//       color={
//         props.focused ? DefaultTheme.colors.primary : DefaultTheme.colors.text
//       }
//       // Change from DarkTheme to DefaultTheme
//     />
//   );
// }

import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme } from '@react-navigation/native';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? '#8A2BE2' : '#918e8e'}
    />
  );
}

// import * as React from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import { DefaultTheme } from '@react-navigation/native';
// import { Text } from 'react-native';

// export default function TabBarIcon(props) {
//   const iconColor = props.focused ? '#8A2BE2' : '#918e8e';

//   return (
//     <>
//       <Ionicons
//         name={props.name}
//         size={30}
//         style={{ marginBottom: -3 }}
//         color={iconColor}
//       />
//       <Text style={{ color: iconColor }}>{props.label}</Text>
//     </>
//   );
// }
