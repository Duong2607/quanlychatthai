# project2_quanlychatthai
Mô tả về project: Sử dụng esp8266 và cảm biến sóng âm HC-SR04 đo khoảng cách rác trong thùng và thông báo trạng thái đầy/chưa đầy về server thông qua giao thức mqtt,
server nhận thông báo cập nhật database và báo lên cho client cập nhật UI thông qua socketio.Server có thể kiểm tra trạng thái kết nối của thùng rác và hiện thị lên UI. 
Có 2 dạng tài khoản là admin và user cả 2 đều có thể xem đường đi ngắn nhất qua các thùng rác đầy và quản lý tài khoản cá nhân. Admin có thể quản lý tài khoản User và
quản lý thùng rác.

# Cài đặt 
Cài đặt nodejs 

Set up server: 
 npm install; npm start

Set up client: 
 npm install; npm run dev
 
# Demo:
https://drive.google.com/drive/folders/1Vb3RJOB_pDsnoe2lnUpf3ZAX30lUJtAh?usp=sharing
