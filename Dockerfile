FROM nginx:1.17.9-alpine
WORKDIR /opt
COPY . .
#RUN apk add --update nodejs npm
RUN apk add --update nodejs npm && npm install -g @angular/cli && npm install && ng build --prod=true && mv -f /opt/dist/openapi-audit-engine-front/* /usr/share/nginx/html && npm uninstall `ls -1 node_modules | tr '/\n' ' '` && rm -Rf /opt/* && npm -g uninstall @angular/cli && apk del nodejs npm --quiet
#RUN npm install 
#RUN ng build --prod=true
#RUN mv -f /opt/dist/openapi-audit-engine-front/* /usr/share/nginx/html
#RUN npm uninstall `ls -1 node_modules | tr '/\n' ' '`
#RUN rm -Rf /opt/*
#RUN npm -g uninstall @angular/cli
#RUN apk del nodejs npm --quiet
EXPOSE 80