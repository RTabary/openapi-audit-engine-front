FROM node:alpine
WORKDIR /opt
COPY . .
RUN npm install -g @angular/cli && npm install && ng build --prod=true

FROM nginx:1.17.9-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /opt/dist/openapi-audit-engine-front /usr/share/nginx/html/
EXPOSE 4200