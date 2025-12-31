import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './components/core/LanguageContext';
import { MainLayout } from './layouts/MainLayout';
import { CNNLesson } from './pages/CNNLesson';
import { RNNLesson } from './pages/RNNLesson';
import { NeuronLesson } from './pages/NeuronLesson';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/neuron" replace />} />
            <Route path="neuron" element={<NeuronLesson />} />
            <Route path="cnn" element={<CNNLesson />} />
            <Route path="rnn" element={<RNNLesson />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
