const apiKey = '52da5407a7f04a7981681453250603';


//http://api.weatherapi.com/v1/current.json?key=52da5407a7f04a7981681453250603&q=London


const header =  document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#header__input')


// listening submit form

form.onsubmit = function (e) {

    


    // Отменяем отправку формы
    e.preventDefault();

    
    let city = input.value.trim();
    console.log(city);

    // делаем запрос на сервер

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    //выполняем запрос
    fetch(url)
        .then( (response) => {
            return response.json();
        })
        .then ( (data) => {
            console.log(data);    
            
            // Проверка на ошибку
            
            if (data.error){
                
                const prevCard = document.querySelector('.weather');
                if (prevCard) prevCard.remove();
                
                
                const html = `<section class="weather">
                                <div class="weather__card" style="display: flex; justify-content: center; align-items: center; font-size:30px;">${data.error.message}</div>
                                </section>
                                 `;
                header.insertAdjacentHTML('afterend', html);
            }else {
                
                console.log(data.location.name);
                console.log(data.location.country);
                console.log(data.current.temp_c);
                console.log(data.current.condition.text);

                // Отображаем картачки

                // yдаляем карточки
                
                const prevCard = document.querySelector('.weather');
                if (prevCard) prevCard.remove();

                // Разметкадля  картачки

                const html = `
                            <section class="weather">
                             <div class="weather__card">
                                 <h2 class="weather__city">${data.location.name} <span>${data.location.country}</span></h2>
                                <div class="weather__data">
                                     <div class="weather__temperature">${data.current.temp_c}<sup>°c<sup></div>
                                     <img class="Weather__img" src="./images/Drizzle&Sun.png" alt="Drizzle&Sun.png">
                                </div>
                                <h4 class="weather__desc">${data.current.condition.text}</h4>
                             </div>
                            </section>
                            `
                header.insertAdjacentHTML('afterend', html);
            }    


            
        
        })



}