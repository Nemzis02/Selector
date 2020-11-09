function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const register = () => {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  return navigator.serviceWorker
    .register(swUrl)
    .then(function (registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BGyvhaLpMTMenH5uEXcMNVlYGONvkfPMvo11pY7QdbDrzqrw20DS6jZN9P-sCWY6gQsAAJCGahm-0VJ3RlxmbeY'
        ),
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function (pushSubscription) {
      const subscription = JSON.stringify(pushSubscription);
      window.localStorage.setItem('messageSubscription', subscription);

      console.log('Received PushSubscription: ', subscription);
    });
};
