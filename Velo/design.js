function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("content");
    tablinks = document.getElementsByClassName("menu");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" selected", "");
    }

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).className += " selected";
    evt.currentTarget.className += " active";
}



/*let itemArray = [];
const showDiv = document.getElementById("show");
const formData = document.getElementsByClassName("form");
const memName = document.getElementById("name");
const memScore = document.getElementById("score");
const buttonFill = document.getElementById('fillForm');
const buttonAddMem = document.getElementById('addMem');
const buttonSave = document.getElementById('save');
const buttonCreate = document.getElementById('create');

var itemlistTable = document.getElementsByClassName("itemlist_table");
var itemlistCell = document.getElementsByClassName("itemlist_cell");
var itemlistHeader = document.getElementsByClassName("itemlist_cell_head");
var itemlist = document.getElementById("itemlist");
var tableCellCount =0;*/

// document.addEventListener('DOMContentLoaded', function(){
//     if (localStorage.length > 0 && document.readyState === "interactive"){
//         alert('You have some lists');
//     }
// })

// window.onload = function(){
//     if (localStorage.length > 0){
//         console.log('1');
//     }
// }    
/*
// create itemlist  table without  values
function display_table () {
    var countitemlist = formData[2].value - itemlistTable.length;
    var itemlistContainer = document.createElement('div');
    if (itemlistHeader.length == 0) {
        itemlistContainer.innerHTML = '<h2>itemlist</h2><div class="itemlist_header"><div class="itemlist_cell_head">Name</div><div class="itemlist_cell_head">Score</div><div class="itemlist_cell_head">Action</div></div>';;
        itemlist.appendChild(itemlistContainer);
    }
    for (var j = 0; j < countitemlist; j++){
        var createitemlist = document.createElement("div");
        createitemlist.setAttribute("class", "itemlist_table");
        createitemlist.innerHTML = "<div class='itemlist_cell'></div><div class='itemlist_cell'></div><div class='itemlist_cell'></div>";
        itemlist.appendChild(createitemlist);
    }
}
// input name and score into table
function inputValuesIntoTable() {
    itemlistTable[tableCellCount].innerHTML="<div class='itemlist_cell'>" + memName.value + "</div><div class='itemlist_cell'>"+score.value+"</div><div class='itemlist_cell'>delete</div>";
    tableCellCount=tableCellCount + 1;
}
*/

/*
var FormModule = (function() {
    
    // create itemlist  table without  values 
    function _display_table () {
        var countitemlist = formData[2].value - itemlistTable.length; 
        var itemlistContainer = document.createElement('div');
        if (itemlistHeader.length == 0) {
            itemlistContainer.innerHTML = '<h2>itemlist</h2><div class="itemlist_header"><div class="itemlist_cell_head">Name</div><div class="itemlist_cell_head">Score</div><div class="itemlist_cell_head">Action</div></div>';;
            itemlist.appendChild(itemlistContainer);
        }
            for (var j = 0; j < countitemlist; j++){
                var createitemlist = document.createElement("div");
                createitemlist.setAttribute("class", "itemlist_table");
                createitemlist.innerHTML = "<div class='itemlist_cell'></div><div class='itemlist_cell'></div><div class='itemlist_cell'></div>";
                itemlist.appendChild(createitemlist);   
            }   
        }
        // input name and score into table 
    function inputValuesIntoTable() {
        itemlistTable[tableCellCount].innerHTML="<div class='itemlist_cell'>" + memName.value + "</div><div class='itemlist_cell'>"+score.value+"</div><div class='itemlist_cell'>delete</div>";      
        tableCellCount=tableCellCount + 1;
    }
//-------------------------------------------------------------------------
    function display(data, div) {
        for (let i = 0; i < data.length; i++){
            if (data[i].value === ""){
                console.log("Empty input field!");
                return;
            }
        }
        div.style.display = "block";    
        _display_table();
    }
    // check if the same name exists
    var _checkExistance = function(array, name){
        return array.some((x) => x.name === name.value);
    }
    // check if the maximum number of items reached
    var _checkitemLimit = function(array, amount){
        return array.length == amount;
    }
    // creates a item LOL        
    var _itemCreator = function(name, score){ 
        return {
            name: name.value,
            score: +score.value
        }
    }
    // clears the input fields of name and score
    var _clearInput = function(name, score){
        name.value = "";
        score.value = "";
    }

    var additem = function (array, form, name, score) {

        if (name.value === "" || score.value === ""){
            console.log("Invalid input");
            return;
        }
        
        if ((+score.value) > (+form[1].value) || (+score.value) < 0){
            console.log('Input score bigger than Maximum');               
            return;
        }

        if (_checkitemLimit(array, form[2].value)){
            alert('Maximum items reached');
            return;
        }

        let itemObject = _itemCreator(name, score);

        if (!_checkExistance(array, name)){
            array.push(itemObject);
            inputValuesIntoTable();
            _clearInput(name, score);  
            console.log("item added!");
        }
        else {
            console.log('item already exists!');
            _clearInput(name, score);  
            return;
        }

        console.log(array);   
    }
    // datamodule returns 2 methods and a getter
    return {
        display,
        additem
    }
})();


var setDataModule = (function(){

    class _CreateGroup {
        constructor(title, maxScore, data){
            this.title = title;
            this.data = data;
            this.maxScore = +maxScore;
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
    var saveToList = function(form, array){
        let enough = _checkIfEnough(form[2].value, array);
        let exists = _checkStorage(localStorage, form[0].value);
        if(exists && enough){
            let group = new _CreateGroup(form[0].value, form[1].value, array);
            localStorage.setItem(form[0].value, JSON.stringify(group));
            array.length = 0;
        }
    }
    //save data to session storage (there could be only one session for saving data by adding one more parameter to one of these functions, but lets keep it so)
    var createNoSave = function(form, array){
        let enough = _checkIfEnough(form[2].value, array);
        let exists = _checkStorage(sessionStorage, form[0].value);
        if(exists && enough){
            let group = new _CreateGroup(form[0].value, form[1].value, array);
            sessionStorage.setItem(form[0].value, JSON.stringify(group));
            array.length = 0;
        }
    }

    return {
        saveToList,
        createNoSave
    }
})();

var setOrder = (function(){

    var increase = function(array){
        return array.sort((a, b) => a.score - b.score);
    }

    var descrease = function(array){
        return array.sort((a, b) => b.score - a.score);
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
showDiv.addEventListener('keypress', function(event){
    event.stopPropagation();
    if  (event.keyCode == 13){
        FormModule.additem(itemArray, formData, memName, memScore);
    }
})

buttonAddMem.addEventListener('click', function(){
    FormModule.additem(itemArray, formData, memName, memScore);
})

buttonSave.addEventListener('click', function(){
    setDataModule.saveToList(formData, itemArray);
})

buttonCreate.addEventListener('click', function(){
    setDataModule.createNoSave(formData, itemArray);
})*/