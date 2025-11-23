//--------------- Thư viện ---------------
UserRepo = require ()



//--------------- Khai báo biến ---------------
let login_button = document.getElementById("login_but")// các biến cần dùng khai báo trên đây






// -------------- Các hàm --------------------

function ABC(){
    // ví dụ mình cần lấy name để hiển thị thì
    let name = UserRepo.getname // hiện tại chưa có dữ liệu thì có thể

    display(name)
}