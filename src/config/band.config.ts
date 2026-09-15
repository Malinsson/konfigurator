import leather_band from './../assets/models/leather_band.glb?url';
import metal_band from './../assets/models/metal_band.glb?url';

export type BandType = 'leather' | 'steel';

type BandConfig = {
    url: string
    meshMap: Record<string, string> 
}

export const BAND_CONFIGS: Record<BandType, BandConfig> = {
  leather: {
    url: leather_band,
    meshMap: {
      strap: 'wristband_leather',
      stitching: 'tread',
      clasp: 'wristband_leather_metal_part'
    },
  },
  steel: {
    url: metal_band,
    meshMap: {
      strap: 'clockförbättrat_ish_1',
      clasp: 'clockförbättrat_ish',
    },
  },
}