import React from 'react';
import PropTypes from 'prop-types';

class Biography extends React.Component {

  listBio() {
    let profilePicUrl = "https://scontent.fjoi5-1.fna.fbcdn.net/v/t1.0-9/60818093_2425843884146906_306498564278714368_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_oc=AQliXoQqTLqG1E8PzjgpzDSOjMoAF3O-vIo6c1XeHV3LCML5LBL3qCHG2AjoiivVt5tMWHpzlv1kW5bj4LUmi9iD&_nc_ht=scontent.fjoi5-1.fna&oh=df1931a37685f215cc5fd50e2bef4361&oe=5ED281AE"
    let t = this.props.t;
    let maxLength = 250;

    return <React.Fragment>
      <div>
        <img src={ profilePicUrl } className="profile-pic" alt="Profile Natan face" />
        </div>
        <div className="mt-3">
          { this.props.edition ? <div className="form-group">
                                  <label htmlFor="biography"><h3>{ t('biography') }</h3></label>
                                  <textarea id="biography"
                                            name="biography"
                                            className="form-control custom-text-area"
                                            maxLength={ maxLength }
                                            rows="3"
                                            value={ this.props.bio }
                                            onChange={ (e) => this.props.handleInputChange(e) }></textarea>
                                            <p>{ maxLength - this.props.bio.length }</p>
                                </div>
                              :  <p> { this.props.bio } </p> }
      </div>
      </React.Fragment>
  }

  emptyState() {
    let t = this.props.t;

    return <h3>{ t('biography_empty_state') }</h3>
  }

  render() {


    return <section className="biography mt-3" >
      { this.props.bio && this.props.bio.length > 0 ? this.listBio() : this.emptyState() }
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  handleInputChange: PropTypes.func,
  edition: PropTypes.boolean,
  bio: PropTypes.string
}

export default Biography;
