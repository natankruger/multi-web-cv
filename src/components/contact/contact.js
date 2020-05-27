import React from 'react';
import PropTypes from 'prop-types';

class Contact extends React.Component {


  render() {

    return <section className="mt-2">
      <a href="https://www.linkedin.com/in/natan-kr%C3%BCger-8b5084b5/"
         target="_blank"
         rel="noopener noreferrer">
           Entre em contato comigo no meu LinkedIn
      </a>
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  edition: PropTypes.boolean
}

export default Contact;
