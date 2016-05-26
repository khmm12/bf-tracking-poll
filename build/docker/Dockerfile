FROM khmm12/node-stack:1.3.0
MAINTAINER Maxim Khvatalin <maksim.khvatalin@kodep.ru>

# env variables
ENV NODE_ENV production

# clone and build application
#
WORKDIR /var/www/bf-tracking-poll

# Cache node_modules
# application
COPY bf-tracking-poll/package.json bf-tracking-poll/npm-shrinkwrap.json ./
RUN npm install --production

# copy and build
COPY bf-tracking-poll ./
RUN npm run build:front && npm run build:server

# nginx
RUN rm /etc/nginx/sites-enabled/default && echo "daemon off;" >> /etc/nginx/nginx.conf
COPY nginx/bf-tracking-poll.conf /etc/nginx/sites-enabled/bf-tracking-poll.conf

# startup
CMD nginx
EXPOSE 80
