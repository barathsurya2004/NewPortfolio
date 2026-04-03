import React from 'react';
import './SectionLabel.css';

interface SectionLabelProps {
  number: string;
  centered?: boolean;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ number, centered }) => {
  return (
    <div className={`sec-label rv ${centered ? 'centered' : ''}`}>
      <span className="sec-num">{number}</span>
      <span className="sec-pip"></span>
    </div>
  );
};

export default SectionLabel;
