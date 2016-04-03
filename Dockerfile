FROM mhart/alpine-node:4
MAINTAINER Michiel De Mey <de.mey.michiel@gmail.com>

ADD . .

RUN ["npm", "install"]

CMD ["npm", "start"]

EXPOSE 3000