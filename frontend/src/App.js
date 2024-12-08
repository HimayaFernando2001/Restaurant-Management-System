import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import HeaderMain from './components/common/HeaderMain';
import NavBar from './components/common/NavBar';
import FooterMain from './components/common/FooterMain';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import NavbarAdmin from './components/common/NavBarAdmin';
import CustomerNavBar from './components/common/CustomerNavBar';
import Home from './components/page/Home';
import Menu from './components/page/Menu';
import Reservation from './components/page/Reservation';
import About from './components/page/About';
import Gallery from './components/page/Gallery';
import Contact from './components/page/Contact';
import SignIn from './components/page/SignIn';
import Feedback from './components/page/Feedback';
import RoomReservation from './components/page/RoomReservation';
import TableReservation from './components/page/TableReservation';
import OutdoorReservation from './components/page/OutdoorReservation';
import CustomerOutdoor from './components/page/CustomerOutdoor';
import CustomerRoom from './components/page/CustomerRoom';
import CustomerTable from './components/page/CustomerTable';
import Dashboard from './components/page/Dashboard';
import Profile from './components/page/Profile';
import Swal from 'sweetalert2';
import axios from 'axios';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedAuthState = localStorage.getItem('isAuthenticated');
        const storedEmail = localStorage.getItem('email');

        if (storedAuthState === 'true') {
            setIsAuthenticated(true);
            // Check if the user is admin based on stored email or another method
            if (storedEmail === 'himayafernando@gmail.com') {
                setIsAdmin(true);
            }
        }
    }, []);

    const handleSignIn = async (username, password) => {
        if (username === 'himayafernando@gmail.com' && password === '12345') {
            setIsAuthenticated(true);
            setIsAdmin(true);
            setErrorMessage('');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('email', username); // Store email for profile access

            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'You have successfully logged in as admin!',
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/');
        } else {
            try {
                const response = await axios.post('http://localhost:8070/customer/login', { email: username, password });
                if (response.data.success) {
                    setIsAuthenticated(true);
                    setIsAdmin(false);
                    setErrorMessage('');
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('email', response.data.customer.email); // Store email for profile access
                    localStorage.setItem('customer', JSON.stringify(response.data.customer));

                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: 'You have successfully logged in as customer!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/reservation');
                } else {
                    setErrorMessage('Invalid email or password');
                }
            } catch (error) {
                setErrorMessage('An error occurred during login.');
            }
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('email'); // Clear email on logout
        localStorage.removeItem('customer');
        navigate('/signin');
    };

    return (
        <div className="app-container">
            {isAuthenticated ? (
                <>
                    {isAdmin ? (
                        <>
                            <Header />
                            <NavbarAdmin onLogout={handleLogout} />
                        </>
                    ) : (
                        <>
                            <HeaderMain />
                            <CustomerNavBar onLogout={handleLogout} />
                        </>
                    )}
                </>
            ) : (
                <>
                    <HeaderMain />
                    <NavBar />
                </>
            )}

            <div className="main-content">
                <Routes>
                    {isAuthenticated ? (
                        <>
                            {isAdmin ? (
                                <>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/room-reservation" element={<RoomReservation />} />
                                    <Route path="/table-reservation" element={<TableReservation />} />
                                    <Route path="/outdoor-reservation" element={<OutdoorReservation />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/customer-outdoor" element={<CustomerOutdoor />} />
                                    <Route path="*" element={<Navigate to="/" />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/reservation" element={<Reservation />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/customer-outdoor" element={<CustomerOutdoor />} />
                                    <Route path="/customer-room" element={<CustomerRoom />} />
                                    <Route path="/customer-table" element={<CustomerTable />} />
                                    <Route
                                        path="/signin"
                                        element={<SignIn onSignIn={handleSignIn} errorMessage={errorMessage} />}
                                    />
                                    <Route path="*" element={<Navigate to="/" />} />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/reservation" element={<Reservation />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/feedback" element={<Feedback />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route
                                path="/signin"
                                element={<SignIn onSignIn={handleSignIn} errorMessage={errorMessage} />}
                            />
                            <Route path="/customer-outdoor" element={<CustomerOutdoor />} />
                            <Route path="/customer-room" element={<CustomerRoom />} />
                            <Route path="/customer-table" element={<CustomerTable />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>

            {isAdmin ? (
                <Footer />
            ) : (
                <FooterMain />
            )}
        </div>
    );
};

export default App;
