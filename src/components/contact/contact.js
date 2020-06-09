import React from 'react';
import PropTypes from 'prop-types';

class Contact extends React.Component {


  emptyState() {
    let t = this.props.t;

    return <h3 className="mt-3">
    { t('contact_empty_state') }
    </h3>
  }

  editContacts() {
    let t = this.props.t;

    return <React.Fragment>
      <label htmlFor="email" className="mt-2">Email</label>
      <input type="text" name="email" className="form-control custom-input center" onChange={ (e) => this.props.handleInputChange(e) } />

      <label htmlFor="phone">{ t('phone') }</label>
      <input type="tel" name="phone" className="form-control custom-input center" onChange={ (e) => this.props.handleInputChange(e) } />

      <label htmlFor="linkedin_link">Linkedin URL</label>
      <input type="text" name="linkedin_link" className="form-control custom-input center" onChange={ (e) => this.props.handleInputChange(e) } />

      <label htmlFor="facebook_link">Facebook URL:</label>
      <input type="text" name="facebook_link" className="form-control custom-input center" onChange={ (e) => this.props.handleInputChange(e) } />
    </React.Fragment>
  }

  listContacts() {
    let { email, phone, linkedin_link, facebook_link } = this.props;

    if( !email && !phone && !linkedin_link && !facebook_link ) {
      return this.emptyState();
    }

    return <React.Fragment>
      <p>{ email }</p>
      <p>{ phone }</p>
      <p>{ linkedin_link }</p>
      <p>{ facebook_link }</p>
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
