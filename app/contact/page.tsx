import Footer from '../(composents)/footer';

export default function Contact() {
    return (
        <div className="w-screen h-screen overflow-x-hidden relative">
            <div className="w-full h-full bg-center bg-cover sticky md:relative shadow-shadowInset" style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
                <div className="hidden md:flex w-full bg-center bg-cover animate-[blurEffectSide_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverSide.png)' }}></div>
                <div className="hidden md:flex w-full bg-center bg-cover animate-[blurEffectMiddle_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverMiddle.png)' }}></div>
                <h1 className="text-white text-4xl text-center pt-4">Contact</h1>
                <div className="flex flex-col items-center justify-center text-white">
                    <p className="text-center p-4">Pour toute question ou information, vous pouvez nous contacter à l&apos;adresse suivante : 
                        <a href="mailto:abc@gmail.com" className="hover:underline">abc@gmail.com</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}