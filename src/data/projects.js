import logoImg from '../assets/Logo.png';
import ecommerceImg from '../assets/ecommerse.jpg';
import parkingImg from '../assets/Parkinglogo.png';
import weatherImg from '../assets/weather.jpeg';
import roomFinderImg from '../assets/roomfinder.png';
import restaurantImg from '../assets/Resturantreservation.png';
import tournamentImg from '../assets/TournamentSys.png';
import recipeImg from '../assets/recipe.png';
export const projects = [
    {
        title: 'Room Finding System',
        description: 'A room finding platform that helps users discover available rooms based on city and preferred locality.',
        image: roomFinderImg,
        liveLink: 'https://room-finder-client-qfa1.vercel.app/',
        sourceLink: 'https://github.com/SaudeepAdhikari/room-finder',
        tags: ['React', 'Node.js', 'MongoDB']
    },
    {
        title: 'Recipe Finding System',
        description: 'A recipe discovery app that helps users find recipes based on ingredients and dietary preferences.',
        image: recipeImg,
        liveLink: 'https://recipe-finding-system.vercel.app/',
        sourceLink: 'https://github.com/SaudeepAdhikari/Recipe-finding-system',
        tags: ['React', 'Node.js']
    },
    {
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with React, custom CSS, and EmailJS integration for contact.',
        image: logoImg,
        sourceLink: 'https://github.com/SaudeepAdhikari/Website',
        tags: ['React', 'CSS', 'EmailJS']
    },
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform with product management, cart, and payment integration.',
        image: ecommerceImg,
        sourceLink: 'https://github.com/SaudeepAdhikari/E-commerce',
        tags: ['React', 'Node.js', 'MongoDB']
    },
    {
        title: 'Parking Management System',
        description: 'A web application for managing parking spaces, bookings, and payments with real-time availability.',
        image: parkingImg,
        sourceLink: 'https://github.com/SaudeepAdhikari/Parking-system',
        tags: ['HTML', 'CSS', 'JS']
    },
    {
        title: 'Weather App',
        description: 'A weather application that provides real-time weather updates using OpenWeatherMap API.',
        image: weatherImg,
        sourceLink: 'https://github.com/SaudeepAdhikari/Weather-App',
        tags: ['React', 'API', 'CSS']
    },
    {
        title: 'Resturant Reservation System',
        description: 'A Resturant Reservation System that helps users to reserve a table in a resturant.',
        image: restaurantImg,
        sourceLink: 'https://github.com/SaudeepAdhikari/Restaurant-Reservation-System',
        tags: ['React', 'Node.js', 'MongoDB']
    },
     {
        title: 'Tournament Management System',
        description: 'A Tournament Management System that helps users to manage and organize tournaments efficiently, create tie sheets, keep track of the winners.',
        image: tournamentImg,
        sourceLink: 'https://github.com/SaudeepAdhikari/Tournament-Management-system',
        tags: ['React', 'Node.js']
    }
];
