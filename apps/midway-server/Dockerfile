FROM node:16.14.2-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /home
COPY . .

RUN npm install -g turbo
RUN npm run build_mode
RUN turbo prune --scope=midway-server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:16.14.2-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /home

COPY --from=builder /home/out/json/ .
COPY --from=builder /home/out/package-lock.json ./package-lock.json
COPY .gitignore .gitignore
RUN npm install

COPY turbo.json turbo.json
COPY --from=builder /home/out/full/ .
RUN npx turbo run build --filter=midway-server

FROM node:16.14.2 AS runner
WORKDIR /home

# COPY --from=installer /home .

COPY --from=installer /home/turbo.json ./turbo.json
COPY --from=installer /home/node_modules ./node_modules
COPY --from=installer /home/package.json ./package.json
COPY --from=installer /home/package-lock.json ./package-lock.json
COPY --from=installer /home/packages ./packages
COPY --from=installer /home/apps/midway-server/dist ./apps/midway-server/dist
COPY --from=installer /home/apps/midway-server/node_modules ./apps/midway-server/node_modules
COPY --from=installer /home/apps/midway-server/bootstrap.js ./apps/midway-server/bootstrap.js
COPY --from=installer /home/apps/midway-server/package.json ./apps/midway-server/package.json

ENV TZ="Asia/Shanghai"

RUN npm install pm2 -g

EXPOSE 7001

ENTRYPOINT ["npm", "run", "online"]
