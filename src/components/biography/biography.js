import React from 'react';
import PropTypes from 'prop-types';

class Biography extends React.Component {

  render() {
    let profilePicUrl = "https://scontent.fjoi5-1.fna.fbcdn.net/v/t1.0-9/60818093_2425843884146906_306498564278714368_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_oc=AQliXoQqTLqG1E8PzjgpzDSOjMoAF3O-vIo6c1XeHV3LCML5LBL3qCHG2AjoiivVt5tMWHpzlv1kW5bj4LUmi9iD&_nc_ht=scontent.fjoi5-1.fna&oh=df1931a37685f215cc5fd50e2bef4361&oe=5ED281AE"

    return <section className="biography mt-3" >
      <div>
        <img src={ profilePicUrl } className="profile-pic" alt="Profile Natan face" />
      </div>
      <div className="mt-3">
        <p>
          { this.props.bio }
        </p>
      </div>
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  edition: PropTypes.boolean
}

export default Biography;
