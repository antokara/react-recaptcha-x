import { IContext } from 'src/provider/IContext';
import { ReCaptchaV2 } from 'src/reCaptchaV2/component/ReCaptchaV2';
import { TCallback } from 'src/reCaptchaV2/component/TCallback';

describe('ReCaptchaV2 component', (): void => {
  let callback: TCallback;
  let providerContext: IContext;

  describe('without the V2 site key', (): void => {
    beforeEach((): void => {
      callback = jest.fn();
      providerContext = {
        siteKeyV2: undefined,
        siteKeyV3: undefined,
        loaded: false
      };
    });

    it('throws an Error', (): void => {
      expect(
        (): ReCaptchaV2 =>
          new ReCaptchaV2({
            callback,
            providerContext: providerContext
          })
      ).toThrow(
        'The prop "siteKeyV2" must be set on the ReCaptchaProvider before using the ReCaptchaV2 component'
      );
    });
  });
});
