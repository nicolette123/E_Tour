import Image from 'next/image'
import '../styles/Destination.scss'

export default function Home() {
  const destinations = [
    { title: 'Akagera National Park', image: '/images/akagera.png' },
    { title: 'Lake Kivu', image: '/images/kivu.png' },
    { title: 'Kigali', image: '/images/kigalii.png' },
    { title: 'Nyungwe Park', image: '/images/Nyungwee.png' },
    { title: 'Volcanoes National Park', image: '/images/volcano.png' },
    { title: 'Rwanda Memorial Genocide', image: '/images/genocide.png' }
  ]

  return (
    <div className="container">
      <h1 className='destination-title'>Popular Destination</h1>
      <div className="grid">
        {destinations.map((dest, index) => (
          <div key={index} className="card">
            <Image src={dest.image} alt={dest.title} width={400} height={280} className="card-image" />
            <div className="card-label">{dest.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
