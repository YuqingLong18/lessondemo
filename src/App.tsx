import { SlideDeck } from './components/core/SlideDeck';
import { LanguageProvider } from './components/core/LanguageContext';
import { Slide1_PixelMatrix } from './demos/cnn/Slide1_PixelMatrix';
import { Slide1b_IntensityChallenge } from './demos/cnn/Slide1b_IntensityChallenge';
import { Slide2_RGBExploration } from './demos/cnn/Slide2_RGBExploration';
import { Slide2b_RGBChallenge } from './demos/cnn/Slide2b_RGBChallenge';
import { Slide3_KernelScanning } from './demos/cnn/Slide3_KernelScanning';
import { Slide4_FilterGallery } from './demos/cnn/Slide4_FilterGallery';
import { Slide5_FeatureHierarchy } from './demos/cnn/Slide5_FeatureHierarchy';

const slides = [
  {
    title: { zh: '输入层', en: 'Input Layer' },
    subConcept: { zh: '像素是数字', en: 'Pixels as Numbers' },
    component: Slide1_PixelMatrix,
  },
  {
    title: { zh: '挑战', en: 'Challenge' },
    subConcept: { zh: '匹配亮度', en: 'Match the Intensity' },
    component: Slide1b_IntensityChallenge,
  },
  {
    title: { zh: '输入层', en: 'Input Layer' },
    subConcept: { zh: 'RGB 通道', en: 'RGB Channels' },
    component: Slide2_RGBExploration,
  },
  {
    title: { zh: '挑战', en: 'Challenge' },
    subConcept: { zh: '匹配颜色', en: 'Match the Color' },
    component: Slide2b_RGBChallenge,
  },
  {
    title: { zh: '卷积', en: 'Convolution' },
    subConcept: { zh: '“扫描”机制', en: 'The "Scanning" Mechanism' },
    component: Slide3_KernelScanning,
  },
  {
    title: { zh: '卷积', en: 'Convolution' },
    subConcept: { zh: '特征可视化', en: 'Visualizing Features' },
    component: Slide4_FilterGallery,
  },
  {
    title: { zh: '网络结构', en: 'Network Architecture' },
    subConcept: { zh: '特征层级', en: 'Feature Hierarchy' },
    component: Slide5_FeatureHierarchy,
  },
];

function App() {
  return (
    <LanguageProvider>
      <SlideDeck slides={slides} />
    </LanguageProvider>
  );
}

export default App;
