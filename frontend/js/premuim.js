const buyPremium = document.querySelector('.buyPremium');
// console.log(token);

// Razorpay Buy Premium
buyPremium.addEventListener('click', buyPremiumActions);
async function buyPremiumActions(e) {
    try {
        const response = await axios.get(`http://13.48.27.91:3000/purchase/premiumMembership`, { headers: { Authorization: token, price: 250000 } });
        console.log(response);
        const options = {
            key: response.data.key_id,  // taking API Key Id
            order_id: response.data.order.id,  // taking order id, the order details is already sent to Razorpay by our backend
            // amount: 2500, X -> never send price from frontend, Razorpay already got it in order details sent by our backend
            handler: async function (response) {     // hendler is a callback, helps to notify our server that payment was success
                try {
                    // console.log(response.razorpay_payment_id);
                    const res = await axios.post(`http://13.48.27.91:3000/purchase/updateTransactionStatus`,
                        {
                            order_id: options.order_id,
                            payment_id: response.razorpay_payment_id
                        }, { headers: { Authorization: token } });

                    e.target.remove();
                    document.querySelector('.premium').innerHTML = '<p>You are Premium User</p>';

                    localStorage.setItem('token', res.data.token);
                    alert('You are a Premium User Now');
                } catch (err) {
                    console.log('Error is:', err);
                }
            }
        };

        const rzpl = new Razorpay(options);
        rzpl.open();
        e.preventDefault();

        // if payment gets canceled
        rzpl.on('payment-failed', function (response) {
            console.log('Errro is:', response);
            alert('Something went wrong');
        });
    }
    catch (err) {
        console.log('Error is -> ', err);
    }
}