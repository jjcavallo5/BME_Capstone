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
  commandPromptBar: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    position: 'relative',
  },
  tempPromptBarText: {
    position: 'absolute',
    top: 46,
    fontSize: 20,
    left: 20,
  },
  promptBarScrollView: {
    display: 'flex',
    flexDirection: 'row',
    transform: [{scaleX: -1}],
    width: '85%',
    height: 110,
  },
  promptBarOptions: {
    position: 'absolute',
    right: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 15,
    marginTop: 15,
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
  scrollViewContainer: {
    height: '90%',
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
