export default function Home() {
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0 24px' }}>
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight"
          style={{ textAlign: 'center' }}
        >
          LET'S BUILD THE POST-SCARCITY ECONOMY
        </h1>
        <div 
          className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ margin: '0 auto' }}
        ></div>
      </div>
    </div>
  )
}
