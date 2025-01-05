import {ToastAndroid} from 'react-native';

//ToastAndroid.BOTTOM
//usar esse
const Toast = (message:string, type: number) => {
  ToastAndroid.showWithGravity(message, 2, type);
};

export{Toast}