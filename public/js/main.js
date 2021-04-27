const cityInput=document.querySelector('#cityInput');
const city_name=document.getElementById('city-name');
const temp_status=document.getElementById('temp-status');
const temp_real_val=document.querySelector('.temp-real-val');
const dataHide=document.querySelector('.middle-layer');

const submitBtn=document.getElementById('submitBtn');

const getInfo=async(event)=>{
   event.preventDefault();
  let cityVal=cityInput.value;
  
  if(cityVal == ""){
    city_name.innerText="Please write city before search";
    dataHide.classList.add('data-hide');
  }
  else{
    try{
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=3b7debfbbe38135147fc80eab35bdfcc`;
    const response=await fetch(url);
    const data=await response.json();
    const arrData=[data];

    city_name.innerText=`${arrData[0].name}, ${arrData[0].sys.country}`;
    const tempKelvin=arrData[0].main.temp;
    const tempCelsius=tempKelvin - 273.15;
    temp_real_val.innerText=+tempCelsius.toFixed();
    const tempMod=arrData[0].weather[0].main;

    
    if(tempMod == "clear"){
      temp_status.innerText = "Sunny";
      // "<i class="fas fa-sun"></i>"
    } 
   else if(tempMod == "Rain"){
    temp_status.innerText="Rainy";    //"<i class="fas fa-cloud-rain"></i>"
    }
   else if(tempMod == "Haze"){
    temp_status.innerText="Haze"; 
   
    // "<i class="fas fa-smog"></i>"
    }
   else if(tempMod == "Clouds"){
    temp_status.innerText="Cloudy";     //"<i class="fas fa-cloud"></i>"
    }
    dataHide.classList.remove('data-hide');
    }// try block ends
    catch(err){
      city_name.innerText=" City name incorrect";
      dataHide.classList.add('data-hide');
    }// catch ends
  }// Else ends
}


submitBtn.addEventListener('click',getInfo);



const getCurrentDay = ()=>{
  let week=new Array(7);
  week[0]= "Sun";
  week[1]= "Mon";
  week[2]= "Tue";
  week[3]= "Wed";
  week[4]= "Thu";
  week[5]= "Fri";
  week[6]= "Sat";

  let d=new Date();
  let result=week[d.getDay()];
  return result;
  
}

const getCurrTime=()=>{
  
  let months= ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];

  var datee=new Date();
  var month =months[datee.getMonth()];
  var date= datee.getDate(); 
  var hours= datee.getHours();
  var mins= datee.getMinutes();
  var periods="AM";
  if(hours>11){
    periods="PM";
    if(hours>12)
      hours-=12;
  }
  if(mins<10){
    mins='0' + mins;
     }

return `${month} ${date} |  ${hours}:${mins}   ${periods}`;
}

const day=document.getElementById('day');
const today=document.getElementById('today-data');
  day.innerText= getCurrentDay();
  today.innerText=getCurrTime();