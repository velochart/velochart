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
    evt.currentTarget.className += " active";
}



let itemArray = [];
const showDiv = document.getElementById('show');
const formData = document.getElementsByClassName('data_form');
const itemName = document.getElementById('name');
const itemValue = document.getElementById('value');
const currentList = document.getElementById('current_list');
const buttonFill = document.getElementById('continue');
const buttonAddItem = document.getElementById('addItem');
const buttonSave = document.getElementById('save');
const buttonCreate = document.getElementById('create');


var validationModule = (function() {

    var _checkExistance = function(array, name){
        return !array.some((x) => x.name === name.value);
    }

    var _checkIfEmpty = function(name, value) {
        return name.value !== '' && value.value !== '';
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


var ItemListModule = ( function(){

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
        console.log(name.value)
        let valueCell = document.createElement("div");
        valueCell.innerHTML = value.value;
        let deleteCell = document.createElement("div");  
        deleteCell.innerHTML = 'Delete';
        deleteCell.addEventListener('click', function(){
            currentList.removeChild(itemList);
            deleteFromTable(array, nameCell);
        })  
        itemList.classList.add('itemlist_table'); 
        nameCell.classList.add('itemlist_cell'); 
        valueCell.classList.add('itemlist_cell'); 
        deleteCell.classList.add('itemlist_cell'); 
        itemList.appendChild(nameCell);
        itemList.appendChild(valueCell);
        itemList.appendChild(deleteCell); 
        currentList.appendChild(itemList);
        
    }

    var saveToList = function(){

    }

    return {
        insertIntoTable,
    }
})()



var FormModule = (function() {
    
    function display(data, div) {
        for (let i = 0; i < data.length; i++){
            if (data[i].value === ""){
                console.log("Empty input field!");
                return;
            }
        }
        div.style.display = "block";    
        // _display_table();
    }
    
    // creates a item LOL        
    var _itemCreator = function(name, value){ 
        return {
            name: name.value,
            value: +value.value
        }
    }
    // clears the input fields of name and value
    var clearInput = function(name, value){
        name.value = "";
        value.value = "";
    }

    var addItem = function (array, name, value) {
        let itemObject = _itemCreator(name, value);
        array.push(itemObject);
        console.log(array); 
    }
    // datamodule returns 2 methods and a getter
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
        //we might need methods
    }
    // checks if the amount of items equals to the one chosen by the user
    var _checkIfEnough = function(amount, array){
        if (+amount !== array.length){
            let perm = confirm('You haven\'t input enough items. You\'re sure you want to save?');
            return perm;
        }
        return +amount === array.length;
    }
    // checks if there is a property with the same name in local/session storage
    var _checkStorage = function(storage, title){
        if (storage.getItem(title) !== null){
            let perm = confirm('You already have a directory with the same name. Want to replace?');
            return perm;
        }
        return storage.getItem(title) === null;
    }
    // saves data to the local storage
    var save = function(form, array, storage){
        let enough = _checkIfEnough(form[2].value, array);
        let exists = _checkStorage(storage, form[0].value);
        if(exists && enough){
            let group = new _CreateGroup(form[0].value, form[1].value, array);
            storage.setItem(form[0].value, JSON.stringify(group));
            array.length = 0;
        }
    }

    return {
        save
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


buttonFill.addEventListener('click', function(){
    FormModule.display(formData, showDiv);
})

// for allowing users to enter items with 'Enter' key
itemName.addEventListener("keypress", function (event) {
    if (event.keyCode == 13){
        itemValue.focus();
    }
});

// for allowing users to enter members with 'Enter' key
itemValue.addEventListener('keypress', function(event){
    event.stopPropagation();
    if  (event.keyCode == 13){
        FormModule.addItem(itemArray, itemName, itemValue);
        ItemListModule.insertIntoTable(itemName, itemValue, currentList);
        FormModule.clearInput(itemName, itemValue)
    }
})

buttonAddItem.addEventListener('click', function() {
    if (validationModule.checkValidation(itemArray, formData, itemName, itemValue)){
        FormModule.addItem(itemArray, itemName, itemValue);
        ItemListModule.insertIntoTable(itemName, itemValue, currentList, itemArray);
        FormModule.clearInput(itemName, itemValue);
    }
    else
        console.log('Something went wrong')
})

// buttonSave.addEventListener('click', function(){
//     setDataModule.save(formData, itemArray, localStorage);
// })

// buttonCreate.addEventListener('click', function(){
//     setDataModule.save(formData, itemArray, sessionStorage);
// })
