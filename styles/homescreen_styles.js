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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  addButtons: {
    position: 'absolute',
    right: 0,
  },
});

export default styles;
