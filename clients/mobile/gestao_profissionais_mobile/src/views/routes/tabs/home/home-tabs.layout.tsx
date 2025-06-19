import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

interface Props extends PropsWithChildren {}

const HomeTabsLayout = ({children}: Props) => {
  // const insets = useSafeAreaInsets();
  return <View style={{flex: 1, gap: 8, padding: 8}}>{children}</View>;
};

export {HomeTabsLayout};
