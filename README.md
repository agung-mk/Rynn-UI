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
5. Start the server:
   ```bash
   npm start
   ```
Your API documentation should now be available at `http://localhost:4000`.

## Customization

![Layout](https://files.catbox.moe/ncew71.png)
You can easily customize the UI by editing the `settings.json` file. Below is a breakdown of the configurable fields:

### General Settings

- `name`: Sets the name of your API (e.g., "Rynn Api's").
- `version`: Specifies the version of your API interface (e.g., "Rynn UI").
- `description`: A brief description of your API documentation.

### Header Customization

- `status`: Indicates the current status of your API (e.g., "Online!").
- `imageSrc`: An array of image URLs to display in the header. Multiple images can be set for variety.
- `imageSize`: Defines responsive image sizes based on the device type:
  - `mobile`: Size for mobile devices (e.g., "80%").
  - `tablet`: Size for tablets (e.g., "40%").
  - `desktop`: Size for desktops (e.g., "40%").

### Api Settings

- `creator`: Displays the creator's name in the interface.

### Links

- `name`: Label for the link (e.g., "Source Code").
- `url`: The URL to the resource.

### Categories and Apis

Organize APIs into categories for better navigation:
- **Category Name (e.g., "AI (Artificial Intelligence)")**
  - `apis`: Define individual APIs within the category:
    - `desc`: A short description of the API (e.g., "Talk with luminai").
    - `path`: The endpoint path for the API (e.g., /ai/luminai?text=).

### Example `settings.json`

Here’s an example of how your settings.json file might look:
```json
{
  "name": "Rynn Api's",
  "version": "Rynn UI",
  "description": "Simple and Easy-to-Use API Documentation",
  "header": {
    "status": "Online!",
    "imageSrc": [
      "https://media1.giphy.com/media/mitS0cu0eltTDSG3FF/giphy.gif",
      "https://media3.giphy.com/media/9yIB2SMZBt40rZE94V/giphy.gif"
    ],
    "imageSize": {
      "mobile": "80%",
      "tablet": "40%",
      "desktop": "40%"
    }
  },
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
This structure allows you to easily adapt and configure the interface to suit your API needs!

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
