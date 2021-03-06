# URL Shortener
![URL_Shortener.png](./URL_Shortener.png)
<br>
:sparkles: Make any URL shorten that you want.

## Features
* Input the URL and push Shorten button then get a shortened URL
* You can push the Copy button to copy

## Installation
* Install the Node.js and npm according to your OS(MacOS or Windows).
* Download the project to your local machine.
* Get into your project folder by Terminal and enter
  ```bash
  npm install
  ```

## How to use
* Set environment variable(note: can't enter spaces before and after the `=`)
  ```bash
  export MONGODB_URI="<your URL>"
  e.g. export MONGODB_URI="mongodb+srv://account:password@exemple.mongodb.net/shorten-list?retryWrites=true&w=majority"
  ```
* If you need the seeder data enter
  ```bash
  npm run seed
  ```
* Get start by enter
  ```bash
  npm run dev
  ```
  It's running when you see
  ```bash
  App is running on http://localhost:3000
  mongodb connected！
  ```
* Open the browser, and enter the URL `http://localhost:3000`
* You can stop on Terminal by
  ```bash
  Ctrl + C
  ```

## Build with
* Node.js @14.16.0
* Express.js @4.17.1
* express-handlebars @4.0.2
* mongoose @5.9.7
* Bootstrap @5.1.3