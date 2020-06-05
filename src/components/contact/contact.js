import React from 'react';
import PropTypes from 'prop-types';

class Contact extends React.Component {


  render() {
    let t = this.props.t;

    return <section className="mt-2">
      <div className="mt-2">
        <button className="btn-sm btn-secondary" onClick={ () => this.props.goToStep(1) } disabled>{ t('contact') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(2) }>{ t('biography') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(3) }>{ t('skills') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(4) }>{ t('jobs') }</button>
      </div>
      {/* <a href="https://www.linkedin.com/in/natan-kr%C3%BCger-8b5084b5/"
         target="_blank"
         rel="noopener noreferrer">
           Entre em contato comigo no meu LinkedIn
      </a> */}
      <h1 className="mt-3">
      { t('construction') }
      </h1>
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  edition: PropTypes.boolean
}

export default Contact;
