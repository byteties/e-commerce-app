# ใช้ Node.js official image เป็น base image
FROM node:18-alpine

# กำหนด working directory ภายใน container
WORKDIR /app

# คัดลอก package.json และ package-lock.json (หรือ yarn.lock)
# เพื่อใช้ในการติดตั้ง dependencies
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code ทั้งหมดไปยัง working directory
COPY . .

# Build NestJS application
RUN npm run build

# Expose port ที่ NestJS service ของคุณ listen อยู่ (โดยทั่วไปคือ 3000)
EXPOSE 3000

# คำสั่งที่ใช้ในการรัน NestJS application
CMD ["node", "dist/main"]