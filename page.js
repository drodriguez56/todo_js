(function () {
  function addItem(list, itemText){
    var date = new Date();
    var id = "" + date.getYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

    var newItem = document.createElement('li');
    var text = document.createElement('p');
    newItem.id = "li_" + id;
    text.innerText = itemText;
    list.appendChild(newItem);
    newItem.appendChild(text);

    var btn_delete = document.createElement('button');
    btn_delete.id = "btn_delete_" + id;
    btn_delete.onclick = deleteItem;
    btn_delete.innerHTML = "delete";
    newItem.appendChild(btn_delete);
    addToArray(itemText, id);
  }
  function deleteItem(){
    var liId = this.id.replace("btn_delete_", 'li_');
    var liRemove = document.getElementById(liId);
    liRemove.parentNode.removeChild(liRemove);
    var id = this.id.replace("btn_delete_", "");
    deleteFromArray(id);
  }
  function trigrerActionAddItem(){
    var itemText = item.value;
      if (itemText == "" || itemText == " "){
        return false;
      }
      addItem(document.getElementById('list'), itemText);

      item.value = "";
      item.focus();
  }
  function identifyKey(e){
    if (e.which == 13){
      trigrerActionAddItem();
    }else{
      return false;
    }
  }
  function addToArray(item, id){
    arrayItems.push(item);
    arrayIds.push(id);
  }
  function deleteFromArray(id){
    var index = arrayIds.indexOf(id);
    arrayItems.splice(index,1);
    arrayIds.splice(index,1);
  }
  function submitList(){
    // var http = new XMLHttpRequest();
    if (arrayItems.length == 0){
      console.log('nothing to submit');
    } else {
      console.log('submit here');
    }


  }
  var arrayItems = [];
  var arrayIds = [];
    var item = document.getElementById('user-input');
    item.focus();
    var addButton = document.getElementById('addButton');
    addButton.onclick = trigrerActionAddItem;
    item.onkeyup = identifyKey;

}());