let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp ;
//gettotal
function gettotal(){
    if(price.value != ''){
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }else{
        total.innerHTML = ''
        total.style.background='red'
    }
}

//create
let datapro;
if(localStorage.products != null){
    datapro = JSON.parse(localStorage.products)
}else{
    datapro = [];
}
submit.onclick = function(){
    let newpro = {
        title : title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total:total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != '' ){
        if(mood === 'create'){
            if(newpro.count> 1){
                for(i=0 ; i < newpro.count ; i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }
        }else{
            datapro[tmp ]  =newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block'
        }
        cleardata()
    }


    
    localStorage.setItem('products' , JSON.stringify(datapro))
    
    showdata()
}

//cleardata

function cleardata(){
    title.value = '';
    price.value = '';
    ads.value = '';
    discount.value = '';
    taxes.value = '';
    count.value = '';
    total.innerHTML = '';
    category.value = '';
}
 
//read
function showdata(){

    gettotal()
    let table = '';
    for(i= 0 ; i < datapro.length ; i++ ){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick ="updatedate(${i})">update</button></td>
                <td><button onclick="deletedate(${i})">delete</button></td>
            </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelelte = document.getElementById('deleteall')
    if(datapro.length >0){
        btndelelte.innerHTML = `
        <button onclick= 'deleteall()'>Delete All (${datapro.length})</button>
        `
    }else{
        btndelelte.innerHTML = '';
    }
}
showdata()

//delete
function deletedate(i){
    datapro.splice(i,1);
    localStorage.products = JSON.stringify(datapro);
    showdata()
}

//deleteall
function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata()
}


//update
function updatedate(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update'
    tmp = i
    scroll({
        top : 0 ,
        behavior :'smooth'
    })
}


//search

let searchmood = 'title'
function getsearchmood(id){
    let search = document.getElementById('search')
    if(id== 'searchtitle'){
        searchmood = 'title'  
    }else{
        searchmood = 'caregory'
    }
    search.placeholder ='Search By '+ searchmood;
    search.focus()
    search.value = '';
    showdata()
}

function searchdata(value)
{
    let table = '';
    for(let i = 0 ; i < datapro.length ; i++){
        if(searchmood == 'title'){
            
                if(datapro[i].title.includes(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick ="updatedate(${i})">update</button></td>
                            <td><button onclick="deletedate(${i})">delete</button></td>
                        </tr>`
                }
            
        }else{
            
                if(datapro[i].category.includes(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick ="updatedate(${i})">update</button></td>
                            <td><button onclick="deletedate(${i})">delete</button></td>
                        </tr>`
                }
        
        }
    }    
    document.getElementById('tbody').innerHTML = table;
}