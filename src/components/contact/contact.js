import React from 'react';
import PropTypes from 'prop-types';

class Contact extends React.Component {

  editContacts() {

    return <React.Fragment>
      <input type="text" name="email" className="form-control custom-input" onChange={ (e) => this.props.handleInputChange(e) } />
      <input type="text" name="phone" className="form-control custom-input" onChange={ (e) => this.props.handleInputChange(e) } />
      <input type="text" name="linkedin_link" className="form-control custom-input" onChange={ (e) => this.props.handleInputChange(e) } />
      <input type="text" name="facebook_link" className="form-control custom-input" onChange={ (e) => this.props.handleInputChange(e) } />
    </React.Fragment>
  }

  listContacts() {

    return <React.Fragment>
      <p>{ this.props.email }</p>
      <p>{ this.props.phone }</p>
      <p>{ this.props.linkedin_link }</p>
      <p>{ this.props.facebook_link }</p>
    </React.Fragment>
  }

  render() {
    let t = this.props.t;

    return <section className="mt-2">
      <div className="mt-2">
        <button className="btn-sm btn-secondary" onClick={ () => this.props.goToStep(1) } disabled>{ t('contact') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(2) }>{ t('biography') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(3) }>{ t('skills') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(4) }>{ t('jobs') }</button>
      </div>
      <div>
        { this.props.edition ? this.editContacts() : this.listContacts() }
      </div>
      <h1 className="mt-3">
      { t('construction') }
      </h1>
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  phone: PropTypes.string,
  email: PropTypes.string,
  facebook_link: PropTypes.string,
  linkedin_link: PropTypes.string,
  edition: PropTypes.boolean,
  handleInputChange: PropTypes.func,
}

export default Contact;
