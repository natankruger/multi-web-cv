import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Biography from '../../components/biography';
import Skills from '../../components/skills';
import TimeLine from '../../components/timeline';
import Contact from '../../components/contact';

class User extends React.Component {
  constructor(props) {
    super();
    this.state = {
      edition: false,
      biography: { pt_br: "Desenvolvedor Full-stack, engenheiro da computação, autodidata e pesquisador",
                   en_us: "Full-stack developer, Computer engineer, Self-taught and researcher." } ,
      skills: [
                {
                  name: "Ruby on Rails",
                  level: ""
                },
                {
                  name: "Javascript",
                  level: ""
                },
                {
                  name: "React",
                  level: ""
                },
                {
                  name: "AngularJS",
                  level: ""
                },
                {
                  name: "C#",
                  level: ""
                },
                {
                  name: "Java",
                  level: ""
                },
                {
                  name: "AngularJS",
                  level: ""
                },
              ],
      works: [
              {
                companyName: "Zygo",
                jobDescription: {
                                  pt_br: "Usando Ruby on Rails, Javascript e um pouco de React, desenvolvendo um software que tem como foco a lealdade do cliente para restaurantes, bares, pubs e etc.",
                                  en_us: "Using Ruby on Rails, Javascript and some React, developing a software that focuses on customer loyalty for restaurants, bars, pubs and etc."
                                },
                startedAt: "jul 2019",
                endedAt: "Present"
              },
              {
                companyName: "Neomind",
                jobDescription: {
                                  pt_br: "Usando Java e AngularJS, desenvolvendo um ECM, BPM, Analytics, Social e Portal, chamado de Fusion que tem uma pegada de nunca usar papel.",
                                  en_us: "Using Java and AngularJS, Developing a ECM, BPM, Analytics, Social and Portal features, called Fusion that has a full paperless approach."
                                },
                startedAt: "mar 2018",
                endedAt: "may 2019"
              },
              {
                companyName: "OpenTech",
                jobDescription: {
                                  pt_br: "Essa empresa faz um software de rastreamento de caminhões.",
                                  en_us: "This company makes a truck tracking system"
                                },
                startedAt: "dec 2016",
                endedAt: "jun 2017"
              },
              {
                companyName: "Ilpea do Brasil LTDA",
                jobDescription: {
                                  pt_br: "É uma empresa que faz gaxeta. Porém eu trabalhei no CPD (Centro de processamento de dados) como um estagiário.",
                                  en_us: "It is a gasket company, but i worked on the data center of the company as a intern."
                                },
                startedAt: "dec 2015",
                endedAt: "dec 2016"
              },
             ],

    }
  };

  editionMode() {
    localStorage.setItem('oldState', JSON.stringify(this.state));
    this.setState({ edition: true })
  }

  saveEdition() {
    localStorage.removeItem('oldState');
    this.setState({ edition: false });
    toast.success("Salvo com sucesso!");
  }

  cancelEdition() {
    let oldstate = JSON.parse(localStorage.getItem('oldState'));
    localStorage.removeItem('oldState');
    this.setState(oldstate);
    toast.info("Você cancelou a edição, as informações foram revertidas ao que eram antes de editar.");
  }

  editionControl() {
    if( this.state.edition ){
      return <div>
        <button type="button" className="btn-sm btn-outline-info mt-2" onClick={ this.cancelEdition.bind(this) }>Cancel</button>
        <button type="button" className="btn-sm btn-outline-info mt-2 ml-2" onClick={ this.saveEdition.bind(this) }>Save</button>
      </div>
    }
    else {
      return <button type="button" className="btn-sm btn-outline-info mt-2" onClick={ this.editionMode.bind(this) }>Edit</button>
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
    works.push(work);
    this.setState(works);
  }

  render() {
    const { t } = this.props;

    return <section>
      { this.editionControl() }

      <form onSubmit={ this.handleFormSubmit.bind(this) }>
          <Contact edition={ this.state.edition }
                   handleInputChange={ this.handleInputChange.bind(this) } />

          <Biography bio={ this.is_pt_br() ? this.state.biography.pt_br : this.state.biography.en_us }
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
    </section>
  }
};

PropTypes.User = {
  t: PropTypes.func,
  edition: PropTypes.boolean
};

export default User;
