import React from 'react'
import emailjs from 'emailjs-com'

export const Contact = () => {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'ejcleather', e.target, process.env.REACT_APP_EMAILJS_USER_ID)
      .then((result) => {
        //   console.log(result.text);
      }, (error) => {
        //   console.log(error.text);
      });
      e.target.reset()
    }

    return (
        <div>
            <h3>
                Contact
            </h3>
            <hr />
            <div className="row">
                <div className="col-md-6 offset-md-3 mb-5">
                    <form onSubmit={sendEmail}>
                    <div className="form-group">
                            <input type="text" className="form-control" name="name" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <select className="form-control" name="inquiry" id="" defaultValue="option">
                                <option disabled value="option">What are you interested in?</option>
                                <option value="leather-goods">Leather bags or accessories</option>
                                <option value="leather-tools">Leather tools</option>
                                <option value="leather-hardware">Leather hardware</option>
                                <option value="leather-classes">Leather classes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" name="message" id="" cols="30" rows="10"></textarea>
                        </div>
                        <input type="submit" className="btn btn-secondary btn-block" value="Send us a message" />
                    </form>
                </div>
            </div>
        </div>
    )
}