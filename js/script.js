const newTaskText = document.querySelector("#newTaskName");
const addBtn = document.querySelector("form");
const editBtn = document.querySelector("#editBtn");
const delBtn = document.querySelector("#delBtn");
const chkBoxAll = document.querySelector("#customCheck1");
const taskList = document.querySelector("#taskList");
var click = false;

const checkboxInnerHtml =
    '<input type="checkbox" aria-label="Checkbox for following text input" class="mr-3"><button type="button" class="close" aria-label="Close"><span aria-hidden="true"><i class="fas fa-times"></i></span></button>';

eventListeners();
function eventListeners() {
    addBtn.addEventListener("submit", addNewItem);
    editBtn.addEventListener("click", editing);
    delBtn.addEventListener("click", removing);
    chkBoxAll.addEventListener("click", checkAll);
    taskList.addEventListener("click", doneOrDelete);
}

//yeni gorev ekleme fonksiyonu
function addNewItem(e) {
    e.preventDefault();
    if (newTaskText.value != "") {
        //icerik bos degilse ekleme islemini gercelestiriyor
        let liDOM = document.createElement("li");
        liDOM.className = 'list-group-item';
        liDOM.innerText = newTaskText.value;
        taskList.appendChild(liDOM);
        newTaskText.value = "";
    } else {
        alert("Please type your task correctly!");
    }
}

function editing(e) {
    e.preventDefault();
    let liChildren = taskList.children;
    if (!click) {
        //butona daha once basilip basilmadigi kontrol ediliyor
        //her gorev elemanin basina checkbox sonuna X isareti konuluyor
        for (let i = 0; i < liChildren.length; i++) {
            let text = liChildren[i].innerText;
            liChildren[i].innerHTML = checkboxInnerHtml;
            liChildren[i].appendChild(document.createTextNode(text));
        }
        click = true;
        //edit islemi aktif edildiginde islem bitmeden yeni kayit girilmemesi icin giris bolumleri disable duruma aliniyor
        document.getElementById("addBtn").disabled = true;
        newTaskText.placeholder = "Please Finish Editing";
        newTaskText.value = "Please Finish Editing";
        newTaskText.disabled = true;
    } else {
        for (let i = 0; i < liChildren.length; i++) {
            let text = liChildren[i].textContent;
            liChildren[i].innerHTML = "";
            liChildren[i].classList.remove('del');//menu kapanirken silme editleri iptal ediliyor
            liChildren[i].appendChild(document.createTextNode(text));
        }
        click = false;
        chkBoxAll.checked = false;//menu kapanirken tumunu sec isaretli ise check ozelligi kaldiriliyor
        document.getElementById("addBtn").disabled = false;
        newTaskText.disabled = false;
        newTaskText.value = "";
        newTaskText.placeholder = "Type a New Task";
    }
}

//silme icin gerekli checkbox isaretlemesi veya bittigine dair uzerine tiklanma sonrasi gerekli classlar ekleniyor
function doneOrDelete(e) {
    e.stopPropagation();
    console.log(e.target);
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "INPUT") {
        //edit menusundeki checkbox
        if (!e.target.checked) {//check kaldirilirsa
            chkBoxAll.checked = false;
            e.target.parentElement.classList.remove('del');
        }
        else {
            e.target.parentElement.classList.add('del');
        }

    }
    else if (e.target.tagName === "I") {
        if (confirm('Are you sure you want to delete the selected items?')) {
            e.target.parentElement.parentElement.parentElement.remove();
        }
        

    }
}
//silme islemi icin ul altindaki tum li lere ulasilip, her birinin classlari kontrol ediliyor hitaminda del classini icerenler siliniyor
function removing() {
    if (confirm('Are you sure you want to delete the selected items?')) {
        if(chkBoxAll.checked){                                                //eger tumunu sec aktifse
            taskList.querySelectorAll("li").forEach(item => {item.remove()}); //tum li'ler siliniyor
            editBtn.click();                                                  //edit menusu kapatiliyor
        }else {                                                               //tumu secili degilse
            taskList.querySelectorAll("li").forEach(item => {
                if (item.className.includes("del")) {                         //secilmis olanlar
                    item.remove();                                            //siliniyor  
                }
            });
        }
        chkBoxAll.checked = false;                          //silme islemi sonrasi tumunu sec butonu inaktif yapiliyor
    }
}
//select all ve li'lerin icinde ki checkboxlar birbirinden bagimsiz. eger tumunu sec kismina tiklandiginda zaten secili olanlar varsa onlarin dutumunda degisiklik olmayacak. tersi durumda da tumunu sec kaldirilirken zaten secili olmayanlar varsa onlarin durumu degismeyecek
function checkAll() {
    if (chkBoxAll.checked) {    //tumunu sec'e tiklandigi zaman
        taskList.querySelectorAll("li").forEach(item => {       //liste icindeki tum satirlarda
            if (item.querySelector("input").checked == false) { //secili olmayanlar varsa
                item.querySelector("input").click();            //secili hale getir
            }
        }
        );
    }
    else {                                                      //tumunu sec kaldirildiginda
        taskList.querySelectorAll("li").forEach(item => {       //liste icindeki tum satirlarda
            if (item.querySelector("input").checked == true) {  //secili olanlar varsa
                item.querySelector("input").click();            //secimden cikar
            }
        }
        );
    }
}
