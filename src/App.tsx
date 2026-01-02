import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './components/core/LanguageContext';
import { MainLayout } from './layouts/MainLayout';
import { CNNLesson } from './pages/CNNLesson';
import { RNNLesson } from './pages/RNNLesson';
import { NeuronLesson } from './pages/NeuronLesson';
import { MLWorkflowLesson } from './pages/MLWorkflowLesson';
import { FourSchoolsDemo } from './demos/fourschools/FourSchoolsDemo';
import { KnowledgeLearningDemo } from './demos/knowledgelearning/KnowledgeLearningDemo';
import { GradientDescentLesson } from './pages/GradientDescentLesson';
import { TransformerLesson } from './pages/TransformerLesson';
import { LanguageModelsLesson } from './pages/LanguageModelsLesson';
import { LearningToGeneratingLesson } from './pages/LearningToGeneratingLesson';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/neuron" replace />} />
            <Route path="knowledge-learning" element={<KnowledgeLearningDemo />} />
            <Route path="ml-workflow" element={<MLWorkflowLesson />} />
            <Route path="neuron" element={<NeuronLesson />} />
            <Route path="cnn" element={<CNNLesson />} />
            <Route path="rnn" element={<RNNLesson />} />
            <Route path="learning-to-generating" element={<LearningToGeneratingLesson />} />
            <Route path="language-models" element={<LanguageModelsLesson />} />
            <Route path="gradient-descent" element={<GradientDescentLesson />} />
            <Route path="transformer" element={<TransformerLesson />} />
            <Route path="fourschools" element={<FourSchoolsDemo />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
