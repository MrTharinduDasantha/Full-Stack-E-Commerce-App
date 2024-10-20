import { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, backendURL, token, cartItems, setCartItems, getCartAmount, deliveryFee, products} = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChageHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data, [name]: value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      }
      
      switch (method) {
        // Api calls for cash on delivery
        case 'cod': {
          const response = await axios.post(backendURL + '/api/order/place', orderData, {headers: {token}})
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }

          break
        }

        // Api calls for stripe payment
        case 'stripe': {
          const responseStripe = await axios.post(backendURL + '/api/order/stripe', orderData, {headers: {token}})

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }

          break
        }

        default:
          break
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChageHandler} name='firstName' value={formData.firstName} className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='text' placeholder='First name' required />
          <input onChange={onChageHandler} name='lastName' value={formData.lastName} className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='text' placeholder='Last name' required />
        </div>
        <input onChange={onChageHandler} name='email' value={formData.email} className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='email' placeholder='Email address' required />
        <input onChange={onChageHandler} name='street' value={formData.street} className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='text' placeholder='Address' required />
        <div className='flex gap-3'>
          <input onChange={onChageHandler} name='city' value={formData.city} className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='text' placeholder='City' required />
          <input onChange={onChageHandler} name='state' value={formData.state} className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='text' placeholder='State' required />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChageHandler} name='zipcode' value={formData.zipcode} className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='number' placeholder='Zipcode' required />
          <input onChange={onChageHandler} name='country' value={formData.country}  className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='text' placeholder='Country' required />
        </div>
        <input onChange={onChageHandler} name='phone' value={formData.phone} className='border rounded py-1.5 px-3.5 w-full border-gray-300' type='number' placeholder='Phone number' required />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==='stripe'? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt='Stripe Logo' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'? 'bg-green-400' : ''}`}></p>
              <p className='text-sm font-medium mx-4 text-gray-500'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='px-16 py-3 text-sm bg-black text-white'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder