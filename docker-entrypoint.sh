#!/bin/sh
# Check if API_URL is provided and not empty
if [ -n "$API_URL" ]; then
    # Replace the default apiUrl in all .html and .js files within /usr/share/nginx/html/
    find /usr/share/nginx/html/ -type f \( -name "*.html" -o -name "*.js" \) -exec sed -i "s|http://prestadores.recetalia.com:8080|${API_URL}|g" {} +
fi

# Start Nginx
exec "$@"
