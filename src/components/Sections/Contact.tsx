import React from 'react';
import SectionLabel from '../UI/SectionLabel';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact-sec" id="contact">
      <SectionLabel number="04" centered />
      <h2 className="contact-head rv">Let's make something<br/><em>beautiful</em> together.</h2>
      <p className="contact-sub rv">Open to freelance projects, full-time roles, and interesting collaborations. Always happy to chat.</p>
      <a href="mailto:barathsurya2004@gmail.com" className="contact-email rv d1">barathsurya2004@gmail.com</a>
      <ul className="socials rv d2">
        <li><a href="#">GitHub</a></li>
        <li><a href="#">LinkedIn</a></li>
        <li><a href="#">Twitter / X</a></li>
        <li><a href="#">Dribbble</a></li>
      </ul>
    </section>
  );
};

export default Contact;
