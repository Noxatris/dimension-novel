export default function BackgroundImage({ src }: { src: string }) {
    return (
      <div
        className="fixed inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${src})` }}
      ></div>
    );
  }