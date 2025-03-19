import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faGlobe, faBolt, faStar } from '@fortawesome/free-solid-svg-icons';

export default function LandingContent() {
    return (
        <section className="flex flex-col md:items-center pt-8 px-4 md:px-8 lg:px-12 lg:mt-[5vh]">
            <h2 className="text-xl xl:text-3xl medievalFont border-b-4 border-violet-700 py-4 md:px-16 mb-6 xl:mb-12">Que retrouvez-vous sur mon site ?</h2>
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
        </section>
    );
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
function FeatureCard({ icon, description }: { icon: any, description: string }) {
    return (
        <div className="flex w-full md:w-[90%] items-start rounded-xl text-white overflow-hidden bg-black/50 p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-black/70 active:scale-95">
            <div className="w-12 h-12 flex justify-center items-center p-2 mr-4 rounded-full bg-black/45 text-white border-4 border-violet-700">
                <FontAwesomeIcon icon={icon} className="fa-fw text-white" />
            </div>
            <div>
                <p className="text-base leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

