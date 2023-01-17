import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    width: '100%',
  },
  header: {
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    textAlign: 'left',
  },
  subHeaderText: {
    marginTop: 25,
  },
  commandContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: 250,
    marginBottom: 10,
  },
  footer: {
    height: 30,
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  addButtons: {
    position: 'absolute',
    right: 0,
  },
});

export default styles;
