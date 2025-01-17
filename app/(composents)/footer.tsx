export default function Footer() {
    return (
        <footer className='bg-gray-950 w-screen h-[12vh] mt-8 flex flex-col items-center justify-center text-white'>
            <div className='flex space-x-4'>
                <a href="/mentions-legales" className='hover:underline'>Mentions Légales</a>
                <a href="/politique-de-confidentialite" className='hover:underline'>Politique de Confidentialité</a>
                <a href="/contact" className='hover:underline'>Contact</a>
            </div>
            <div className='mt-2'>
                &copy; {new Date().getFullYear()} Dimension Novel. Tous droits réservés.
            </div>
        </footer>
    )
}