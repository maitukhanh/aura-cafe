# 🚀 Hướng dẫn Publish Aura Cafe lên Internet

Dự án Aura Cafe đã được cấu hình để sẵn sàng đưa lên **Vercel** và sử dụng **Neon.tech** (PostgreSQL) làm cơ sở dữ liệu.

## 1. Chuẩn bị Cơ sở dữ liệu (Neon.tech)
Vercel không thể lưu file SQLite, nên ta cần một Database online:
1. Truy cập [Neon.tech](https://neon.tech/) và đăng ký tài khoản.
2. Tạo Project mới tên là `aura-cafe`.
3. Copy đoạn mã **Connection String** (Dạng `postgresql://...`).
4. Mở file `.env` trong project, thay thế giá trị của `DATABASE_URL` bằng đoạn mã bạn vừa copy.

## 2. Đưa lên GitHub (Khuyên dùng)
Cách tốt nhất để deploy lên Vercel là thông qua GitHub:
1. Nếu chưa có Git, hãy tải **[GitHub Desktop](https://desktop.github.com/)** (Dễ dùng, không cần quyền Admin để cài đặt).
2. Tạo một Repository mới trên GitHub.
3. Đẩy toàn bộ thư mục `WEB_CAFE` lên (Trừ thư mục `node_modules` và `.next`).

## 3. Deploy lên Vercel
1. Truy cập [Vercel.com](https://vercel.com/) và kết nối với tài khoản GitHub của bạn.
2. Chọn project `aura-cafe` để Import.
3. Trong phần **Environment Variables**, thêm:
   * Key: `DATABASE_URL`
   * Value: (Mã kết nối từ Neon.tech)
4. Nhấn **Deploy**.

## 4. Chạy lại Database trên Web
Sau khi Deploy thành công, bạn cần tạo các bảng dữ liệu trên Neon:
Chạy lệnh này trong terminal máy bạn (Sau khi đã đổi `DATABASE_URL` trong `.env`):
```cmd
set PATH=%cd%\tools\node;%PATH%
npx prisma db push
node prisma/seed.js
```

---
*Chúc mừng! Aura Cafe của bạn hiện đã có mặt trên toàn thế giới!*
