# Phân tích Kiến trúc daedalOS & Bảng phân loại Keep/Hide/Replace

Tài liệu này ghi nhận kết quả nghiên cứu cấu trúc daedalOS (Giai đoạn 4) và lập kế hoạch cấu hình/phát triển ứng dụng cho Portfolio OS.

---

## 1. Cấu trúc Thư mục Quan trọng của daedalOS

Qua khảo sát mã nguồn trong thư mục `daedalos-source`, dưới đây là các thư mục và tệp tin quan trọng nhất mà chúng ta sẽ làm việc cùng:

- **`contexts/process/directory.ts`**: Tệp tin đăng ký (process registry) toàn bộ ứng dụng của hệ thống. Mỗi ứng dụng được định nghĩa bằng một React Component tải động (dynamic import), tiêu đề, kích thước mặc định, icon, và danh sách thư viện phụ thuộc (`libs` và `dependantLibs`).
- **`components/apps/`**: Chứa mã nguồn React của các ứng dụng riêng lẻ (ví dụ: `Browser`, `FileExplorer`, `MonacoEditor`). Đây là nơi chúng ta sẽ đặt mã nguồn của các ứng dụng Portfolio mới.
- **`public/Users/Public/Desktop/`**: Chứa các file phím tắt (`.url`) xuất hiện trên màn hình Desktop.
- **`public/Users/Public/Start Menu/`**: Chứa các file phím tắt (`.url`) xuất hiện trong Start Menu.
- **`components/system/Files/FileEntry/extensions.ts`**: Định nghĩa liên kết giữa định dạng file (extension) và ứng dụng mặc định để mở file đó (ví dụ: `.md` mở bằng `Marked`, `.pdf` mở bằng `PDF`).

---

## 2. Quy trình Đăng ký Ứng dụng mới

Để tạo và tích hợp một ứng dụng mới (ví dụ: `AboutMe`):

1.  **Viết component:** Tạo thư mục `components/apps/AboutMe` và viết code React chính trong tệp `index.tsx`.
2.  **Đăng ký process:** Thêm cấu hình trong `contexts/process/directory.ts`:
    ```typescript
    AboutMe: {
      Component: dynamic(() => import("components/apps/AboutMe")),
      backgroundColor: "#1E1E1E",
      defaultSize: {
        height: 500,
        width: 600,
      },
      icon: "/System/Icons/about-me.webp",
      title: "About Me",
    }
    ```
3.  **Tạo shortcut:** Tạo file `public/Users/Public/Desktop/About Me.url`:
    ```ini
    [InternetShortcut]
    BaseURL=AboutMe
    Comment=Thông tin giới thiệu bản thân
    IconFile=/System/Icons/about-me.webp
    ```
4.  **Tạo tệp index mới (nếu cần):** Chạy `yarn build:prebuild` để cập nhật cấu trúc file tree ảo của hệ thống (trong file `fs.9p.json`).

---

## 3. Bảng phân loại Keep / Hide / Replace các ứng dụng

Để hệ điều hành gọn gàng và tập trung vào mục đích Portfolio, chúng ta sẽ ẩn các ứng dụng cồng kềnh/không cần thiết và chỉ giữ lại những ứng dụng hỗ trợ trải nghiệm portfolio.

### 3.1. Các ứng dụng Giữ lại (Keep)

Các ứng dụng này sẽ được hiển thị trên Start Menu/Desktop hoặc được dùng làm trình xem file tương ứng:

| Tên Ứng dụng     | Mục đích trong Portfolio                                                                  | Trạng thái         |
| :--------------- | :---------------------------------------------------------------------------------------- | :----------------- |
| **FileExplorer** | Khám phá các tệp tin trong hệ thống file ảo (giới thiệu dự án, chứng chỉ).                | Giữ lại (Mặc định) |
| **Browser**      | Mở các trang web bên ngoài (ví dụ: các dự án web đã chạy live) trực tiếp trong cửa sổ OS. | Giữ lại            |
| **MonacoEditor** | Cho phép người xem mở và xem mã nguồn mẫu của các dự án ngay trong OS.                    | Giữ lại            |
| **Marked**       | Đọc các tài liệu Markdown giới thiệu dự án hoặc viết blog ngắn.                           | Giữ lại            |
| **PDF**          | Xem CV (Curriculum Vitae) dạng PDF trực tiếp mà không cần tải về.                         | Giữ lại            |
| **Photos**       | Xem ảnh chụp màn hình dự án hoặc chứng chỉ.                                               | Giữ lại            |
| **VideoPlayer**  | Xem các video demo sản phẩm/dự án.                                                        | Giữ lại            |
| **Terminal**     | Tăng tính trải nghiệm Geek, cho phép người dùng chạy một số lệnh CLI giả lập thú vị.      | Giữ lại            |
| **Webamp**       | Máy phát nhạc Winamp ở góc màn hình, tạo nhạc nền thư giãn khi xem portfolio.             | Giữ lại            |
| **Paint**        | Ứng dụng vẽ vui nhộn giúp tăng tính tương tác của trang web.                              | Giữ lại            |

### 3.2. Các ứng dụng Ẩn đi (Hide)

Chúng ta không xóa code gốc (để tránh lỗi import hoặc lỗi dependencies), chỉ xóa file phím tắt `.url` ở Desktop/Start Menu để người dùng không nhìn thấy:

| Tên Ứng dụng                        | Lý do ẩn                                                               |
| :---------------------------------- | :--------------------------------------------------------------------- |
| **BoxedWine**                       | Nặng, không cần thiết cho portfolio.                                   |
| **ClassiCube**                      | Game Minecraft, không cần thiết.                                       |
| **DX-Ball**                         | Game phá gạch, không cần thiết.                                        |
| **Emulator** / **JSDOS**            | Giả lập game console/DOS, làm nặng tài nguyên trang web.               |
| **IRC** / **Messenger**             | Các ứng dụng chat công cộng, không phù hợp mục đích portfolio cá nhân. |
| **Quake3** / **Ruffle** / **Tic80** | Các trình giả lập game/Flash, không cần thiết.                         |
| **StableDiffusion**                 | Công cụ AI sinh ảnh, đòi hỏi API hoặc tài nguyên không cần thiết.      |
| **V86**                             | Trình giả lập hệ điều hành x86, cực kỳ nặng.                           |
| **Vim** / **TinyMCE**               | Có thể dùng Monaco Editor và Marked thay thế tiện lợi hơn.             |

### 3.3. Các ứng dụng Thêm mới / Thay thế (NEW / Replace)

Đây là các ứng dụng core của portfolio mà chúng ta sẽ tự phát triển trong các giai đoạn sau:

| Tên Ứng dụng   | Tính năng                                                                                | Vị trí đặt Code              |
| :------------- | :--------------------------------------------------------------------------------------- | :--------------------------- |
| **AboutMe**    | Giới thiệu bản thân, kỹ năng cốt lõi, nút tải CV, thông tin liên hệ nhanh.               | `components/apps/AboutMe`    |
| **Skills**     | Hiển thị biểu đồ/giao diện tương tác về các ngôn ngữ, framework đã làm việc.             | `components/apps/Skills`     |
| **Projects**   | Showcase danh sách dự án kèm ảnh, mô tả công nghệ, liên kết mã nguồn và nút chạy demo.   | `components/apps/Projects`   |
| **Experience** | Dòng thời gian (Timeline) về quá trình học tập và làm việc.                              | `components/apps/Experience` |
| **Contact**    | Form liên hệ gửi email trực tiếp hoặc liên kết mạng xã hội (Github, LinkedIn, Facebook). | `components/apps/Contact`    |
