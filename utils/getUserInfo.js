import Constants from 'expo-constants';
import Fire from '../Fire'
function getUserInfo() {
  const {  deviceName, platform } = Constants;
  const deviceId = Fire.shared.Umail;
  return {
    deviceId,
    deviceName,
    platform,
  };
}
export default getUserInfo;
