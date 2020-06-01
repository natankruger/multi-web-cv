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

  // startedAtYear: "",
  // startedAtMonth: "",
  // endedAtYear: "",
  // endedAtMonth: "",
  // startedAt: () => `${ this.state.startedAtMonth || "" } ${ this.state.startedAtYear || "" }`,
  // endedAt: () => `${ this.state.endedAtMonth || "" } ${ this.state.endedAtYear || "" }`

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

  addWorkFields() {
    let t = this.props.t;
    let maxLength = 250;
    let is_pt_br = this.props.is_pt_br;
    let value = is_pt_br ? this.state.jobDescription.pt_br : this.state.jobDescription.en_us;

    return <section className="new-job center" >

            <label htmlFor="companyName"><strong>{t("company_name")}</strong></label>
            <input type="text"
                   className="form-control custom-input center"
                   name="companyName"
                   placeholder=""
                   value={ this.state.companyName }
                   onChange={ this.handleInputChange.bind(this) } />

            <label htmlFor="jobDescription">{ t('job_description') }</label>
            <textarea id="jobDescription"
                      name="jobDescription"
                      className="form-control custom-text-area"
                      maxLength={ maxLength }
                      rows="3"
                      value={ value }
                      onChange={ (e) => this.handleInputChange(e) }></textarea>
                      <p>{ maxLength - value.length }</p>

            <div className="dates center">

              <label htmlFor="startedAt">{ t('startedAt') }</label>
              <input type="text"
                     className="form-control custom-input center"
                     name="startedAt"
                     placeholder=""
                     value={ this.state.startedAt }
                     onChange={ this.handleInputChange.bind(this) } />


              <label htmlFor="endedAt">{ t('endedAt') }</label>
              <input type="text"
                     className="form-control custom-input center"
                     name="endedAt"
                     placeholder=""
                     value={ this.state.endedAt }
                     onChange={ this.handleInputChange.bind(this) } />

            </div>

            <button type="button" className="btn-sm btn-outline-info" onClick={ () => this.props.addWork(this.state) }>{ t('add') }</button>

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
        { list }
    </ul>
  }

  render() {

    return <section className="timeline">
      { this.props.edition && this.addWorkFields() }
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
