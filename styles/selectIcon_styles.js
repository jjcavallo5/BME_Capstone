import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 300,
  },
  searchBar: {
    height: 40,
    width: 300,
    borderRadius: 5,
    paddingLeft: 40,
  },
  searchIcon: {
    position: 'absolute',
    left: 5,
  },
  columns: {
    width: 300,
    display: 'flex',
    justifyContent: 'center',
  },
  icons: {
    width: 90,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
