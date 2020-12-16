# base image
FROM ubuntu:bionic

RUN apt-get  update  --fix-missing
RUN apt-get install -y curl nodejs npm 
RUN apt-get install -y  chromium-browser 
RUN apt-get install -y python3-pip
RUN pip3 install awscli --upgrade 

RUN mkdir /var/app

# add `/var/app/node_modules/.bin` to $PATH
ENV PATH /var/app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD  . /var/app
WORKDIR /var/app


RUN npm install
RUN npm install react-scripts@1.1.1 -g --silent


# start app
CMD ["npm", "start"]