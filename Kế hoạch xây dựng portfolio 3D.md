**Dưới đây là kế hoạch thống nhất theo hướng mới: sử dụng daedalOS làm giao diện hệ điều hành bên ngoài, sau đó chuyển từng ứng dụng từ portfolio hiện tại vào daedalOS; không tiếp tục sử dụng scene 3D.**

# KẾ HOẠCH XÂY DỰNG PORTFOLIO DẠNG HỆ ĐIỀU HÀNH WEB


## I. Mục tiêu dự án

**Xây dựng một portfolio cá nhân hoạt động giống hệ điều hành trên trình duyệt, trong đó:**
**Giao diện Desktop, Taskbar, Start Menu và cửa sổ ứng dụng dựa trên kiến trúc của daedalOS.**
**Các nội dung Projects, About, Skills, Contact và ứng dụng tương tác được chuyển từ portfolio hiện tại.**
**Mỗi nội dung hoạt động như một ứng dụng độc lập.**
**Người dùng có thể mở, kéo, thu nhỏ, phóng to và đóng cửa sổ.**
**Các dự án có thể mở GitHub, video, tài liệu hoặc bản demo trực tiếp.**
**Website có nhận diện riêng và không còn phụ thuộc vào giao diện 3D.**

### Kiến trúc cuối cùng:

**Hien Portfolio OS**
```text
├── Desktop
├── Taskbar
├── Start Menu
├── Window Manager
├── File System
└── Applications
├── Projects
├── Project Detail
├── About Me
├── Skills
├── Experience
├── Contact
├── CV
├── Browser
├── Terminal
├── Photos
├── Video Player
└── PDF Viewer
```


# GIAI ĐOẠN 1 — CHUẨN BỊ VÀ CLONE DỰ ÁN


## Bước 1. Chuẩn bị công cụ


### Cài đặt:

**Git.**
**Node.js.**
**Yarn.**
**Visual Studio Code.**
**Chrome hoặc Microsoft Edge.**
**Tài khoản GitHub.**
**Tài khoản Vercel.**

### Kiểm tra:

**git --version**
**node --version**
**yarn --version**

## Bước 2. Tạo thư mục làm việc

**mkdir hien-portfolio-os**
**cd hien-portfolio-os**

## Bước 3. Clone daedalOS

**git clone https://github.com/DustinBrett/daedalOS.git daedalos-source**

## Bước 4. Clone portfolio hiện tại để tham khảo


### Chỉ cần clone phần ứng dụng bên trong, không cần repo scene 3D:

**git clone https://github.com/henryjeff/portfolio-inner-site.git legacy-portfolio**

### Cấu trúc:

**hien-portfolio-os**
```text
├── daedalos-source
└── legacy-portfolio
```

### Trong đó:

**daedalos-source: dự án chính sẽ chỉnh sửa.**
**legacy-portfolio: chỉ dùng để lấy nội dung và logic ứng dụng.**


# GIAI ĐOẠN 2 — CHẠY BẢN GỐC


## Bước 5. Cài dependency cho daedalOS

**cd daedalos-source**
**yarn install**

### Chạy các bước chuẩn bị nếu repo yêu cầu:

**yarn build:prebuild**

### Khởi động:

**yarn dev**
**Mở địa chỉ local do terminal cung cấp.**

## Bước 6. Kiểm tra các chức năng chính


### Kiểm tra:

**Desktop.**
**Start Menu.**
**Taskbar.**
**File Explorer.**
**Browser.**
**Terminal.**
**Context menu.**
**Kéo cửa sổ.**
**Resize cửa sổ.**
**Minimize.**
**Maximize.**
**Close.**
**Desktop shortcut.**
**Mở ứng dụng từ Start Menu.**

## Bước 7. Chạy portfolio cũ


### Mở terminal khác:

**cd legacy-portfolio**
**npm install**
**npm start**

### Kiểm tra và ghi lại:

**Các ứng dụng cần giữ.**
**Nội dung dự án.**
**Game hoặc ứng dụng tương tác.**
**Hình ảnh và icon.**
**Component có thể tái sử dụng.**
**Component phải viết lại.**

### Điều kiện hoàn thành:

**Cả hai repo đều chạy được độc lập.**
**Chưa chỉnh sửa mã nguồn trước khi xác nhận baseline hoạt động.**


# GIAI ĐOẠN 3 — TẠO BẢN SAO VÀ REPO CÁ NHÂN


## Bước 8. Tạo nhánh backup


### Trong daedalos-source:

**git switch -c original-backup**
**git switch -c development**

## Bước 9. Đổi remote


### Giữ repo gốc dưới tên upstream:

**git remote rename origin upstream**

### Tạo repository mới trên GitHub, ví dụ:

**hien-portfolio-os**

### Thêm remote cá nhân:

**git remote add origin https://github.com/TEN_TAI_KHOAN/hien-portfolio-os.git**

### Đẩy nhánh:

**git push -u origin development**

## Bước 10. Giữ giấy phép

**Không xóa file LICENSE.**

### Tạo thêm:

**THIRD-PARTY-NOTICES.md**

### Ghi rõ:

**Dự án phát triển dựa trên daedalOS.**
**Những thành phần mã nguồn được giữ lại.**
**Những ứng dụng và nội dung đã được thay đổi.**
**Nguồn các asset sử dụng.**


# GIAI ĐOẠN 4 — NGHIÊN CỨU KIẾN TRÚC DAEDALOS


## Bước 11. Xác định các khu vực quan trọng


### Tập trung nghiên cứu:

**components**
```text
├── apps
├── system
└── ui
```

**contexts**
```text
├── process
├── session
├── fileSystem
└── menu
```

**public**
```text
├── System
└── Users
```

### Cần hiểu:

**Ứng dụng được đăng ký ở đâu.**
**Process được tạo như thế nào.**
**Cửa sổ nhận component như thế nào.**
**Shortcut trên Desktop hoạt động ra sao.**
**Start Menu lấy danh sách ứng dụng ở đâu.**
**Taskbar theo dõi process như thế nào.**
**Browser mở URL như thế nào.**
**File Explorer ánh xạ file extension ra sao.**

## Bước 12. Tìm một ứng dụng đơn giản để làm mẫu

**Không bắt đầu bằng Browser hoặc File Explorer.**

### Chọn một ứng dụng đơn giản như:

**Text editor.**
**Calculator.**
**About.**
**Image viewer nhỏ.**

### Phân tích:

**Component nằm ở đâu.**
**Ứng dụng được đăng ký trong process directory thế nào.**
**Icon được khai báo ở đâu.**
**Kích thước cửa sổ mặc định ở đâu.**
**Shortcut được tạo như thế nào.**
**Start Menu gọi ứng dụng ra sao.**

## Bước 13. Lập bảng giữ, ẩn và thay thế

**Thành phần**
**Hành động**
**Desktop**
**Giữ, đổi giao diện**
**Window Manager**
**Giữ**
**Taskbar**
**Giữ, cá nhân hóa**
**Start Menu**
**Giữ, thay danh sách**
**File System**
**Giữ**
**Browser**
**Giữ**
**Terminal**
**Giữ**
**Photos**
**Giữ**
**Video Player**
**Giữ**
**PDF Viewer**
**Giữ**
**Game không cần thiết**
**Ẩn trước**
**Emulator nặng**
**Ẩn trước**
**Ứng dụng AI nặng**
**Ẩn trước**
**Nội dung mẫu**
**Thay hoàn toàn**
**Branding daedalOS**
**Thay bằng nhận diện riêng**


# GIAI ĐOẠN 5 — CÁ NHÂN HÓA HỆ ĐIỀU HÀNH


## Bước 14. Đổi tên dự án


### Tên đề xuất:

**HienOS**
**Hien Portfolio OS**
**Hien Workspace**
**ProjectOS**

### Cập nhật:

**package.json.**
**Metadata.**
**Tiêu đề trình duyệt.**
**README.**
**Tên hiển thị trong hệ điều hành.**
**About system.**
**Favicon.**
**Open Graph.**

## Bước 15. Thay hình nền


### Chuẩn bị:

**Wallpaper desktop.**
**Wallpaper màn hình khóa nếu có.**
**Hình nền sáng và tối nếu hỗ trợ theme.**
**Đưa vào thư mục public.**

## Bước 16. Thay nhận diện giao diện


### Thay:

**Logo.**
**Avatar.**
**Tên tài khoản.**
**Icon Start.**
**Màu Taskbar.**
**Màu cửa sổ.**
**Font.**
**Màu nhấn.**
**Âm thanh khởi động nếu có.**

## Bước 17. Ẩn ứng dụng không cần thiết

**Chưa xóa source code.**

### Trước mắt chỉ:

**Xóa shortcut Desktop.**
**Xóa mục khỏi Start Menu.**
**Ẩn khỏi danh sách ứng dụng.**
**Không tự khởi động.**

### Nhóm ứng dụng có thể ẩn:

**Game không liên quan.**
**Emulator nặng.**
**Stable Diffusion.**
**Windows VM.**
**IRC.**
**Công cụ media không cần cho portfolio.**

## Bước 18. Commit mốc cá nhân hóa

**git add .**
**git commit -m "chore: personalize desktop shell and branding"**


# GIAI ĐOẠN 6 — TẠO ỨNG DỤNG THỬ NGHIỆM


## Bước 19. Tạo ứng dụng Hello Portfolio


### Tạo một ứng dụng đơn giản:

**components/apps/HelloPortfolio**

### Nội dung:

**Xin chào, đây là portfolio của Hiển.**
**Mục tiêu là kiểm tra toàn bộ quy trình tích hợp.**

## Bước 20. Đăng ký ứng dụng


### Đăng ký ứng dụng trong process directory của daedalOS:

**Tên process.**
**Component.**
**Icon.**
**Tiêu đề cửa sổ.**
**Kích thước mặc định.**
**Kích thước tối thiểu.**
**Khả năng resize.**

## Bước 21. Tạo icon


### Đưa icon vào:

**public/System/Icons**

### Nên sử dụng:

**SVG.**
**PNG.**
**WebP.**

## Bước 22. Tạo shortcut Desktop

**Tạo shortcut trong thư mục Desktop của hệ thống.**

### Kiểm tra:

**Double-click mở ứng dụng.**
**App xuất hiện trên taskbar.**
**Có thể minimize.**
**Có thể maximize.**
**Có thể close.**
**Mở lại được.**
**Không tạo process trùng không mong muốn.**

## Bước 23. Thêm vào Start Menu


### Đưa ứng dụng vào nhóm:

**Portfolio**
**Sau khi app thử nghiệm hoạt động ổn định, dùng nó làm mẫu cho các app tiếp theo.**


# GIAI ĐOẠN 7 — TẠO HỆ THỐNG DỮ LIỆU PORTFOLIO


## Bước 24. Tạo thư mục dữ liệu

**data**
```text
├── profile.ts
├── projects.ts
├── skills.ts
├── experience.ts
└── contacts.ts
```

## Bước 25. Tạo dữ liệu cá nhân


### profile.ts gồm:

**Họ tên.**
**Chức danh.**
**Giới thiệu ngắn.**
**Giới thiệu đầy đủ.**
**Ảnh đại diện.**
**Email.**
**GitHub.**
**LinkedIn nếu có.**
**Link CV.**

## Bước 26. Tạo dữ liệu dự án

**export interface PortfolioProject {**
**id: string;**
**title: string;**
**category: string;**
**shortDescription: string;**
**fullDescription: string;**
**technologies: string[];**
**thumbnail: string;**
**screenshots: string[];**
**githubUrl?: string;**
**demoUrl?: string;**
**videoUrl?: string;**
**documentUrl?: string;**
**status: "completed" | "developing" | "prototype";**
**demoMode: "browser" | "iframe" | "video" | "external" | "none";**
**}**

## Bước 27. Chuẩn bị dữ liệu dự án ban đầu


### Đưa vào các dự án thật của bạn, ví dụ:

**Hệ thống tìm kiếm ảnh bằng khuôn mặt.**
**Nền tảng quản lý sự kiện.**
**Công cụ AI hỗ trợ giảng viên.**
**Dự án Java Web.**
**Portfolio cá nhân.**
**Công cụ hỗ trợ giảng dạy.**
**Hệ thống lưu trữ và tìm kiếm ảnh sự kiện.**


# GIAI ĐOẠN 8 — XÂY DỰNG CÁC ỨNG DỤNG PORTFOLIO


## Bước 28. Tạo ứng dụng About Me


### Chức năng:

**Giới thiệu cá nhân.**
**Vai trò hiện tại.**
**Mục tiêu nghề nghiệp.**
**Kinh nghiệm.**
**Hình ảnh.**
**Link CV.**
**Link Contact.**

### Tên app:

**About Me**

## Bước 29. Tạo ứng dụng Skills


### Chia theo nhóm:

**Frontend.**
**Backend.**
**Database.**
**AI.**
**Automation.**
**Teaching tools.**
**Design tools.**
**Deployment.**

### Không chỉ hiển thị thanh phần trăm. Nên mô tả:

**Đã dùng công nghệ trong dự án nào.**
**Khả năng thực hiện.**

## Mức độ kinh nghiệm thực tế.


## Bước 30. Tạo ứng dụng Projects


### Bố cục:

**Thanh bên trái**
```text
├── All Projects
├── AI
├── Web
├── Education
├── Java
└── Automation
```

**Khu vực chính**
```text
└── Danh sách Project Card
```

### Mỗi card có:

**Thumbnail.**
**Tên.**
**Mô tả.**
**Công nghệ.**
**Trạng thái.**
**Nút xem chi tiết.**

## Bước 31. Tạo Project Detail


### Project Detail có thể:

**Mở trong cửa sổ mới.**
**Hoặc thay đổi nội dung trong app Projects.**

### Nội dung:

**Tổng quan.**
**Vấn đề.**
**Giải pháp.**
**Tính năng.**
**Công nghệ.**
**Vai trò.**
**Ảnh.**
**Video.**
**GitHub.**
**Live Demo.**
**Hướng phát triển.**

## Bước 32. Tạo ứng dụng Experience


### Hiển thị:

**Kinh nghiệm giảng dạy.**
**Hoạt động tổ chức sự kiện.**
**Dự án công nghệ.**
**Workshop và đào tạo.**
**Các mốc thời gian quan trọng.**

## Bước 33. Tạo ứng dụng Contact


### Nội dung:

**Email.**
**GitHub.**
**LinkedIn nếu có.**
**QR code.**
**Form liên hệ nếu cần.**
**Nút sao chép email.**

## Bước 34. Tạo ứng dụng CV


### Hai lựa chọn:

**Mở file PDF bằng PDF Viewer có sẵn.**
**Tạo app CV riêng rồi có nút tải PDF.**

### Phương án ưu tiên:

**Desktop shortcut CV.pdf**
**→ mở bằng PDF Viewer**
**Cách này tận dụng hệ thống file của daedalOS.**


# GIAI ĐOẠN 9 — CHUYỂN ỨNG DỤNG TỪ PORTFOLIO CŨ


## Bước 35. Không sao chép Desktop cũ


### Không chuyển:

**Desktop.**
**Taskbar.**
**Start Menu.**
**Window Manager.**
**Logic minimize.**
**Logic maximize.**
**Router của hệ điều hành cũ.**
**Các phần này đã được daedalOS quản lý.**

## Bước 36. Chuyển nội dung và logic ứng dụng


### Có thể giữ:

**Component nội dung.**
**Dữ liệu dự án.**
**Game logic.**
**Hình ảnh.**
**Animation bên trong app.**
**Utility thuần JavaScript hoặc TypeScript.**

## Bước 37. Chuyển từng app riêng


### Thứ tự:

**About.**
**Projects.**
**Project Showcase.**
**Skills.**
**Contact.**
**Game hoặc ứng dụng tương tác.**
**DOS app nếu thực sự cần.**
**Không chuyển nhiều app cùng lúc.**

## Bước 38. Xử lý khác biệt React


### Repo cũ dùng phiên bản React cũ hơn, vì vậy cần kiểm tra:

**Lifecycle cũ.**
**Deprecated API.**
**CSS import.**
**Router.**
**Context.**
**Event handler.**
**Dependency không hỗ trợ React mới.**
**Client-only component.**
**Truy cập window và document.**
**Không copy trực tiếp package.json từ repo cũ.**


# GIAI ĐOẠN 10 — TÍCH HỢP LIVE DEMO


## Bước 39. Dùng Browser của daedalOS


### Khi người dùng chọn Open Live Demo:

**Projects**
**→ Chọn dự án**
**→ Open Live Demo**
**→ Browser mở URL**
**Đây là phương án ưu tiên.**

## Bước 40. Tạo cơ chế mở URL


### Mỗi dự án có:

**demoMode: "browser"**
**demoUrl: "https://..."**

### Khi click:

**Tạo process Browser.**
**Truyền URL.**
**Focus Browser nếu đã mở.**
**Có thể mở nhiều cửa sổ nếu cần.**

## Bước 41. Xử lý website không cho iframe


### Nếu website chặn iframe:

**Mở tab trình duyệt mới.**
**Hiển thị nút Open externally.**
**Không cố phá chính sách iframe.**

## Bước 42. Mở video demo


### Nếu dự án không có website:

**Projects**
**→ Watch Demo**
**→ Video Player mở video**

## Bước 43. Mở ảnh dự án

**Projects**
**→ View Screenshots**
**→ Photos mở album ảnh**

## Bước 44. Mở tài liệu dự án

**Projects**
**→ View Case Study**
**→ PDF Viewer mở file PDF**


# GIAI ĐOẠN 11 — DESKTOP VÀ START MENU


## Bước 45. Thiết kế Desktop


### Desktop phiên bản đầu:

**About Me**
**Projects**
**Skills**
**Experience**
**Contact**
**CV.pdf**
**GitHub**
**Browser**
**Terminal**
**Recycle Bin**
**Không đặt quá nhiều icon.**

## Bước 46. Thiết kế Start Menu


### Nhóm Portfolio:

**Portfolio**
```text
├── About Me
├── Projects
├── Skills
├── Experience
├── Contact
└── CV
```

### Nhóm System:

**System**
```text
├── Browser
├── Terminal
├── File Explorer
├── Photos
├── Video Player
└── Settings
```

## Bước 47. Thiết kế Taskbar


### Ứng dụng ghim sẵn:

**Projects.**
**Browser.**
**Terminal.**
**File Explorer.**

### Giữ:

**Start.**
**Clock.**
**System tray nếu cần.**
**Danh sách ứng dụng đang mở.**


# GIAI ĐOẠN 12 — FILE SYSTEM


## Bước 48. Tổ chức thư mục portfolio


### Cấu trúc giả lập:


### C:

```text
├── Users
│   └── Hien
│   ├── Desktop
│   ├── Documents
│   ├── Projects
│   ├── Pictures
│   └── Videos
```

## Bước 49. Tạo thư mục Projects

**Projects**
```text
├── Face Search
│   ├── README.md
│   ├── Screenshots
│   └── Demo.url
├── Event Platform
├── Java Web
└── AI Teaching Tools
```

### Người dùng có thể khám phá dự án qua cả:

**App Projects.**
**File Explorer.**

## Bước 50. Tạo file giới thiệu


### Có thể tạo:

**README.md**
**About Me.txt**
**Skills.md**
**CV.pdf**
**GitHub.url**
**Contact.url**
**Những file này mở bằng ứng dụng tương ứng.**


# GIAI ĐOẠN 13 — RESPONSIVE VÀ MOBILE


## Bước 51. Xác định giới hạn mobile


### Giao diện hệ điều hành desktop trên điện thoại có thể khó sử dụng vì:

**Cửa sổ nhỏ.**
**Drag khó.**
**Context menu khó thao tác.**
**Taskbar chật.**
**Nhiều ứng dụng mở cùng lúc.**

## Bước 52. Tạo chế độ mobile


### Trên màn hình nhỏ:

**App mở gần toàn màn hình.**
**Giảm số icon Desktop.**
**Taskbar đơn giản hơn.**
**Start Menu chiếm toàn màn hình.**
**Tăng kích thước vùng bấm.**
**Hạn chế mở nhiều cửa sổ.**
**Tắt resize phức tạp.**

## Bước 53. Tạo portfolio fallback


### Có thể cung cấp nút:

**Open Simple Portfolio**

### Phiên bản này hiển thị:

**About.**
**Projects.**
**Skills.**
**Contact.**
**Không yêu cầu thao tác giống desktop.**


# GIAI ĐOẠN 14 — TỐI ƯU HIỆU SUẤT


## Bước 54. Đo tốc độ khởi động


### Kiểm tra:

**Thời gian tải lần đầu.**
**JavaScript bundle.**
**WebAssembly.**
**Ứng dụng bị preload.**
**Model hoặc emulator không sử dụng.**
**Video và ảnh quá lớn.**

## Bước 55. Lazy-load ứng dụng


### Chỉ tải ứng dụng khi người dùng mở:

**Projects.**
**Video Player.**
**PDF Viewer.**
**Game.**
**Emulator.**
**Không tải toàn bộ ngay khi mở Desktop.**

## Bước 56. Tối ưu asset

**Chuyển ảnh sang WebP.**
**Giảm kích thước wallpaper.**
**Không preload video.**
**Dùng thumbnail.**
**Loại bỏ asset không còn sử dụng.**

## Bước 57. Không xóa module phức tạp quá sớm


### Thứ tự:

**Ẩn khỏi UI.**

### Kiểm tra build.

**Xác định dependency.**
**Xóa import.**
**Xóa process registration.**
**Xóa component.**
**Xóa dependency.**
**Chạy lại build.**


# GIAI ĐOẠN 15 — BẢO MẬT


## Bước 58. Kiểm tra iframe


### Nếu dùng iframe:

**sandbox="allow-scripts allow-forms allow-same-origin allow-popups"**
**Chỉ cấp quyền cần thiết.**

## Bước 59. Kiểm tra URL bên ngoài

**Không mở URL lấy trực tiếp từ dữ liệu người dùng chưa kiểm tra.**

### Chỉ sử dụng:

**URL đã khai báo trong dữ liệu dự án.**
**HTTPS.**
**Domain đáng tin cậy.**

## Bước 60. Không lưu bí mật trong frontend


### Không đưa lên GitHub:

**API key bí mật.**
**Database credentials.**
**Admin password.**
**Private token.**
**Service account.**


# GIAI ĐOẠN 16 — KIỂM THỬ


## Bước 61. Kiểm thử Desktop

**Icon hiển thị đúng.**
**Double-click mở app.**
**Right-click hoạt động.**
**Wallpaper đúng.**
**Desktop không bị tràn.**

## Bước 62. Kiểm thử cửa sổ

**Drag.**
**Resize.**
**Minimize.**
**Maximize.**
**Restore.**
**Close.**
**Focus.**
**Z-index.**
**Taskbar state.**

## Bước 63. Kiểm thử ứng dụng

**Projects đọc đúng dữ liệu.**
**Project Detail hoạt động.**
**About hiển thị chính xác.**
**Skills đầy đủ.**
**Contact đúng.**
**CV mở được.**
**Browser mở đúng URL.**
**Video Player mở video.**
**Photos mở ảnh.**
**PDF Viewer mở tài liệu.**

## Bước 64. Kiểm thử nội dung

**Không còn tên Dustin hoặc Henry trong nội dung hiển thị.**
**Không còn link cá nhân tác giả cũ.**
**Không còn dữ liệu mẫu.**
**Không có link hỏng.**
**Không sai chính tả.**
**Dự án có trạng thái chính xác.**

## Bước 65. Kiểm thử thiết bị

**Chrome.**
**Edge.**
**Firefox nếu có thể.**
**Laptop cấu hình trung bình.**
**Màn hình Full HD.**
**Màn hình nhỏ.**
**Android.**
**Mạng chậm.**


# GIAI ĐOẠN 17 — DEPLOY


## Bước 66. Build production

**yarn build**
**Xử lý toàn bộ lỗi TypeScript và build trước khi deploy.**

## Bước 67. Chạy production local

**yarn start**

### Kiểm tra:

**Route.**
**Asset.**
**File system.**
**Shortcut.**
**Browser.**
**App process.**
**Refresh trang.**

## Bước 68. Deploy Vercel

**Kết nối repository GitHub với Vercel.**
**Cấu hình theo kiến trúc Next.js của dự án.**

## Bước 69. Kiểm tra production

**Không còn URL localhost.**
**Asset tải đúng.**
**Shortcut hoạt động.**
**Refresh không lỗi.**
**Browser mở được demo.**
**File system hoạt động.**
**Mobile hoạt động.**
**Console không có lỗi nghiêm trọng.**

## Bước 70. Gắn domain


### Sau khi bản production ổn định:

**Cấu hình domain.**
**Cập nhật metadata.**
**Cập nhật Open Graph.**
**Cập nhật link portfolio trong GitHub và CV.**


# GIAI ĐOẠN 18 — HOÀN THIỆN TÀI LIỆU


## Bước 71. Viết README


### README cần có:

**Giới thiệu dự án.**
**Link demo.**
**Ảnh giao diện.**
**Tính năng.**
**Công nghệ.**
**Cách cài đặt.**
**Cách chạy.**
**Cách thêm ứng dụng.**
**Cách thêm dự án.**
**Kiến trúc.**
**License.**
**Ghi nhận daedalOS.**
**Phần bạn đã tự phát triển.**

## Bước 72. Nêu rõ phần bạn đã xây dựng


### Ví dụ:

**Cá nhân hóa toàn bộ desktop.**
**Thiết kế lại Start Menu.**
**Xây dựng ứng dụng Projects.**
**Xây dựng hệ thống dữ liệu portfolio.**
**Tạo Project Detail.**
**Tích hợp live demo vào Browser.**
**Tích hợp ảnh, video và PDF.**
**Chuyển ứng dụng từ portfolio cũ.**
**Tối ưu mobile.**
**Loại bỏ các module không cần thiết.**


# THỨ TỰ ƯU TIÊN


## Mức 1 — Bắt buộc

**Clone và chạy daedalOS.**
**Tạo repo cá nhân.**
**Đổi branding.**
**Tạo app thử nghiệm.**
**Tạo Projects.**
**Tạo About.**
**Tạo Skills.**
**Tạo Contact.**
**Tạo Project Detail.**
**Tích hợp Browser mở demo.**
**Deploy bản đầu.**

## Mức 2 — Hoàn thiện trải nghiệm

**Experience.**
**CV.**
**File system dự án.**
**Photos.**
**Video Player.**
**PDF Viewer.**
**Mobile mode.**
**Theme.**
**Settings.**

## Mức 3 — Nâng cao

**Terminal tùy biến.**
**Game hoặc ứng dụng tương tác.**
**Easter egg.**
**Lưu phiên làm việc.**
**Nhiều wallpaper.**
**Dark/light mode.**
**Tìm kiếm ứng dụng và dự án.**


# LỘ TRÌNH 20 BUỔI


## Tuần 1 — Nghiên cứu nền tảng


### Buổi 1

**Cài môi trường.**
**Clone hai repo.**
**Cài dependency.**

### Buổi 2

**Chạy daedalOS.**

### Kiểm tra Desktop và ứng dụng.


### Buổi 3

**Nghiên cứu process directory.**
**Nghiên cứu Window Manager.**

### Buổi 4

**Nghiên cứu Desktop shortcut.**
**Nghiên cứu Start Menu và Taskbar.**

### Buổi 5

**Tạo backup.**
**Tạo repo GitHub cá nhân.**

## Tuần 2 — Cá nhân hóa và app đầu tiên


### Buổi 6

**Đổi tên.**
**Đổi metadata.**
**Đổi wallpaper và avatar.**

### Buổi 7

**Ẩn ứng dụng không cần.**
**Sắp xếp Desktop.**

### Buổi 8

**Tạo app Hello Portfolio.**
**Đăng ký process.**

### Buổi 9

**Tạo shortcut.**
**Thêm vào Start Menu.**

### Buổi 10

**Tạo cấu trúc dữ liệu portfolio.**

## Tuần 3 — Ứng dụng portfolio


### Buổi 11

**Tạo About Me.**

### Buổi 12

**Tạo Skills và Experience.**

### Buổi 13

**Tạo Projects.**

### Buổi 14

**Tạo Project Detail.**

### Buổi 15

**Tạo Contact và CV.**

## Tuần 4 — Tích hợp và triển khai


### Buổi 16

**Tích hợp Browser mở demo.**

### Buổi 17

**Tích hợp Photos, Video và PDF.**

### Buổi 18

**Tối ưu mobile và hiệu suất.**

### Buổi 19

**Kiểm thử.**

### Kiểm tra nội dung và giấy phép.


### Buổi 20

**Build.**
**Deploy.**
**Viết README.**

### Kiểm tra production.



# CÁC MỐC NGHIỆM THU


## Mốc 1 — daedalOS chạy được

**Desktop hoạt động.**
**Cửa sổ hoạt động.**
**Browser và Terminal hoạt động.**

## Mốc 2 — Hệ điều hành được cá nhân hóa

**Có tên riêng.**
**Có wallpaper riêng.**
**Có icon và avatar riêng.**
**Ẩn các app không cần.**

## Mốc 3 — Ứng dụng portfolio hoạt động

**About.**
**Projects.**
**Skills.**
**Experience.**
**Contact.**
**CV.**

## Mốc 4 — Dự án tương tác được

**Mở live demo bằng Browser.**
**Mở ảnh bằng Photos.**
**Mở video bằng Video Player.**
**Mở tài liệu bằng PDF Viewer.**

## Mốc 5 — Production hoàn chỉnh

**Build thành công.**
**Deploy thành công.**
**Mobile sử dụng được.**
**Không còn nội dung tác giả cũ.**
**README và license đầy đủ.**


# NGUYÊN TẮC QUAN TRỌNG

**Dùng daedalOS làm nền tảng chính.**
**Không sử dụng repo scene 3D.**
**Không nhúng toàn bộ portfolio cũ vào một iframe.**
**Chuyển từng ứng dụng thành process native của daedalOS.**
**Tạo một ứng dụng đơn giản trước khi xây Projects.**
**Chỉ ẩn ứng dụng không cần ở giai đoạn đầu, chưa xóa code ngay.**
**Không sao chép package.json từ portfolio cũ.**
**Mỗi tính năng lớn phải có commit riêng.**
**Luôn giữ nhánh backup.**
**Hoàn thiện chức năng trước khi thay đổi sâu về giao diện.**
**Tận dụng Browser, Terminal, Photos, Video và PDF Viewer có sẵn.**
**Giữ giấy phép và ghi nhận mã nguồn gốc đúng quy định.**

### Thứ tự triển khai quan trọng nhất là:

**Chạy được daedalOS**
**→ Hiểu hệ thống process**
**→ Tạo một ứng dụng thử**
**→ Cá nhân hóa Desktop**
**→ Xây Projects và Project Detail**
**→ Chuyển About, Skills, Contact**
**→ Tích hợp Browser, Photos, Video và PDF**
**→ Tối ưu**
**→ Deploy**
