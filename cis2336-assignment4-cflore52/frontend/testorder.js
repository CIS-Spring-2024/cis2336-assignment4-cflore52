document.getElementById('orderForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = {
      productName: document.getElementById('productName').value,
      quantity: parseInt(document.getElementById('quantity').value, 10)
  };

  fetch('/submit-order', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  }).then(response => {
      window.location.href = response.url; // Redirect after the server responds
  }).catch(error => console.error('Error:', error));
});



function validateOrder() {
  // Implement validation checks here
  return true; // Return false if validation fails
}
function updateOptions(optionsId) {
    var qty = parseInt(document.getElementById(optionsId.replace('Options', 'Qty')).value);
    var optionsDiv = document.getElementById(optionsId);
    
    if (qty > 0) {
      optionsDiv.style.display = "block";
    } else {
      optionsDiv.style.display = "none";
    }
    
    updateTotal();
  }
  
  function updateTotal() {
    var total = 0;
  
    total += calculateDrinkTotal("coffee");
    total += calculateDrinkTotal("latte");
    total += calculateDrinkTotal("cappuccino");
    total += calculateDrinkTotal("hotChocolate");
    total += calculateDrinkTotal("menuOption1");
    total += calculateDrinkTotal("menuOption2");
    total += calculateMenuOptionTotal(3, 3.49);
          // Calculate total for menu option 4
          total += calculateMenuOptionTotal(4, 2.49);
          // Calculate total for menu option 5
          total += calculateMenuOptionTotal(5, 2.49);
    
    document.getElementById("total").innerHTML = "Total: $" + total.toFixed(2);
  }
  
  function calculateDrinkTotal(drinkId) {
    var qty = parseInt(document.getElementById(drinkId + "Qty").value);
    var size = document.getElementById(drinkId + "Size").value;
    var milk = document.getElementById(drinkId + "Milk").value;
    var syrup = document.getElementById(drinkId + "Syrup").value;
  
    var drinkTotal = 0;
  
    if (qty > 0) {
      if (size == 1) {
        drinkTotal += 4.59; // Large size
      } else if (size == 2) {
        drinkTotal += 3.99; // Small size
      }
  
      if (milk != 0) {
        drinkTotal += 0.5; // Additional charge for milk
      }
  
      if (syrup != 0) {
        drinkTotal += 0.5; // Additional charge for syrup
      }
    }
  
    return drinkTotal * qty;
  }
  function calculateMenuOptionTotal(optionNumber, pricePerItem) {
          var qty = parseInt(document.getElementById("menuOption" + optionNumber + "Qty").value);
          return pricePerItem * qty;
      }
  
      function submitOrder() {
        var name = document.getElementById("customerName").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        var pickupDateTime = document.getElementById("pickupDateTime").value;
        var total = document.getElementById("total").innerText;
    
        var confirmationMessage = "Name: " + name + "\n" +
                                   "Phone Number: " + phoneNumber + "\n" +
                                   "Pickup Date and Time: " + pickupDateTime + "\n" +
                                   "Total: " + total;
    
        if (confirm(confirmationMessage + "\n\nConfirm order?")) {
            // Prepare the order data as a JSON object
            var orderData = {
                customerName: name,
                phoneNumber: phoneNumber,
                pickupDateTime: pickupDateTime,
                total: total
            };
    
            // Send the order data to the server
            fetch('/submit-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })
            .then(response => response.text())
            .then(data => {
                // You can handle the response here
                alert("Order confirmed! Server says: " + data);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
                alert("There was an error processing your order.");
            });
        }
    }
  function validateName() {
      var nameInput = document.getElementById("customerName");
      var name = nameInput.value.trim();
      var lettersWithSpaces = /^[A-Za-z\s]+$/;
  
      if (!name.match(lettersWithSpaces)) {
          document.getElementById("nameError").innerHTML = "Only letters and spaces are accepted";
      } else {
          document.getElementById("nameError").innerHTML = "";
      }
  }
  
  function validatePhoneNumber() {
    var phoneNumberInput = document.getElementById("phoneNumber");
    var phoneNumber = phoneNumberInput.value.trim();
    var numbers = /^[0-9]+$/;
  
    if (!phoneNumber.match(numbers)) {
      document.getElementById("phoneError").innerHTML = "Only numbers are accepted";
    } else if (phoneNumber.length !== 10) {
      document.getElementById("phoneError").innerHTML = "Phone number must be 10 digits";
    } else {
      document.getElementById("phoneError").innerHTML = "";
    }}
