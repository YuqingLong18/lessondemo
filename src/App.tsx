import { SlideDeck } from './components/core/SlideDeck';
import { Slide1_PixelMatrix } from './demos/cnn/Slide1_PixelMatrix';
import { Slide1b_IntensityChallenge } from './demos/cnn/Slide1b_IntensityChallenge';
import { Slide2_RGBExploration } from './demos/cnn/Slide2_RGBExploration';
import { Slide2b_RGBChallenge } from './demos/cnn/Slide2b_RGBChallenge';
import { Slide3_KernelScanning } from './demos/cnn/Slide3_KernelScanning';
import { Slide4_FilterGallery } from './demos/cnn/Slide4_FilterGallery';
import { Slide5_FeatureHierarchy } from './demos/cnn/Slide5_FeatureHierarchy';

const slides = [
  {
    title: 'Input Layer',
    subConcept: 'Pixels as Numbers',
    component: Slide1_PixelMatrix,
  },
  {
    title: 'Challenge',
    subConcept: 'Match the Intensity',
    component: Slide1b_IntensityChallenge,
  },
  {
    title: 'Input Layer',
    subConcept: 'RGB Channels',
    component: Slide2_RGBExploration,
  },
  {
    title: 'Challenge',
    subConcept: 'Match the Color',
    component: Slide2b_RGBChallenge,
  },
  {
    title: 'Convolution',
    subConcept: 'The "Scanning" Mechanism',
    component: Slide3_KernelScanning,
  },
  {
    title: 'Convolution',
    subConcept: 'Visualizing Features',
    component: Slide4_FilterGallery,
  },
  {
    title: 'Network Architecture',
    subConcept: 'Feature Hierarchy',
    component: Slide5_FeatureHierarchy,
  },
];

function App() {
  return <SlideDeck slides={slides} />;
}

export default App;
