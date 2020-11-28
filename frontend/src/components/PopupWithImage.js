import React from 'react';

function PopupWithImage(props) {

  return (
    <section className={`popup popup_type_image ${props.isOpen && 'popup_state_opened'}`}  onClick={(e)=>{props.onOutsideClick(e,'popup popup_type_image')}}>
    <div className="popup__container">
      <div className="popup__image-modal">
        <button className="popup__close popup__close_type_image" type="button" onClick={props.onClose}></button>  
        <figure>
          <img className="popup__image" src={props.card && props.card.link} alt="place"/>
          <figcaption className="popup__image-caption"></figcaption>
        </figure>
      </div>
    </div>
    </section>
  )
}

export default PopupWithImage;