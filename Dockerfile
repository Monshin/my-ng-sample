# 建置環境
FROM node:12.13.0-alpine as builder

RUN mkdir /app
WORKDIR /app

# 複製 source code
COPY . /app

# 安裝模組
RUN npm install

RUN npm run build:ssr

EXPOSE 4000
CMD npm run serve:ssr
