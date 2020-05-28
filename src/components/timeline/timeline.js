import React from 'react';
import PropTypes from 'prop-types';

class Timeline extends React.Component {
  listWorks() {

    let list = this.props.works.map((item, key) => {
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
        </li>
    });

    return <ul className="jobs-list p-0">
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
  edition: PropTypes.boolean
}

export default Timeline;
