import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    height: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 5,
    zIndex: 1,
  },
  textInput: {
    width: 300,
    height: 40,
    borderRadius: 10,
    paddingLeft: 40,
  },
  iconSelectContainer: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 5,
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  colorSubmitButton: {
    height: 40,
    width: 150,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dropdown: {
    width: 300,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 0,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    height: 50,
    width: 200,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default styles;
