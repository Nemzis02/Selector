self.addEventListener('push', function (event) {
  const message = event.data.json();
  const promiseChain = self.registration.showNotification(
    message.notification.title,
    { body: message.notification.body }
  );

  event.waitUntil(promiseChain);
});
