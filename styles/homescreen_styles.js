import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
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
  subheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 35,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    width: 250,
    borderRadius: 5,
    paddingLeft: 50,
    position: 'absolute',
    left: 10,
    zIndex: -1,
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
