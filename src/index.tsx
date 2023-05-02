import ReactDOM from 'react-dom'
import { App } from './App'
import * as serviceWorker from './serviceWorker'
import './styles.css'

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

serviceWorker.unregister()
