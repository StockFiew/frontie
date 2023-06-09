import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme } from '@react-navigation/native';
// Change from DarkTheme to DefaultTheme

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={
        props.focused ? DefaultTheme.colors.primary : DefaultTheme.colors.text
      }
      // Change from DarkTheme to DefaultTheme
    />
  );
}
