import { useState } from 'react';
import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import Portfolio from '@/components/site/Portfolio';
import Atelier from '@/components/site/Atelier';
import Services from '@/components/site/Services';
import Booking from '@/components/site/Booking';
import Footer from '@/components/site/Footer';
import '@/components/site/site.css';

export default function Home() {
  const [selection, setSelection] = useState(null);

  return (
    <div id="top" className="la-site">
      <a href="#conteudo" className="la-skip-link">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Services onSelect={setSelection} />
        <Portfolio onSelect={setSelection} />
        <Atelier />
        <Booking selection={selection} />
      </main>
      <Footer />
    </div>
  );
}
