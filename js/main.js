//check các input
$(document).ready(function () {
  
  //input nhập ít hơn 3 kí tự sẽ báo đỏ còn ngược lại thì màu xanh
  //Created by : NCManh
  let input = document.querySelectorAll('input[type=text]');
  for (let index = 0; index < input.length; index++) {
    input[index].addEventListener('input', () => {
      if (input[index].value.length < 3) {
        console.log(input[index]);
        input[index].classList.add('input--required');
        input[index].classList.remove('input--valid');
      } else {
        input[index].classList.remove('input--required');
        input[index].classList.add('input--valid');
      }
    })
    console.log(input[index].maxLength);
  }
  //




  /*Hàm trả về dữ liệu từ API
  //Created by : NCManh
  */
   async function getData() {
      try {
        let loader = document.querySelector('.load--background');
        // loader.style.display = 'grid';
        let res = await fetch('https://cukcuk.manhnv.net/api/v1/Customers');
        let response = await res.json();
        let tbl = document.querySelector("tbody");
        // console.log(tbl);
        response.forEach((item) => {
          
          let string = `<tr>
<td><input id="check" type="checkbox" /></td>
<td>`+ item.CustomerCode + `</td>
<td>`+ item.FullName + `</td>
<td>`+ item.Gender + `</td>
<td>`+ formatDate(item.DateOfBirth)+ `</td>
<td>`+ item.CompanyName + `</td>
<td style="text-align: right;">`+ formatMoney(item.DebitAmount)  + `</td>
</tr>`;
          tbl.innerHTML += string;
          // let loader = document.querySelector('.load--background');
          loader.style.display = 'none';
        })
      }
      catch (error) {
        console.log(error);
      }
    }
getData();
//
    /*Hàm thêm dữ liệu
     Created by NCManh
    */
   
    addData = () => {
       let errorMessage = [];
       var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       let customerName = $('#name').val();
       let customerCode = $('#empcode').val();
       let phoneNumber = $('#phoneNumber').val();
       let email = $('#email').val();
       let dateOfBirth = $('#selectedDate').val();
       let gender = $('#gender').val();
       let identityCard = $('#idCard').val();
       let DebitAmount = $('#DebitAmount').val();
       let companyName = $('#company').val();
       let address = $('#address').val();
       //Validate dữ liệu
       if(customerCode.length<3){
        errorMessage.push("Mã khách hàng quá ngắn");
       }
       if(customerName.length<3){
        errorMessage.push("Họ tên khách hàng quá ngắn");
       }
       if (!/^\d{10,11}$/.test(phoneNumber)) {
        errorMessage.push("Số điện thoại phải từ 10-11 số");
      }
      if (!email.match(emailFormat)) {
        errorMessage.push("Email chưa đúng định dạng");
      }
      let currentDate = new Date();
      if(new Date(dateOfBirth)>currentDate){
        errorMessage.push("Ngày được chọn không được lớn hơn ngày hiện tại")
      }
      let obj = {
          "customerCode": customerCode,
          "fullName": customerName,
          "gender": 0,
          "address": address,
          "dateOfBirth":dateOfBirth,
          "email": email,
          "phoneNumber": phoneNumber,
          "customerGroupId": "4cf2dd43-5f4b-71b6-e212-ebbbcf065d1c",
          "debitAmount": DebitAmount,
          "memberCardCode": "string",
          "companyName": companyName,
        }
        // "customerCode": ,
        // "fullName": ,
        // "gender": 0,
        // "address": "string",
        // "dateOfBirth": ,
        // "email": email,
        // "phoneNumber": ,
        // "CustomerGroupId": ,
        // "debitAmount": DebitAmount,
        // "memberCardCode": "string",
        // "companyName": companyName,
     
     console.log(errorMessage);
      if(errorMessage.length===0){
      try {
      fetch('https://cukcuk.manhnv.net/api/v1/Customers', {
        method: 'POST',
        headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json'
       },
      body: obj
      }).then(res => {
      console.log(obj);
      let toast = document.querySelector('.toast--container');
      let textMessage = ` <div class="form--toast">
      <div class="toast__icon icon--success"></div>
      <div class="toast--content">Thành công</div>
      <div class="toast--btn"></div>
       </div>`;
      toast.innerHTML += textMessage;
     }) 
     } catch (error) {
     console.log(error);
     }
      }
      else{
      console.log(obj);
      let toast = document.querySelector('.toast--container');
       errorMessage.forEach((mess)=>{
       let textMessage = ` <div class="form--toast">
       <div class="toast__icon icon--warning"></div>
       <div class="toast--content">`+   
       mess; 
       +`</div>
       <div class="toast--btn"></div>
        </div>`;

       toast.innerHTML += textMessage;

       })
       toast.style.display = 'block';
       let dialog = document.querySelector('.dialog--background');
       dialog.style.display = 'none';
       setTimeout(() => {
        toast.style.display = 'none';
       
     }, 4000)

      }
       
 }
    //

    /* hiện dialog thông báo*/
    showDialog = () => {
      let dialog = document.querySelector('.dialog--background');
      // dialog.style.transition ='liner 2s';
      dialog.style.display = 'grid';
    }
    // ẩn dialog thông báo
    let cdl = document.querySelector('#closedialog');
    cdl.addEventListener('click', () => {
      let dialog = document.querySelector('.dialog--background');
      dialog.style.display = 'none';
      showToast();
    })
    /*Hàm hiển thị toastmesssage
    CreatedbyNCManh*/
    showToast = () => {
      let toast = document.querySelector('.toast--container');
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 2000)
    }
    //
    /*Chọn dòng dữ liệu */
    let clear = document.querySelector('#clear');
    clear.addEventListener('click', () => {
      count = 0;
      let tbl = document.querySelectorAll('tbody tr');

      for (let index = 0; index < tbl.length; index++) {
        // console.log( tbl[index]);
        tbl[index].classList.remove('selected');

        // console.log(tbl[index].children[0].children[index]);
        // if(tbl[index].children[index].children[index].checked=true){
        // }
        tbl[index].children[0].children[0].checked = false;
        var show = document.querySelector("#count");
        show.innerHTML = count;
      }
    }
    )
    var count = 0;

    // selected table row
    let table = document.querySelector('#table');
    let rows = table.getElementsByTagName('tr');
    let selectedRows = [];
    table.addEventListener('click', function (e) {
      let targetRow = e.target.closest('tr');
      let targetCol = targetRow.children;
      if (targetRow && !e.ctrlKey) {
        selectedRows.forEach(row => {
          row.classList.remove('selected');
        });
        selectedRows = [];
      }
      if (targetRow && !selectedRows.includes(targetRow)) {
        targetRow.classList.toggle('selected');
        for (let index = 0; index < targetCol.length; index++) {
          // console.log(targetCol[index].children);
          if (targetCol[index].children[0].checked == true) {
            count -= 1;
            targetCol[index].children[0].checked = false;
          }
          else {
            targetCol[index].children[0].checked = true;
            count++;
          }
          var show = document.querySelector("#count");
          show.innerHTML = count;;
        }
        // if (targetRow.classList.contains('selected')) {
        //   selectedRows.push(targetRow);
        // } else {
        //   let index = selectedRows.indexOf(targetRow);
        //   if (index !== -1) {
        //     selectedRows.splice(index, 1);
        //   }
        // }
      }
    });


    //đóng form thông tin
    closeForm = () => {
      var form = document.querySelector('.dark--screen');
      // console.log(form);
      form.classList.remove('show--form');
      form.classList.add('close--form');
    }
    //hiện form thông tin
    showForm = () => {
      var form = document.querySelector('.dark--screen');
      // console.log(form);
      form.classList.remove('close--form');
      form.classList.add('show--form');

    }
    //thu nhỏ sidebar
    collapseSidebar = () => {
      var form = document.querySelector('.layout--container');
      var sidebar = document.querySelector('.list--item');
      var sidebar2 = document.querySelectorAll('.item');
      document.getElementById('btn--hide-sidebar').style.display = 'none';
      document.getElementById('btn--show-sidebar').style.display = 'flex';
      var text = document.querySelectorAll('p');
      sidebar.style.width = '76px';
      for (let index = 0; index < sidebar2.length; index++) {
        sidebar2[index].style.width = '44px';
      }
      console.log(text);
      text.forEach(element => {
        element.style.display = 'none';
      });
      form.classList.remove('layout--container');
      form.classList.add('sidebar--collapse');
    }
    //hiện sidebar
    openSidebar = () => {
      var form = document.querySelector('.sidebar--collapse');
      var sidebar = document.querySelector('.list--item');
      var sidebar2 = document.querySelectorAll('.item');
      document.getElementById('btn--hide-sidebar').style.display = 'flex';
      document.getElementById('btn--show-sidebar').style.display = 'none';
      var text = document.querySelectorAll('p');
      sidebar.style.width = '200px';
      for (let index = 0; index < sidebar2.length; index++) {
        sidebar2[index].style.width = '176px';
      }
      console.log(text);
      text.forEach(element => {
        element.style.display = 'block';
      });
      form.classList.remove('sidebar--collapse');
      form.classList.add('layout--container');
    }
    // collapseSidebar = ()=>{
    //   var form = document.querySelector('.sidebar');
    //   console.log(form);
    //   // form.classList.remove('.layout--container');
    //   // form.classList.add('.sidebar--collapse');
    // }
    // var row = document.querySelectorAll("#check");
    // row.forEach((x) => {
    //   // console.log(x);
    //   x.addEventListener('change', () => {
    //     if (x.checked) {
    //       count++;
    //     }
    //     else {
    //       count--;
    //     }
    //     var show = document.querySelector("#count");
    //     show.innerHTML = count;
    //   })
    // })

});
