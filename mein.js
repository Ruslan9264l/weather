const apiKey = '9bf4f03e14db4dd0a18130219230503'




// Получаєм значення з форми
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity')
let city;
const header = document.querySelector('.header')

//Слухаєм відправку форми
form.onsubmit = function (e) {
    //Відміняєм відправку форми
    e.preventDefault();

    //Берем значення з input
    city = input.value.trim();

    //Робим запит на сервер
    //Адреса запиту
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    //Виконуєм запит
    fetch(url).then((Response) => {
        return Response.json()
    }).then((data) => {

        //Перевірка на помилку
        if (data.error) {
            //Якщо є помилка - показуєм її

            const prevCard = document.querySelector('.card')
        if (prevCard) prevCard.remove();

            //відобразити карточку з помилкою
            const HTML = `<div class="card">${data.error.message}</div>`;
            //Відображаєм карточку на сторінці
        
            header.insertAdjacentHTML('afterend', HTML)
        }else {
            //відображаєм данні в карточці

        //Видаляєм попередню карточку
        const prevCard = document.querySelector('.card')
        if (prevCard) prevCard.remove();

        //Розмітка для карточки
        const HTML = `<div class="card">
                            <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
                            
                            <div class="card-weather">
                                <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                                <img class="card-img" src="./img/30.png" alt="">
                            </div>
                            
                            <div class="card-drscription">${data.current.condition.text}</div>
                        </div>`

        //Відображаєм карточку на сторінці
        
        header.insertAdjacentHTML('afterend', HTML)
        }    
    })
}