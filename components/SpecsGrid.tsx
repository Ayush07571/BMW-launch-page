'use client';

import SplitText from './SplitText';
import DataCounter from './DataCounter';

const specs = [
  { value: 510, suffix: " PS", label: "S58 Inline-Six", decimals: 0 },
  { value: 3.9, suffix: " s", label: "0–100 km/h", decimals: 1 },
  { value: 290, suffix: " km/h", label: "Top Speed", decimals: 0 },
  { value: 650, suffix: " NM", label: "Max Torque", decimals: 0 },
  { value: 8, suffix: " Speed", label: "M Steptronic", decimals: 0 },
  { value: 1.2, suffix: " G", label: "Lateral Accel", decimals: 1 },
];

const SpecsGrid = () => {
  return (
    <section id="performance" className="py-40 px-12 bg-bg overflow-hidden">
      <SplitText 
        text="Defining Performance" 
        className="font-display font-semibold text-4xl md:text-7xl text-white mb-24 uppercase tracking-widest"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
        {specs.map((spec, i) => (
          <div 
            key={i} 
            className="bg-bg p-16 group hover:bg-white/[0.02] transition-colors duration-700"
          >
            <div className="flex flex-col gap-2">
              <div className="font-display font-semibold text-6xl md:text-8xl text-white mb-4 flex items-baseline">
                <DataCounter value={spec.value} decimals={spec.decimals} />
                <span className="text-2xl ml-2 font-light text-accent tracking-widest">{spec.suffix}</span>
              </div>
              <div className="w-12 h-[1px] bg-accent group-hover:w-24 transition-all duration-700 mb-4" />
              <span className="font-body font-light text-[11px] tracking-[0.5em] uppercase text-muted">
                {spec.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecsGrid;
