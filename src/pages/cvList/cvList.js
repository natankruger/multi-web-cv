import React from 'react';
import PropTypes from 'prop-types';
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";
import firebase from '../../services/firebase';

class CvList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      cvs: []
    }
  }

  componentDidMount() {
    let userCvs = firebase.firestore().collection('user_cv');

    userCvs.get().then((snapshot) => {
      let cvs = [];
      snapshot.forEach((doc) => {
        cvs.push(doc.data());
      });
      this.setState({ loading: false, cvs: cvs });
    });

  }

  list() {
    let cvs_list = this.state.cvs;

    let list = cvs_list.map((cv) => {
      return <li>
        { cv.biography.pt_br }
      </li>
    });

    return <ul>
      { list }
    </ul>
  }

  render() {
    const override = css`display: block; margin: 50px auto 0 auto;`;

    return <section>
      { this.state.loading ? <PacmanLoader size={ 25 } css={ override } color={ "#123ABC" } /> : this.list() }
    </section>
  }
}

PropTypes.CvList = {
  
}

export default CvList;
