import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  ttsBar: {
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  recentSearchesHeader: {
    height: 30,
    margin: 10,
    width: '72%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    height: '60%',
  },
  scrollView: {
    display: 'flex',
    justifyContent: 'center',
  },
  recentSearch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  clearButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
