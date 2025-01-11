import AudioPlayer from '../../(composents)/audioplayer'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex flex-col w-screen h-screen items-center justify-between ">
            {children}
            <div>
                <AudioPlayer />
            </div>
        </section>
    );
}