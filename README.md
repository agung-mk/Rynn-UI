# Rynn UI

![Layout](https://files.catbox.moe/zggxvb.png)
Rynn UI is a simple and easy-to-use API documentation interface built with Express.js. It allows developers to quickly set up and view API documentation with customizable settings using a `settings.json` file. 

## Features
- Simple API documentation interface
- Easily customizable with a `settings.json` file
- Categorized APIs for easy navigation
- Includes real-time settings such as name, version, description, and creator
- Supports image display in the UI for branding
- Links to external resources such as source code and contact info

## Live Demo
Check out a live demo of Rynn UI [here](https://api.rynn-archive.my.id)

## Setup

### Prerequisites
- Node.js (>= 14.0.0)

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/RynnKunnn/Rynn-UI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Rynn-UI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Modify the `settings.json` file to configure your API documentation.
   ```json
   {
     "name": "Rynn Api's",
     "version": "Rynn UI",
     "description": "Simple and Easy-to-Use API Documentation",
     "imageSrc": "https://media2.giphy.com/media/1ZlXGtKFZvsfS/giphy.gif?cid=6c09b952mp5121qp82g1u3h816mxri3a7d1yyjcgvkm7hcoe&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
     "apiSettings": {
       "creator": "Rynn"
     },
     "links": [
       {
         "name": "Source Code",
         "url": "https://github.com/RynnKunnn/Rynn-UI"
       },
       {
         "name": "Contact Me",
         "url": "https://wa.me/6285173370004"
       }
     ],
     "categories": {
       "AI (Artificial Intelligence)": {
         "apis": {
           "LuminAI": {
             "desc": "Talk with luminai",
             "path": "/ai/luminai?text="
           }
         }
       },
       "Search Tools": {
         "apis": {
           "Google": {
             "desc": "Web search",
             "path": "/search/google?q="
           },
           "YouTube": {
             "desc": "Video search",
             "path": "/search/youtube?q="
           }
         }
       }
     }
   }
   ```
5. Start the server:
   ```bash
   npm start
   ```
Your API documentation should now be available at `http://localhost:4000`.
## Customization
![Layout](https://files.catbox.moe/ncew71.png)
You can easily customize the UI by editing the `settings.json` file. The following fields are available for customization:
- `name`: The name of your API.
- `version`: The version of your API.
- `description`: A brief description of your API.
- `imageSrc`: URL of an image or logo to display in the documentation.
- `creator`: Name of the creator.
- `links`: Links to external resources like source code or contact information.
- `categories`: Categorized sections for APIs with their descriptions and paths.
# Support

This project is designed to be easily deployable on various platforms. You can host it on any platform that supports Node.js applications. Some popular options include:

- **[Vercel](https://vercel.com/)**: Easy deployment with minimal configuration.
- **[Heroku](https://www.heroku.com/)**: A platform-as-a-service for deploying, managing, and scaling apps.
- **[Netlify](https://www.netlify.com/)**: A platform for deploying static sites and serverless functions.
- **[DigitalOcean](https://www.digitalocean.com/)**: Cloud infrastructure for deploying apps with more control over the environment.
- **[AWS](https://aws.amazon.com/)**: Amazon Web Services for scalable and customizable cloud hosting.
- **[Railway](https://railway.app/)**: A platform for deploying apps with easy integration and deployment steps.

Make sure your platform supports Node.js, and configure it to run your API according to the platform’s deployment guidelines.

If you need help with deployment, feel free to reach out to the creator or check the documentation of your chosen platform.
# Credits

This project is created and maintained by:

- **[Rynn](https://github.com/RynnKunnn)**: Creator and main developer of the project.
- **[Lenwy](https://github.com/Lenwyy)**: For the inspiration behind the project.
- **[Siputzx](https://github.com/siputzx)**: For providing the LuminAI API.

Special thanks for the support and contributions throughout the development.

## License

This project is licensed under the [MIT License](LICENSE).
