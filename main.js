const data = {
    Id: "",
    Title: "",
    Quantity: 0,
    Price: 0,
    Description: ""
}
$(document).ready(function()
    {
        $('#submit').click(function() 
        {
            data.Id = $("#Id").val();     
            data.Title = $("#title").val();
            data.Quantity = $("#quantity").val();
            data.Price = $("#price").val();
            data.Description = $("#description").val();
            validateData() 
        });
});
function validateData() {
       
    if(isNaN(data.Id)||(data.Id=="")){
        alert("Enter Only Number For ID");
    }
    else if((data.Title=="")){
        alert("Enter Title");
    }
    else if(isNaN(data.Quantity)||(data.Quantity=="")){
        alert("Enter Only Number For Quantity");
    }
    else if(isNaN(data.Price)||(data.Price=="")) {
        alert("Enter Only Number For Price");
    }
    else {
        saveData();
        alert("Product Added Sucessfully");
    }
}
function saveData(event) {
    $.ajax({
        url: "http://localhost:8080/data",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",        
    });

}
function deleteData(deleteId) {
    console.log('deleteId', deleteId);

    $.ajax({
        url: "http://localhost:8080/data/delete",
        type: "POST",
        data: JSON.stringify(
            {
                "Id": deleteId
            }
        ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    });
}
function updateeData(updateId) {
    $.ajax({
        url: "http://localhost:8080/data",
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        outline: 0;
        data.forEach((d) => {

            if (d.Id == updateId) {
                document.getElementById("Id").value = d.Id;
                document.getElementById("title").value = d.Title;
                document.getElementById("quantity").value = d.Quantity;
                document.getElementById("price").value = d.Price;   
                document.getElementById("description").value = d.Description;
            }           
        })
    });
}
function showTable() {
    $.ajax({
        url: "http://localhost:8080/data",
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        // console.log("GET DATA", data);
        data.reverse();
        let table = document.getElementById("myTable");
        let removeRow = document.createElement("BUTTON");
        let total = 0;
        data.forEach((d, i) => {

            let row = table.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);
            let cell8 = row.insertCell(7);

            cell1.innerHTML = d.Id;
            cell2.innerHTML = d.Title;
            cell3.innerHTML = d.Quantity;
            cell4.innerHTML = d.Price;
            cell5.innerHTML = (d.Quantity * d.Price).toFixed(2);
            cell6.innerHTML = d.Description;
            cell7.innerHTML = `<button id="delete" onclick="deleteData(${d.Id})" >Delete</button>`;
            cell8.innerHTML = `<button id="update" onclick="updateeData(${d.Id})" >Update</button>`;

            total = total + (d.Quantity * d.Price);
            document.getElementById('grandTotal').innerHTML = total.toFixed(2);
        });
    });
}