import {lazy} from 'react'

export const Home = lazy(() => import('../Components/Home/Home'))
export const Signup = lazy(() => import('../Components/Signup/Signup'))
export const Header = lazy(() => import('../Components/Header/Header'))
export const Footer = lazy(() => import('../Components/Footer/Footer'))
export const HostForm = lazy(() => import('../Components/HostForm/HostForm'))
export const Listing = lazy(() => import('../Components/Listing/Listing'))
export const Booking = lazy(() => import('../Components/Booking/Booking'))
export const RoomDetails = lazy(() => import('../Components/RoomDetails/RoomDetails'));