import Footer from '../(composents)/footer';
import Header from '../(composents)/header';

export default function EternalysLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}