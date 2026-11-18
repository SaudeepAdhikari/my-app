import React from 'react';

/**
 * F1SectionDivider – glowing gradient line separator between sections.
 * Optionally shows a chequered flag strip below it.
 */
const F1SectionDivider = ({ showChequered = false }) => (
  <div className="relative w-full">
    <div className="f1-section-divider w-full" />
    {showChequered && (
      <div className="chequered-stripe w-full mt-0" />
    )}
  </div>
);

export default F1SectionDivider;

