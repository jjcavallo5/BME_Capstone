import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 60,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loginButton: {
    height: 50,
    width: 200,
    backgroundColor: 'lightblue',
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registration: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 32,
  },
  icons: {
    position: 'absolute',
    left: 5,
    zIndex: 1,
  },
  textInput: {
    height: 40,
    width: 300,
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    color: 'black',
    paddingLeft: 50,
  },
  errorMessage: {
    color: 'red',
    marginTop: 35,
  },
});

export default styles;
