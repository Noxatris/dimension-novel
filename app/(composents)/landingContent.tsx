import {
  BookOpen,
  Globe,
  Zap,
  Star,
} from "lucide-react";

export default function LandingContent() {
  return (
    <section className="relative z-10 px-4 md:px-8 lg:px-24 py-12 text-white">
      <div className="glass-card max-w-5xl mx-auto p-8 space-y-8">
        <h2 className="section-title">
          Que retrouve-t-on ici ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Lecture immersive"
            description="Explorez mes romans à travers une interface fluide, optimisée pour la lecture longue durée."
          />
          <FeatureCard
            icon={<Globe className="w-6 h-6" />}
            title="Univers détaillé"
            description="Accédez à des fiches riches sur l’univers, les personnages et les chronologies."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Musiques & illustrations"
            description="Chaque chapitre prend vie avec une ambiance sonore et visuelle adaptée."
          />
          <FeatureCard
            icon={<Star className="w-6 h-6" />}
            title="Bonus exclusifs"
            description="Chapitres inédits, scènes alternatives et surprises uniquement disponibles ici."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 bg-black/50 backdrop-blur-md rounded-xl p-6 transition-transform duration-300 hover:scale-[1.02] hover:bg-black/70 active:scale-[0.98] border border-violet-700/40 shadow-inner">
      <div className="w-14 h-14 aspect-square flex justify-center items-center rounded-full bg-black/40 border-4 border-violet-700 text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-yellow-300 mb-1">{title}</h3>
        <p className="text-sm text-white leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
