# Build image dựa trên image của node
FROM node:18-alpine

# Tạo một directory bên trong image để chứa code của ứng dụng
WORKDIR /app

# Copy toàn bộ code của ứng dụng vào bên trong working directory COPY source(nơi docker file đang đứng) dest(thư mục workdir - folder app)
COPY . .
# Cho phép quyền thực thi file
RUN chmod +x wait-for

# Thực thi một câu lệnh bên trong directory
RUN npm install

# Khai báo port image sử dụng
EXPOSE 4000

CMD ["node", "src/index.js"]