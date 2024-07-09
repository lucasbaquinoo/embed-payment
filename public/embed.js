document.getElementById('conditionalLink').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default link behavior

  var amount = event.target.dataset.amount;

  // URL of the service you want to call
  var serviceUrl = '/api/invoice';

  // Send a request to the service
  fetch(serviceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount: amount }) // Send the amount in the request body
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('Success:', data)
      // Check if the request was successful
      if (data.success) {
        // If successful, navigate to the original link
        window.location.href = event.target.href + '/' + data.transactionId;
      } else {
        // If not successful, handle accordingly
        alert('The request was not successful.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error processing your request.');
    });
});