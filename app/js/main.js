let itemArray = [];
const showDiv = document.getElementById('show');
const formData = document.getElementsByClassName('data_form'); 
const itemName = document.getElementById('name');
const itemValue = document.getElementById('value');
const items = [itemName, itemValue];
const currentList = document.getElementById('current_list');
const buttonFill = document.getElementById('continue');
const buttonAddItem = document.getElementById('addItem');
const buttonSave = document.getElementById('save');
const buttonCreate = document.getElementById('create_chart');
const tabDisplay = document.querySelector('#display');
const tabDataSet = document.querySelector('#data_set');
const tabExisting = document.querySelector('#existing_charts');
const menuItem = document.getElementsByClassName('menu');
const existingList =document.getElementById('chart_titles');
const chartTitle =  document.getElementsByClassName('title_cell');

window.onload = function(){
    addToList(existingList);
}  

function openTab(evt, tabId) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("content");
    tablinks = document.getElementsByClassName("menu");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" selected", "");
    }
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabId).className += " selected";
    if (evt.currentTarget.id=='start') {
        document.getElementsByClassName("menu")[0].className += " active";
    }
    else {
        evt.currentTarget.className += " active";
    }
}

var validationModule = (function() {

    var _checkIfEmpty = function(name, value) {
        return !(name.value == "" || value.value == "");
    }
    var _checkExistance = function(array, name){
        return !array.some((x) => x.name === name.value);
    }
    var _checkIfBigger = function(value, form) {
        return +value.value <= +form[1].value;
    }
    var checkValidation = function(array, form, name, value) {
        return _checkExistance(array, name) && _checkIfEmpty(name, value) && _checkIfBigger(value, form);
    }
    return {
        checkValidation
    }
})()

var ItemListModule = (function(){

    var deleteFromTable = function(array, item) {
        let index;
        for (let i = 0; i < array.length; i++) {
            if (array[i].name === item.innerHTML){
                index = i;
                break;
            }
        }
        array.splice(index, 1);
    }

    var insertIntoTable = function(name, value, currentList, array) {
        
        let itemList = document.createElement("div");   
        let nameCell = document.createElement("div");   
        nameCell.innerHTML = name.value;
        let valueCell = document.createElement("div");
        valueCell.innerHTML = value.value;
        let deleteCell = document.createElement("div");  
        deleteCell.innerHTML = 'Delete';
        deleteCell.addEventListener('click', function(){
            currentList.removeChild(itemList);
            deleteFromTable(array, nameCell);
        });
        itemList.classList.add('itemlist_table'); 
        nameCell.classList.add('itemlist_cell'); 
        valueCell.classList.add('itemlist_cell'); 
        deleteCell.classList.add('itemlist_cell'); 
        deleteCell.classList.add('delete_cell'); 
        itemList.appendChild(nameCell);
        itemList.appendChild(valueCell);
        itemList.appendChild(deleteCell); 
        currentList.appendChild(itemList);        
    };

    var saveToList = function(form, array){
    };

    return {
        insertIntoTable,
        saveToList,
    }
})();

var FormModule = (function() {
    
    function display(data, div) {
        let counter = 0;
        for (let i = 0; i < data.length; i++){
            if (data[i].value === ""){
                data[i].parentElement.classList.add('invalid');
                counter++;
            }  
        }
        if(counter === 0){
            div.style.display = "block";
        }      
    }
       
    var _itemCreator = function(name, value){ 
        return {
            name: name.value,
            value: +value.value
        }
    }    
    var clearInput = function(name, value){
        name.value = "";
        value.value = "";
    }
    var addItem = function (array, name, value) {
        let itemObject = _itemCreator(name, value);
        array.push(itemObject);     
    }
    return {
        display,
        clearInput,
        addItem
    }
})();


var setDataModule = (function(){
    class _CreateGroup {
        constructor(title, value, data){
            this.title = title;
            this.data = data;
            this.value = +value;
        }
    }
    
    var _checkStorage = function(storage, title){
        if (storage.getItem(title) !== null){
            let perm = confirm('You already have a directory with the same name. Want to replace?');
            return perm;
        }
        return storage.getItem(title) === null;
    }
     var save = function(form, array, storage){
        let exists = _checkStorage(storage, form[0].value);
        if(exists){
            let group = new _CreateGroup(form[0].value, form[1].value, array);
            storage.setItem(form[0].value, JSON.stringify(group));
           
            if (storage == localStorage) {
                array.length = 0;
            }           
        }
    }
    return {
        save
    }
})();


var getDataModule = (function () {
    
    var createChart = function (storage, chart_title) {

        let storageObj = JSON.parse(storage.getItem(chart_title));
        let chart_container = document.querySelector('#chart_container');
        let chart_Title = document.createElement('p');
        let chart = document.createElement('div');
        let savebtn = document.createElement('button');
        let maximum = document.createElement('span');

        chart_container.appendChild(chart_Title);
        chart_container.appendChild(chart);
        chart.setAttribute('class','chart');
        chart.appendChild(maximum);
        
        if(storageObj !== null) {
            chart_container.setAttribute('class', 'chart-container');
            chart_Title.innerHTML = storageObj.title;
        }
        maximum.innerHTML =storageObj.value + ' >';
        
        for (let i = 0, j = 0; i < storageObj.data.length; i++, j++) {
            let i = document.createElement('div');
            let itemName = document.createElement('p');
            i.setAttribute('class', 'chart_item');
            chart.appendChild(i);

            i.style.height = storageObj.data[j].value * 100 / storageObj.value + '%';
            i.style.width = 50/storageObj.data.length - 5 +'vw';
            i.appendChild(itemName);
            itemName.innerHTML =storageObj.data[j].name;
        }

        chart_container.appendChild(savebtn);
        savebtn.setAttribute('class','add_item');
        savebtn.innerText = 'Save Chart';

        savebtn.addEventListener('click',function () {
            setDataModule.save(formData, itemArray, localStorage);
            tabDisplay.classList.remove('selected');
            tabExisting.classList.add('selected');
            menuItem[2].classList.remove('active');
            menuItem[3].classList.add('active');
        })
    }
    return{
        createChart,
    }

})();

var setOrder = (function(){

    var increase = function(array){
        return array.sort((a, b) => a.value - b.value);
    }

    var descrease = function(array){
        return array.sort((a, b) => b.value - a.value);
    }

    return {
        increase, 
        descrease
    }
})();

var addToList = function(list) {
    if (localStorage.length > 0){
        for (let i = 0; i < localStorage.length; i++){
            let x = document.createElement('div');
            let itemLength = document.createElement('div');
            let maxValue = document.createElement('div');
            x.classList.add('itemlist_cell'); 
            x.classList.add('title_cell'); 
            itemLength.classList.add('itemlist_cell');
            maxValue.classList.add('itemlist_cell');
            
            let obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
            x.id = obj.title;
            itemLength.innerHTML = obj.data.length;
            x.innerHTML = obj.title;
            maxValue.innerHTML = obj.value;
            list.appendChild(x);
            list.appendChild(itemLength);
            list.appendChild(maxValue);
        }
    }
}

var getFromList = function () {

    for (let chart of chartTitle) {
            chart.addEventListener('click', function (event) {
            let titleId = this.id;
            getDataModule.createChart(localStorage, titleId);
            buttonCreate.setAttribute('disabled',true);
            tabExisting.classList.remove('selected');
            tabDisplay.classList.add('selected');
            menuItem[3].classList.remove('active');
            menuItem[2].classList.add('active');
        });
    }
}

 setTimeout(getFromList, 100);




