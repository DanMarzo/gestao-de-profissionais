import React from 'react';
import {View} from 'react-native';
import {Button, Menu} from 'react-native-paper';

interface Props<T> {
  visible: boolean;
  onDismiss: () => void;
  onPress: () => void;
  valueText: string | undefined;
  items: Array<T>;
  handleItem: (item: T) => void;
  titleItem: keyof T;
}

//E possivel notar uma falha no ato de rederizar
//Dps tente mudar a abordagem para renderizar esse component
const CustomMenu = <T,>({
  handleItem,
  onDismiss,
  onPress,
  visible,
  valueText,
  items,
  titleItem,
}: Props<T>) => {
  return (
    <View>
      <Menu
        contentStyle={{height: '60%'}}
        visible={visible}
        onDismiss={onDismiss}
        anchor={
          <Button onPress={onPress}>{valueText ?? 'Selecione um item'}</Button>
        }>
        {items.map((item, index) => {
          return (
            <Menu.Item
              key={index}
              onPress={() => handleItem(item)}
              title={item[titleItem] as any}
            />
          );
        })}
      </Menu>
    </View>
  );
};

export {CustomMenu};
