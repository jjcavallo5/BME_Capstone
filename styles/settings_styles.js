import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: 20,
  },

  themeSettings: {
    borderTopWidth: 1,
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    position: 'relative',
  },
  themeButtons: {
    height: 50,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  voiceScrollView: {
    padding: 10,
    borderTopWidth: 1,
  },
  voiceContainer: {
    height: 50,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  sampleIcon: {
    position: 'absolute',
    right: 5,
  },
});

export default styles;
