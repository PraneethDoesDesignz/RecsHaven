import React from "react";

const steps = [
  {
    number: '1',
    title: 'Create Signals',
    description:
      'Users create digital pheromone signals by checking in, sharing experiences, or marking locations of interest.',
  },
  {
    number: '2',
    title: 'Signals Evolve',
    description:
      "Signals strengthen with engagement and fade when no longer relevant, creating an authentic representation of what's happening now.",
  },
  {
    number: '3',
    title: 'Discover & Connect',
    description:
      'Find signals that match your interests and connect with the people, places, and experiences that resonate with you.',
  },
  {
    number: '4',
    title: 'Ecosystem Grows',
    description:
      'As more people join, the ecosystem becomes richer and more diverse, creating a living digital layer over the physical world.',
  },
];

const sparkTransforms = [
  'translate-x-5 -translate-y-5 scale-50',
  '-translate-x-6 -translate-y-2.5 scale-50',
  'translate-x-4 translate-y-6 scale-50',
  '-translate-x-5 translate-y-5 scale-50',
  'translate-x-8 translate-y-1 scale-50',
  'translate-y-8 scale-50',
  '-translate-x-8 -translate-y-8 scale-50',
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 text-white text-center bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold bg-white bg-clip-text text-transparent mb-3">
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            VIBE creates a living ecosystem of digital signals that evolve naturally
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={
                `relative bg-[#1f1f1f] border border-white/10 rounded-xl p-8 flex flex-col items-center text-left shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl animate-pulseGlow` +
                (index === 3 ? ' overflow-visible' : '')
              }
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 text-white text-2xl font-bold mb-6">
                {step.number}
              </div>
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-base text-gray-300 leading-relaxed mb-2">{step.description}</p>
                {index === 3 && (
                  <>
                    {/* Emitter dot */}
                    <span className="absolute top-0 right-[-0.75rem] w-1.5 h-1.5 rounded-full bg-gradient-to-br from-white to-pink-200 opacity-80 animate-emitSignal z-10" />
                    {/* Flying sparks */}
                    {sparkTransforms.map((transform, i) => (
                      <span
                        key={i}
                        className={`absolute top-2 left-[110%] w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 opacity-90 z-10 animate-flySpark${i+1}`}
                        style={{ animationDelay: `${1.5 + i * 0.2}s`, animationIterationCount: 'infinite', animationDuration: '1.5s' }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Tailwind CSS custom keyframes for pulseGlow, emitSignal, flySpark1-7 */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(201, 197, 206, 0.1); }
          50% { box-shadow: 0 0 20px rgba(214, 210, 218, 0.219), 0 0 30px rgba(255,255,255,0.288); }
        }
        .animate-pulseGlow { animation: pulseGlow 2.5s ease-in-out infinite; }
        @keyframes emitSignal {
          0% { transform: scale(1); opacity: 0.9; box-shadow: 0 0 0px rgba(255,255,255,0.6); }
          50% { transform: scale(2.5); opacity: 0.4; box-shadow: 0 0 12px rgba(175,175,175,0.8); }
          100% { transform: scale(4); opacity: 0; box-shadow: 0 0 20px rgba(168,85,247,0); }
        }
        .animate-emitSignal { animation: emitSignal 1.5s ease-out infinite; }
        @keyframes flySpark1 { 100% { transform: translate(20px, -20px) scale(0.5); opacity: 0; } }
        @keyframes flySpark2 { 100% { transform: translate(-25px, -10px) scale(0.5); opacity: 0; } }
        @keyframes flySpark3 { 100% { transform: translate(15px, 25px) scale(0.5); opacity: 0; } }
        @keyframes flySpark4 { 100% { transform: translate(-20px, 20px) scale(0.5); opacity: 0; } }
        @keyframes flySpark5 { 100% { transform: translate(30px, 5px) scale(0.5); opacity: 0; } }
        @keyframes flySpark6 { 100% { transform: translate(0, 30px) scale(0.5); opacity: 0; } }
        @keyframes flySpark7 { 100% { transform: translate(-30px, -30px) scale(0.5); opacity: 0; } }
        .animate-flySpark1 { animation-name: flySpark1; }
        .animate-flySpark2 { animation-name: flySpark2; }
        .animate-flySpark3 { animation-name: flySpark3; }
        .animate-flySpark4 { animation-name: flySpark4; }
        .animate-flySpark5 { animation-name: flySpark5; }
        .animate-flySpark6 { animation-name: flySpark6; }
        .animate-flySpark7 { animation-name: flySpark7; }
      `}</style>
    </section>
  );
};

export default HowItWorks;
