import { COLORS } from './theme';
import Svg1 from '../assets/onbard/svg-1.svg';
import Svg2 from '../assets/onbard/svg-2.svg';
import Svg3 from '../assets/onbard/svg-3.svg';
import Svg4 from '../assets/onbard/svg-4.svg';
import Svg5 from '../assets/onbard/svg-5.svg';

export const onboardingPages = [
  {
    backgroundColor: COLORS.primaryLight,
    image: <Svg1 width={'90%'} height={250} />,
    title: 'Welcome in WatchTime',
    subtitle: 'Largest TV shows collection',
  },
  {
    backgroundColor: COLORS.primaryLight,
    image: <Svg2 width={'90%'} height={250} />,
    title: 'Explore Something New',
    subtitle: 'Wide range of TV shows. Everyting you need',
  },
  {
    backgroundColor: COLORS.primaryLight,
    image: <Svg3 width={'90%'} height={250} />,
    title: 'Check what you have seen',
    subtitle:
      'You can check episodes that you have seen and track your progress.',
  },
  {
    backgroundColor: COLORS.primaryLight,
    image: <Svg4 width={'90%'} height={250} />,
    title: 'See your statistics',
    subtitle:
      'Now you are able to see your personal statistics in watching tv shows',
  },
  {
    backgroundColor: COLORS.primaryLight,
    image: <Svg5 width={'90%'} height={250} />,
    title: 'Creating an account is extremely easy',
    subtitle: 'Get everything set up and ready in under 5 minutes.',
  },
];
