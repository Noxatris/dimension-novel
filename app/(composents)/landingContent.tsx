import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faGlobe, faBolt, faStar } from '@fortawesome/free-solid-svg-icons';

export default function LandingContent() {
    return (
        <div className="md:h-[50vh] lg:h-[60vh] flex flex-col pt-8 px-4 md:px-8 lg:px-12">
            <h2 className="text-xl medievalFont border-b-4 border-violet-700 py-4 mb-6">Bienvenue sur Dimension Novels</h2>
            <div className="flex flex-col items-center gap-4">
                <FeatureCard
                    icon={faBookOpen}
                    description="Découvrez mes novels avec une interface de lecture optimisée."
                />
                <FeatureCard
                    icon={faGlobe}
                    description="Accédez aux notes et informations sur l'univers et les personnages."
                />
                <FeatureCard
                    icon={faBolt}
                    description="Profitez de la lecture avec musique et illustrations."
                />
                <FeatureCard
                    icon={faStar}
                    description="Découvrez des chapitres bonus exclusifs au site."
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, description }: { icon: any, description: string }) {
    return (
        <div className="flex items-start rounded-xl text-white overflow-hidden bg-black/50 p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-black/70 active:scale-95">
            <div className="w-12 h-12 flex justify-center items-center p-2 mr-4 rounded-full bg-black/45 text-white border-4 border-violet-700">
                <FontAwesomeIcon icon={icon} className="fa-fw text-white" />
            </div>
            <div>
                <p className="text-base leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

