import { IContext } from 'src/provider/IContext';
import { ReCaptchaV3 } from 'src/reCaptchaV3/component/ReCaptchaV3';
import { TCallback } from 'src/reCaptchaV3/component/TCallback';

describe('ReCaptchaV3 component', (): void => {
  let callback: jest.Mock<TCallback>;
  let providerContext: IContext;

  describe('without the V3 site key', (): void => {
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
        (): ReCaptchaV3 =>
          new ReCaptchaV3({
            action: 'test-action',
            callback,
            providerContext: providerContext
          })
      ).toThrow(
        'The prop "siteKeyV3" must be set on the ReCaptchaProvider before using the ReCaptchaV3 component'
      );
    });
  });
});
