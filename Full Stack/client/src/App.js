import './App.css'
import PatientForm from './components/PatientForm'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Patient Data Collection</h1>
      </header>
      <main>
        <PatientForm />
      </main>
    </div>
  )
}

export default App