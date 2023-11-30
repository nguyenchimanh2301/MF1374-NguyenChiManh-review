formatDate =(dateString)=>{
    let date = new Date(dateString);
    // Lấy ngày, tháng và năm từ đối tượng Date
    let day = date.getDate(); // Ngày
    let month = date.getMonth() + 1; // Tháng (0-11, cần cộng thêm 1)
    let year = date.getFullYear(); // Năm
    // Định dạng lại theo dd/mm/yyyy
    return formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
 }

function formatMoney(number) {
        if (isNaN(number) || !isFinite(number)) {
          return '0';
        }
      
        // Sử dụng replace để thay thế dấu phân cách hàng nghìn từ dấu phẩy sang dấu chấm
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(/,/g, '.');
 }
      
