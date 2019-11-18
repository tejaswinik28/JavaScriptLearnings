window.onload = function () {
  var today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  var currentMonthName = monthNames[currentMonth];



 // var makeHeading = document.getElementById("monthYearHeading");
  //makeHeading.innerText = currentMonthName + ' ' + currentYear;
  createMonthDropbox(currentMonthName,currentYear,monthNames);
  createCalender(currentYear,currentMonth);
}


function createMonthDropbox(currentMonthName,currentYear,monthNames){
  var makeMonthDropDown = document.getElementById("monthYearHeading");
  var makeMonth = document.createElement("div");
  makeMonth.setAttribute("id","monthName");
  makeMonth.innerText = currentMonthName;
  var makeYear= document.createElement("div");
  makeYear.setAttribute("id","yearNumber");
  makeYear.innerText = currentYear;
  var dropDownDiv = document.createElement("div");
  dropDownDiv.setAttribute("class","dropdown monthDropdown");
  var spanCaret = document.createElement("span");
  spanCaret.setAttribute("class","caret");
  spanCaret.setAttribute("data-toggle","dropdown");
  dropDownDiv.appendChild(spanCaret);
 // makeMonthDropDown.appendChild(dropDownDiv);
  var dropDownUL = document.createElement("ul");
  dropDownUL.setAttribute("class","dropdown-menu");
  dropDownDiv.appendChild(dropDownUL);
  for(var i=0;i<monthNames.length;i++){
    var makeMonthLi = document.createElement("li");
    var makeMonthA = document.createElement("a");
    makeMonthA.setAttribute("href","#");

    makeMonthA.innerText = monthNames[i];
  //  makeMonthLi.setAttribute("onclick","changeMonth("+  makeMonthA.innerText +")");
   /* makeMonthLi.onclick = function(){
      changeMonth(monthNames[i]);
    };*/

   makeMonthLi.onclick = (function(){
     var currentI = i;
     return function(){
       changeMonth(currentI,monthNames[currentI],monthNames);
     }
   })();

   // makeMonthLi.addEventListener('click',changeMonth.bind(null,monthNames[i]));
    makeMonthLi.appendChild(makeMonthA);
    dropDownUL.appendChild(makeMonthLi);

  }
  // headingRow.appendChild(makeMonth);
  makeMonth.appendChild(dropDownDiv);
  makeMonthDropDown.appendChild(makeMonth);
  makeMonthDropDown.appendChild(makeYear);
}

function changeMonth(selectedMonth,selectedMonthName,monthNames){
  var count = 1,item=0;
  /*clear existing table*/
  var table = document.getElementById("calenderTable");
  while(table.rows.length !== 1){
    table.deleteRow(table.rows.length-1);
  }
  emptyExistingContents();
  createMonthDropbox(selectedMonthName,2019,monthNames);
  //changeMonthName(selectedMonth,selectedMonthName);

  createCalender(2019, selectedMonth);

}

function emptyExistingContents(){
 document.getElementById("monthYearHeading").innerHTML = "";

}

function createCalender(currentYear,currentMonth){
    var counter = 0;
  var startOfMonth = new Date(currentYear , currentMonth).getDay();
  var numberOfDays = 32 - new Date(currentYear, currentMonth, 32 ).getDate();
    var table = document.getElementById("calenderTable");
    for(var i =1;i<6;i++){
     var row = table.insertRow(i);
     for(var j=0;j<7;j++){
       var cell = row.insertCell(j);
       if(i === 1 && j < startOfMonth){
         cell.innerText = "";
       }
       else{
         if(counter !== numberOfDays ){
           counter++;
           cell.innerText = counter;
         }
       }


     }
    }
}
