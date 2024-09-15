let tid=document.getElementById("tb");
let ti=document.getElementById("tid");
let arr=[{name:"car",prise:"10l",desc:"uyweb jebdjmab djhwbd",image:"./i1"},
{name:"car",prise:"10l",desc:"uyweb jebdjmab djhwbd khfkjsdhfkjsf sdjfbkjsdf",image:"./i1"},
{name:"car",prise:"10l",desc:"uyweb jebdjmab",image:"./i1"},
{name:"car",prise:"10l",desc:"uyweb jebdjmab djhwbd jhdjsbfkjewf",image:"./i1"},
{name:"car",prise:"10l",desc:"uyweb jebdjmab djhwbd",image:"./i1"},
]
for(let i=0;i<arr.length;i++){
let newtr=document.createElement("tr")
//tid.appendChild(newtr);
    let newtd=document.createElement("td")
    newtd.textContent=arr[i].name;
    newtr.appendChild(newtd);
    newtd.textContent=arr[i].prise;
    newtr.appendChild(newtd);
    if(arr[i].desc.length<20){
    newtd.textContent=arr[i].desc;
    }
    else
    newtd.textContent=arr[i].name;
    newtr.appendChild(newtd);
    newtd.textContent=arr[i].image;
    newtd.appendChild(newtd);
tid.appendChild(newtr)

}

ti.appendChild(tid)