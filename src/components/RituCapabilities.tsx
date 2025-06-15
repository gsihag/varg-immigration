
import React from 'react';
import RituHero from './ritu/RituHero';
import RituCapabilities from './ritu/RituCapabilities';
import RituWorkingProcess from './ritu/RituWorkingProcess';
import RituAdvantage from './ritu/RituAdvantage';
import RituCallToAction from './ritu/RituCallToAction';

const RituCapabilitiesMain = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <RituHero />
      <RituCapabilities />
      <RituWorkingProcess />
      <RituAdvantage />
      <RituCallToAction />
    </div>
  );
};

export default RituCapabilitiesMain;
