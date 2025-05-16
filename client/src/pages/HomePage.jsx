const Home = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '20px',
          background: 'linear-gradient(90deg, #38b2ac, #4299e1)', // teal to blue gradient
          color: 'white',
          textAlign: 'center',
          borderRadius: '8px',
          maxWidth: '600px',
          margin: '40px auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
          Welcome to Your Expense Tracker
        </h1>
        <p style={{ fontSize: '1.25rem' }}>
          Track your expenses effortlessly and manage your budget with ease.
        </p>
      </div>
    );
  };
  
  export default Home;
  