import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../../services/firebase';

class Biography extends React.Component {
  constructor(props) {
    super();
    this.state = { profilePicUrl: "" }
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    console.log(user);
    this.setState({ profilePicUrl: user.photoURL });
  }

  uploadFile(e) {
    let user = firebase.auth().currentUser;
    let storage = firebase.storage().ref().child("user_images").child(user.uid);
    storage.put(e.target.files[0]).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        user.updateProfile( { photoURL: downloadURL } );
        this.setState({ profilePicUrl: downloadURL })
      });
    });

  }

  listBio() {
    let t = this.props.t;
    let maxLength = 250;

    return <React.Fragment>
      <div>
        { this.props.edition && <input type="file" onChange={ (e) => this.uploadFile(e) } /> }
        { this.state.profilePicUrl && <img src={ this.state.profilePicUrl } className="profile-pic" alt="Profile Natan face" /> }
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
    let isEmpty = !!this.props.bio && this.props.bio.length > 0;

    return <section className="biography mt-3" >
      { isEmpty || this.props.edition ? this.listBio() : this.emptyState() }
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  handleInputChange: PropTypes.func,
  edition: PropTypes.boolean,
  bio: PropTypes.string,
  userImageUrl: PropTypes.string,
}

export default Biography;
