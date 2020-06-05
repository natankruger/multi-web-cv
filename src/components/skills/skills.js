import React from 'react';
import PropTypes from 'prop-types';

class Skills extends React.Component {
  constructor(props){
    super();
    this.state = {
      skill: "",
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  removeSkills(key, skills) {
    skills.splice(key, 1);
    this.props.setSkills(skills);
  }

  addSkills() {
    if (this.state.skill === "")
    return;

    this.props.addSkills({ name: this.state.skill });
    this.setState({ skill: "" });
  }

  listSkills() {
    let t = this.props.t;
    let skills = this.props.skills;

    let list = skills.map((item, key) => {
      return <li className="job-item mt-2" key={ `skills-item-${key}` } >
          <p>
            { item.name }
            {
              this.props.edition && <button type="button" title="remove button" className="btn-sm btn-danger ml-2" onClick={ () => this.removeSkills(key, skills) }>
                { t('remove') }
            </button>
            }
          </p>
        </li>
    });

    return <ul className="skills-list p-0 mt-2">
      <h3>
        {t('skills')}
      </h3>
      {
        this.props.edition &&
        <div className="d-flex">
          <input type="text"
                 className="form-control custom-input ml-auto"
                 placeholder="New Skill"
                 name="skill"
                 value={ this.state.skill }
                 onChange={ this.handleInputChange.bind(this) } />

          <button type="button" className="btn-sm btn-outline-info mr-auto" onClick={() => this.addSkills(skills) } >{t('add')}</button>
        </div>
      }
      {list}
    </ul>
  }

  emptyState() {
    let t = this.props.t;

    return <h3>{ t('skills_empty_state') }</h3>
  }

  render() {
    let isEmpty = !!this.props.skills && this.props.skills.length > 0;
    let t = this.props.t;

    return <section className="skills">
      <div className="mt-2">
        <button className="btn-sm btn-outline-secondary" onClick={ () => this.props.goToStep(1) }>{ t('contact') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(2) }>{ t('biography') }</button>
        <button className="btn-sm btn-secondary ml-1" onClick={ () => this.props.goToStep(3) } disabled>{ t('skills') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(4) }>{ t('jobs') }</button>
      </div>

      { isEmpty || this.props.edition ? this.listSkills() : this.emptyState() }
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  handleInputChange: PropTypes.func,
  setSkills: PropTypes.func,
  addSkills: PropTypes.func,
  skills: PropTypes.array,
  edition: PropTypes.boolean
}

export default Skills;
