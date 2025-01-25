# Car Dealership Inventory

This project is an inventory management application built using Node.js, Express, PostgreSQL, EJS, and Tailwind CSS. It allows users to manage a car dealership inventory by creating, viewing, updating, and deleting cars and categories. I built this to strengthen my backend development skills and to learn database integration and styling with Tailwind CSS.


## Badges
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Features

- Car Management:
  - Add new cars with details such as make, model, year, price, and category.
  - View all cars, with their details, on a dedicated page.
  - Update car information or delete cars as needed.
    
- Category Management:
  - Create categories to organize cars (e.g., SUVs, Sedans, Trucks).
  - View all categories and cars associated with a specific category.
  - Prevent deletion of categories that still have cars associated with them, with error messaging to guide the user.
  
- Dynamic Views:
  - Templating with EJS for dynamic and reusable HTML rendering.
  - Styled using Tailwind CSS for a clean and modern user interface.
    
- Database Integration: Data is stored and managed using PostgreSQL for persistence.

- Express Router: Simplified and modular route handling for clean, maintainable code.
