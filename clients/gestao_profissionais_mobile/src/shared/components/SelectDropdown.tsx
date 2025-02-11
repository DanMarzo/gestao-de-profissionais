import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

type PropsSelectDropdown = {
  readonly: boolean;
  isFocus: boolean;
  data: any;
  search: boolean;
  value: any;
  labelField: string;
  valueField: string;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (item: any) => void;
  styles?: StyleProp<ViewStyle>;
};

const SelectDropdown = ({
  data,
  isFocus,
  readonly,
  labelField,
  search,
  value,
  valueField,
  onBlur,
  onChange,
  onFocus,
  styles,
}: PropsSelectDropdown) => {
  return (
    <Dropdown
      disable={readonly}
      style={[styles, stylesLocal.dropdown, isFocus && {borderColor: 'blue'}]}
      placeholderStyle={stylesLocal.placeholderStyle}
      selectedTextStyle={stylesLocal.selectedTextStyle}
      inputSearchStyle={stylesLocal.inputSearchStyle}
      data={data}
      search={search}
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={!isFocus ? 'Selecionar' : '...'}
      searchPlaceholder="Pesquisar..."
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

const stylesLocal = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export {SelectDropdown};
