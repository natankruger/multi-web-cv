import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";

import Biography from '../../components/biography';
import Skills from '../../components/skills';
import TimeLine from '../../components/timeline';
import Contact from '../../components/contact';

import firebase from '../../services/firebase';

class User extends React.Component {
  constructor(props) {
    super();
    this.state = {
      edition: false,
      loading: true,
      biography: { pt_br: "", en_us: "" },
      skills: [],
      works: [],
    }
  };

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    let dbUser = firebase.firestore().collection('user_cv').doc(user.uid);
    dbUser.get().then((doc => {
      let data = doc.data();
      if(data) {
        let cv = {
                  biography: data.biography,
                  skills: data.skills,
                  works: data.works,
                  loading: false
                 }
        this.setState(cv);
      }
      else {
        this.setState({loading: false});
      }
    }))
  }

  editionMode() {
    localStorage.setItem('oldState', JSON.stringify(this.state));
    this.setState({ edition: true })
  }

  saveEdition() {
    localStorage.removeItem('oldState');
    this.setState({ edition: false });
    toast.success("Salvo com sucesso!");

    let dbUser = firebase.firestore().collection('user_cv');

    dbUser.doc(firebase.auth().currentUser.uid).set({
      biography: this.state.biography,
      skills: this.state.skills,
      works: this.state.works
    });
  }

  cancelEdition() {
    let oldstate = JSON.parse(localStorage.getItem('oldState'));
    localStorage.removeItem('oldState');
    this.setState(oldstate);
    toast.info("Você cancelou a edição, as informações foram revertidas ao que eram antes de editar.");
  }

  editionControl() {
    let { t } = this.props;

    if( this.state.edition ){
      return <div>
        <button type="button" className="btn-sm btn-outline-info mt-2" onClick={ this.cancelEdition.bind(this) }>{ t("cancel") }</button>
        <button type="button" className="btn-sm btn-outline-info mt-2 ml-2" onClick={ this.saveEdition.bind(this) }>{ t("save") }</button>
      </div>
    }
    else {
      return <button type="button" className="btn-sm btn-outline-info mt-2" onClick={ this.editionMode.bind(this) }>{ t("edit_profile") }</button>
    }
  }

  is_pt_br() {
    return this.props.i18n.language === "pt_br"
  }

  handleFormSubmit(event) {
    event.preventDefault();
  }

  handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value
    let is_pt_br = this.is_pt_br();

    if( name === "biography" ) {
      value = {
        pt_br: is_pt_br ? value : this.state.biography.pt_br,
        en_us: is_pt_br ? this.state.biography.pt_br : value
      }
    }

    this.setState({
      [name]: value
    });
  };

  setSkills(skills) {
    this.setState({ skills })
  }

  setWorks(works) {
    this.setState({ works })
  }

  addSkills(skill) {
    let skills = this.state.skills;
    skills.push(skill);
    this.setState(skills);
  }

  addWork(work) {
    let works = this.state.works;
    works.unshift(work);
    this.setState(works);
  }

  components() {
    const { t } = this.props;
    let bio;

    if ( this.state.biography ) {
      bio = this.is_pt_br() ? this.state.biography.pt_br : this.state.biography.en_us;
    }
    else {
      bio = "";
    }

    return <React.Fragment>
      { this.editionControl() }

      <form onSubmit={ this.handleFormSubmit.bind(this) }>
        <Contact edition={ this.state.edition }
                handleInputChange={ this.handleInputChange.bind(this) } />

        <Biography bio={ bio }
                  edition={ this.state.edition }
                  t={ t.bind(this) }
                  handleInputChange={ this.handleInputChange.bind(this) } />

        <Skills t={t.bind(this)}
                edition={ this.state.edition }
                handleInputChange={ this.handleInputChange.bind(this) }
                setSkills={ this.setSkills.bind(this) }
                addSkills={ this.addSkills.bind(this) }
                skills={ this.state.skills } />

        <TimeLine t={t.bind(this)}
                  edition={ this.state.edition }
                  is_pt_br={ this.is_pt_br() }
                  works={ this.state.works }
                  addWork={ this.addWork.bind(this) }
                  setWorks={ this.setWorks.bind(this) }
                  handleInputChange={ this.handleInputChange.bind(this) } />
      </form>
    </React.Fragment>
  }

  render() {
    const override = css`display: block; margin: 50px auto 0 auto; border-color: red;`;

    return <section>
      { this.state.loading ? <PacmanLoader size={ 25 } css={ override } color={ "#123ABC" } /> : this.components() }
    </section>
  }
};

PropTypes.User = {
  t: PropTypes.func,
  edition: PropTypes.boolean
};

export default User;
