const createPayload = (serviceAccountInfo, purchaseToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      purchaseToken: purchaseToken,
      packageName: 'com.bme_capstone',
      service_account_info: serviceAccountInfo,
    }),
    method: 'POST',
  };
};

export const validateReceipt = async purchaseToken => {
  const serviceAccountInfo = require('../android/app/service-account-info.json');
  const address =
    'https://us-central1-bme-capstone-2c488.cloudfunctions.net/receipt-validation';
  const payload = createPayload(serviceAccountInfo, purchaseToken);

  const response = await fetch(address, payload);
  const json = await response.json();
  if (json.subscriptionState == 'SUBSCRIPTION_STATE_ACTIVE') return 'ACTIVE';
  else return 'INACTIVE';
};
