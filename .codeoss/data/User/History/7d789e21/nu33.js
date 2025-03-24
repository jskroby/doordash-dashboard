// static/script.js
document.getElementById("place-order-btn").addEventListener("click", function() {
    fetch('/place_order', { method: 'POST' })
        .then(response => response.text())
        .then(data => {
            document.getElementById("order-status").innerText = data;
        });
});
