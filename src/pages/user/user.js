import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";
import StepWizard from 'react-step-wizard';

import Biography from '../../components/biography';
import Skills from '../../components/skills';
import TimeLine from '../../components/timeline';
import Contact from '../../components/contact';

import firebase from '../../services/firebase';

class User extends React.Component {
  constructor(props) {
    super();
    this.state = {
      lastSaved: null,
      edition: false,
      loading: true,
      name: "",
      phone: "",
      email: "",
      facebook_link: "",
      linkedin_link: "",
      biography: { pt_br: "", en_us: "" },
      skills: [],
      works: [],
      user: null,
    }
  };

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    let data = JSON.parse(localStorage.getItem('current_state'));

    if(navigator.onLine && !data)  {
      this.getDataFromFirebase(user);
    }
    else {
      this.setState(data);
      this.setState({ user: user });
    }
  }

  getDataFromFirebase(user) {
    let dbUser = firebase.firestore().collection('user_cv').doc(user.uid);

    dbUser.get().then((doc => {
      let data = doc.data();
      if(data) {
        let cv = {
                  lastSaved: data.lastSaved,
                  name: data.name,
                  phone: data.phone,
                  email: data.email,
                  facebook_link: data.facebook_link,
                  linkedin_link: data.linkedin_link,
                  biography: data.biography,
                  skills: data.skills,
                  works: data.works,
                  loading: false
                 }
        this.setState(cv);
        setTimeout(() => { localStorage.setItem('current_state', JSON.stringify(this.state)) });
      }
      else {
        this.setState({ loading: false });
      }
    }));
  }

  editionMode() {
    localStorage.setItem('old_state', JSON.stringify(this.state));
    this.setState({ edition: true })
  }

  saveEdition() {
    let saveDate = new Date();

    localStorage.removeItem('old_state');
    this.setState({ edition: false, lastSaved: saveDate });
    toast.success("Salvo com sucesso!");

    let dbUser = firebase.firestore().collection('user_cv');

    if(navigator.onLine) {
      dbUser.doc(firebase.auth().currentUser.uid).set({
        lastSaved: saveDate,
        name: !!this.state.name ? this.state.name : "",
        phone: !!this.state.phone ? this.state.phone : "",
        email: !!this.state.email ? this.state.email : "",
        facebook_link: !!this.state.facebook_link ? this.state.facebook_link : "",
        linkedin_link: !!this.state.linkedin_link ? this.state.linkedin_link : "",
        biography: this.state.biography,
        skills: this.state.skills,
        works: this.state.works
      });
    }
    console.log(this.state.edition);
    setTimeout(()=> {
      localStorage.setItem('current_state', JSON.stringify(this.state));
    });
  }

  cancelEdition() {
    let oldstate = JSON.parse(localStorage.getItem('old_state'));
    localStorage.removeItem('old_state');
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
        pt_br: is_pt_br ? value : "",
        en_us: is_pt_br ? "" : value
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
        <StepWizard initialStep={ 2 }>
          <Contact t={ t.bind(this) }
                   email={ this.state.email }
                   phone={ this.state.phone }
                   facebook_link={ this.state.facebook_link }
                   linkedin_link={ this.state.linkedin_link }
                   edition={ this.state.edition }
                   handleInputChange={ this.handleInputChange.bind(this) } />

          <Biography bio={ bio }
                     user={ this.state.user }
                     name={ this.state.name }
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

        </StepWizard>
      </form>
    </React.Fragment>
  }

  render() {
    const override = css`display: block; margin: 50px auto 0 auto;`;

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
