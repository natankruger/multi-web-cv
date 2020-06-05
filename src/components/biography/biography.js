import React from 'react';
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

import firebase from '../../services/firebase';

class Biography extends React.Component {
  constructor(props) {
    super();
    this.state = { profilePicUrl: "", profilePicLoading: false }
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    this.setState({ profilePicUrl: user.photoURL });
  }

  uploadFile(e) {
    let user = firebase.auth().currentUser;
    let storage = firebase.storage().ref().child("user_images").child(user.uid);
    this.setState({ profilePicLoading: true });

    storage.put(e.target.files[0]).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        user.updateProfile( { photoURL: downloadURL } );
        this.setState({ profilePicUrl: downloadURL, profilePicLoading: false });
      });
    });

  }

  listBio() {
    let t = this.props.t;
    let maxLength = 250;
    const override = css`display: block; margin: 50px auto 0 auto;`;

    return <React.Fragment>
      { this.props.edition ? <input type="text"
                              name="name"
                              className="form-control custom-input center"
                              placeholder={ t('name_here') }
                              value={ this.props.name }
                              onChange={ (e) => this.props.handleInputChange(e) }/>
                           : <h1>{ this.props.name }</h1> }

      <div className="profile-pic-wrapper">
        { this.state.profilePicUrl && this.state.profilePicLoading ? <ClipLoader css={ override } /> : <img src={ this.state.profilePicUrl } className="profile-pic" alt="Profile Natan face" /> }
      </div>
      <div className="center">
        { this.props.edition && <input type="file" accept="image/*" className="mt-2" onChange={ (e) => this.uploadFile(e) } /> }
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
    let t = this.props.t;

    return <section className="biography mt-3" >
      <div className="mt-2 mb-2">
        <button className="btn-sm btn-outline-secondary" onClick={ () => this.props.goToStep(1) }>{ t('contact') }</button>
        <button className="btn-sm btn-secondary ml-1" onClick={ () => this.props.goToStep(2) } disabled>{ t('biography') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(3) }>{ t('skills') }</button>
        <button className="btn-sm btn-outline-secondary ml-1" onClick={ () => this.props.goToStep(4) }>{ t('jobs') }</button>
      </div>

      { isEmpty || this.props.edition ? this.listBio() : this.emptyState() }
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  handleInputChange: PropTypes.func,
  edition: PropTypes.boolean,
  bio: PropTypes.string,
  name: PropTypes.string,
  userImageUrl: PropTypes.string,
}

export default Biography;
