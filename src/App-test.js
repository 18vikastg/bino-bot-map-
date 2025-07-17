// Simple test component
function App() {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: 'blue' }}>🚀 Bino Bot Map - Test</h1>
      <p>If you can see this, React is working!</p>
      <button 
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Test Button
      </button>
    </div>
  );
}

export default App;
