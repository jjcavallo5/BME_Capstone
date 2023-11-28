// import Slider from '@react-native-community/slider';
// import React, {useContext} from 'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// import {ColorPicker, fromHsv} from 'react-native-color-picker';
// import AppContext from './appContext';

// const ColorPickerModal = props => {
//   const context = useContext(AppContext);
//   const theme = context.theme;

//   return (
//     <View
//       style={{
//         position: 'absolute',
//         padding: 20,
//         top: 120,
//         display: props.display,
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 2,
//         backgroundColor: 'white',
//         borderRadius: 20,
//       }}>
//       <Text style={{fontSize: 20}}>{props.caption}</Text>
//       <ColorPicker
//         onColorChange={clr => props.callback(fromHsv(clr))}
//         sliderComponent={Slider}
//         style={{height: 300, width: 300}}
//         hideSliders={false}
//       />
//       <TouchableOpacity
//         style={{
//           height: 40,
//           width: 150,
//           borderTopLeftRadius: 10,
//           borderBottomRightRadius: 10,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: 10,
//           backgroundColor: theme.buttonColor,
//         }}
//         onPress={() => props.hideModal('none')}>
//         <Text style={{color: 'black'}}>Confirm</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ColorPickerModal;
