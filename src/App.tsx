import WalletConnector from './components/WalletConnector';


function App() {

  return (
    <div
      className='container'
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <WalletConnector />
    </div>
  );
}

export default App;
