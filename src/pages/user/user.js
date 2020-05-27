import React from 'react';
import PropTypes from 'prop-types';

import Biography from '../../components/biography';
import Skills from '../../components/skills';
import TimeLine from '../../components/timeline';
import Contact from '../../components/contact';

class User extends React.Component {
  constructor(props) {
    super();
    this.state = {
      edition: false,
      skills: [
                {
                  name: "Ruby on Rails",
                  level: ""
                },
                {
                  name: "Javascript",
                  level: ""
                },
                {
                  name: "React",
                  level: ""
                },
                {
                  name: "AngularJS",
                  level: ""
                },
                {
                  name: "C#",
                  level: ""
                },
                {
                  name: "Java",
                  level: ""
                },
                {
                  name: "AngularJS",
                  level: ""
                },
              ],
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    });
  };

  setSkills(skills) {
    this.setState({ skills })
  }

  addSkills(skill) {
    let skills = this.state.skills;
    skills.push(skill);
    this.setState(skills);
  }

  editionMode() {
    localStorage.setItem('oldState', JSON.stringify(this.state));
    this.setState({ edition: true })
  }

  saveEdition() {
    localStorage.removeItem('oldState');
    this.setState({ edition: false })
  }

  cancelEdition() {
    let oldstate = JSON.parse(localStorage.getItem('oldState'));
    localStorage.removeItem('oldState');
    this.setState(oldstate)
  }

  editionControl() {
    if( this.state.edition ){
      return <div>
        <button type="button" className="btn-sm btn-outline-info mt-2" onClick={ this.cancelEdition.bind(this) }>Cancel</button>
        <button type="button" className="btn-sm btn-outline-info mt-2 ml-2" onClick={ this.saveEdition.bind(this) }>Save</button>
      </div>
    }
    else {
      return <button type="button" className="btn-sm btn-outline-info mt-2" onClick={ this.editionMode.bind(this) }>Edit</button>
    }
  }

  render() {
    const t = this.props.t;

    return <section>
      { this.editionControl() }

      <form>
          <Contact edition={ this.state.edition }
                   handleInputChange={ this.handleInputChange.bind(this) } />

          <Biography bio={t('biograpy-description')}
                     edition={ this.state.edition }
                     handleInputChange={ this.handleInputChange.bind(this) } />

          <Skills t={t.bind(this)}
                  edition={ this.state.edition }
                  handleInputChange={ this.handleInputChange.bind(this) }
                  setSkills={ this.setSkills.bind(this) }
                  addSkills={ this.addSkills.bind(this) }
                  skills={ this.state.skills } />

          <TimeLine t={t.bind(this)}
                    edition={ this.state.edition }
                    handleInputChange={ this.handleInputChange.bind(this) } />
      </form>
    </section>
  }
};

PropTypes.User = {
  t: PropTypes.func,
  edition: PropTypes.boolean
};

export default User;
