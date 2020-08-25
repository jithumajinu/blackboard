# realtime-canvas
simple realtime HTML5 canvas page

## The Result
![Alt Text](https://user-images.githubusercontent.com/13212502/30583111-0519d664-9d61-11e7-9374-24aa70967c3f.gif)


## Getting started
These instructions will get you a copy of the project and running on your local machine for development and production mode using docker.

### Prerequisite

- Node.js 6^
- Npm 3^
- babel-cli 6^

### Installing 

1. install global dependencies
  ```
  npm install -g babel-cli
  ```
  - babel-cli transpile ES6 codes and import syntax.

2. Clone the project from the github repository
  ```
  git clone git@github.com:TK-one/realtime-canvas.git
  
  cd realtime-canvas
  ```
3. install node dependencies
  ```
  npm install
  ```
4. run server on port 3000 and open public/index.html file with your browser.
  ```
  npm start
  ```

### Development

1. run test
  ```
  npm test
  ```
2. run server on port 3000
  ```
  npm start
  ```

### Deployment

#### Without Docker

1. install pm2 globally
  ```
  npm install -g pm2
  ```

2. change your address for socket server in public/index.html
  ```
  'http://localhost:3000' => [your host domain or ip]
  ```

3. run app with pm2
  ```
  cd realtime-canvas

  pm2 start pm2.json
  ```

#### With Docker

1. pull nginx image
  ```
  docker pull nginx:latest
  ```

2. change your address for socket server in public/index.html
  ```
  'http://localhost:3000' => [your host domain or ip]
  ```

3. run nginx container
  ```
  docker run -i -t --name [container-name] -v [path_to_directory]/public:/usr/share/nginx/html:ro -d -p 80:80 -p 443:443 nginx
  ```

4. build app Docker image
  ```
  docker build --tag realtime-canvas:0.1 .
  ```

5. run app container on port 3000
  ```
  docker run -i -t -d --name realtime-canvas -p 3000:3000 realtime-canvas:0.1
  ```

6. check docker container status
  ```
  docker ps -a
  ```

  
