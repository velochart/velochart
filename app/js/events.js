for (let i = 0; i < formData.length; i++) {
    formData[i].addEventListener('keydown', () => {
        formData[i].classList.remove('invalid');
    })
}

buttonFill.addEventListener('click', function(){
    FormModule.display(formData, showDiv);
})

itemName.addEventListener("keypress", function (event) {
    if (event.keyCode == 13){
        itemValue.focus();
    }
});

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

buttonCreate.addEventListener('click', function () {
    if (itemArray.length === 0)
    return;
    setDataModule.save(formData,itemArray,sessionStorage);
    getDataModule.createChart(sessionStorage, formData[0].value);
    tabDataSet.classList.remove('selected');
    tabDisplay.classList.add('selected');
    menuItem[1].classList.remove('active');
    menuItem[2].classList.add('active');
});



