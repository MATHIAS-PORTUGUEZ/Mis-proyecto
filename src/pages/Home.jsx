import './Home.css'
import { Link } from 'react-router-dom'
import { ImageCarousel } from '../components/ImageCarousel'



export function Home() {
  return (
    <div className="home-page">
      <header className="hero-top">
        <div className="logo-container">
         
        </div>
        <div className="hero-inner">
          <div className="brand">ALFRESCO</div>
          <div className="subtitle">Reserva tu mesa en segundos</div>
        </div>
      </header>

      <section className="hero-main">
        <div className="hero-box">
          <h2>Bienvenido a ALFRESCO</h2>
          <p>
            <ul>
              <li>Sabores auténticos </li>
              <li>Ingredientes frescos</li>
              <li>Una experiencia inolvidable</li>
            </ul>
          </p>
          <Link to="/reservations" className="btn-primary">Reservar ahora</Link>
        </div>
        <div className="carousel-section">
          <ImageCarousel />
        </div>
      </section>

      <section className="restaurant">
        <h1 className="restaurant-title">Nuestro Restaurante</h1>

        <div className="gallery">
          <div className="card">
            <img src="https://i.pinimg.com/originals/f3/ee/6a/f3ee6a308063ca43a3251a0cbc03f4d4.jpg" alt="Interior del restaurante" />
            <div className="card-overlay">
              <span>Postres Creativos</span>
            </div>
          </div>
          <div className="card">
            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/71/6c/0c/caption.jpg?w=1200&h=1200&s=1" alt="Platos especiales" />
            <div className="card-overlay">
              <span>Mariscos frescos</span>
            </div>
          </div>
          <div className="card">
            <img src="https://comidaperuanaweb.org/wp-content/uploads/2018/12/Co%CC%81cteles-peruanos-1-300x300.jpg" alt="Terraza exterior" />
            <div className="card-overlay">
              <span>Tragos Variados</span>
            </div>
          </div>
        </div>

        <div className="why">
          <h3>¿Por qué reservar con nosotros?</h3>
          <ul>
            <li>Confirmación inmediata.</li>
            <li>Ingredientes frescos y platos de temporada.</li>
            <li>Ambiente cálido en pleno centro.</li>
          </ul>
        </div>

        <footer className="footer">Horario: 12:00 - 22:00 · Dirección: lima 123</footer>
      </section>
    </div>
  )
}

export default Home
