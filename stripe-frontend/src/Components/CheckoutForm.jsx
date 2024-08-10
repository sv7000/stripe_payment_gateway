import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!amount || isNaN(amount) || amount <= 0) {
            setMessage('Please enter a valid amount.');
            setIsLoading(false);
            return;
        }

        const { data: { clientSecret } } = await axios.post('http://localhost:5000/create-payment-intent', {
            amount: Math.round(amount * 100), // Convert dollars to cents
            currency: 'usd',
        });

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            setMessage(`Payment failed: ${error.message}`);
          
        } else if (paymentIntent.status === 'succeeded') {
            setShowSuccess(true);
            setAmount(''); 
            elements.getElement(CardElement).clear(); 
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }

        setIsLoading(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto mt-10 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Complete Your Payment</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="p-4 border border-gray-300 rounded-md transition duration-500 hover:border-blue-500" 
                />
                <CardElement className="p-4 border border-gray-300 rounded-md transition duration-500 hover:border-blue-500" />
                <button 
                    type="submit" 
                    disabled={!stripe || !elements || isLoading}
                    className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition transform duration-500 ease-in-out hover:scale-105 hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isLoading ? 'Processing...' : `Pay $${amount}`}
                </button>
            </form>
            {message && (
                <div className={`mt-6 p-4 rounded-md text-center font-semibold ${message.includes('succeeded') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold text-green-600">Payment Successful!</h3>
                        <p className="mt-4 text-gray-700">Thank you for your payment.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutForm;
