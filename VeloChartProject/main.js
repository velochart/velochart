let memberArray = [];
const showDiv = document.getElementById("show");
const formData = document.getElementsByClassName("form");
const memName = document.getElementById("name");
const memScore = document.getElementById("score");
const buttonFill = document.getElementById('fillForm');
const buttonAddMem = document.getElementById('addMem');
const buttonSave = document.getElementById('save');
const buttonCreate = document.getElementById('create');

var memberlistTable = document.getElementsByClassName("memberlist_table");
var memberlistCell = document.getElementsByClassName("memberlist_cell");
var memberlistHeader = document.getElementsByClassName("memberlist_cell_head");
var memberlist = document.getElementById("memberlist");
var tableCellCount =0; 

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



var FormModule = (function() {
    
    // create memberlist  table without  values 
    function _display_table () {
        var countMemberlist = formData[2].value - memberlistTable.length; 
        var memberlistContainer = document.createElement('div');
        if (memberlistHeader.length == 0) {
            memberlistContainer.innerHTML = '<h2>Memberlist</h2><div class="memberlist_header"><div class="memberlist_cell_head">Name</div><div class="memberlist_cell_head">Score</div><div class="memberlist_cell_head">Action</div></div>';;
            memberlist.appendChild(memberlistContainer);
        }
            for (var j = 0; j < countMemberlist; j++){
                var createMemberlist = document.createElement("div");
                createMemberlist.setAttribute("class", "memberlist_table");
                createMemberlist.innerHTML = "<div class='memberlist_cell'></div><div class='memberlist_cell'></div><div class='memberlist_cell'></div>";
                memberlist.appendChild(createMemberlist);   
            }   
        }
        // input name and score into table 
    function inputValuesIntoTable() {
        memberlistTable[tableCellCount].innerHTML="<div class='memberlist_cell'>" + memName.value + "</div><div class='memberlist_cell'>"+score.value+"</div><div class='memberlist_cell'>delete</div>";      
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
    // check if the maximum number of members reached
    var _checkMemberLimit = function(array, amount){
        return array.length == amount;
    }
    // creates a member LOL        
    var _memberCreator = function(name, score){ 
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

    var addMember = function (array, form, name, score) {

        if (name.value === "" || score.value === ""){
            console.log("Invalid input");
            return;
        }
        
        if ((+score.value) > (+form[1].value) || (+score.value) < 0){
            console.log('Input score bigger than Maximum');               
            return;
        }

        if (_checkMemberLimit(array, form[2].value)){
            alert('Maximum members reached');
            return;
        }

        let memberObject = _memberCreator(name, score);

        if (!_checkExistance(array, name)){
            array.push(memberObject);
            inputValuesIntoTable();
            _clearInput(name, score);  
            console.log("Member added!");
        }
        else {
            console.log('Member already exists!');
            _clearInput(name, score);  
            return;
        }

        console.log(array);   
    }
    // datamodule returns 2 methods and a getter
    return {
        display,
        addMember
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
    // checks if the amount of members equals to the one chosen by the user
    var _checkIfEnough = function(amount, array){
        if (+amount !== array.length){
            let perm = confirm('You haven\'t input enough members. You\'re sure you want to save?');
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

// for allowing users to enter members with 'Enter' key
showDiv.addEventListener('keypress', function(event){
    event.stopPropagation();
    if  (event.keyCode == 13){
        FormModule.addMember(memberArray, formData, memName, memScore);
    }
})

buttonAddMem.addEventListener('click', function(){
    FormModule.addMember(memberArray, formData, memName, memScore);
})

buttonSave.addEventListener('click', function(){
    setDataModule.saveToList(formData, memberArray);
})

buttonCreate.addEventListener('click', function(){
    setDataModule.createNoSave(formData, memberArray);
})