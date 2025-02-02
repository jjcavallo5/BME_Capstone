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
    height: 50,
    position: 'relative',
    width: '80%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
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
  dropdown: {
    width: 300,
    // height: 40,
    borderRadius: 10,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    zIndex: 1,
    borderWidth: 0,
    marginTop: 10,
  },
  preview: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commandContainer: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelectionPanel: {
    disply: 'flex',
    flexDirection: 'column',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 200,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
