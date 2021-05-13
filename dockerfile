
FROM cypress/base:10

USER root

RUN node --version

# Add zip utility - it comes in very handy
RUN apt-get update 
RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb kafkacat -y


# versions of local tools
RUN node -v
RUN npm -v
RUN yarn -v
RUN git --version

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM xterm
# avoid million NPM install messages
ENV npm_config_loglevel warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm true

WORKDIR /testes

COPY . /testes
RUN npm i

RUN chmod +x /testes/dockerexec.sh


