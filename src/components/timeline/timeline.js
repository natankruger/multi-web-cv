import React from 'react';
import PropTypes from 'prop-types';

class Timeline extends React.Component {
  constructor(props) {
    super();
    this.state = {
      companyName: "",
      jobDescription: {
                          pt_br: "",
                          en_us: ""
                       },
      startedAt: "",
      endedAt: ""
    }
  }

  handleInputChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    let is_pt_br = this.props.is_pt_br;

    if (field === "jobDescription") {
      value = {
        pt_br: is_pt_br ? value : this.state.jobDescription.pt_br,
        en_us: is_pt_br ? this.state.jobDescription.en_us : value
      }
    }

    this.setState({[field]: value});
  }

  removeWork(works, key) {
    works.splice(key, 1);
    this.props.setWorks(works);
  };

  addWork() {
    let t = this.props.t;

    return <section>

            <label htmlFor="companyName"><strong>{t("company_name")}</strong></label>
            <input type="text"
                   class="form-control"
                   name="companyName"
                   placeholder=""
                   value={ this.state.companyName }
                   onChange={ this.handleInputChange.bind(this) } />

    </section>
  }

  listWorks() {
    let works = this.props.works;

    let list = works.map((item, key) => {
      return <li className="job-item mt-2" key={ `timeline-item-${key}` } >
          <h3>
            { item.companyName }
          </h3>
          <p>
            { this.props.is_pt_br ? item.jobDescription.pt_br : item.jobDescription.en_us }
          </p>
          <span className="text-muted mb-2">
            { item.startedAt } - { item.endedAt }
          </span>
          { this.props.edition &&
            <div className="mt-2" >
              <button type="button" className="btn-sm btn-danger" onClick={ () => this.removeWork(works, key) }>remove</button>
            </div>
          }
        </li>
    });

    return <ul className="jobs-list p-0">
        { this.props.edition && this.addWork() }
        { list }
    </ul>
  }

  render() {

    return <section className="timeline">
      { this.listWorks() }
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  works: PropTypes.array,
  setWorks: PropTypes.func,
  addWork: PropTypes.func,
  handleInputChange: PropTypes.func,
  edition: PropTypes.boolean,
  is_pt_br: PropTypes.boolean,
}

export default Timeline;
