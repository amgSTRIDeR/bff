FROM node:alpine as base
WORKDIR /app

FROM base as dependencies
RUN mkdir -p /tmp/dependencies
COPY package.json package-lock.json /tmp/dependencies/
WORKDIR /tmp/dependencies
RUN npm ci

FROM base as build
COPY --from=dependencies /tmp/dependencies/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM base as release
COPY --from=build /app/package.json .
COPY --from=dependencies /tmp/dependencies/node_modules node_modules
COPY --from=build /app/dist dist
EXPOSE 4000/tcp
CMD ["dist/main.js"]