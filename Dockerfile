#Get NPM packages 
FROM node:18-alpine AS dependencies

RUN apk add --no-cache libc6-compat 

WORKDIR /app

COPY .npmrc .npmrc
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

#Rebuild the source code only when needed 
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build


#Production image, copy all the files and run next 
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]