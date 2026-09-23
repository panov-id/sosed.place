# Headless Chromium for rendering slides. The browser is the only reason this
# needs a container; nothing is installed on the host.
FROM mcr.microsoft.com/playwright:v1.52.0-noble

# render.mjs lives in the bind-mounted repo and loads playwright from here
# through createRequire, so the package stays inside the image.
WORKDIR /opt/render
RUN npm init -y >/dev/null && npm install --silent playwright@1.52.0
