var cart = {};

function updateCart() {
    const cartItemsElement = document.getElementById('cartItems');
    let total = 0;

    // Clear current cart items
    cartItemsElement.innerHTML = '';

    for (let productId in cart) {
        let product = cart[productId];
        let productTotal = product.price * product.quantity;
        total += productTotal;

        // Add item to cart details
        let row= `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>Rs ${productTotal}</td>
            </tr>
        `;
        
        cartItemsElement.innerHTML += row;
    }

    document.getElementById('cartTotalPrice').innerText = total;
}

document.addEventListener("DOMContentLoaded", function() {
    // Add To Cart Button
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const card = button.closest('.card');
            const quantityElement = card.querySelector('.quantity');

            const currentQuantity = parseInt(quantityElement.innerText);

            const productId = card.getAttribute('data-id');
            const productName = card.getAttribute('data-name');
            const productPrice = parseFloat(card.getAttribute('data-price'));

            if (!cart[productId]) {
                cart[productId] = { name: productName, price: productPrice, quantity: 0 };
            }

            cart[productId].quantity += currentQuantity;

            if (cart[productId].quantity > 8) {
                alert("You can't add more than 8 of one product!");
                cart[productId].quantity = 8;
            }

            updateCart();
        });
    });

    // Increase and Decrease Quantity Buttons
    document.querySelectorAll('.increase-quantity, .decrease-quantity').forEach(function(button) {
        button.addEventListener('click', function() {
            const card = button.closest('.card');
            const quantityElement = card.querySelector('.quantity');
            const currentQuantity = parseInt(quantityElement.innerText);

            if (button.classList.contains('increase-quantity')) {
                if (currentQuantity < 8) {
                    quantityElement.innerText = currentQuantity + 1;
                } else {
                    alert("You can't add more than 8 of one product!");
                }
            } else if (button.classList.contains('decrease-quantity')) {
                if (currentQuantity > 0) {
                    quantityElement.innerText = currentQuantity - 1;
                }
            }
        });
    });

    function showCartModal() {
        document.getElementById('cartModal').style.display = 'block';
    }

    function closeCartModal() {
        document.getElementById('cartModal').style.display = 'none';
    }

    document.getElementById('navbarCartBtn').addEventListener('click', showCartModal);
    document.querySelector('#cartModal button').addEventListener('click', closeCartModal);
});
