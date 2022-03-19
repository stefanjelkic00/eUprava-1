FROM node:16.13.2
EXPOSE 4001
WORKDIR /app
COPY package.json package-lock.json /app/
COPY .env /app/
RUN npm install
COPY ./ /app/
CMD ["sh", "start.sh"]
