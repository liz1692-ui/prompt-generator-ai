FROM nginx:1.27-alpine

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY index.html /usr/share/nginx/html/index.html

ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
