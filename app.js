Pi.init({ version: "2.0" });

async function search() {
  const query = document.getElementById("searchInput").value;

  const res = await fetch('/api/search?q=' + query);
  const data = await res.json();

  const container = document.getElementById("results");
  container.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ${item.price} Pi</p>
      <button onclick="pay('${item.name}', ${item.price})">Pay with Pi</button>
    `;

    container.appendChild(div);
  });
}

function pay(name, price) {
  const paymentData = {
    amount: price,
    memo: name,
    metadata: { product: name }
  };

  const callbacks = {
    onReadyForServerApproval: function(paymentId) {
      fetch('/api/approve', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ paymentId })
      });
    },

    onReadyForServerCompletion: function(paymentId, txid) {
      fetch('/api/complete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ paymentId, txid })
      }).then(() => {
        alert("✅ Payment Completed");
      });
    }
  };

  Pi.createPayment(paymentData, callbacks);
}
