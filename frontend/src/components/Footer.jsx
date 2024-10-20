import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt='Logo' />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Discover the latest fashion trends and timeless classics at FOREVER. Our curated collection features a wide range of styles for every occasion. From casual wear to formal attire, we have something to suit every taste. Shop now and elevate your wardrobe with our exceptional quality and affordable prices.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+94 75 234 5678</li>
                    <li>contact@forever.com</li>
                </ul>
            </div>
        </div>
        
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer