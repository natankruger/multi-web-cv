import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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

  validations() {
    let { companyName, jobDescription } = this.state;
    let t = this.props.t;
    let is_pt_br = this.props.is_pt_br;

    if (companyName.length <= 0){
      toast.error(t('missing_company_name'));
      return;
    }

    if ( (is_pt_br && jobDescription.pt_br.length <= 0) || (!is_pt_br && jobDescription.en_us.length <= 0)){
      toast.error(t('missing_job_description'));
      return;
    }

    this.props.addWork(this.state);
  }

  addWorkFields() {
    let t = this.props.t;
    let maxLength = 250;
    let is_pt_br = this.props.is_pt_br;
    let value = is_pt_br ? this.state.jobDescription.pt_br : this.state.jobDescription.en_us;

    return <section className="new-job center mt-3" >

            <label htmlFor="companyName" className="mt-2"><strong>{t("company_name")}</strong></label>
            <input type="text"
                   className="form-control custom-input center"
                   name="companyName"
                   placeholder=""
                   value={ this.state.companyName }
                   onChange={ this.handleInputChange.bind(this) } />

            <label htmlFor="jobDescription" className="mt-2"><strong>{ t('job_description') }</strong></label>
            <textarea id="jobDescription"
                      name="jobDescription"
                      className="form-control custom-text-area"
                      maxLength={ maxLength }
                      rows="3"
                      value={ value }
                      onChange={ (e) => this.handleInputChange(e) }></textarea>
                      <p>{ maxLength - value.length }</p>

            <div className="dates center mt-2" >
              <label htmlFor="startedAt"><strong>{ t('startedAt') }</strong></label>
              <input type="month"
                     className="form-control custom-input center"
                     name="startedAt"
                     placeholder=""
                     value={ this.state.startedAt }
                     onChange={ this.handleInputChange.bind(this) } />

              <label htmlFor="endedAt"><strong>{ t('endedAt') }</strong></label>
              <input type="month"
                     className="form-control custom-input center"
                     name="endedAt"
                     placeholder=""
                     value={ this.state.endedAt }
                     onChange={ this.handleInputChange.bind(this) } />
            </div>

            <button type="button" className="btn-sm btn-outline-info" onClick={ () => this.validations() }>{ t('add') }</button>
    </section>
  }

  listWorks() {
    let { works, t } = this.props;

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
              <button type="button" className="btn-sm btn-danger" onClick={ () => this.removeWork(works, key) }>{ t('remove') }</button>
            </div>
          }
        </li>
    });

    return <ul className="jobs-list p-0">
        { list }
    </ul>
  }

  emptyState() {
    let t = this.props.t
    return <h3>{ t('timeline_empty_state') }</h3>
  }

  render() {
    let isEmpty = !!this.props.works && this.props.works.length > 0;
    let t = this.props.t;

    return <section className="timeline">
      <div className="mt-2">
        <button className="btn-sm btn-outline-secondary" onClick={ () => this.props.goToStep(1) }>{ t('contact') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(2) }>{ t('biography') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(3) }>{ t('skills') }</button>
        <button className="btn-sm btn-secondary ml-1" onClick={ () => this.props.goToStep(4) } disabled>{ t('jobs') }</button>
      </div>

      { this.props.edition && this.addWorkFields() }
      { isEmpty || this.props.edition ? this.listWorks() : this.emptyState() }
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
