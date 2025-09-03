// Testimonials slider, Level Up counter, Shop products loader, UPI Payment Handler

document.addEventListener('DOMContentLoaded', function() {
  // Testimonials slider
  let testimonials = document.querySelectorAll('.testimonial');
  let idx = 0;
  if (testimonials.length) {
    setInterval(() => {
      testimonials[idx].classList.remove('active');
      idx = (idx + 1) % testimonials.length;
      testimonials[idx].classList.add('active');
    }, 3000);
  }

  // Level Up Counter Animation
  const counter = document.getElementById('levelup-counter');
  if (counter) {
    let val = 0, end = 1000, speed = 7;
    let interval = setInterval(() => {
      val += Math.floor(Math.random()*10)+3;
      counter.textContent = val > end ? end : val;
      if (val >= end) clearInterval(interval);
    }, speed);
  }

  // Shop Page: Load products from products.json
  if (document.getElementById('products')) {
    fetch('products.json')
      .then(res => res.json())
      .then(products => {
        const container = document.getElementById('products');
        products.forEach(p => {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = `<img src="${p.image}" alt="${p.name}" width="100">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <strong>₹${p.price}</strong>
            <a href="checkout.html" class="premium-btn add-cart pulse">
              <i class="fa-solid fa-cart-shopping"></i> Buy Now
            </a>`;
          container.appendChild(card);
        });
      });
  }

  // Checkout Page: UPI Payment Gateway (Razorpay)
  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.onclick = function(e) {
      e.preventDefault();
      var options = {
        "key": "rzp_test_xxxxxxxxxx", // Replace with your Razorpay API key
        "amount": 15000, // Amount in paise
        "currency": "INR",
        "name": "BreezeMC- Webstore",
        "description": "Webstore Purchase",
        "image": "images/logo.png",
        "handler": function (response){
          alert("Payment Successful! ID: " + response.razorpay_payment_id);
        },
        "prefill": {
          "name": "",
          "email": "",
          "contact": ""
        },
        "theme": {
          "color": "#5fd6fd"
        },
        "method": {
          "upi": true,
          "card": false,
          "netbanking": false,
          "wallet": false
        }
      };
      var rzp = new Razorpay(options);
      rzp.open();
    }
  }
});