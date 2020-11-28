import React from 'react';

function AddPlacePopup(props){
  //loading
  const [loading, setLoading] = React.useState(false);
  
  //fields
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    if(!formInvalid){
      e.preventDefault();
      // Pass the values of the managed components to the external handler
      props.onAddPlace(name, link);
      //set loading
      setLoading(true);
    }
  } 

  React.useEffect(()=>{
    setName('');
    setLink('');
    setFormInvalid(true);
    setLoading(false);
  },[props.isOpen])

  /* CLIENT FORM VALIDATION
    By default, no validation error for blank required field is 
    shown at the beginning, but the submit button will be
    disabled.

    The button style/disabled state and individual field validations are 
    independent of one another. Field validations control only the field styles, 
    and form/button validation controls the ability to send the form
  */
  const formRef = React.useRef();
  const [nameError, setNameError] = React.useState('');
  const [linkError, setLinkError] = React.useState('');
  const [formInvalid, setFormInvalid] = React.useState(true)

  function handleName(e) {
    //set value
    setName(e.target.value);
    //set error
    props.fieldValidator(e.target, setNameError)
  }

  function handleLink(e) {
    //set value
    setLink(e.target.value);
    //set error
    props.fieldValidator(e.target, setLinkError)
  }
  
    function validateForm(){
      props.formValidator(formRef.current,'.popup__input')? setFormInvalid(true) : setFormInvalid(false);
    }

  return(
    <section className={`popup popup_type_add-card ${props.isOpen  && 'popup_state_opened'}`} onClick={(e)=>{props.onOutsideClick(e,'popup_type_add-card')}}>
    <div className="popup__container">
      <form className={`popup__form popup__form_type_add-card`} onSubmit={handleSubmit} onChange={validateForm} ref={formRef}>
        <button className={`popup__close popup__close_type_add-card`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">New Place</h4>
        <input className={`popup__input popup__input-card-name ${nameError !=='' && 'popup__input_type_error'}`} id="card-name-input" type="text" name="name" placeholder="Title" required minLength="1" maxLength="30" value={name} onChange={handleName}/>
      <span className={`popup__input-error" id="card-name-input-error ${nameError !=='' && 'popup__error_visible'}`}>{nameError}</span>
      
      <input className={`popup__input popup__input-card-url ${linkError !=='' && 'popup__input_type_error'}`} id="url-input" type="url" name="link" placeholder="Image URL" required value={link} onChange={handleLink}/>
      <span className={`popup__input-error ${linkError !=='' && 'popup__error_visible'}`} id="url-input-error">{linkError}</span>
  <button className={`popup__submit popup__add-card-submit ${formInvalid && 'popup__submit_disabled'}`} disabled={formInvalid} type="submit">{`${loading ? 'Loading...':'Create'}`}</button>
      </form>
    </div>
  </section>  
  )
}

export default AddPlacePopup;