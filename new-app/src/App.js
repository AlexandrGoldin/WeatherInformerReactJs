import React from "react";
import Info from "./components/info";
import Form from"./components/form";
import Weather from "./components/weather";


const API_KEY = "39602d7541d331a6332ed41c7ce0d14d";

class App extends React.Component { 
// объект для сохранения данных в комп "Weather" после URL запроса
state = {
 temp: undefined, // переменные
 city: undefined,
 country: undefined,
 sunrise: undefined,
 sunset: undefined,
 wind: undefined,
 error: undefined 
}

// метод этого комп. будем вызывать асинхронно для обновл данных, а не страницы
gettingWeather = async(event) => {   // event.preventDefault(); чтобы вся страница не перезагружалась
event.preventDefault();
var city = event.target.elements.city.value; // присваиваем значение "city" и вставляем вместо Киев в const api_url

if(city){
const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
const data = await api_url.json(); /*асинхр преобразуем в формат json для удобства считывания*/
//console.log(data); была нужна для вывода отладочной информации на консоль

// перевод из миллисекунд в ч:м:с
var sunrise = data.sys.sunrise; 
var date = new Date();
date.setTime(sunrise);
var sunrise_date = date.getHours() + ":" + date.getMinutes() +":" + date.getSeconds();

var sunset=data.sys.sunset;
var date2=new Date();
date2.getTime(sunset);
var sunset_date = date2.getHours() + ":" + date2.getMinutes() +":" + date2.getSeconds();

// устанавливаем значения
this.setState({
  temp: data.main.temp,
  city: data.name,
  country: data.sys.country,
  sunrise: sunrise_date,
  sunset: sunset_date,//вместо data.sys.sunset,
  wind: data.wind.speed,
  error: undefined
});
}
else{ 
  this.setState({
  temp: undefined, // переменные
 city: undefined,   
 country: undefined,
 sunrise: undefined,
 sunset: undefined,
 wind: undefined,
 error: "Введите название города по английски"
  });
}           
}
 // спомощью свойств передаем переменные в компоненты
  render() {
    return (
     /*создаем блок div c классом  wrapper для добавления его стилей из App.js */
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info"> 
                <Info/> 
              </div>
              <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather}/>
              <Weather 
                temp={this.state.temp}
                city = {this.state.city}
                country={this.state.country} 
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                wind={this.state.wind}
                error={this.state.error} 
                />
              </div>
            </div>
          </div>  
        </div>     
      </div>
    );
  }
} 

export default App;
