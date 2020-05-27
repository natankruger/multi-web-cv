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
                remove
            </button>
            }
          </p>
        </li>
    });

    return <ul className="skills-list p-0 mt-2">
      <h3>
        {t("skills")}
      </h3>
      {
        this.props.edition &&
        <div className="d-flex">
          <input type="text" className="form-control w-25 ml-auto" placeholder="New Skill" name="skill" value={ this.state.skill } onChange={ this.handleInputChange.bind(this) } />
          <button type="button" className="btn-sm btn-outline-info mr-auto" onClick={() => this.addSkills(skills) } >Add</button>
        </div>
      }
      {list}
    </ul>
  }

  render() {

    return <section className="skills">
      { this.listSkills() }
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
