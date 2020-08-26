import React from "react";


const Form = (props) => { //  В компоненте без запоминания состояния, все props передаются
                         //и они доступны при добавлении props, как аругумента функции.
                         // убираем () скобки у props  и {} после стрелки =>.
    return(                     // если компонент без state, убраем this bp стр8, render и return стр 5,6
      <form onSubmit={props.weatherMethod}>
        <input type="text" name="city" placeholder="Город"/>
        <button>Получить погоду</button>
      </form>
    ); 
}
export default Form;
 