import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  subheader: {
    fontSize: 16,
    margin: 10,
    width: '90%',
  },
  settingsIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  accountInfo: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  accountInfoText: {
    fontSize: 16,
    height: 25,
  },
  email: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoTags: {
    display: 'flex',
    flexDirection: 'column',
    width: 60,
  },
  infoFields: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectionMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 40,
  },
  accountOptions: {
    borderTopWidth: 0.5,
    marginTop: 10,
    paddingTop: 10,
    width: '90%',
  },
});

export default styles;
