import { Config } from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setPixelFormat('yuv420p');
Config.setColorSpace('bt709');
Config.setCrf(16);
Config.setChromiumOpenGlRenderer('angle');
