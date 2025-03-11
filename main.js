import conditions from "./conditions.js";

console.log(conditions)

const apiKey = '52da5407a7f04a7981681453250603';


//http://api.weatherapi.com/v1/current.json?key=52da5407a7f04a7981681453250603&q=London


const header =  document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#header__input')



function removeCard (){
    const prevCard = document.querySelector('.weather');
    if (prevCard) prevCard.remove();
}


function showError(errorMessage) {
    const html = `<section class="weather">
                                <div class="weather__card" style="display: flex; justify-content: center; align-items: center; font-size:30px;">${errorMessage}</div>
                                </section>
                                 `;
                header.insertAdjacentHTML('afterend', html);
}

function showCard ({name, country, temp, conditions, img}){
    const html = `
                            <section class="weather">
                             <div class="weather__card">
                                 <h2 class="weather__city">${name} <span>${country}</span></h2>
                                <div class="weather__data">
                                     <div class="weather__temperature">${temp}<sup>°c<sup></div>
                                     <img class="weather__img" src="${img}" alt="${img}">
                                </div>
                                <h4 class="weather__desc">${conditions}</h4>
                             </div>
                            </section>
                            `
                header.insertAdjacentHTML('afterend', html);
}


async function getWeather(city) {

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url)
    const data = await response.json();
    return data;
}



// listening submit form

form.onsubmit = async function (e) {
    // Отменяем отправку формы
    e.preventDefault();

    
    let city = input.value.trim();
    console.log(city);

    // делаем запрос на сервер
    const data = await getWeather(city)

    if (data.error){
                
        removeCard();

        showError(data.error.message);
        
    }else {

        removeCard();

       console.log(data);
       console.log(data.current.condition.code);


       const info = conditions.find(function(obj){
            return obj.code === data.current.condition.code
       })

       console.log(info);
        
       //const filePath = './images/' + (data.current.is_day ? 'day' : 'night') + '/';
       //const fileName = (data.current.is_day ? info.day : info.night) + '.png';
       //const imgPath = filePath + fileName;
       

       const condition = data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text'];

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            conditions: condition,
            //imgPath: imgPath,
            img:data.current.condition.icon,
        }

        showCard(weatherData);

    
        
    } 
  

}