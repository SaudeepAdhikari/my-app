import logoImg from '../assets/Logo.png';
import ecommerceImg from '../assets/ecommerse.jpg';
import parkingImg from '../assets/Parkinglogo.png';
import weatherImg from '../assets/weather.jpeg';
import roomFinderImg from '../assets/roomfinder.png';
import restaurantImg from '../assets/Resturantreservation.png';

export const projects = [
    {
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with React, custom CSS, and EmailJS integration for contact.',
        image: logoImg,
        link: 'https://github.com/SaudeepAdhikari/Website',
        tags: ['React', 'CSS', 'EmailJS']
    },
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform with product management, cart, and payment integration.',
        image: ecommerceImg,
        link: 'https://github.com/SaudeepAdhikari/E-commerce',
        tags: ['React', 'Node.js', 'MongoDB']
    },
    {
        title: 'Parking Management System',
        description: 'A web application for managing parking spaces, bookings, and payments with real-time availability.',
        image: parkingImg,
        link: 'https://github.com/SaudeepAdhikari/Parking-system',
        tags: ['HTML', 'CSS', 'JS']
    },
    {
        title: 'Weather App',
        description: 'A weather application that provides real-time weather updates using OpenWeatherMap API.',
        image: weatherImg,
        link: 'https://github.com/SaudeepAdhikari/Weather-App',
        tags: ['React', 'API', 'CSS']
    },
    {
        title: 'Room Finder',
        description: 'A Room finding System that helps users to find rooms in a city or the users locality.',
        image: roomFinderImg,
        link: 'https://github.com/SaudeepAdhikari/room-finder',
        tags: ['React', 'Node.js', 'MongoDB']
    },
    {
        title: 'Resturant Reservation System',
        description: 'A Resturant Reservation System that helps users to reserve a table in a resturant.',
        image: restaurantImg,
        link: 'https://github.com/SaudeepAdhikari/Restaurant-Reservation-System',
        tags: ['React', 'Node.js', 'MongoDB']
    }
];
