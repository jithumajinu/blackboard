# use pm2 image with node version 7
FROM keymetrics/pm2:8

# File Author / Maintainer
MAINTAINER TK-one

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

# add app source
COPY . /usr/src/app

# export port
EXPOSE 3000

CMD ["pm2-docker", "start", "pm2.json"]

