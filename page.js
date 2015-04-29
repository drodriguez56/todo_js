var formComponet = function (input) {

  var arrayItems = [];
  var arrayIds = [];
  var item = document.getElementById(input);
  item.focus();
  var addButton = document.getElementById('addButton');
  addButton.onclick = trigrerActionAddItem;
  item.onkeyup = identifyKey;
  var btnSubmitList = document.getElementById('btn_submit_list');
  btnSubmitList.onclick = submitList;

  addItem = function(listObj, itemText){
    var date = new Date();
    var id = "" + date.getYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

    var newItem = document.createElement('li');
    var text = document.createElement('p');
    newItem.id = "li_" + id;
    text.innerText = itemText;
    listObj.appendChild(newItem);
    newItem.appendChild(text);

    var btn_delete = document.createElement('button');
    btn_delete.id = "btn_delete_" + id;
    btn_delete.className = "delete_btn"
    btn_delete.onclick = deleteItem;
    btn_delete.innerHTML = "delete";
    newItem.appendChild(btn_delete);
    addToArray(itemText, id);
    updateItemCounter();
  }
  deleteItem = function(){
    var liId = this.id.replace("btn_delete_", 'li_');
    var liRemove = document.getElementById(liId);
    liRemove.parentNode.removeChild(liRemove);
    var id = this.id.replace("btn_delete_", "");
    deleteFromArray(id);
    updateItemCounter();
  }

   function identifyKey(e){
    if (e.which == 13){
      trigrerActionAddItem();
    }else{
      return false;
    }
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
    var xhr = new XMLHttpRequest();
    var url = 'url' // assign url for the post request to server
    var params = "item_list=[" + arrayItems + ']'
    console.log (params)
    if (arrayItems.length == 0){
      console.log('nothing to submit');
    } else {
      xhr.open("POST", url, true);
      //  add content type if necessary and handle response
      xhr.send(params);
    }


  }
  function updateItemCounter(){
    var numItems = arrayItems.length
    console.log(numItems)
    var itemStatus = document.getElementById('items-status')
    if (numItems == 0){
      itemStatus.innerHTML = "no items in list ...."
    }else if (numItems == 1){
      itemStatus.innerHTML = "there is <span id='num-counter'>" + numItems + "</span> item in the list"
    } else{
        itemStatus.innerHTML = "there are <span id='num-counter'>" + numItems + "</span> items in the list"
    }
  }
  return {
    add: addItem,
    remove: deleteItem
  };

}('user-input');


